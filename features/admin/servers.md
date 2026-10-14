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
- **Dedicated Servers**: servers that stay up, either run by 5Stack on one of
  your nodes or external servers you connect with host/port and RCON
  credentials. Each is a **Ranked Server**, a **Practice Server**, a Valve preset
  (**Valve Modes**) or one of your game modes (**Custom Presets**). See
  [Dedicated Servers on Game Server Nodes](/servers/game-server-nodes/dedicated-servers)
  and [Third-Party Dedicated Servers](/servers/dedicated-servers/).
- **Public Servers**: the page players use to find your community servers. See
  [below](#public-servers).

When a match is created. It can use a dedicated server or provision an on-demand
server in a chosen region automatically.

## Community servers

Every dedicated server that is not Ranked or Practice is a
[community server](/servers/dedicated-servers/community-servers): it stays up
for open play instead of hosting matches. Each one gets:

- **One page for everyone.** Players see its address, a join button, its stats
  and its leaderboard. Staff get tabs for **Overview**, **Players** and
  **Console** (moderators and above), **Logs** (match organizers and above) and
  **Settings** (administrators).
- **A live roster** with kick and sanction actions, IPs, and the players seen in
  the last 24 hours or 7 days.
- **[Player Management](/servers/dedicated-servers/player-management)**: bans,
  mutes and gags enforced live in game by a 5Stack plugin. Built into servers on
  a node; one zip and one config file on an external server.
- **[Access lists](/servers/dedicated-servers/access)**: restrict a server to
  hand-picked players, a minimum role, or the members of an event while it is
  live. Everyone else does not see the server, and the plugin keeps them out if
  they connect anyway.
- **[Map rotation](/servers/dedicated-servers/map-rotation)**: an ordered or
  shuffled list of maps, with Steam Workshop collection import.
- **Per-server plugins**: switch any installed game plugin on or off for one
  server, and give it its own settings.
- **Stats and leaderboards**: players online, weekly players and hours, a
  seven-day activity chart, and a leaderboard by time or kills. Player profiles
  get a **Community** tab.

All of the settings are administrator-only, on the server's **Settings** tab.

## Public Servers

**Public Servers** lists every enabled, connected community server, with its
map, game mode, player count and the viewer's ping to its region.

- The two top servers are featured in a large showcase. Administrators can pin
  a server there with **Feature on this page**; otherwise the busiest servers
  are featured.
- Up to 10 servers show as tiles. Past that they become a list with a mode
  filter and **Most players** / **Best ping** sorting.
- LAN servers get their own section, shown first (**On this LAN**) to players on
  the LAN.
- A restricted server is only listed for players it lets in.

Moderators get a **Manage** link on each server.

## Moving dedicated servers between nodes

A dedicated server on a node can be moved to another node with its files: the
server stops, its directory is streamed from the old node straight to the new
one, and it starts again there. Progress shows on the server's page, the move
can be canceled until it switches over, and a failed move restores the server
where it was. A server on a dead node can be moved without its files. See
[Moving a server to another node](/servers/game-server-nodes/dedicated-servers#moving-a-server-to-another-node).

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
- A failed update is marked with a red **Update Failed** icon that opens its
  logs, and administrators are notified.

Both are set from the **CS2 Build** and **Plugin Version** columns on the Game
Server Nodes page.

See [Version Pinning](/servers/game-server-nodes/version-pinning) for details.

The 3D replay's map meshes and the radar callouts are published by 5Stack for
each CS2 build. When a node reports a new build, the panel picks up that build's
callouts on its own once they are published.

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
converges to it on its own. Each plugin's page has a settings form, a config
file editor and a list of the cvars it overrides; plugins that need Steam
Workshop addons get them served automatically on SwiftlyS2. See
[Game Plugins](/servers/game-server-nodes/game-plugins), and
[Game Modes](/features/admin/game-modes) for choosing which ones a given match
or community server actually loads.

## Node operations

- **Accepting Matches**, in a node's controls: turned off, the node keeps running
  the matches it has but takes no new ones. The setting is kept while the node
  is offline, and applies when it reconnects.
- **Remove Node** deletes the node and every server on it, dedicated servers
  included. Shut the host down first: a host that is still running registers
  itself again on its next ping. Once it has been unreachable for 10 minutes,
  the panel also removes it from Kubernetes, along with its leftover jobs and
  volumes. Files on its disk are left alone.
- Each node prunes unused container images once a day, so old builds do not
  fill the disk: untagged images, and older versions of other images once a
  newer one is running. Tagged 5Stack images are never touched.

::: warning Remove Node asks no questions
It deletes immediately, with no confirmation, and takes the node's dedicated
servers with it. Move them to another node first.
:::

## Status notifications

Administrators are notified, in the panel and on the Discord support webhook,
when:

| Notification                           | When                                                                                                                    |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **Game Server Node Offline**           | A node has not checked in for 90 seconds, and was enabled for matches, GPU work or an enabled dedicated server          |
| **Game Server Node Online**            | It comes back, with how long it was down. Only after an Offline alert                                                   |
| **Region Offline** / **Region Online** | Every node in a region is down, and when one comes back                                                                 |
| **Dedicated Server Offline**           | A dedicated server running the match or practice plugin stops checking in                                               |
| **Dedicated Server RCON Error**        | A non-Ranked server's RCON stays unreachable for 2 minutes. A Ranked server's is reported as soon as a connection fails |

Disabled servers are never reported, and a server that is restarting or being
rebuilt gets 5 minutes before it counts as down.

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

A dedicated server on a node follows its node's region and address when they
change.

## Map pools

Curate the maps matches can use, auto-update pools to the official list, or
create and edit custom pools per format. See
[Matchmaking & Ranks](/features/admin/matchmaking#map-pools).
