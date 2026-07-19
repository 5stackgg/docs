# Backend & Auth

Your plugin receives identity from the panel and gets data from its own API.
There is no federated access to 5Stack's GraphQL layer — the panel's Apollo
client and Hasura session are deliberately not shared.

## Identity in the browser

The panel mounts your component with the authenticated user as a prop, and that
is the entire inbound contract:

```vue
<script setup lang="ts">
const props = defineProps<{
  user?: { steam_id: string; name: string; role: string } | null;
}>();
</script>
```

`user` is `null` for guests on a public page (`"requiredRole": null`). Handle it.

### Roles

`requiredRole` is checked as **role-or-above** against this ladder:

```
user → verified_user → streamer → moderator
     → match_organizer → tournament_organizer → administrator
```

So `"requiredRole": "moderator"` is visible to moderators and everything to their
right. An unrecognized role denies rather than allows.

You only receive the role string, not the panel's comparison helper, so an
in-plugin hierarchy check means reimplementing that ordering. For a simple admin
gate, an equality check is usually enough:

```ts
const isAdmin = computed(() => props.user?.role === "administrator");
```

::: warning Client-side role checks hide UI; they do not protect data
Your plugin runs in the user's browser. Hiding a button prevents nothing. Every
privileged operation must be re-checked by your backend against the forward-auth
headers below.
:::

## Identity in your backend

Do not implement Steam OpenID, and do not try to parse the 5Stack session cookie.
Put your service behind 5Stack's forward-auth endpoint instead: the 5Stack API
validates the session and passes the identity to you as headers.

On Kubernetes with the nginx ingress:

```yaml
nginx.ingress.kubernetes.io/auth-url: "http://api.5stack.svc.cluster.local:5585/custom-pages/authorize"
nginx.ingress.kubernetes.io/auth-response-headers: "X-5stack-Steam-Id,X-5stack-Role,X-5stack-Name"
```

Your backend then trusts three headers:

| Header              | Contents                           |
| ------------------- | ---------------------------------- |
| `X-5stack-Steam-Id` | The authenticated user's SteamID64 |
| `X-5stack-Role`     | Their 5Stack role                  |
| `X-5stack-Name`     | Their display name                 |

```ts
// identity.ts
export function identify(req: FastifyRequest) {
  const steamId = req.headers["x-5stack-steam-id"] as string | undefined;
  if (!steamId) {
    // Local dev only. The NODE_ENV guard makes a leaked DEV_STEAM_ID harmless
    // in production, where the ingress rejects unauthenticated requests anyway.
    if (process.env.NODE_ENV !== "production" && process.env.DEV_STEAM_ID) {
      return { steamId: process.env.DEV_STEAM_ID, role: "administrator" };
    }
    return null;
  }
  return {
    steamId,
    role: req.headers["x-5stack-role"] as string,
    name: req.headers["x-5stack-name"] as string,
  };
}
```

::: danger These headers are only trustworthy behind the gate
They are plain HTTP headers. If your backend is reachable without passing through
the forward-auth ingress, anyone can set them. Never expose the service directly,
and keep any `DEV_STEAM_ID`-style fallback strictly out of production.
:::

## Calling your API from the plugin

Your remote executes on the **panel's** origin, but your backend lives on **your**
origin. Hardcoding a URL means reconfiguring per deployment. Derive it instead
from where your own bundle was loaded:

```ts
// api.ts — zero config in production
const API_BASE =
  import.meta.env.VITE_MY_PLUGIN_API ?? new URL(import.meta.url).origin;

export async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}/api${path}`, {
    // Required — carries the 5Stack session cookie to the forward-auth gate.
    credentials: "include",
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
}
```

Two details matter:

- **`credentials: "include"` on every request.** Without it the session cookie
  never reaches the gate and the ingress rejects you. This also applies to plain
  `<img>` tags pointing at gated endpoints, which send cookies automatically only
  when same-site.
- **CORS with credentials.** Your backend must reflect the requesting origin and
  allow credentials — a wildcard `*` is invalid once credentials are involved:

  ```ts
  await app.register(cors, { origin: true, credentials: true });
  ```

::: tip Hosting on a subdomain of the panel
Serving your plugin from `myplugin.panel.example.com` keeps the 5Stack session
cookie same-site, which sidesteps a whole category of third-party-cookie
problems. It is the simplest arrangement that works.
:::

## Storing data

You are free to run whatever you like. The inventory plugin uses Postgres and
shares the panel's instance, isolating itself behind a dedicated schema so it can
never collide with 5Stack's tables:

```sql
CREATE SCHEMA IF NOT EXISTS my_plugin;

CREATE TABLE IF NOT EXISTS my_plugin.settings (
  key   text PRIMARY KEY,
  value jsonb NOT NULL
);
```

Schema-qualify every query, and write migrations idempotently
(`CREATE TABLE IF NOT EXISTS`, `ADD COLUMN IF NOT EXISTS`) so they can be applied
on every boot without a migration framework.

::: warning
If you share the panel's database, a destructive migration is a destructive
migration for 5Stack's data too. Confine yourself to your own schema and never
write to 5Stack's tables — the panel's own migrations own those, and it will
overwrite you.
:::

## Machine-to-machine access

If a game server or another service needs to reach your API without a browser
session, forward-auth will not help — there is no user. Issue your own API key:
generate it from an admin screen in your plugin, store it in your schema, and
check it on a route excluded from the forward-auth ingress path.

Keep those routes narrow and separate from the session-authenticated ones.
