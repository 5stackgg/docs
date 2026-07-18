# Module Federation

Plugins are [Module Federation](https://module-federation.io/) remotes built with
[`@originjs/vite-plugin-federation`](https://github.com/originjs/vite-plugin-federation).
The panel is the host; your plugin is a remote it loads at runtime.

## The Vite config

```ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import federation from "@originjs/vite-plugin-federation";
import cssInjectedByJs from "vite-plugin-css-injected-by-js";

export default defineConfig({
  plugins: [
    vue(),
    // Federation shares JS, not CSS. This bundles your compiled Tailwind into
    // remoteEntry.js so styles install themselves when the remote mounts.
    cssInjectedByJs(),
    federation({
      name: "hello",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/App.vue",
      },
      shared: {
        vue: { singleton: true, requiredVersion: false },
        "reka-ui": { singleton: true, requiredVersion: false },
        "lucide-vue-next": { singleton: true, requiredVersion: false },
        "class-variance-authority": { singleton: true, requiredVersion: false },
        "tailwind-merge": { singleton: true, requiredVersion: false },
        clsx: { singleton: true, requiredVersion: false },
        "@5stack/ui": { singleton: true, requiredVersion: false },
      },
    }),
  ],
  build: {
    target: "esnext",
    cssCodeSplit: false,
  },
});
```

`build.target: "esnext"` is required — Federation emits top-level `await`.
`cssCodeSplit: false` keeps your CSS in one bundle so `cssInjectedByJs` can inline
all of it.

## Shared singletons

This is where plugins break, so it is worth understanding rather than copying.

A shared dependency is one the host and remote agree to load **once**. If Vue is
shared, your component and the panel run on the same Vue instance and reactivity
works. If it is not, your plugin quietly loads a second Vue, your component
mounts, and then `provide`/`inject`, reactivity across the boundary, and any
reka-ui component context silently misbehave.

The panel shares these:

```ts
// what the host makes available
{
  vue,
  "vue-router",
  pinia,
  "reka-ui",
  "@vueuse/core",
  "lucide-vue-next",
  "class-variance-authority",
  "tailwind-merge",
  clsx,
  "@5stack/ui",
}
```

Two rules follow.

**Only list what you actually import.** Federation builds a shared entry chunk for
every key in `shared`, and a package that is listed but not installed fails the
build. The hello-world sample lists six because it imports six. Add `pinia` or
`vue-router` to both `shared` and your `package.json` only once you actually use
them.

**Pin the same versions the panel uses.** Every entry is
`requiredVersion: false`, which disables Federation's version check entirely.
That is deliberate — it avoids spurious mismatch errors — but it means a wrong
version does not error. It loads a second copy and you debug phantom reactivity
bugs instead.

::: warning Nothing enforces version lockstep
`requiredVersion: false` means a mismatched `vue`, `reka-ui`, or `@5stack/ui`
fails silently rather than loudly. When you see reactivity that "just doesn't
update", or a reka-ui component that renders but ignores its parent context,
check your versions against the panel's before anything else.
:::

Extracting the shared block into its own file makes it easy to keep in sync, and
mirrors how both reference plugins do it:

```ts
// federation.shared.ts
export const FEDERATION_SHARED = {
  vue: { singleton: true, requiredVersion: false },
  "reka-ui": { singleton: true, requiredVersion: false },
  // …
} as const;
```

## What the host does not share

There is no federated access to 5Stack's data layer. The panel's Apollo client,
its Hasura session, its auth store, and its i18n instance are **not** in the
shared list, and you cannot import them.

This is intentional. A plugin gets identity through the `user` prop and gets data
through [its own backend](/plugins/backend).

## Exposing more than one module

`exposes` takes any number of entries, but the panel mounts exactly one — the
`module` named in your [manifest](/plugins/manifest). Exposing extra modules is
only useful if something else consumes them.

If your plugin needs multiple screens, route inside your own component rather
than exposing several. Both reference plugins do this with a querystring:

```ts
// /apps/inventory?player=<steamid>
const params = new URLSearchParams(window.location.search);
history.replaceState({}, "", `?player=${steamId}`);
```

Using `vue-router` is possible — it is a shared singleton — but you are sharing
the panel's router instance, so be careful not to fight it over the `/apps/*`
route.

## Development builds

There is no `vite dev` story for the embedded case: a remote must be built to
emit `remoteEntry.js`. For an iterative loop, run a watch build alongside a static
server. The inventory plugin does this, and two of its settings are worth
stealing if you work in a synced container or VM:

```ts
build: {
  // Watch rebuilds otherwise wipe dist/ first, so every rebuild has a window
  // where remoteEntry.js 404s and clients lose their hashed chunks.
  emptyOutDir: false,
  watch: {
    buildDelay: 300,
    // inotify events in synced containers go silently blind; polling can't.
    chokidar: { usePolling: true, interval: 500 },
  },
}
```
