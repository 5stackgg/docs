# Player Badges

A plugin can put one small badge on any player. It shows wherever the panel
shows a player: an icon in the slot under the player's flag, and its label when
you hover. An anti-cheat marking players it protects is the kind of thing it is
for.

## How it shows

- The slot under the flag holds one icon. A plugin's badge takes it ahead of the
  player's role icon.
- When a player has more than one (badges from several plugins, or a badge and a
  role), a small **+1** or **+2** says how many more. Hovering lists every badge,
  then the role.
- When several plugins have a badge on the same player, the slot shows `danger`
  first, then `positive`, then `neutral`, then follows the plugins' order in the
  nav.
- On the player's profile, the badge also sits beside the VAC shield.

## Setting a badge

Your backend writes badges to the panel through GraphQL, as an administrator:
it sends an API key that an administrator made under **Settings → API Keys**.
Keep that key in your backend's secrets, never in the browser.

```ts
const GRAPHQL_URL =
  process.env.FIVESTACK_GRAPHQL_URL ??
  "http://hasura.5stack.svc.cluster.local:8080/v1/graphql";

async function graphql(query: string, variables: Record<string, unknown>) {
  const response = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${process.env.FIVESTACK_API_KEY}`,
    },
    body: JSON.stringify({ query, variables }),
  });
  const payload = await response.json();
  if (payload.errors?.length) {
    throw new Error(payload.errors[0].message);
  }
  return payload.data;
}

export function setBadge(steamId: string) {
  return graphql(
    `mutation setBadge($badge: player_plugin_badges_insert_input!) {
      insert_player_plugin_badges_one(
        object: $badge
        on_conflict: {
          constraint: player_plugin_badges_pkey
          update_columns: [label, tone, icon, link]
        }
      ) { player_steam_id }
    }`,
    {
      badge: {
        custom_page_slug: "zerolag",
        player_steam_id: steamId,
        label: "ZeroLag AC: Protected",
        tone: "positive",
        icon: "shield-check",
        link: null,
      },
    },
  );
}

export function clearBadge(steamId: string) {
  return graphql(
    `mutation clearBadge($slug: String!, $steamId: bigint!) {
      delete_player_plugin_badges_by_pk(
        custom_page_slug: $slug
        player_steam_id: $steamId
      ) { player_steam_id }
    }`,
    { slug: "zerolag", steamId },
  );
}
```

Setting a badge again replaces it, so send the current state whenever it
changes. Each plugin has at most one badge per player.

| Field | |
| --- | --- |
| `custom_page_slug` | Your plugin page's slug on this panel. Detect fills it from your manifest's `slug`, but an administrator can change it under **Advanced**, so make it a setting of your backend rather than a constant |
| `player_steam_id` | The player's SteamID64. Only players who have signed in to this panel exist; a write for anyone else is refused, so a bulk write fails as a whole if it names one |
| `label` | What the hover list says, up to 64 characters. It needs something visible, and zero-width or text-direction characters are refused |
| `tone` | `positive`, `neutral` or `danger`. Colours the icon, and decides which badge wins the slot |
| `icon` | One of the [lucide](https://lucide.dev) icons the panel ships for plugins, such as `shield`, `shield-check`, `shield-alert`, `shield-x`, `ban`, `circle-check` or `circle-alert`. Leave it empty, or name one the panel doesn't have, and your plugin's own icon is used |
| `link` | Optional. An `https://` address opened, in a new tab, from the hover list |

## Who sees it

A badge is seen by exactly the people who can see your plugin's page: while the
page is enabled and, if the page has a `requiredRole`, only by that role and
above. When the **Plugins** switch is off for the whole panel, no badges show.

Removing your plugin from the panel removes its badges with it.
