# Dedicated Servers

You can host your own dedicated servers on 5Stack using one of two methods:

1. Utilize the 5Stack Game Server Container
2. Set up your own Dedicated Server and manually install the required plugins


## Using the Container

Here's an example Docker Compose file for running a Counter-Strike dedicated server:

```
version: '3.8'

services:
  update-server:
    image: ghcr.io/5stackgg/game-server:latest
    container_name: update-server
    command: ["/opt/scripts/update.sh"]
    volumes:
      - /opt/5stack/steamcmd:/serverdata/steamcmd
      - /opt/5stack/serverfiles:/serverdata/serverfiles
    restart: no
  dev-cs-server:
    image: ghcr.io/5stackgg/game-server:latest
    container_name: dev-cs-server
    environment:
      - DEV_SERVER=true
      - SERVER_PORT=27015
      - TV_PORT=27020
      - EXTRA_GAME_PARAMS=-maxplayers 13
      - ALLOW_BOTS=true
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

After a Counter-Strike update, you will need to run `docker-compose run --rm update-server` to download and install the latest version of the game.


## Using the Plugin

Download the latest release of the 5Stack Game Server Plugin from the [Releases Page](https://github.com/5stackgg/game-server/releases).

Next, follow the instructions for setting up [CounterStrikeSharp](https://docs.cssharp.dev/docs/guides/getting-started.html) to install the plugin on your dedicated server.