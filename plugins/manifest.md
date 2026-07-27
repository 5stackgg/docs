# The Manifest

`5stack-plugin.json` is how the panel learns what your plugin is. Put it in your
project's `public/` directory so Vite copies it to `dist/5stack-plugin.json`,
where it is served from the root of your build.

An admin pastes your base URL into **Settings → Application → Plugins →
Detect**, the panel fetches the manifest, and every field below is auto-filled
into the registration form.

```json
{
  "$schema": "https://5stack.gg/schemas/plugin.json",
  "name": "Hello World",
  "slug": "hello",
  "icon": "sparkles",
  "remoteEntry": "/assets/remoteEntry.js",
  "scope": "hello",
  "module": "./App",
  "requiredRole": null,
  "profileTabLabel": "Hello"
}
```

## Fields

| Field             | Required | Meaning                                                                                      |
| ----------------- | -------- | -------------------------------------------------------------------------------------------- |
| `name`            | ✓        | The title shown in the sidebar and on the page.                                              |
| `slug`            | ✓        | URL segment, your page lives at `/apps/<slug>`. Lowercase `a-z0-9-`.                         |
| `icon`            |          | A [lucide](https://lucide.dev) icon name, an image/SVG **URL**, or an inline `<svg>` string. |
| `remoteEntry`     | ✓        | URL of your Federation `remoteEntry.js`. Absolute, or relative to the manifest.              |
| `scope`           | ✓        | Your Federation container name, must equal `name` in your Vite federation config.            |
| `module`          | ✓        | The exposed module path, e.g. `./App`.                                                       |
| `requiredRole`    |          | `null` for a public page, or a role name to gate visibility.                                 |
| `profileTabLabel` |          | Also render your plugin as a tab on player profiles, using this label. Omit for no tab.      |
| `deployments`     |          | The Kubernetes Deployments your plugin is made of, for installers to wait on.                |
| `install`         |          | Makes your plugin installable onto a 5Stack cluster in one command. See [One-Command Install](/plugins/installing). |

### `slug`

This is the route. `"slug": "inventory"` gives you `/apps/inventory`. It must be
unique across every plugin an operator has installed; two plugins claiming the
same slug will fight over the route.

### `icon`

Three accepted forms, in order of how much control they give you:

```json
{ "icon": "sparkles" }
```

A lucide icon name. The panel ships a curated set, if yours does not render,
fall back to one of the other two forms.

```json
{ "icon": "/icon.svg" }
```

A URL, absolute or relative to the manifest. Relative is usually what you want so
the icon follows your deployment.

```json
{ "icon": "<svg viewBox=\"0 0 24 24\" stroke=\"currentColor\">…</svg>" }
```

An inline SVG string. Use `currentColor` for strokes and fills so the icon themes
with the nav in both light and dark mode. The panel sanitizes inline SVG with
DOMPurify before rendering it, so scripts and event handlers inside it are
stripped.

### `remoteEntry`

With the standard Vite setup this is `/assets/remoteEntry.js`, relative to the
manifest, which means it resolves against whatever base URL the admin registered.
Keep it relative unless your JS is genuinely hosted on a different origin from
your manifest.

### `scope` and `module`

These two are the Federation coordinates and they must mirror your
`vite.config.ts` exactly:

```ts
federation({
  name: "hello", //          -> "scope": "hello"
  exposes: {
    "./App": "./src/App.vue", // -> "module": "./App"
  },
});
```

A mismatch produces a page that loads the remote entry successfully and then
fails to resolve the module. See [Module Federation](/plugins/module-federation).

### `requiredRole`

`null` means public: guests who are not logged in can see it, and `user` will be
`null` in your component.

Otherwise, name a role. The check is **role-or-above** against the 5Stack
hierarchy, so `"requiredRole": "moderator"` is also visible to
`match_organizer`, `tournament_organizer`, and `administrator`. The full ordering
is in [Backend & Auth](/plugins/backend#roles).

::: warning `requiredRole` is visibility, not security
It controls whether the sidebar entry and the route render. It does not protect
your data. Anything sensitive must be re-checked by your own backend against a
verified identity. See [Backend & Auth](/plugins/backend).
:::

### `profileTabLabel`

Opt in to a second mounting position. With this set, your plugin also appears as
a tab on every player's profile page (`/players/:steamid`), beside Combat, and
the panel mounts your remote inside that tab.

```json
{ "profileTabLabel": "Inventory" }
```

The value is the tab's label. Omit the field and no tab is rendered, the field
is both the opt-in and the wording, so there is no separate boolean. Admins can
override the label per-site in the registration form without touching your
manifest.

Your `/apps/<slug>` page is unaffected; this is an additional place your same
exposed module gets mounted. What changes is the query the host passes you, see
[Routing](/plugins/routing#the-player-profile-tab), which covers the `player` and
`embed` keys and the one behavior difference in `navigate`.

::: tip Same gating as the sidebar
The tab is filtered through the same checks as the nav entry: the plugins master
switch, the plugin's `enabled` flag, and `requiredRole`. A profile tab is not a
way around visibility rules.
:::

## Serving it

The manifest is fetched **server-side** by the 5Stack API during Detect, not by
the browser, so it does not need CORS headers. It should be served as
`application/json`.

Admins can also skip Detect and type every value in by hand. The manifest is a
convenience, not a requirement, but shipping one means your users cannot get the
scope or module wrong.
