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

`tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  presets: [require("@5stack/ui/tailwind-preset")],
  content: [
    "./index.html",
    "./src/**/*.{vue,ts}",
    // @5stack/ui ships raw source, so Tailwind must scan it too.
    "./node_modules/@5stack/ui/src/**/*.{vue,ts}",
  ],
};
```

`postcss.config.cjs`:

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

Then import the tokens once, from your root component or your stylesheet:

```css
/* src/style.css */
@import "@5stack/ui/tokens.css";
```

::: warning Do not add the `@tailwind` directives yourself
`tokens.css` already contains `@tailwind base; @tailwind components; @tailwind
utilities;`. Importing it **is** your Tailwind entrypoint. Declaring them again
emits preflight twice.
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

### Preflight resets the host's borders

Tailwind's preflight sets `*, ::before, ::after { border-color: … }`. Injected
late, that repaints the panel's own chrome — most visibly as a pale line down the
sidebar. `tokens.css` re-asserts the correct value:

```css
@layer base {
  *,
  ::before,
  ::after {
    border-color: hsl(var(--border));
  }
}
```

This ships in the package, so you get it by importing the tokens. It is worth
knowing about because it explains why a bare Tailwind setup without `tokens.css`
visibly damages the panel.

## Scoping your utilities

Preflight is not the only collision. An unscoped utility class from your plugin
can override the host's identically-named one. The classic failure is `.hidden`:
the panel's responsive `hidden md:flex` sidebar pattern breaks and the nav
disappears.

For anything beyond a simple page, scope your utilities with an important
selector:

```js
// tailwind.config.js
module.exports = {
  darkMode: ["class"],
  // Every generated utility is scoped under the plugin root, so nothing this
  // plugin emits can affect host chrome.
  important: "[data-my-plugin]",
  presets: [require("@5stack/ui/tailwind-preset")],
  content: ["./index.html", "./src/**/*.{vue,ts}"],
};
```

Then anchor it on your root element:

```vue
<template>
  <!-- display: contents so the wrapper adds no layout box inside the host -->
  <div data-my-plugin style="display: contents">
    <!-- your UI -->
  </div>
</template>
```

Note this is Tailwind's `important` **selector**, not a class `prefix`. Your class
names stay normal (`bg-card`, not `tw-bg-card`); they simply generate as
`[data-my-plugin] .bg-card`. The inventory plugin uses exactly this with
`[data-cs2-inventory]`.

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
