# Dedicated Servers

You can setup dedicated servers in three different ways:

1. Using a game server node via the panel. [Learn more about dedicated servers on game server nodes](../game-server-nodes/dedicated-servers)
2. Using the plugin which will require manual upload of the plugin and configuration of the game server. [Learn more about using the plugin](./plugin-configuration.md)
3. Using the container which will require a Docker installation and a Docker Compose file. [Learn more about using game server container](#using-the-container)

The last two are **external servers**: in the panel's dedicated server form,
pick **External Server** under **Where It Runs** and enter the server's host,
**Game Port** and **TV Port**. Once it exists, the server's page shows the
config to copy onto the machine.

## Which plugin does it need?

That depends on what the server plays:

| Server | Plugin to install |
| --- | --- |
| **Ranked Server** | The 5Stack match plugin, below. See [Game Plugin Configuration](./plugin-configuration) |
| **Valve Modes** (a [community server](./community-servers)) | The [Player Management plugin](./player-management), which enforces bans, mutes, gags and access lists and reports players for the server's stats |

**Custom Presets** (game modes) need a game server node, because 5Stack installs
the mode's plugins onto the server. The same goes for
[map rotation](./map-rotation) and per-server plugins. An external community
server still gets [access lists](./access), player management and stats.

## The match plugin

The 5Stack Game Server Plugin ships for two CS2 frameworks. Pick one, then download its
latest release and follow that framework's install guide:

- **SwiftlyS2** (default): [Releases](https://github.com/5stackgg/game-server/releases) (`sw-v*`) · [SwiftlyS2 docs](https://github.com/swiftly-solution/swiftlys2)
- **CounterStrikeSharp**: [Releases](https://github.com/5stackgg/game-server/releases) (`css-v*`) · [CounterStrikeSharp docs](https://docs.cssharp.dev/docs/guides/getting-started.html)

Both build out of one repository, so that releases list carries both: tags are
prefixed `sw-` for SwiftlyS2 and `css-` for CounterStrikeSharp.

See [Game Plugin Runtimes](/servers/game-server-nodes/plugin-runtimes) for how the two differ.

::: warning
The server must be started with `-usercon`, and `-ip 0.0.0.0` to allow remote rcon, and
with `-allow_round_backup_files` so rounds can be restored. See [Round backups](#round-backups).
:::

## Using the Container

Here's an example Docker Compose file for running a Counter-Strike dedicated server.
Both runtime images take the same environment variables and scripts, so swap
`game-server-sw` for `game-server-css` if you want CounterStrikeSharp instead:

```
version: '3.8'

services:
  update-server:
    image: ghcr.io/5stackgg/game-server-sw:latest
    container_name: update-server
    command: ["/opt/scripts/update.sh"]
    volumes:
      - /opt/5stack/steamcmd:/serverdata/steamcmd
      - /opt/5stack/serverfiles:/serverdata/serverfiles
    restart: no
  dev-cs-server:
    image: ghcr.io/5stackgg/game-server-sw:latest
    container_name: dev-cs-server
    environment:
      - DEV_SERVER=true
      - SERVER_PORT=27015
      - TV_PORT=27020
      - EXTRA_GAME_PARAMS=-maxplayers 13
      - ALLOW_BOTS=true
      - WS_DOMAIN=wss://ws.5stack.gg
      - API_DOMAIN=https://api.5stack.gg
      - DEMOS_DOMAIN=https://demos.5stack.gg
      - SERVER_ID=<your-server-id>
      - SERVER_API_PASSWORD=<your-server-api-password>
    ports:
      - "27015:27015/tcp"
      - "27015:27015/udp"
      - "27020:27020/tcp"
      - "27020:27020/udp"
    volumes:
      - /opt/5stack/steamcmd:/serverdata/steamcmd
      - /opt/5stack/serverfiles:/serverdata/serverfiles
      - /opt/5stack/demos:/opt/demos
    deploy:
      resources:
        limits:
          memory: 10Gi
```

After a Counter-Strike update. You will need to run `docker-compose run --rm update-server` to download and install the latest version of the game.

### A community server from the container

The container defaults to a Ranked server with the match plugin. For a
[community server](./community-servers), swap the match plugin for the Player
Management plugin, which is in the same image and reads the same `API_DOMAIN`,
`SERVER_ID` and `SERVER_API_PASSWORD` variables:

```
    environment:
      - SERVER_TYPE=Casual
      - INSTALL_5STACK_PLUGIN=false
      - INSTALL_PLAYER_MANAGEMENT_PLUGIN=true
```

## Round backups

CS2 saves a backup file for every round, and the match plugin restores a match to an
earlier round from them, after a crash or from the match page. Since the
[CS2 update of 14 October 2026](https://www.counter-strike.net/news/updates), the game only
writes and loads them when the server is started with `-allow_round_backup_files`. Without
it matches still play, but there is nothing to restore.

Only **Ranked** and **Competitive** servers need it. Other modes don't restore rounds and
start without it.

| Server | What to do |
| --- | --- |
| Match servers the panel starts | Nothing, the game server image passes the flag |
| Ranked and Competitive dedicated servers on a [game server node](../game-server-nodes/dedicated-servers) | Restart the server once so it starts on the updated image |
| The container | Pull the latest image (`docker-compose pull`) and recreate the container. It passes the flag when `SERVER_TYPE` is `Ranked` (the default) or `Competitive` |
| A Ranked or Competitive server you run yourself with a plugin | Add `-allow_round_backup_files` to its launch options |

## Hibernation

CS2 can put an empty server to sleep with `sv_hibernate_when_empty 1`, which stops it
ticking until somebody connects. A 5Stack server used to need that turned off, because a
sleeping server stopped reporting to the panel and showed as offline. From plugin versions
`sw-v0.0.96` and `css-v0.0.441` it no longer does:

- a hibernating server keeps reporting to the panel and still answers RCON
- when it is given a match it wakes itself, changes map and sets the password before
  anyone connects
- it stays awake for as long as it has a match, and may hibernate again once the match is
  gone

From `sw-v0.0.97` and `css-v0.0.442` the match plugin also tells the panel when the server
is asleep, and the server's page shows **Hibernating** instead of a warning. The
[Player Management plugin](./player-management) a community server runs keeps syncing while
the server sleeps, but does not report hibernation, so a community server never shows as
**Hibernating**.

Which servers may hibernate:

| Server | Hibernates? |
| --- | --- |
| On-demand match servers | Never |
| Practice servers | Never: they are always started with hibernation off |
| Ranked servers | Off, unless the container is started with `HIBERNATE_WHEN_EMPTY=true`. The panel never sets it on servers it runs on a node |
| Community servers | Whatever their own `cfg/server.cfg` says. 5Stack seeds that file on first boot with `sv_hibernate_when_empty 1`; on a node, edit it from the server's **Files** |

So a container left on its default `SERVER_TYPE=Ranked` starts with hibernation off. Turn
it on with one more environment variable:

```
    environment:
      - HIBERNATE_WHEN_EMPTY=true
```

A server you run yourself with the plugin follows whatever its own `server.cfg` sets.

::: warning
Older plugin versions go quiet while the server hibernates. Update the plugin, or keep
`sv_hibernate_when_empty 0`.
:::

::: tip
This has been run on SwiftlyS2. The CounterStrikeSharp plugin carries the same changes but
has seen less testing.
:::
