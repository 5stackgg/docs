# Deploying

A plugin is a static build. Host `dist/` anywhere the panel's users can reach it,
get two headers right, and register it.

## Build

```sh
npm run build
```

You get:

```
dist/
  5stack-plugin.json      # copied from public/
  assets/
    remoteEntry.js        # the Federation entry, stable name, changing content
    *.js                  # hashed chunks
```

## Headers

Two rules, and both cause confusing failures when missed.

### CORS on `remoteEntry.js`

The browser imports your remote entry cross-origin from the panel, so it needs
`Access-Control-Allow-Origin`. Your **manifest** does not, Detect fetches that
server-side through the 5Stack API.

```nginx
location /assets/ {
  add_header Access-Control-Allow-Origin "*" always;
}
```

`*` is correct here: this is public JavaScript and the request carries no
credentials. Your [backend API](/plugins/backend) is the opposite case, it
carries the session cookie and must reflect a specific origin with
`Access-Control-Allow-Credentials`.

### Never cache `remoteEntry.js`

`remoteEntry.js` keeps the same filename across every build but its contents
change, and it references hashed chunk names. A cached copy points at chunks that
no longer exist, so users get a plugin that 404s halfway through loading.

```nginx
# Stable filename, changing content, must never be cached.
location = /assets/remoteEntry.js {
  add_header Cache-Control "no-store, no-cache, must-revalidate" always;
  add_header Access-Control-Allow-Origin "*" always;
}

# Hashed chunks are immutable, cache them hard. Vite hashes are base64url
# (mixed case, - and _), not hex.
location ~ ^/assets/.+-[A-Za-z0-9_-]{8}\.js$ {
  add_header Cache-Control "public, max-age=31536000, immutable" always;
  add_header Access-Control-Allow-Origin "*" always;
}
```

Behind a CDN, confirm it is honoring `no-store` on that one path. This is the
single most common cause of "I deployed but the panel is running my old code".

The panel does append a cache-busting query parameter when it loads a remote
entry, which helps, but do not rely on it in place of correct headers.

## Where to host

Any static host works: nginx in a container, an object-storage bucket behind a
CDN, or a static-site host.

If you have a backend, serving from a **subdomain of the panel**
(`myplugin.panel.example.com`) is required, not just convenient. The 5Stack
session cookie is `SameSite=Lax` and never reaches an unrelated domain, so
identity is unavailable there. See [Backend & Auth](/plugins/backend).

A minimal container:

```dockerfile
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
```

### On the panel's Kubernetes cluster

If you are deploying alongside 5Stack itself, ship a kustomize package and an
`install` block in your manifest. An operator then installs your plugin straight
from your repository, in one command:

```sh
./plugin.sh https://github.com/5stackgg/5stack-example-plugin
```

It reads their site's own config — cluster, domain, whether TLS terminates at
the cluster or in front of it, Postgres credentials — instead of asking them to
repeat any of it. [One-Command Install](/plugins/installing) is the format, and
what to lay out where.

If you have a backend, keep it a `ClusterIP` Service so the ingress is its only
route in, and split paths on a single host: `/api` to the backend, `/` to the
static frontend. See also [Custom Kubernetes](/advanced/custom-k8s).

## Register it

In the panel, go to **Settings → Application → Panel Plugins**.

1. Make sure the **Plugins** master switch is enabled.
2. **Add**, paste your base URL (e.g. `https://myplugin.example.com`).
3. Press **Detect**. The panel fetches `5stack-plugin.json` and fills in the
   name, slug, icon, remote entry, scope, module, required role, and, if you
   ship one, the player-profile tab label.
4. Toggle **Enabled** and save.

The page appears in the sidebar immediately for every connected client, the
registry is subscription-backed, so no one needs to reload.

Admins can override any detected field, and can register a plugin entirely by
hand if it ships no manifest. One page can be marked **default**, which makes it
take over the panel's landing route. Setting a **Player Profile Tab** label,
whether detected or typed by hand, also mounts the plugin as a tab on
`/players/:steamid`; clearing it removes the tab. See
[Routing](/plugins/routing#the-player-profile-tab).

## Updating

Redeploy your `dist/`. Clients pick up the new build on their next load of
`/apps/<slug>`, assuming your cache headers are right.

Two changes need more care:

- **Changing your Federation scope** requires users to hard-reload the panel.
  Scopes are registered once per page load and never re-registered.
- **Changing your remote entry URL** on an already-loaded scope has the same
  problem, the old URL stays registered for the life of the page.

Neither is a reason to avoid deploying; just do not expect a silent hot-swap.

## Troubleshooting

| Symptom                              | Likely cause                                                                           |
| ------------------------------------ | -------------------------------------------------------------------------------------- |
| Sidebar entry missing                | Master switch off, plugin disabled, or `requiredRole` above the viewer                 |
| Page loads, remote never mounts      | CORS missing on `remoteEntry.js`; check the browser console                            |
| "Module not found" after entry loads | `scope` or `module` in the manifest disagrees with `vite.config.ts`                    |
| Stale code after deploy              | `remoteEntry.js` is being cached                                                       |
| Chunk 404s                           | A cached `remoteEntry.js` referencing chunks from a previous build                     |
| Reactivity silently broken           | Version mismatch on a [shared singleton](/plugins/module-federation#shared-singletons) |
| Panel nav or sidebar visually breaks | Unscoped utilities; see [Styling](/plugins/styling#scoping-your-utilities)             |
