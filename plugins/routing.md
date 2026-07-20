# Routing

Your plugin owns **every URL under its slug**. The panel matches
`/apps/<slug>/:path*`, resolves the remote from the slug, and passes the rest
down as props — so you get real, linkable, back-button-able routes without
bundling `vue-router`.

That last part is not a style preference. A second router instance inside a
federated remote fights the host's for the URL, and both lose.

## The inbound props

```vue
<script setup lang="ts">
const props = defineProps<{
  user?: { steam_id: string; name: string; role: string } | null;
  base?: string;
  path?: string;
  query?: Record<string, unknown>;
  navigate?: (
    to: string,
    options?: { replace?: boolean; query?: Record<string, unknown> },
  ) => void;
}>();
</script>
```

| Prop | What the host passes |
| --- | --- |
| `user` | the authenticated 5stack user, or `null` for guests on a public page |
| `base` | where you are mounted, e.g. `/apps/inventory` |
| `path` | the path *below* your slug — `/` or `/admin` |
| `query` | the current query object |
| `navigate` | `(to, { replace?, query? }) => void`, where `to` is plugin-relative |

Every prop is optional, and they are all absent when you run standalone
(`npm run dev` with no panel around you). Treat absence as "I am not embedded"
rather than as an error — the same call sites should work in both modes.

::: tip Navigate in your own space
`navigate("/admin")` becomes `router.push("/apps/<slug>/admin")` on the host
side. You pass the path *below* your slug; the host prefixes `base` for you. If
you find yourself passing `/apps/...` you are doing the host's job and will
break the moment an operator registers you under a different slug.
:::

## Deriving screens from the URL

Compute your current screen from `path` — never assign it to a `ref` you also
mutate by hand. The URL is the only source of truth, so tabs, deep links, and
the back button cannot disagree:

```ts
const screen = computed(() => {
  switch (props.path ?? "/") {
    case "/admin":
      return "admin";
    case "/items":
      return "items";
    default:
      return "home";
  }
});
```

Standalone, fall back to the History API behind the same interface:

```ts
const embedded = computed(() => typeof props.navigate === "function");

const go = (to: string) => {
  if (embedded.value) return props.navigate!(to);
  history.pushState({}, "", `${props.base ?? ""}${to}`);
};
```

## The player-profile tab

A plugin can mount in a second position: as a tab on player profiles. Set
[`profileTabLabel`](/plugins/manifest#profiletablabel) in your manifest and the
panel renders a tab with that label on `/players/:steamid`, beside Combat, with
your remote mounted inside it.

It is the **same exposed module** — you are not writing a second entry point.
What changes is the query:

| Query | Meaning |
| --- | --- |
| `player` | the steam64 of the profile being viewed |
| `embed` | `"1"` — you are inside someone else's page |

### `player` is not your user

This is the mistake to avoid. `props.user` is whoever is *logged in*; `player`
is whose profile is being *looked at*. On a profile tab they are usually
different people, and treating `player` as the viewer is how a plugin ends up
letting one user edit another's data.

Read it defensively — it comes from the URL:

```ts
const viewing = computed(() => {
  const p = props.query?.player;
  return typeof p === "string" && /^\d{17}$/.test(p) ? p : null;
});
const readOnly = computed(() => !!viewing.value && viewing.value !== props.user?.steam_id);
```

::: warning Read-only is your job, not the host's
The host does not restrict what you render on a profile tab. If your plugin has
write actions, gate them yourself on the `player`/`user` comparison above, and
re-check on your backend. See [Backend & Auth](/plugins/backend).
:::

### `embed` is about framing, not permissions

`embed=1` means the host page already supplies the chrome and owns the page
scroll. It does **not** mean "read-only" — that is what `player` implies.

Use it to drop anything that assumes you own the screen: full-viewport heights
(`100dvh` will push the rest of the profile off-screen), your own header, your
own nav pill, share buttons the host page already provides.

```ts
const embed = computed(() => props.query?.embed === "1");
```

```vue
<div :class="embed ? 'h-[70dvh]' : 'h-[calc(100dvh-6rem)]'">
  <header v-if="!embed">…</header>
</div>
```

### `navigate` stays inside the tab

One behavior difference, and it is handled for you: on a profile tab the host
wires `navigate` to **local state** instead of `router.push`. A push would send
the viewer to `/apps/<slug>` the moment they clicked anything inside your tab.

Only `?tab=<slug>` ever reaches the host URL. Your sub-navigation works normally
and the profile page never unmounts — but it is also not deep-linkable from
outside, so do not rely on someone being able to share a URL that lands on a
specific screen *within* your tab.

### Gating

The tab is filtered through the same checks as your sidebar entry: the plugins
master switch, your `enabled` flag, and `requiredRole`. A profile tab is not a
way around visibility rules.

The remote is only fetched when someone actually opens the tab, so an unopened
tab costs a table row, not a network round-trip.
