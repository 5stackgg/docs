import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import type { DefaultTheme, SiteConfig } from "vitepress";

// Read by every panel's api, which loads it into Typesense for the in-app
// search. Bump the version when a field changes meaning.
const VERSION = 1;

type Section = {
  url: string;
  page: string;
  heading: string | null;
  parent: string | null;
  area: string;
  text: string;
};

type Part = {
  heading: string | null;
  anchor: string;
  level: number;
  lines: Array<string>;
};

// VitePress's own slugify, so anchors match the rendered headings.
function slugify(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[\u0000-\u001f]/g, "")
    .replace(/[\s~`!@#$%^&*()\-_+=[\]{}|\\;:"'“”‘’<>,.?/]+/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/^(\d)/, "_$1")
    .toLowerCase();
}

// Inline code is set aside first so placeholders like `<lan-ip>` survive the
// tag stripping.
function inline(value: string) {
  const code: Array<string> = [];
  return value
    .replace(/`([^`]+)`/g, (_, text) => `\uE000${code.push(text) - 1}\uE000`)
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/<\/?[A-Za-z][^>]*>/g, "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/(^|\W)_([^_]+)_(?=\W|$)/g, "$1$2")
    .replace(/\uE000(\d+)\uE000/g, (_, index) => code[Number(index)]);
}

// Prose is cleaned a paragraph at a time, since markup wraps across lines;
// code is kept as it is written.
function plain(lines: Array<string>) {
  const out: Array<string> = [];
  let prose: Array<string> = [];
  let fenced = false;
  const flush = () => {
    out.push(inline(prose.join(" ")));
    prose = [];
  };
  for (const line of lines) {
    if (/^\s*```/.test(line)) {
      flush();
      fenced = !fenced;
      continue;
    }
    if (fenced) {
      out.push(line);
      continue;
    }
    if (!line.trim() || /^\s*:::/.test(line)) {
      flush();
      continue;
    }
    prose.push(
      line
        .replace(/^\s*[-*+]\s+/, "")
        .replace(/^\s*\d+\.\s+/, "")
        .replace(/^\s*>\s?/, "")
        .replace(/\|/g, " ")
        .replace(/^[\s:-]+$/, ""),
    );
  }
  flush();
  return out.join(" ").replace(/\s+/g, " ").trim();
}

function route(page: string) {
  const path = `/${page.replace(/\.md$/, "")}`;
  return path.endsWith("/index") ? path.slice(0, -"index".length) : path;
}

function sidebarKey(link: string) {
  return link.replace(/\.md$/, "").replace(/(.)\/$/, "$1");
}

// A page's area is the most specific sidebar group it is listed under; its
// sidebar label stands in for a missing title.
function sidebarPages(sidebar: DefaultTheme.Sidebar | undefined) {
  const found = new Map<
    string,
    { area: string; title: string | null; depth: number }
  >();
  const walk = (
    items: Array<DefaultTheme.SidebarItem>,
    base: string,
    group: string | null,
    depth: number,
  ) => {
    for (const item of items) {
      const itemBase = item.base ?? base;
      if (item.link && group) {
        const link = sidebarKey(`${itemBase}${item.link}`);
        const seen = found.get(link);
        if ((seen?.depth ?? -1) < depth) {
          found.set(link, {
            area: group,
            title: seen?.title ?? item.text ?? null,
            depth,
          });
        }
      }
      if (item.items) {
        walk(item.items, itemBase, item.text ?? group, depth + 1);
      }
    }
  };
  for (const items of Object.values(sidebar ?? {})) {
    walk(Array.isArray(items) ? items : items.items, "", null, 0);
  }
  return found;
}

function sections(
  source: string,
  url: string,
  listed: { area: string; title: string | null } | undefined,
): Array<Section> {
  let body = source;
  let title: string | null = null;
  const front = body.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (front) {
    if (/^layout:\s*home\s*$/m.test(front[1])) {
      return [];
    }
    if (/^search:\s*false\s*$/m.test(front[1])) {
      return [];
    }
    title = front[1].match(/^title:\s*["']?(.+?)["']?\s*$/m)?.[1] ?? null;
    body = body.slice(front[0].length);
  }

  const used = new Set<string>();
  const unique = (slug: string) => {
    let candidate = slug;
    for (let index = 1; used.has(candidate); index++) {
      candidate = `${slug}-${index}`;
    }
    used.add(candidate);
    return candidate;
  };

  const parts: Array<Part> = [];
  let current: Part = { heading: null, anchor: "", level: 1, lines: [] };
  let fenced = false;
  for (const line of body.split(/\r?\n/)) {
    if (/^\s*```/.test(line)) {
      fenced = !fenced;
    }
    const heading = fenced ? null : line.match(/^(#{1,6})\s+(.+?)\s*$/);
    if (!heading) {
      current.lines.push(line);
      continue;
    }
    const custom = heading[2].match(/\s*\{#([^}]+)\}$/)?.[1];
    const text = inline(heading[2].replace(/\s*\{#[^}]+\}$/, "")).trim();
    const anchor = unique(custom ?? slugify(text));
    if (heading[1].length === 1) {
      title ??= text;
      continue;
    }
    if (heading[1].length > 3) {
      current.lines.push(text);
      continue;
    }
    parts.push(current);
    current = { heading: text, anchor, level: heading[1].length, lines: [] };
  }
  parts.push(current);

  const page =
    title ??
    listed?.title ??
    parts.find((part) => part.heading)?.heading ??
    url;
  const area = listed?.area ?? "Docs";
  let parent: string | null = null;
  return parts.flatMap((part) => {
    if (part.level === 2) {
      parent = part.heading;
    }
    const text = plain(part.lines);
    if (!text && !part.heading) {
      return [];
    }
    return [
      {
        url: part.anchor ? `${url}#${part.anchor}` : url,
        page,
        heading: part.heading,
        parent: part.level === 3 ? parent : null,
        area,
        text,
      },
    ];
  });
}

export async function writeSearchIndex(config: SiteConfig) {
  const sidebar = sidebarPages(config.site.themeConfig?.sidebar);
  const pages = config.pages.filter((page) => page !== "README.md");
  const all = await Promise.all(
    pages.map(async (page) => {
      const url = route(page);
      const source = await readFile(join(config.srcDir, page), "utf8");
      return sections(source, url, sidebar.get(sidebarKey(url)));
    }),
  );
  await writeFile(
    join(config.outDir, "search-index.json"),
    JSON.stringify({ version: VERSION, sections: all.flat() }),
  );
}
