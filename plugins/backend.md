# Backend & Auth

Your plugin receives identity from the panel and gets data from its own API.
There is no federated access to 5Stack's GraphQL layer — the panel's Apollo
client and Hasura session are deliberately not shared.

## Identity in the browser

The panel mounts your component with the authenticated user as a prop:

```vue
<script setup lang="ts">
const props = defineProps<{
  user?: { steam_id: string; name: string; role: string } | null;
}>();
</script>
```

`user` is `null` for guests on a public page (`"requiredRole": null`). Handle it.

::: warning `user` is the viewer, not always the subject
If your plugin also mounts as a [player-profile tab](/plugins/routing#the-player-profile-tab),
the profile being viewed arrives as a separate `player` query key. On someone
else's profile those are different people — never treat `player` as the
authenticated identity.
:::

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

Do not implement Steam OpenID, and do not try to decode the 5Stack session
cookie — it is signed and `httpOnly`, and its contents are not a stable contract.

Instead, hand the cookie back to us. Every request the browser makes to your
backend already carries the 5Stack session cookie (see
[Hosting](#hosting-is-part-of-the-security-model)). Forward it to the panel's
authorize endpoint and you get the identity as JSON:

```ts
// identity.ts
const AUTH_URL =
  process.env.FIVESTACK_AUTH_URL ??
  "http://api.5stack.svc.cluster.local:5585/plugins/authorize";

export async function identify(req: FastifyRequest) {
  const cookie = req.headers.cookie;
  if (!cookie) {
    return null;
  }

  const res = await fetch(AUTH_URL, { headers: { cookie } });
  if (!res.ok) {
    return null;
  }

  return (await res.json()) as {
    steam_id: string;
    role: string;
    name: string;
  };
}
```

A `200` means the session is valid. `401` means there is no session. Treat
anything non-`200` as anonymous.

::: tip Cache the lookup
This is one extra in-cluster round-trip per request. Cache the result for a few
seconds keyed on the cookie value — long enough to collapse a page's burst of
API calls, short enough that a logout takes effect promptly.
:::

This fails closed. If your backend is misconfigured or unexpectedly reachable,
the worst case is that requests are rejected — never that an attacker is
believed.

### Optional: forward-auth at the ingress

If you would rather spend the round-trip once at the edge than once per request
in your process, nginx can call the same endpoint for you and inject the result
as headers:

```yaml
nginx.ingress.kubernetes.io/auth-url: "http://api.5stack.svc.cluster.local:5585/plugins/authorize"
nginx.ingress.kubernetes.io/auth-response-headers: "X-5stack-Steam-Id,X-5stack-Role,X-5stack-Name"
```

| Header              | Contents                                       |
| ------------------- | ---------------------------------------------- |
| `X-5stack-Steam-Id` | The authenticated user's SteamID64             |
| `X-5stack-Role`     | Their 5Stack role                              |
| `X-5stack-Name`     | Their display name, URI-encoded                |

::: danger This mode fails open — know what you are signing up for
These are plain HTTP headers. nginx overwrites them on the way through, so they
are trustworthy *only* on traffic that actually traversed that ingress. Expose
the Service any other way — a second ingress without the annotations, a
NodePort, a LoadBalancer, a port-forward — and `curl -H "X-5stack-Role:
administrator"` is an admin session. Nothing will warn you.

Prefer the cookie check above unless you have measured a reason not to. If you
do use this mode, keep the backend a `ClusterIP` Service with the annotated
ingress as its only route in.
:::

::: warning It also locks out anything that is not a browser
The annotation applies to the whole Ingress object, not per path, and it demands
a session cookie. Any caller that authenticates some other way — a game server
holding an API key, a webhook, a cron job — has no cookie to present and gets a
flat `401` from nginx. Your handler never runs, so nothing in your logs explains
it, and the reply is an nginx HTML page rather than your own error shape. That
detail is the fastest way to tell the two apart:

```console
$ curl -i https://your-plugin.example.com/api/public-thing
HTTP/2 401
<html><head><title>401 Authorization Required</title></head>
```

If any part of your API serves non-browser clients, use the cookie check and let
each route decide, or split the public paths onto a second Ingress with no
annotations — nginx prefers the longer path match.
:::

::: warning Never ship a `DEV_STEAM_ID` escape hatch unguarded
A local-dev fallback that returns an `administrator` when no identity is present
is unauthenticated admin the moment that variable exists in a real environment.
Guard it on `process.env.NODE_ENV !== "production"`, not on a comment.
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
    // Required — carries the 5Stack session cookie, which is the only thing
    // that lets your backend establish who is calling.
    credentials: "include",
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
}
```

Two details matter:

- **`credentials: "include"` on every request.** Without it the session cookie
  never arrives and every request is anonymous. This also applies to plain
  `<img>` tags pointing at gated endpoints, which send cookies automatically only
  when same-site.
- **CORS with credentials.** Your backend must reflect the requesting origin and
  allow credentials — a wildcard `*` is invalid once credentials are involved:

  ```ts
  await app.register(cors, { origin: true, credentials: true });
  ```

## Hosting is part of the security model

**Your backend must be served from a subdomain of the panel's domain** —
`myplugin.panel.example.com` for a panel at `panel.example.com`. This is a
requirement, not a preference.

The 5Stack session cookie is issued for `.panel.example.com` with the browser
default `SameSite=Lax`. Lax cookies are not attached to cross-site subresource
requests, so a backend on an unrelated domain receives no cookie at all — no
matter what `credentials: "include"` says, and no matter how the ingress is
annotated. Identity is simply unavailable there.

Two useful consequences fall out of this:

- Hosting in-cluster, behind the panel's own domain, is the only arrangement that
  works — which is also the arrangement where your Service is not casually
  reachable from outside.
- Because the cookie is `httpOnly`, your plugin's frontend can never read it. It
  rides along on requests and is exchanged for identity only by your backend
  talking to the panel.

::: warning Your backend receives a live session cookie
Whichever identity mode you pick, the cookie reaches your service. It is a bearer
credential for the calling user's 5Stack account. Do not log it, do not persist
it, and do not forward it anywhere except the authorize endpoint. This is why
plugins are admin-installed and why the panel treats a plugin backend as
fully trusted code.
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
session, neither identity mode helps — there is no user and no cookie. Issue your
own API key: generate it from an admin screen in your plugin, store it in your
schema, and check it on a route excluded from the session check.

Keep those routes narrow and separate from the session-authenticated ones.

Excluding a route from your own session check is not enough if you also enabled
[forward-auth at the ingress](#optional-forward-auth-at-the-ingress) — that runs
in front of your process and rejects the caller before your exclusion is ever
consulted. Pick one or the other.
