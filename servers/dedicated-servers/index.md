# Dedicated Servers

You can setup dedicated servers in three different ways:

1. Using a game server node via the panel. [Learn more game server nodes](../game-server-nodes/)
2. Using the plugin which will require manual upload of the plugin and configuration of the game server. [Learn more about using the plugin](./plugin-configuration.md)
3. Using the container which will require a Docker installation and a Docker Compose file. [Learn more about using game server container](#using-the-container)

The 5Stack Game Server Plugin ships for two CS2 frameworks. Pick one, then download its
latest release and follow that framework's install guide:

- **SwiftlyS2** (default): [Releases](https://github.com/5stackgg/game-server/releases) (`sw-v*`) · [SwiftlyS2 docs](https://github.com/swiftly-solution/swiftlys2)
- **CounterStrikeSharp**: [Releases](https://github.com/5stackgg/game-server/releases) (`css-v*`) · [CounterStrikeSharp docs](https://docs.cssharp.dev/docs/guides/getting-started.html)

Both build out of one repository, so that releases list carries both: tags are
prefixed `sw-` for SwiftlyS2 and `css-` for CounterStrikeSharp.

See [Game Plugin Runtimes](/servers/game-server-nodes/plugin-runtimes) for how the two differ.

::: warning
The server must be started with `-usercon`, and `-ip 0.0.0.0` to allow remote rcon
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

The container still starts with hibernation off. Turn it on with one more environment
variable:

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
