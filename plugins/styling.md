# Styling

5Stack's design system is Tailwind CSS driving a set of CSS-variable tokens. A
plugin opts into it by extending the shared preset from `@5stack/ui`. Do that and
your buttons, cards, and text inherit the operator's live branding for free — an
admin who changes the panel's colors changes yours too, with no rebuild.

The whole system rests on one idea: **every color in the preset is
`hsl(var(--token))`, and the host defines those tokens.**

## Setup

Install the package and its peers:

```sh
npm install @5stack/ui reka-ui lucide-vue-next clsx tailwind-merge \
  class-variance-authority
npm install -D tailwindcss postcss autoprefixer
```

`tailwind.config.js` — use the **plugin** preset, not the base one:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("@5stack/ui/tailwind-plugin-preset")],
  content: ["./index.html", "./src/**/*.{vue,ts}"],
};
```

It wraps `@5stack/ui/tailwind-preset` with the two things every plugin needs:
utility scoping (`important: "[data-5stack-plugin]"`) and the `@5stack/ui`
content glob. Web uses the base preset directly; plugins should not.

`postcss.config.cjs`:

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

Then one stylesheet import, and the attribute on your root element:

```css
/* src/style.css */
@import "@5stack/ui/plugin.css";
```

```vue
<template>
  <!-- display: contents so the wrapper adds no layout box inside the host -->
  <div data-5stack-plugin style="display: contents">
    <!-- your UI -->
  </div>
</template>
```

That is the whole contract. `plugin.css` is your Tailwind entrypoint — it brings
the tokens, `@tailwind components`, `@tailwind utilities`, and the scoped base
rules, and it is built so that nothing it emits can reach the panel's chrome.

::: warning Do not add `@tailwind base` yourself
`plugin.css` deliberately omits it. Preflight is global by nature, and your CSS
loads after the panel's — see [below](#why-plugin-css-omits-preflight). For
standalone dev, where nothing has reset UA styles, import the preflight from
your **dev entry only**:

```ts
// src/main.ts
if (import.meta.env.DEV) {
  import("@5stack/ui/standalone.css");
}
```

The guard is dead code in a production build, so it never reaches your bundle.
:::

::: info CommonJS configs in an ESM package
Both configs use `module.exports` even though `package.json` has `"type":
"module"`. Tailwind loads its own config through a separate resolver so
`tailwind.config.js` works as-is; PostCSS does not, which is why that one must be
named `.cjs`.
:::

## What the preset gives you

`@5stack/ui/tailwind-preset` sets `darkMode: ["class"]`, a centered container
(`2rem` padding, `2xl` at `1400px`), the `tailwindcss-animate` plugin, the
`Twemoji Country Flags, Oxanium, sans-serif` font stack, a `--radius`-derived
border-radius scale, and the token-backed color palette:

| Utility family | Tokens                                                 |
| -------------- | ------------------------------------------------------ |
| Surfaces       | `background`, `foreground`, `card`, `popover`, `muted` |
| Actions        | `primary`, `secondary`, `accent`, `destructive`        |
| Status         | `success`, `warning`, `info`                           |
| Chrome         | `border`, `input`, `ring`                              |
| Panel chrome   | `sidebar-*`, `topnav-*`                                |
| Brand          | `tac-amber`                                            |

Each has a matching `-foreground` for text placed on it. So:

```vue
<div class="rounded-lg border bg-card p-4 text-card-foreground">
  <h2 class="text-lg font-semibold text-foreground">Title</h2>
  <p class="text-sm text-muted-foreground">Supporting copy.</p>
  <button class="rounded-md bg-primary px-3 py-2 text-primary-foreground">
    Confirm
  </button>
</div>
```

Use the semantic tokens, not raw Tailwind palette colors. `bg-zinc-900` will look
right on the default theme and wrong the moment an operator rebrands;
`bg-background` is always correct.

The border-radius scale derives from `--radius`, so `rounded-sm` through
`rounded-xl` all shift together when branding changes.

::: tip
Standalone dev falls back to the values baked into `tokens.css`. Those match the
stock panel theme, but they are a fallback — when embedded, the host's live
values win. Always sanity-check your plugin inside the panel before shipping.
:::

## How your CSS reaches the page

Module Federation shares JavaScript, not CSS. There is no stylesheet request for
your plugin. Instead `vite-plugin-css-injected-by-js` bundles your compiled
Tailwind into `remoteEntry.js` as a string, and it installs itself into `<head>`
when your remote mounts.

That has one consequence that drives everything below: **your CSS is injected
after the panel's**. On ties, you win — which is a problem, because the panel is
not expecting to be overridden.

`plugin.css` and the plugin preset handle all three collisions below for you.
You do not need to do anything with this section beyond understanding why your
plugin must not emit global CSS of its own.

### Token overrides stay out of the way

`tokens.css` wraps its token blocks in `:where()`:

```css
@layer base {
  :where(:root) {
    --background: 0 0% 100%;
    /* … */
  }
  :where(.dark) {
    --background: 240 10% 3.9%;
    /* … */
  }
}
```

`:where()` has zero specificity, so the host's own `:root` and `.dark` rules win
when your plugin is embedded, while the same declarations still apply standalone.
If you define your own tokens, use the same trick.

### Why `plugin.css` omits preflight

Tailwind's preflight sets `*, ::before, ::after { border-color: #e5e7eb }`.
Injected late, that repaints every host border that does not set its own color —
most visibly as a pale line down the sidebar. Its `body`, heading, and `img`
resets land on the panel too.

So `plugin.css` does not emit preflight at all. The panel already applies it
document-wide, which covers your subtree when embedded. What `plugin.css` does
ship is the one slice utilities actually depend on, scoped to your root:

```css
[data-5stack-plugin],
[data-5stack-plugin] *,
[data-5stack-plugin] ::before,
[data-5stack-plugin] ::after {
  box-sizing: border-box;
  border-width: 0;
  border-style: solid;
  border-color: hsl(var(--border));
}
```

Without that, `class="border"` renders nothing — Tailwind's `border` utility
only sets border-*width*; the style and color come from preflight.

This is why a bare Tailwind setup, or any plugin that adds `@tailwind base`
itself, visibly damages the panel.

## Scoping your utilities

Preflight is not the only collision. An unscoped utility class from your plugin
can override the host's identically-named one. The classic failure is `.hidden`:
the panel's responsive `hidden md:flex` sidebar pattern breaks and the nav
disappears.

`tailwind-plugin-preset` handles this by setting `important:
"[data-5stack-plugin]"`, which is why the attribute on your root element is
required rather than optional.

Note this is Tailwind's `important` **selector**, not a class `prefix`. Your class
names stay normal (`bg-card`, not `tw-bg-card`); they simply generate as
`[data-5stack-plugin] .bg-card`.

Two consequences worth knowing:

- Utilities apply to **descendants** of the root, not to the root element
  itself. Put your layout on a child, not on the `display: contents` wrapper.
- Content portalled to `document.body` escapes the scope entirely — see
  [Components](/plugins/components).

If you need extra scoping for your own hand-written CSS, add a second attribute
of your own (the inventory plugin uses `data-cs2-inventory`) alongside
`data-5stack-plugin`.

## Avoid arbitrary-value classes

Because your CSS travels as a JavaScript string, class names containing escaped
brackets and decimal points can be mangled in transit. Arbitrary values like
`text-[9px]` or `tracking-[0.14em]` are the ones that bite.

Define named tokens in your own `theme.extend` instead:

```js
theme: {
  extend: {
    fontSize: { f9: "9px", f10: "10px", f11: "11px" },
    letterSpacing: { cs1: "0.1em", cs2: "0.14em", cs3: "0.18em" },
  },
},
```

```vue
<span class="text-f10 tracking-cs2">ROUND 12</span>
```

Slightly less convenient, reliably correct.

## Fonts

The preset names `Oxanium` in its font stack, but the `@font-face` that loads it
lives in the panel's own stylesheet, not in `tokens.css`. Embedded, you get
Oxanium because the host loaded it. Standalone, you silently fall back to
`sans-serif`.

If your dev-mode typography needs to match, ship the font yourself in your dev
entry — but do not add a global `@font-face` to your production bundle, since the
host already provides one.
