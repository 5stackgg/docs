# Dedicated Servers on Game Server Nodes

A dedicated server is a CS2 (or CS:GO) server that stays up, as opposed to the
on-demand servers a node starts for each match. You can run one on one of your
game server nodes, and 5Stack builds, updates and restarts it for you. Create
one under **Dedicated Servers** in the admin navigation (administrators only).

## Creating one

The form has three parts.

### Where It Runs

Pick a **Region** first, then **Game Server Node** (or **External Server** for a
machine you run yourself; see [Third-Party Dedicated Servers](/servers/dedicated-servers/)).
On a node, the server's address, ports and region come from the node. The node
list shows each node's ports and capacity, and greys out the ones that cannot
take a server, with the reason: disabled, offline, updating CS2, the game not
installed, or no free server slots.

### What It Plays

Choose **CS2** or **CS:GO**, then one of:

| Choice              | What it is                                                                                         |
| ------------------- | -------------------------------------------------------------------------------------------------- |
| **Ranked Server**   | A fully managed server matchmaking and matches can use. Runs the 5Stack match plugin               |
| **Practice Server** | Hosts utility practice sessions. Runs the practice plugin and is never used for matchmaking        |
| **Valve Modes**     | A Valve preset: `Competitive`, `Casual`, `Wingman`, `Deathmatch`, `ArmsRace`, `Retake` or `Custom` |
| **Custom Presets**  | One of your [Game Modes](/features/admin/game-modes), with the plugins 5Stack installs for it      |

Everything except Ranked and Practice is a
[community server](/servers/dedicated-servers/community-servers). Custom
presets need a node, because the mode's plugins are installed onto the server.
CS:GO servers run Valve presets only.

A server starts on the Valve game mode its choice maps to, so a Deathmatch
preset boots CS2's own deathmatch rules. The `Custom` preset boots CS2's Custom
game type, where a workshop map's own scripts run the game. A custom mode boots
on the mode's **Valve Game Mode**.

### Name and Access

**Server Label**, **RCON Password** (**Generate** makes one), and on anything
but a Ranked server a **Connect Password** and **Max Players**. A Ranked server
has neither: 5Stack sets both for each match.

## Running it

Every dedicated server on a node runs with:

- the node's CS2 install and the plugin runtime the node runs (a Practice
  Server always runs SwiftlyS2),
- its own directory, `/opt/5stack/servers/<server id>`, which behaves like
  [Custom Game Plugins](./custom-plugins) for that server alone. Open it with
  the **Files** button on the server's page.
- the plugins installed on the node, gated by game mode the same way as match
  servers,
- the [Player Management plugin](/servers/dedicated-servers/player-management)
  on a CS2 community server, with no setup.

Plugin config files the panel writes for a server (a game plugin's config file,
a map rotation) are written into that server's own directory, so they show up in
**Files** and survive restarts.

A dedicated server follows its node: when the node's address or region changes,
the server's does too. Disabling a node, or switching it to GPU only, does not
stop the dedicated servers on it. Use the server's **Enabled** switch for that.

## Moving a server to another node

A server's files live on its node, so the node cannot simply be changed. Instead,
administrators can move the server: open **Settings → General** on its page and
press **Move Server**.

The dialog lists the other nodes with their free server slots and free disk,
and says why any of them cannot take the server. It also warns when the move
changes something players notice: the server gets a new address, may be listed
in another region, and, if the new node runs the other plugin runtime, plugins
built for the old one will not load.

A move then runs through these steps, shown on the server's page:

| Status            | What happens                                                                           |
| ----------------- | -------------------------------------------------------------------------------------- |
| **Queued**        | Waiting to start                                                                       |
| **Stopping**      | The server is stopped on its current node                                              |
| **Copying Files** | Its directory is copied straight from the old node to the new one, with a progress bar |
| **Switching**     | The server is pointed at the new node and started there                                |
| **Completed**     | Done. The old node's copy is removed                                                   |

A move is refused while the server is hosting a match, or still uploading the
last match's demo. The new node needs free disk for the server's files plus
some headroom.

**Cancel Move** is available until the move reaches **Switching**. A move that
fails or is canceled restores the server on its original node.

::: tip Moving off a dead node
If the old node is offline, its files cannot be copied. The dialog offers **Move
without the server's files**: the server starts on the new node with default
settings, and whatever was on the old node stays there.
:::

## Deleting

**Settings → Delete Server** removes the server from 5Stack and shuts it down.
