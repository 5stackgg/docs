# Servers & Regions

5Stack can host matches several ways and keeps your servers up to date for you,
all managed from the panel. For first-time setup of a node. See the
[Servers](/servers/) section; this page covers what admins do with servers
day to day.

## Server types

- **Game Server Nodes**: machines 5Stack manages directly to spin up **on-demand**
  game servers. The node list shows hardware (CPU sockets/cores/threads, GPU,
  disk), status, region, and the CS2 build each node is on. See
  [Game Server Nodes](/servers/game-server-nodes/).
- **Dedicated Servers**: external or third-party servers you connect to 5Stack
  with host/port and RCON credentials. See
  [Dedicated Servers](/servers/dedicated-servers/).
- **Public Servers**: a public server browser that lists your connected servers
  grouped by game and type, with live player counts, capacity bars, and a
  quick-connect button. LAN servers get their own section.

When a match is created. It can use a dedicated server or provision an on-demand
server in a chosen region automatically.

## Automatic CS2 updates & version pinning

By default, nodes **auto-update to the latest CS2 build** and the latest 5Stack
game-server plugin, there's nothing to babysit. When you need stability instead:

- **Pin a CS2 build** on a node to freeze it on a specific version; **unpin** to
  go back to always-latest.
- **Pin the plugin version** separately, so an older build keeps a plugin that
  supports it.
- A warning flags any node whose build differs from its target version, with an
  update button to bring it in line; an **Install CS2** action appears if CS2
  isn't on the node yet.

Both are set from the **CS2 Build** and **Plugin Version** columns on the Game
Server Nodes page.

See [Version Pinning](/servers/game-server-nodes/version-pinning) for details.

## Match server controls

From a match's server tab, organizers and admins get hands-on control of the
match server:

- **RCON console**: send commands to the live server from the browser.
- **Live server logs**: watch the match server's console output.
- **Round restore**: roll back to a backed-up round.
- **Reboot** the server.

## File browser & plugins

Both game server nodes and dedicated servers have an **in-browser file manager**,
browse the file tree and **edit, rename, delete, or upload** files (server
configs, plugin files, and more) right from the panel, no SFTP needed.

Game server nodes also support **custom plugins** dropped into a special folder, for
both the SwiftlyS2 and CounterStrikeSharp runtimes. See
[Game Plugin Runtimes](/servers/game-server-nodes/plugin-runtimes) and
[Custom Game Plugins](/servers/game-server-nodes/custom-plugins).

For plugins from the directory, you say what should be installed and every node
converges to it on its own. See
[Game Plugins](/servers/game-server-nodes/game-plugins), and
[Game Modes](/features/admin/game-modes) for choosing which ones a given match
or community server actually loads.

## Server tuning

- **CPU pinning**: enable it and set CPUs per server ([CPU Pinning](/servers/cpu-pinning)).
- **Reserved disk space**: separate reservations (GB) for fresh and existing
  instances.

See also [CPU Governance](/servers/cpu-governance) and
[Low Latency Kernel](/servers/low-latency-kernel).

## Regions

Manage where servers run:

- Create, edit, and delete regions.
- Per region: **Use Steam Relay** (hide your real server IP, see
  [Steam Datagram Relay](/servers/steam-relay)) and **LAN** mode.
- See available vs. total servers per region at a glance.

## Map pools

Curate the maps matches can use, auto-update pools to the official list, or
create and edit custom pools per format. See
[Matchmaking & Ranks](/features/admin/matchmaking#map-pools).
