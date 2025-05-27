# Steam Datagram Relay (SDR)

The Steam Datagram Relay (SDR) is Valve's virtual private gaming network for CS2 servers. When enabled in 5Stack, your game server traffic is routed through Valve's dedicated gaming backbone, providing access to their global network of relays for optimal connectivity.

## Game Server Nodes

Game server nodes are automatic, and no configuration is needed. For more information about game server nodes, see [Game Server Nodes](/servers/game-server-nodes/).

## Dedicated Servers Setup

To configure Steam Datagram Relay, modify the `game/csgo/gameinfo_branchspecific.gi` file and

```
echo '"GameInfo"
{
    // this file is intentionally empty for generating depot signatures
    FileSystem
    {
      EmptyFileSystemValue 1
    }

    ConVars
    {
      "net_p2p_listen_dedicated" "1"
    }

    NetworkSystem
    {
      "CreateListenSocketP2P" "2"
    }
}
```
