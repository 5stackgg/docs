# Player Management Plugin

A Ranked server gets its sanctions from the match plugin, as part of each match.
A [community server](./community-servers) runs no match, so it runs the
**5Stack Player Management** plugin instead. It enforces your panel's
sanctions on the server while people play:

| Sanction    | On a community server                                                         |
| ----------- | ----------------------------------------------------------------------------- |
| **Ban**     | Kicked when they join, or as soon as the ban is issued, with the ban's reason |
| **Mute**    | Voice chat turned off, and turned back on when the mute ends or is removed    |
| **Gag**     | Text chat blocked                                                             |
| **Silence** | Muted and gagged                                                              |
| **Warning** | Nothing: a warning is a note on the player's record                           |

A player is told in chat when they are muted or gagged, with the reason and when
it ends. The plugin also enforces the server's [access list](./access) and
reports the live roster that the server page, the community stats and the
leaderboards are built from.

It ships for both runtimes, from game-server releases `sw-v0.0.91` and
`css-v0.0.437`, and it is CS2 only.

::: tip No signatures to break
Bans, mutes, gags and the roster use no byte-pattern signatures, so a CS2
update does not break them. The one exception is refusing a player at connect
on a restricted SwiftlyS2 server; see [Restricted Servers](./access#how-it-is-enforced).
:::

## Installing it

### On a game server node

Nothing to do. Both game server images carry the plugin, and 5Stack loads it on
every community server it runs on a node. It gets its credentials from the
container's environment, so there is no config file.

::: warning Servers created before the plugin shipped
The plugin is switched on when the server's container is built. If an older
server shows the plugin as not detected, switch the server off and back on with
its **Enabled** switch to rebuild it.
:::

### On an external server

A server you run yourself needs the plugin installed by hand. The panel walks
you through it under **Settings → Player Management** on the server's page
(administrators only, since the config contains the server's API password):

1. Download the plugin for the framework your server runs. It is published on
   the same [game-server release](https://github.com/5stackgg/game-server/releases)
   as the match plugin, as `PlayerManagement-sw-v*.zip` for SwiftlyS2 and
   `PlayerManagement-css-v*.zip` for CounterStrikeSharp.
2. Extract the zip into the server's `game/csgo` folder.
3. Save the config the panel shows on the server, at:
   - **SwiftlyS2**: `addons/swiftlys2/configs/plugins/PlayerManagement/config.jsonc`
   - **CounterStrikeSharp**: `addons/counterstrikesharp/configs/plugins/PlayerManagement/PlayerManagement.json`
4. Restart the server. The plugin shows as active within a minute.

The config holds three values:

::: code-group

```jsonc [SwiftlyS2 config.jsonc]
{
  "PlayerManagement": {
    "API_DOMAIN": "https://api.5stack.gg",
    "SERVER_ID": "<your-server-id>",
    "SERVER_API_PASSWORD": "<your-server-api-password>",
  },
}
```

```json [CounterStrikeSharp PlayerManagement.json]
{
  "Version": 1,
  "API_DOMAIN": "https://api.5stack.gg",
  "SERVER_ID": "<your-server-id>",
  "SERVER_API_PASSWORD": "<your-server-api-password>"
}
```

:::

Environment variables with the same names take precedence over the file.

::: warning Update your panel first
The plugin talks to the API at `/sanctions/server`. Panels installed before
the plugin shipped do not route that path to the API; run `./update.sh` on the
panel.
:::

## Checking that it works

**Settings → Player Management** shows **Player Management plugin active** with
the plugin's version, runtime and last check-in, or **Player Management plugin
not detected**. The plugin counts as detected while it has checked in within the
last 3 minutes. The **Players** tab shows the same state as an amber icon beside
refresh, and the roster falls back to RCON while the plugin is missing.

Two RCON commands help from the server side:

| Command                     | What it does                                                                                                          |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `player_management_refresh` | Syncs with the panel now. Replies `PlayerManagement: syncing N player(s)`, or names the settings that are missing     |
| `player_management_status`  | Prints the plugin's version and runtime, its last sync or error, the access list it holds and each player's sanctions |

The panel sends `player_management_refresh` itself whenever you sanction a
player or change the server's access list, so neither waits for the next sync.

## How it syncs

The plugin syncs with the panel every 30 seconds, and about 1.5 seconds after
someone joins or leaves. Each sync:

- asks for the active sanctions of everyone on the server,
- reports the roster (who is connected, their kills, and who left),
- reports whether the server is on [Steam relay](/servers/steam-relay#the-connect-address),
  and its relay address,
- doubles as the heartbeat the panel shows as the plugin's last check-in.

Sanctions are cached on the server. If the panel cannot be reached, the plugin
keeps enforcing the last answer it had. A player who rejoins is not enforced on
until the panel answers about them (or the request fails), so a ban lifted while
they were away is not applied from the stale copy.

The plugin runs its sync on its own timer rather than the game's, so it keeps
working while an empty server
[hibernates](/servers/dedicated-servers/#hibernation).

## Without the plugin

Kicking still works on a community server without the plugin, over RCON, and
banning a player who is on the server kicks them once. Nothing stops them
rejoining, though: bans, mutes and gags are recorded but not enforced, and
nothing is recorded for the stats. When a sanction is saved but not enforced
live, the panel's message says why: the plugin is not installed, or is installed
but not configured.
