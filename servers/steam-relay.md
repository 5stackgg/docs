# Steam Datagram Relay (SDR)

The Steam Datagram Relay (SDR) is Valve's virtual private gaming network for Counter-Strike servers. When enabled in 5Stack, your game server traffic is routed through Valve's dedicated gaming backbone, providing access to their global network of relays for optimal connectivity.

## Game Server Nodes

Game server nodes are automatic, and no configuration is needed: turn on **Use
Steam Relay** on a region, and servers in it start on the relay. For more
information about game server nodes. See [Game Server Nodes](/servers/game-server-nodes/).

## The connect address

A server on the relay is reached by its Steam ID, for example
`[A:1:3653557264:51859]`, not by an IP and port. Each 5Stack plugin (the match
plugin, the practice plugin and the
[Player Management plugin](/servers/dedicated-servers/player-management))
reports whether its server is on the relay and, once Steam has given it one,
that address.

- In a region that is not LAN, players are given the relay address as the
  connect command, and the server's page shows it.
- Until Steam has given the server an address, nothing changes, and a server
  running the match or practice plugin is not counted as up: the only address
  left to hand out would reach nobody.
- A server that reports it is off the relay goes back to its host and port.

The region's **Use Steam Relay** switch only decides how a server on a node is
started. The address players get is always the one the server itself reported,
so an external server you put on the relay yourself is handled the same way.

## Dedicated Servers Setup

To configure Steam Datagram Relay, edit `game/csgo/gameinfo_branchspecific.gi` and add two settings to it:

- `"net_p2p_listen_dedicated" "1"` inside the existing `ConVars` block
- a new `NetworkSystem` block with `"CreateListenSocketP2P" "2"`

::: warning Do not replace the file
Keep everything Valve ships in this file. It sets the server's `SteamAppId` to `730`, and replacing it with an empty file breaks the server.
:::

The file should end up looking like this:

```
"GameInfo"
{
	FileSystem
	{
		ForceFixedAppIds	1
		SteamAppId			730
		BreakpadAppId			2347771
		BreakpadAppId_Tools		2347779
	}

	Panorama
	{
		"PreprocessResources"	  "1"
	}

	ConVars
	{
		"net_p2p_listen_dedicated" "1"
		"cl_usesocketsforloopback" "0"
	}

	NetworkSystem
	{
		"CreateListenSocketP2P" "2"
	}
}
```

A CS2 update can overwrite this file. If relay stops working after an update, add the two settings again.

To check that relay is on, run `net_p2p_listen_dedicated` in the server console. It should print `1`.
