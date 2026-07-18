# Getting Started

The fastest path to a working plugin is to copy the
[hello-world sample](https://github.com/5stackgg/5stack-plugin-hello-world). It
is deliberately tiny — one component, one manifest, one Vite config — and it is
already wired for everything described in this section.

```sh
git clone https://github.com/5stackgg/5stack-plugin-hello-world my-plugin
cd my-plugin
rm -rf .git && git init
npm install
```

## The anatomy

| File                        | Role                                                                |
| --------------------------- | ------------------------------------------------------------------- |
| `src/App.vue`               | Your UI. Receives the logged-in `user` as a prop.                   |
| `vite.config.ts`            | Exposes `./App` as a Federation remote; declares shared singletons. |
| `public/5stack-plugin.json` | The manifest the panel detects.                                     |
| `tailwind.config.js`        | Pulls in the `@5stack/ui` preset so you inherit 5Stack theming.     |
| `src/main.ts`               | Standalone dev entry. **Not used** when embedded in the panel.      |

## Rename it

Three names must agree, and they are the most common source of a plugin that
builds fine and then refuses to mount:

1. `federation({ name: "hello" })` in `vite.config.ts`
2. `"scope": "hello"` in `public/5stack-plugin.json`
3. `"slug": "hello"` in the same manifest — this one is the URL segment, and it
   only has to be unique, not equal to the scope.

Pick something specific. Federation scopes are a flat global namespace shared by
every plugin an operator installs, so a scope of `app` or `plugin` will collide.
Nothing in the panel validates uniqueness for you.

::: warning
Renaming the scope after people have already loaded your plugin requires them to
hard-reload the panel. Scopes are registered once per page load and never
re-registered.
:::

## Develop

A Module Federation remote has to be **built** to emit `remoteEntry.js`, so
`vite dev` alone is not enough for testing inside the panel. There are two modes,
and you will use both.

### Standalone

Fastest loop for building UI. `src/main.ts` mounts your component directly with a
fake user, so you get normal HMR:

```sh
npm run dev
```

```ts
// src/main.ts — the fake user lets you exercise role-gated UI locally
createApp(App, {
  user: {
    steam_id: "76561197960265728",
    name: "Dev User",
    role: "administrator",
  },
}).mount("#app");
```

You are not embedded here, so you are seeing your own `tokens.css` fallbacks
rather than the operator's live branding. Layout bugs that only appear inside the
panel will not show up in this mode.

### Embedded

The real test. Build, serve the output with CORS, and point a running panel at
it:

```sh
npm run build
npx vite preview   # serves dist/ with cors enabled
```

Then register `http://localhost:4173` as a Custom Page in your dev panel. See
[Deploying](/plugins/deploying) for the CORS and cache headers this needs.

## Write your page

The panel passes the authenticated user in, and nothing else:

```vue
<script setup lang="ts">
defineProps<{
  user?: { steam_id: string; name: string; role: string } | null;
}>();
</script>

<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold text-foreground">My plugin</h1>
    <p class="text-muted-foreground">
      <template v-if="user">Signed in as {{ user.name }}</template>
      <template v-else>Not signed in</template>
    </p>
  </div>
</template>
```

`user` is `null` for guests when your `requiredRole` is `null` (a public page), so
handle that case. The role string is one of the
[5Stack roles](/features/admin/roles-and-players); see
[Backend & Auth](/plugins/backend) for the ordering and for why a client-side
role check is never sufficient on its own.

## Build and register

```sh
npm run build   # -> dist/remoteEntry.js in assets/, plus dist/5stack-plugin.json
```

Host `dist/`, then in the panel go to **Settings → Application → Custom Pages →
Add**, paste your base URL, press **Detect**, toggle **Enabled**, and save. Make
sure the **Custom Pages** master switch is on.

Your page is now in the sidebar at `/apps/<slug>`.

::: tip
**Detect** fetches your manifest server-side, through the 5Stack API, so the
manifest itself needs no CORS headers. Your `remoteEntry.js` is imported by the
browser cross-origin and **does**. This asymmetry catches nearly everyone once.
:::
