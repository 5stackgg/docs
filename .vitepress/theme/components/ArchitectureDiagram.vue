<script setup>
import { computed, ref, watch } from "vue";

const props = defineProps({
  flows: { type: [String, Array], default: "running" },
  hide: { type: [String, Array], default: "" },
  select: { type: String, default: "" },
});

const WIDTH = 900;

const ROWS = [
  { id: "cloud", h: 48, host: false },
  { id: "agent", h: 50, host: true },
  { id: "ctl", h: 50, host: true },
  { id: "ns1", h: 50, host: true },
  { id: "ns2", h: 50, host: true },
  { id: "net", h: 50, host: true },
  { id: "out", h: 50, host: false },
];

const GROUPS = {
  panel: { label: "PANEL SERVER", x: 8, w: 420, host: true },
  node: { label: "GAME SERVER NODE", x: 516, w: 186, host: true },
  internet: { label: "INTERNET", x: 758, w: 134, host: false },
};

const EYEBROW = {
  panel: "Panel server",
  node: "Game server node",
  internet: "Internet",
  cloud: "5Stack",
  out: "Internet",
};

const BOXES = {
  cloud: { row: "cloud", g: "cloud", x: 314, w: 300, t: "5Stack cloud", s: "get.5stack.gg · releases · node codes" },
  p_agent: { row: "agent", g: "panel", x: 158, w: 256, t: "5stack agent", s: "root service · updates, nodes" },
  n_agent: { row: "agent", g: "node", x: 530, w: 158, t: "5stack agent", s: "root service" },
  k3s: { row: "ctl", g: "panel", x: 22, w: 256, t: "k3s server", s: "Kubernetes control plane" },
  n_k3s: { row: "ctl", g: "node", x: 530, w: 158, t: "k3s agent", s: "Kubernetes worker" },
  relay: { row: "ctl", g: "internet", x: 772, w: 106, t: "Steam Relay", s: "Valve SDR" },
  tsdb: { row: "ns1", g: "panel", x: 22, w: 120, t: "TimescaleDB", s: "all panel data" },
  hasura: { row: "ns1", g: "panel", x: 158, w: 120, t: "Hasura", s: "GraphQL" },
  api: { row: "ns1", g: "panel", x: 294, w: 120, t: "API", s: "panel backend" },
  n_gs: { row: "ns1", g: "node", x: 530, w: 158, t: "Game servers", s: "CS2 match + dedicated" },
  cache: { row: "ns2", g: "panel", x: 22, w: 120, t: "Search, cache", s: "Typesense · Redis" },
  web: { row: "ns2", g: "panel", x: 158, w: 120, t: "Web", s: "panel website" },
  n_conn: { row: "ns2", g: "node", x: 530, w: 158, t: "Node connector", s: "status · demo uploads" },
  players: { row: "ns2", g: "internet", x: 772, w: 106, t: "Players", s: "CS2 clients" },
  rustfs: { row: "net", g: "panel", x: 22, w: 120, t: "RustFS", s: "demos · clips" },
  p_ts: { row: "net", g: "panel", x: 294, w: 120, t: "Tailscale", s: "private network" },
  n_ts: { row: "net", g: "node", x: 530, w: 158, t: "Tailscale", s: "private network" },
  browser: { row: "out", g: "out", x: 158, w: 120, t: "Browser", s: "players, admins" },
};

const INFO = {
  cloud: {
    role: "A 5Stack service at get.5stack.gg. Your servers connect out to it for releases, setup, adding nodes and moving servers.",
    talks: [
      "Hands out signed releases of the agent and the panel",
      "Serves the setup page during an install",
      "Passes node codes and encrypted join keys between your panel and a new node",
      "Pairs your old and new server when you move the panel",
    ],
    note: "It never connects in to your servers, and matches keep running while it is unreachable. Installs, updates, adding nodes and moves need it.",
  },
  p_agent: {
    role: "The 5Stack service on your panel server. It installs and updates the panel, approves new game server nodes and moves the panel to a new server.",
    talks: [
      "5Stack cloud, outgoing only: releases, node codes and moves",
      "Kubernetes, to apply releases and dump the database",
      "The API, which passes on what you choose in the panel, such as Update Now or approving a node",
    ],
    note: "It doesn't listen on a network port. The 5stack command talks to it through a local socket.",
  },
  n_agent: {
    role: "The 5Stack service on a game server node. It joins the node to your panel with a code, and re-joins it when you move the panel to a new server.",
    talks: [
      "5Stack cloud, outgoing only: the join code and the encrypted join keys",
      "The k3s agent, which it installs",
    ],
  },
  k3s: {
    role: "Kubernetes runs every panel service as a container, and starts game servers on your nodes when the API asks for one.",
    talks: ["The k3s agent on each game server node, over Tailscale"],
  },
  n_k3s: {
    role: "The Kubernetes worker on the node. It runs the game servers and the node connector that the panel schedules here.",
    talks: ["The k3s server on the panel, over Tailscale"],
  },
  relay: {
    role: "Valve's Steam Datagram Relay. Players who can't or shouldn't connect straight to a game server's address play through it instead.",
    talks: ["Players and game servers, both ways"],
    note: "It's Valve's network, not part of 5Stack.",
  },
  tsdb: {
    role: "PostgreSQL with the TimescaleDB extension. It holds all panel data: players, matches, stats and settings.",
    talks: ["RustFS, or your own S3, where a database backup is written every night"],
  },
  hasura: {
    role: "Serves the panel's data, including the live updates on match pages.",
    talks: ["TimescaleDB"],
  },
  api: {
    role: "The panel's backend. It runs matches, asks Kubernetes for game servers and receives everything that happens in a match.",
    talks: [
      "Game servers, both ways over Tailscale: match events come in, RCON commands go out",
      "Hasura, for the database",
      "Redis and Typesense",
    ],
  },
  n_gs: {
    role: "CS2 servers. Each match gets a server started on demand, and dedicated servers you run on this node stay up.",
    talks: [
      "Players, directly over UDP or through Steam Relay",
      "The API, both ways over Tailscale: match events go up, RCON commands come down",
    ],
  },
  cache: {
    role: "Typesense powers search across the panel. Redis is the API's cache and job queue.",
    talks: [],
  },
  web: {
    role: "The website players and admins use.",
    talks: ["The API, for everything it shows"],
  },
  n_conn: {
    role: "5Stack's helper on each node. It reports the node's status to the panel, uploads finished demos and keeps game plugins in sync.",
    talks: ["The API, over Tailscale", "RustFS, or your own S3, for demo uploads"],
  },
  players: {
    role: "CS2 clients joining a match or a server.",
    talks: ["Game servers, directly over UDP or through Steam Relay"],
  },
  rustfs: {
    role: "File storage on the panel server, unless you bring your own S3. It keeps demos, clips and the nightly database backups.",
    talks: ["Game server nodes upload finished demos to it"],
    note: "By default it lives on the same server as the panel, so losing that server loses these files too.",
  },
  p_ts: {
    role: "Tailscale on the panel server. The panel and your game server nodes reach each other over this private network, not the open internet.",
    talks: ["Tailscale on each game server node"],
  },
  n_ts: {
    role: "Tailscale on the node. It connects the node to your panel's private network.",
    talks: ["Tailscale on the panel server"],
  },
  browser: {
    role: "Players and admins using your panel's website.",
    talks: ["The panel's website and API, over HTTPS"],
  },
};

const EDGES = [
  {
    a: ["cloud", "bottom", -104],
    b: ["p_agent", "top", 74],
    ly: -8,
    f: {
      install: ["agent and signed release", "ab"],
      update: ["signed release", "ab"],
      join: ["code lookup · encrypted keys", "both"],
      migrate: ["pairs with the new server", "both"],
    },
  },
  {
    a: ["cloud", "bottom", 116],
    b: ["n_agent", "top", -29],
    ly: -8,
    f: {
      join: ["code · encrypted keys", "both"],
      migrate: ["re-join message", "ab"],
    },
  },
  {
    a: ["p_agent", "bottom", -68],
    b: ["k3s", "top", 68],
    f: {
      install: "installs k3s and the panel",
      update: "applies the release",
      join: "one-time join token",
      migrate: "dumps the database",
    },
  },
  {
    a: ["p_agent", "bottom", 68],
    b: ["api", "top"],
    f: {
      update: ["status · drain", "both"],
      join: ["code lookup · approval", "both"],
    },
  },
  {
    a: ["browser", "top"],
    b: ["web", "bottom"],
    f: {
      running: "HTTPS",
      install: "first sign-in",
      update: "Update Now",
      join: "enters the code",
    },
  },
  {
    a: ["web", "right"],
    b: ["api", "bottom", -20],
    f: { running: "", update: "", join: "" },
  },
  { a: ["api", "left"], b: ["hasura", "right"], f: { running: "" } },
  { a: ["hasura", "left"], b: ["tsdb", "right"], f: { running: "" } },
  {
    a: ["rustfs", "right"],
    b: ["p_ts", "left"],
    f: { migrate: "demos → new server" },
  },
  {
    a: ["p_ts", "right"],
    b: ["n_ts", "left"],
    two: true,
    f: { running: "private network", join: "node joins\nthe tailnet" },
  },
  {
    a: ["api", "right"],
    b: ["n_gs", "left"],
    two: true,
    f: { running: "← match events\nRCON →\nover Tailscale" },
  },
  {
    a: ["n_agent", "bottom"],
    b: ["n_k3s", "top"],
    f: { join: "installs the k3s agent", migrate: "re-joins the new panel" },
  },
  {
    a: ["k3s", "right"],
    b: ["n_k3s", "left"],
    f: { running: "starts game servers" },
  },
  {
    a: ["n_k3s", "bottom"],
    b: ["n_gs", "top"],
    f: { running: "runs the servers" },
  },
  {
    a: ["players", "left"],
    b: ["n_gs", "right", 10],
    two: true,
    f: { running: "direct\nWAN UDP" },
  },
  {
    a: ["players", "top"],
    b: ["relay", "bottom"],
    two: true,
    f: { running: "or" },
  },
  {
    a: ["relay", "left"],
    b: ["n_gs", "right", -10],
    two: true,
    f: { running: "relayed" },
  },
];

const FLOWS = {
  running: {
    tab: "Running",
    caption: "Day to day. Players reach game servers directly or through Steam Relay. Game servers send match events to the API and take RCON commands back, over Tailscale.",
    select: "n_gs",
  },
  install: {
    tab: "Install",
    caption: "The installer fetches the agent and a signed release from the 5Stack cloud, and the agent installs k3s and the panel. Your setup answers travel from your browser to the server encrypted, through the cloud.",
    select: "p_agent",
  },
  update: {
    tab: "Update",
    caption: "The 5Stack cloud offers a signed release. You pick when in the panel, the panel pauses new matches, and the agent applies the release.",
    select: "p_agent",
  },
  join: {
    tab: "Add a node",
    caption: "The node shows a code. You enter it in the panel, and your panel's agent sends the node its join keys, encrypted, through the 5Stack cloud. The node then joins over Tailscale.",
    select: "n_agent",
  },
  migrate: {
    tab: "Move server",
    caption: "Moving to a new server, seen from the old one. The two servers pair through the 5Stack cloud, then the database and demos go straight to the new server over Tailscale. Game nodes get a message to re-join.",
    select: "p_agent",
  },
};

const toList = (value) =>
  (Array.isArray(value) ? value : String(value || "").split(","))
    .map((item) => String(item).trim())
    .filter(Boolean);

const flowList = computed(() => {
  const picked = toList(props.flows).filter((flow) => FLOWS[flow]);
  return picked.length ? picked : ["running"];
});

const hidden = computed(() => new Set(toList(props.hide)));

const shownIds = computed(() =>
  Object.keys(BOXES).filter((id) => !hidden.value.has(id)),
);

const layout = computed(() => {
  const ids = shownIds.value;
  const rowY = {};
  const rowH = {};
  let bottom = null;
  let previous = null;
  for (const row of ROWS) {
    if (!ids.some((id) => BOXES[id].row === row.id)) {
      continue;
    }
    let y;
    if (previous === null) {
      y = row.host ? 44 : 14;
    } else if (row.host && !previous.host) {
      y = bottom + 64;
    } else if (!row.host && previous.host) {
      y = bottom + 42;
    } else {
      y = bottom + 26;
    }
    rowY[row.id] = y;
    rowH[row.id] = row.h;
    bottom = y + row.h;
    previous = row;
  }

  const boxes = {};
  for (const id of ids) {
    const box = BOXES[id];
    boxes[id] = { ...box, id, y: rowY[box.row], h: rowH[box.row] };
  }

  const span = (members) => {
    if (!members.length) {
      return null;
    }
    return {
      top: Math.min(...members.map((box) => box.y)) - 32,
      bottom: Math.max(...members.map((box) => box.y + box.h)) + 14,
    };
  };

  const all = Object.values(boxes);
  const hostSpan = span(all.filter((box) => GROUPS[box.g]?.host));
  const groups = [];
  for (const [key, group] of Object.entries(GROUPS)) {
    const members = all.filter((box) => box.g === key);
    if (!members.length) {
      continue;
    }
    const bounds = group.host ? hostSpan : span(members);
    groups.push({
      key,
      label: group.label,
      x: group.x,
      w: group.w,
      y: bounds.top,
      h: bounds.bottom - bounds.top,
    });
  }

  return { boxes, groups, height: (bottom ?? 0) + 14 };
});

const anchor = (boxes, [id, side, offset = 0]) => {
  const box = boxes[id];
  if (side === "top") {
    return { x: box.x + box.w / 2 + offset, y: box.y, nx: 0, ny: -1 };
  }
  if (side === "bottom") {
    return { x: box.x + box.w / 2 + offset, y: box.y + box.h, nx: 0, ny: 1 };
  }
  if (side === "left") {
    return { x: box.x, y: box.y + box.h / 2 + offset, nx: -1, ny: 0 };
  }
  return { x: box.x + box.w, y: box.y + box.h / 2 + offset, nx: 1, ny: 0 };
};

const edgeShape = (boxes, edge) => {
  const p0 = anchor(boxes, edge.a);
  const p3 = anchor(boxes, edge.b);
  const reach =
    edge.d ??
    Math.max(28, Math.min(80, Math.hypot(p3.x - p0.x, p3.y - p0.y) / 2.4));
  const c1 = { x: p0.x + p0.nx * reach, y: p0.y + p0.ny * reach };
  const c2 = { x: p3.x + p3.nx * reach, y: p3.y + p3.ny * reach };
  return {
    d: `M${p0.x} ${p0.y} C${c1.x} ${c1.y} ${c2.x} ${c2.y} ${p3.x} ${p3.y}`,
    mid: {
      x: 0.125 * p0.x + 0.375 * c1.x + 0.375 * c2.x + 0.125 * p3.x,
      y: 0.125 * p0.y + 0.375 * c1.y + 0.375 * c2.y + 0.125 * p3.y,
    },
  };
};

const current = ref(flowList.value[0]);

watch(flowList, (list) => {
  if (!list.includes(current.value)) {
    current.value = list[0];
  }
});

const edges = computed(() => {
  const { boxes } = layout.value;
  const flows = flowList.value;
  return EDGES.map((edge, index) => ({ edge, index }))
    .filter(
      ({ edge }) =>
        boxes[edge.a[0]] &&
        boxes[edge.b[0]] &&
        flows.some((flow) => flow in edge.f),
    )
    .map(({ edge, index }) => {
      const shape = edgeShape(boxes, edge);
      const entry = edge.f[current.value];
      const on = entry !== undefined;
      const [label, dir] = Array.isArray(entry)
        ? entry
        : [entry ?? "", edge.two ? "both" : "ab"];
      const lines = label ? label.split("\n") : [];
      const longest = Math.max(0, ...lines.map((line) => line.length));
      const labelW = longest * 6 + 12;
      const labelH = lines.length * 13 + 5;
      return {
        key: index,
        d: shape.d,
        on,
        start: on && (dir === "ba" || dir === "both"),
        end: on && (dir === "ab" || dir === "both"),
        lines,
        label: {
          x: shape.mid.x - labelW / 2 + (edge.lx ?? 0),
          y: shape.mid.y - labelH / 2 + (edge.ly ?? 0),
          w: labelW,
          h: labelH,
          tx: shape.mid.x + (edge.lx ?? 0),
          ty: shape.mid.y - labelH / 2 + (edge.ly ?? 0) + 12,
        },
      };
    });
});

const hot = computed(() => {
  const ids = new Set();
  for (const edge of edges.value) {
    if (edge.on) {
      const source = EDGES[edge.key];
      ids.add(source.a[0]);
      ids.add(source.b[0]);
    }
  }
  return ids;
});

const pickDefault = () => {
  const ids = shownIds.value;
  for (const id of [props.select, FLOWS[flowList.value[0]].select]) {
    if (id && ids.includes(id)) {
      return id;
    }
  }
  return ids[0];
};

const selected = ref(pickDefault());

watch([shownIds, () => props.select], () => {
  if (!shownIds.value.includes(selected.value)) {
    selected.value = pickDefault();
  }
});

const inspected = computed(() => {
  const box = BOXES[selected.value];
  if (!box) {
    return null;
  }
  return {
    eyebrow: EYEBROW[box.g],
    title: box.t,
    ...INFO[selected.value],
  };
});

const markerId = computed(
  () =>
    "arch-ah-" +
    [flowList.value.join("-"), toList(props.hide).join("-")]
      .join("_")
      .replace(/[^a-z0-9_-]/gi, ""),
);

const pick = (id) => {
  selected.value = id;
};
</script>

<template>
  <figure class="arch">
    <div
      v-if="flowList.length > 1"
      class="arch-tabs"
      role="group"
      aria-label="Flow"
    >
      <button
        v-for="flow in flowList"
        :key="flow"
        type="button"
        class="arch-tab"
        :aria-pressed="flow === current ? 'true' : 'false'"
        @click="current = flow"
      >
        {{ FLOWS[flow].tab }}
      </button>
    </div>
    <div class="arch-scroll">
      <svg
        class="arch-svg"
        :viewBox="`0 0 ${WIDTH} ${layout.height}`"
        role="group"
        :aria-label="`Diagram of a 5Stack panel and game server node: ${FLOWS[current].tab}`"
      >
        <defs>
          <marker
            :id="markerId"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path class="arch-ah" d="M0 0 10 5 0 10z" />
          </marker>
        </defs>
        <g v-for="group in layout.groups" :key="group.key">
          <rect
            class="arch-grp"
            :x="group.x"
            :y="group.y"
            :width="group.w"
            :height="group.h"
            rx="12"
          />
          <text class="arch-grp-label" :x="group.x + 14" :y="group.y + 19">{{
            group.label
          }}</text>
        </g>
        <path
          v-for="edge in edges"
          :key="`e${edge.key}`"
          class="arch-eg"
          :class="{ on: edge.on }"
          :d="edge.d"
          :marker-start="edge.start ? `url(#${markerId})` : undefined"
          :marker-end="edge.end ? `url(#${markerId})` : undefined"
        />
        <g
          v-for="box in layout.boxes"
          :key="box.id"
          class="arch-nd"
          :class="{
            sel: box.id === selected,
            hot: hot.has(box.id) && box.id !== selected,
            cloud: box.g === 'cloud',
          }"
          tabindex="0"
          role="button"
          :aria-label="`${box.t}: ${box.s}`"
          :aria-pressed="box.id === selected ? 'true' : 'false'"
          @click="pick(box.id)"
          @keydown.enter.prevent="pick(box.id)"
          @keydown.space.prevent="pick(box.id)"
        >
          <rect :x="box.x" :y="box.y" :width="box.w" :height="box.h" rx="8" />
          <text class="t" :x="box.x + 12" :y="box.y + box.h / 2 - 3">{{
            box.t
          }}</text>
          <text class="s" :x="box.x + 12" :y="box.y + box.h / 2 + 13">{{
            box.s
          }}</text>
        </g>
        <template v-for="edge in edges" :key="`l${edge.key}`">
          <g v-if="edge.on && edge.lines.length" class="arch-el">
            <rect
              :x="edge.label.x"
              :y="edge.label.y"
              :width="edge.label.w"
              :height="edge.label.h"
              rx="4"
            />
            <text :x="edge.label.tx" :y="edge.label.ty" text-anchor="middle">
              <tspan
                v-for="(line, index) in edge.lines"
                :key="index"
                :x="edge.label.tx"
                :dy="index === 0 ? 0 : 13"
                >{{ line }}</tspan
              >
            </text>
          </g>
        </template>
      </svg>
    </div>
    <figcaption class="arch-caption">{{ FLOWS[current].caption }}</figcaption>
    <div v-if="inspected" class="arch-inspector" aria-live="polite">
      <p class="arch-eyebrow">{{ inspected.eyebrow }}</p>
      <p class="arch-title">{{ inspected.title }}</p>
      <p class="arch-role">{{ inspected.role }}</p>
      <template v-if="inspected.talks && inspected.talks.length">
        <p class="arch-eyebrow">Talks to</p>
        <ul class="arch-talks">
          <li v-for="item in inspected.talks" :key="item">{{ item }}</li>
        </ul>
      </template>
      <p v-if="inspected.note" class="arch-note">{{ inspected.note }}</p>
    </div>
  </figure>
</template>

<style scoped>
.arch {
  margin: 24px 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  overflow: hidden;
}

.arch-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 10px 12px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.arch-tab {
  padding: 6px 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  font-family: var(--vp-font-family-mono);
  font-size: 12px;
  line-height: 1.2;
  cursor: pointer;
  transition:
    color 150ms ease-out,
    border-color 150ms ease-out,
    background-color 150ms ease-out;
}

.arch-tab:hover {
  color: var(--vp-c-text-1);
}

.arch-tab[aria-pressed="true"] {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

.arch-tab:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

.arch-scroll {
  overflow-x: auto;
  overscroll-behavior-x: contain;
}

.arch-svg {
  display: block;
  width: 100%;
  min-width: 640px;
  height: auto;
}

.arch-grp {
  fill: none;
  stroke: var(--vp-c-divider);
  stroke-dasharray: 4 4;
}

.arch-grp-label {
  fill: var(--vp-c-text-3);
  font-family: var(--vp-font-family-mono);
  font-size: 10px;
  letter-spacing: 0.12em;
}

.arch-nd {
  cursor: pointer;
  outline: none;
}

.arch-nd rect {
  fill: var(--vp-c-bg);
  stroke: var(--vp-c-divider);
  stroke-width: 1.2;
  transition:
    stroke 160ms ease-out,
    fill 160ms ease-out;
}

.arch-nd.cloud rect {
  stroke-dasharray: 5 3;
}

.arch-nd:hover rect {
  stroke: var(--vp-c-text-3);
}

.arch-nd.hot rect {
  stroke: var(--vp-c-brand-3);
}

.arch-nd.sel rect {
  stroke: var(--vp-c-brand-1);
  stroke-width: 1.6;
  fill: var(--vp-c-brand-soft);
}

.arch-nd:focus-visible rect {
  stroke: var(--vp-c-brand-1);
  stroke-width: 2.4;
}

.arch-nd .t {
  fill: var(--vp-c-text-1);
  font-family: var(--vp-font-family-display, var(--vp-font-family-base));
  font-size: 13px;
  font-weight: 600;
}

.arch-nd .s {
  fill: var(--vp-c-text-2);
  font-family: var(--vp-font-family-mono);
  font-size: 10px;
}

.arch-eg {
  fill: none;
  stroke: var(--vp-c-text-3);
  stroke-width: 1.3;
  opacity: 0.35;
  transition:
    stroke 180ms ease-out,
    opacity 180ms ease-out;
}

.arch-eg.on {
  stroke: var(--vp-c-brand-1);
  stroke-width: 1.8;
  stroke-dasharray: 6 5;
  opacity: 1;
  animation: arch-flow 900ms linear infinite;
}

.arch-ah {
  fill: var(--vp-c-brand-1);
}

.arch-el {
  pointer-events: none;
}

.arch-el rect {
  fill: var(--vp-c-bg);
  stroke: var(--vp-c-brand-3);
  stroke-opacity: 0.5;
}

.arch-el text {
  fill: var(--vp-c-brand-1);
  font-family: var(--vp-font-family-mono);
  font-size: 10px;
}

@keyframes arch-flow {
  to {
    stroke-dashoffset: -22;
  }
}

@media (prefers-reduced-motion: reduce) {
  .arch-eg.on {
    animation: none;
  }

  .arch-nd rect,
  .arch-eg,
  .arch-tab {
    transition: none;
  }
}

.arch-caption {
  margin: 0;
  padding: 10px 16px;
  border-top: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1.55;
}

.arch-inspector {
  padding: 14px 16px 16px;
  border-top: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
}

.arch-inspector p {
  margin: 0;
}

.arch-eyebrow {
  color: var(--vp-c-text-3);
  font-family: var(--vp-font-family-mono);
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.arch-inspector .arch-title {
  margin-top: 4px;
  color: var(--vp-c-text-1);
  font-family: var(--vp-font-family-display, var(--vp-font-family-base));
  font-size: 17px;
  font-weight: 600;
  line-height: 1.3;
}

.arch-inspector .arch-role {
  margin: 4px 0 12px;
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1.55;
}

.arch-talks {
  margin: 6px 0 0;
  padding-left: 18px;
  font-size: 14px;
  line-height: 1.5;
}

.arch-talks li {
  margin: 0;
}

.arch-talks li + li {
  margin-top: 4px;
}

.arch-talks li::marker {
  color: var(--vp-c-brand-1);
}

.arch-inspector .arch-note {
  margin-top: 12px;
  padding-top: 10px;
  border-top: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
  font-size: 13px;
  line-height: 1.5;
}
</style>
