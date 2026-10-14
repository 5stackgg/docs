# Community Servers

A **community server** is a CS2 dedicated server that is not there to host
matches: anything other than a **Ranked Server** or a **Practice Server**. Valve
presets (Casual, Deathmatch, Retake, Arms Race and the rest) and custom game
modes are all community servers. They stay up between players, show on the
**Public Servers** page, and players join them directly.

Ranked and Practice servers run 5Stack's own plugin set for their matches and
sessions. A community server runs no match, so the things on this page exist
for it instead: a map rotation, its own plugin choices, an access list, and the
[Player Management plugin](./player-management) to enforce bans, mutes and
gags.

::: info CS2 only
Map rotation, per-server plugins, access lists, player management and the
community stats all need CS2. A CS:GO server can still be created with a Valve
preset, but none of this applies to it.
:::

## The server page

Every dedicated server has one page, at `/dedicated-servers/<id>`. Old
`/public-servers/<id>` links land there too. What it shows depends on who is
looking:

- Anyone below **Moderator**, signed in or not, gets the public view: the
  server's address and a **Join** button, its stats and its leaderboard.
- **Moderators** and above get the management view, with tabs.

The header carries the server's status, region, type and address. The status
reads **Connected**, **No RCON** or **Disconnected**. A Ranked server whose plugin
is behind reads **Version Mismatch**, and one that is
[hibernating](/servers/dedicated-servers/#hibernation) reads **Hibernating**. Match
organizers and above get the **Enabled** switch, and administrators get a
**Files** button on a server that runs on a game server node.

| Tab          | Who sees it                                  | What it holds                                                                         |
| ------------ | -------------------------------------------- | ------------------------------------------------------------------------------------- |
| **Overview** | Community servers only                       | The same stats and leaderboard the public sees. A community server opens on this tab. |
| **Players**  | Moderator and above                          | The live roster with kick and sanction actions, then **Recent Players**               |
| **Console**  | Moderator and above                          | An RCON console, the same one the match admin bar uses                                |
| **Logs**     | Match organizer and above, node servers only | The server's live console output                                                      |
| **Settings** | Administrator                                | Everything below                                                                      |

### Players

The roster lists everyone on the server, with a kick button, a sanction button
and a menu with **Sanction History**, their 5Stack profile if they have one,
and their Steam ID. When the
Player Management plugin is reporting, the roster is marked **Live**, shows each
player's IP, and joins and leaves show up within seconds. Without it, the roster
is read over RCON every 30 seconds and no history is recorded. An amber warning
icon beside the refresh button says why when the plugin is not reporting.

**Recent Players** below it lists everyone who played in the last **24H** or
**7D**, searchable by name, Steam ID or IP. An IP shared with another player is
highlighted, and its tooltip names the other accounts seen on it now or in the
last 7 days.

Sanctions from this tab go through the same flow as everywhere else. See
[Player Management](./player-management) for what is enforced live.

## Settings

The **Settings** tab is administrator-only. Its sections are grouped down the
left side (a dropdown on a phone):

| Group            | Section               | What it does                                                                                             |
| ---------------- | --------------------- | -------------------------------------------------------------------------------------------------------- |
| Server           | **General**           | The server form: where it runs, what it plays, its name, RCON password, connect password and max players |
| Community Server | **Map Rotation**      | The maps it cycles through. [Map Rotation](./map-rotation)                                               |
| Community Server | **Plugins**           | Switch game plugins on or off for this server only, and configure them. [Below](#plugins)                |
| Community Server | **Access**            | Restrict who can join. [Restricted Servers](./access)                                                    |
| Community Server | **Player Management** | Plugin status, and install steps on an external server. [Player Management](./player-management)         |
|                  | **Delete Server**     | Removes it from 5Stack. A server on a game server node is shut down too                                  |

**Map Rotation** and **Plugins** only appear for a server on a
[game server node](/servers/game-server-nodes/dedicated-servers): both reach the
server through the container 5Stack builds for it. An external server gets
**Access** and **Player Management**.

### Saving

**General** has its own save bar. The community sections share one: edit any of
them, switch between them freely, and one save sends everything.

- Rotation and plugin changes rebuild the server, so the button reads
  **Save & Restart** and the server restarts once.
- Access changes apply within seconds, with no restart. The button reads
  **Save**.

A server that is switched off saves the change and picks it up when it is
enabled again.

### Plugins

**Plugins** lists every installed [game plugin](/servers/game-server-nodes/game-plugins)
with a three-way switch:

| Setting     | Effect                                                                                                                                                                                                              |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Default** | Follows the plugin's own [load switches](/servers/game-server-nodes/game-plugins#load-without-a-game-mode). On a community server a plugin loads by default when **Tournament Matches** or **Custom Matches** is on |
| **On**      | Loads on this server whatever the plugin page says                                                                                                                                                                  |
| **Off**     | Never loads on this server                                                                                                                                                                                          |

Each row says whether the plugin **Loads** or is **Not Loaded**, and why: by
default, because it was switched on or off here, because the server's game mode
selects it, or to play the [map rotation](./map-rotation). A game mode's own plugins cannot be
switched off here: picking the mode is the choice.

**Configure for This Server** opens a panel with the same settings, config file
and console variable editors as the plugin's page. What you set there is
layered over the plugin page's settings for this server only, and saved with
the rest of the server's settings. **Remove Server Override** goes back to the
plugin page's.

## Game modes on a community server

A community server can run a [Game Mode](/features/admin/game-modes) by picking
it under **Custom Presets** in **General**. Custom presets need a game server
node, because 5Stack installs the mode's plugins onto the server.

The server starts on the mode's **Valve Game Mode**, and the cvars a match would
exec are written into the Valve mode's server config instead, which CS2 execs
on every map load. In order, last wins:

1. each loading plugin's console variables, from its plugin page,
2. the game mode's console variables,
3. this server's own plugin console variables, from **Configure for This
   Server**.

The [Global](/features/admin/game-modes#global-configuration) config is not
applied to community servers.

## Public Servers page

**Public Servers**, in the main navigation, lists every enabled, connected
community server. Ranked and Practice servers are never listed for players, and
a [restricted server](./access) is only listed for players it lets in.

- **Featured**: the top two online servers get a large showcase. Servers an
  administrator pinned with **Feature on this page** come first; the busiest
  servers fill the remaining slots. A lone server gets the whole showcase.
- **Up to 10 online servers** show as tiles below the showcase. Above that they
  collapse into a list with a mode filter and **Most players** / **Best ping**
  sorting.
- **LAN servers** get their own section. A player on the LAN sees them first,
  under **On this LAN**.

Each server shows its map, game mode and player count, and signed-in players
see their ping to its region. Moderators get a **Manage** link to the server page.

## Stats and leaderboards

When the [Player Management plugin](./player-management) is reporting, a
community server records who played, when, and for how long. Anyone can see:

- the **Overview**: **Online Now**, **Players This Week**, **Hours This Week**,
  **All-Time Players**, and a seven-day activity chart of the total hours
  played each day. Nobody's individual play times are shown.
- the **Leaderboard**: **This Week** or **All Time**, by **Time** or **Kills**.
  It lists players with a 5Stack account; players without one still count
  toward the totals.

Player profiles get a **Community** tab with the player's time and kills on
community servers. The public sees only when they were last seen. Moderators
also see exact sessions, the names they used, their IPs, and other accounts
seen on those IPs.

### Session history

Exact sessions and IPs are kept for 7 days by default. Change it under
**Settings → Application → Servers → Community Player Sessions → Keep Session
History (days)**, between 7 and 90 days. Older sessions are folded into the
all-time totals, so the leaderboards keep counting them.
