# Player Management Plugin Not Detected

A community server's page shows **Player Management plugin not detected** (or an
amber icon beside the roster's refresh button) when the
[Player Management plugin](/servers/dedicated-servers/player-management) has not
checked in within the last 3 minutes. Until it does, mutes, gags and access
lists are not enforced, and the roster is read over RCON with no history.

## A server on a game server node

The plugin is part of the server's container, and is switched on when the
container is built. A server created before the plugin shipped has an old
container: switch it off and back on with its **Enabled** switch.

## An external server

1. Check it is installed for the right framework. A SwiftlyS2 build does not
   load under CounterStrikeSharp, and the other way round.
2. Run `player_management_refresh` in the server console.
   - `PlayerManagement: syncing N player(s)`: the plugin is configured. If the
     panel still does not see it, it cannot reach the API; see below.
   - `PlayerManagement: not configured; …`: the config file is missing one of
     `API_DOMAIN`, `SERVER_ID` or `SERVER_API_PASSWORD`. Copy it again from
     **Settings → Player Management** on the server's page.
   - Unknown command: the plugin is not loaded.
3. Run `player_management_status` for the plugin's last sync time and error.

## The API cannot be reached

The plugin calls `<API_DOMAIN>/sanctions/server/<server id>`. Panels installed
before the plugin shipped do not route that path to the API. Run `./update.sh` on
the panel.
