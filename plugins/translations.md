# Translations

The panel hands your plugin its translator as a prop. You use it for strings the
panel already ships, and you bring your own catalogue for everything else.

```vue
<script setup lang="ts">
const props = defineProps<{
  t?: (key: string, named?: Record<string, unknown>) => string;
  locale?: string;
}>();
</script>
```

## Why it is a prop

You cannot `import { useI18n } from "vue-i18n"` and expect it to work. A plugin
is a federated remote with its **own module graph**, and vue-i18n keeps its
messages in module scope — so an imported copy is a second, empty instance that
knows none of the panel's messages. It does not throw. It returns your key back
to you, and the raw key ships to production.

The same applies to `notify`. Anything the host owns as module state has to be
handed over, not imported.

## Always pass a fallback

`t("some.key")` returns **the key itself** when the message is missing, so a
plugin string the panel has not shipped renders as `myplugin.save.button` on
screen. Since your keys are by definition not in the panel's catalogue, you need
a helper that treats "returned the key" as a miss:

```ts
/** Translate `key`, falling back to real English when the host cannot. */
function tr(key: string, fallback: string, named?: Record<string, unknown>) {
  // Read locale so computeds using tr() re-evaluate on a language switch —
  // props.t is a stable reference and would not invalidate them on its own.
  void props.locale;
  if (!props.t) return fallback; // standalone, or an older host
  const out = props.t(key, named);
  return !out || out === key ? fallback : out;
}
```

```vue
<button>{{ tr("myplugin.save", "Save") }}</button>
```

This one helper covers all three cases: no host at all, a host without the key,
and a host that has it.

::: tip Reactivity
`t` is a stable function reference, so a computed that only reads `t` will not
re-run when the user switches language. Read `locale` too — `tr` above does it
for you.
:::

## Shipping your own locales

The panel's catalogue is not yours to edit; an operator upgrading the panel
would lose your additions. Keep your messages in your plugin and resolve them
yourself, using the host only for strings it genuinely owns.

Keep one file per language next to your source:

```
src/locales/en.json
src/locales/de_DE.json
```

```json
// src/locales/en.json
{ "myplugin": { "save": "Save", "greeting": "Hello {name}" } }
```

Match the panel's filenames (`en.json`, `de_DE.json`, `fr_FR.json`, …) so
`props.locale` selects yours directly:

```ts
import en from "./locales/en.json";
import de from "./locales/de_DE.json";

const CATALOGUES: Record<string, Record<string, unknown>> = { en, de_DE: de };

function lookup(catalogue: Record<string, unknown>, key: string) {
  return key.split(".").reduce<unknown>((o, k) => (o as never)?.[k], catalogue);
}

/** Your messages first, the panel second, your English last. */
function tr(key: string, fallback: string, named?: Record<string, unknown>) {
  const lang = props.locale ?? "en";
  const mine =
    lookup(CATALOGUES[lang] ?? {}, key) ?? lookup(CATALOGUES.en ?? {}, key);
  if (typeof mine === "string") {
    return mine.replace(/\{(\w+)\}/g, (_, k) => String(named?.[k] ?? `{${k}}`));
  }
  const host = props.t?.(key, named);
  return !host || host === key ? fallback : host;
}
```

Resolution order that matters: **your locale → your English → the panel → the
literal fallback**. Your own catalogue wins so a panel key that happens to
collide with yours cannot silently change your wording, and the literal fallback
means a missing translation degrades to English rather than to a key.

::: warning Namespace your keys
Prefix every key with your slug (`myplugin.*`). You are resolving against a
catalogue that the panel also writes into, and an unprefixed `save` or `title`
will collide sooner or later.
:::

## Falling back when a language is missing

Ship `en.json` and as many others as you have. Anything absent falls through to
your English, so a plugin with only `en.json` still works in every locale — it
just is not translated yet. That is a much better failure than a screen of dotted
keys.

## Standalone development

Running `npm run dev` outside the panel means no `t` and no `locale`, so
everything resolves to your own catalogue with `en` as the locale. That is the
mode to test in first: if your UI reads correctly with no host at all, it will
read correctly embedded.
