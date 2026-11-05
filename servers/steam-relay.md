# Steam Datagram Relay (SDR)

Steam Datagram Relay (SDR) routes your game server traffic through Valve's network of relays.

## Game Server Nodes

Game server nodes need no configuration: turn on **Use Steam Relay** on a
region, and servers in it start on the relay. See
[Game Server Nodes](/servers/game-server-nodes/).

## The connect address

A server on the relay is reached by its Steam ID, for example
`[A:1:3653557264:51859]`, not by an IP and port.

- In a region that is not LAN, players are given the relay address as the
  connect command, and the server's page shows it.
- A server running the match or practice plugin is not counted as up until
  Steam has given it a relay address.
- A server that goes off the relay is reached by its host and port again.

An external server you put on the relay yourself is handled the same way.

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
