# Plugin Development

Plugins — called **Custom Pages** in the panel UI — let you run your own web app
**inside 5Stack**. Same sidebar, same header, same theme, same login. Your app is
not part of 5Stack and does not require a fork or a rebuild of the panel.

Technically, a plugin is a Vue [Module Federation](https://module-federation.io/)
remote. The panel loads it at runtime and mounts it on a native route,
`/apps/<slug>`.

- **No iframe.** Your component runs inside the panel's own Vue app, sharing its
  Vue instance, its router, and its styling.
- **No second login.** The panel hands you the authenticated user. If you have a
  backend, it sits behind 5Stack forward-auth instead of running its own Steam
  OpenID flow.
- **Native look.** The shared `@5stack/ui` Tailwind preset and design tokens mean
  your UI follows the operator's live branding automatically.
- **No panel rebuild.** Plugins live in a database registry. An admin adds a URL;
  the panel picks it up.

::: warning This is not the same as a CS2 server plugin
This section is about extending **the panel's web UI**. If you are looking to run
SwiftlyS2 or CounterStrikeSharp plugins on a game server, see
[Plugin Runtimes](/servers/game-server-nodes/plugin-runtimes) and
[Custom Plugins](/servers/game-server-nodes/custom-plugins) instead.
:::

## How it works

1. You build a Vue app with Vite and expose your root component as a Module
   Federation remote. The build emits `dist/assets/remoteEntry.js`.
2. You ship a manifest, `5stack-plugin.json`, at the root of that same build.
3. You host `dist/` somewhere the panel's users can reach.
4. An admin pastes your URL into **Settings → Application → Custom Pages**, hits
   **Detect**, and enables it.
5. The panel writes a row into its `custom_pages` registry. Every connected
   client picks the new entry up over a live subscription, renders a sidebar
   item, and — when a user navigates to `/apps/<slug>` — fetches your
   `remoteEntry.js`, resolves your exposed module, and mounts it:

   ```vue
   <component :is="RemoteComponent" :user="authStore.me" />
   ```

That `user` prop is the entire inbound contract. Everything else your plugin
needs, it fetches itself.

## What you get, and what you don't

| You get | You don't get |
| --- | --- |
| A full page at `/apps/<slug>` | Hooks into match pages, settings tabs, or arbitrary host slots |
| A sidebar nav entry with your icon | Control over where in the nav it appears |
| The logged-in user (`steam_id`, `name`, `role`) | The host's Apollo/GraphQL client or Hasura session |
| Role-gated visibility via `requiredRole` | A sandbox — your code runs with full access to the page |
| The design tokens + Tailwind preset | A ready-made component library (see [Components](/plugins/components)) |

There is exactly **one** extension point: the whole-page mount. There is no slot
system. If you need data from 5Stack, you either read it off the `user` prop or
you call [your own backend](/plugins/backend).

::: info No sandbox
A plugin is loaded into the panel's JavaScript context with no isolation. It can
read the host's cookies and reach into its stores. `requiredRole` controls who
*sees* the page, not what the code *can do*. There is also no integrity pinning
on `remoteEntry.js` — the panel loads whatever the registered URL serves, so a
compromised plugin host compromises the panel for every user until the page is
disabled. Only install plugins you trust, and tell your users the same about
yours.
:::

## Reference implementations

| Repo | What it shows |
| --- | --- |
| [5stack-plugin-hello-world](https://github.com/5stackgg/5stack-plugin-hello-world) | The smallest complete plugin. Start here — copy it. |
| [5stack-inventory-plugin](https://github.com/lukepolo/5stack-inventory-plugin) | A production plugin with a Fastify backend, Postgres, forward-auth, and a Kubernetes deployment. |

## Next steps

- [Getting Started](/plugins/getting-started) — scaffold, build, and register a
  plugin in about ten minutes.
- [The Manifest](/plugins/manifest) — every `5stack-plugin.json` field.
- [Module Federation](/plugins/module-federation) — the Vite config and the
  shared-singleton rules that make or break a plugin.
- [Styling](/plugins/styling) — Tailwind setup, design tokens, and the CSS
  pitfalls unique to runtime-injected styles.
- [Components](/plugins/components) — what `@5stack/ui` actually gives you today.
- [Backend & Auth](/plugins/backend) — forward-auth and talking to your own API.
- [Deploying](/plugins/deploying) — hosting, CORS, caching, and registration.
