# Practice Servers

A practice server is your own CS2 server on any map, with infinite utility,
for walking in the lineups from the [Utility Library](/features/utility-library).
Everything in game is driven from a radial menu, a HUD and a handful of keys,
so nothing has to be typed. Every throw you make with a lineup loaded is scored
against it, and five landed in a row masters it.

Practice servers always run the SwiftlyS2 practice plugin, whatever plugin
runtime the node uses for matches. See [The practice plugin](#the-practice-plugin).

## Starting a server

Start one from the **practice bar** at the foot of a map's card on the
Utility page, or from **Practice server** under **More ways to play** on the
Play page (pick a **Map**, then **Start practice**).

- **Region**: **Any region** (under **Recommended**) takes a free practice
  server if one is standing, and otherwise starts a fresh one in your closest
  region. **Practice Servers** lists standing practice servers by name, with
  how many are free. Picking a region under **On Demand** always starts a
  fresh server there, with your latency to each region beside it.
- **Load an execute**: optionally loads one of the map's executes into the
  session as it starts.
- **Session Access**: who can join.

| Access      | Who can join                                          |
| ----------- | ----------------------------------------------------- |
| **Open**    | Anyone with the invite link                           |
| **Friends** | Your friends and the players you invite (the default) |
| **Invite**  | Only the players you invite                           |
| **Private** | Nobody else                                           |

**Start Server** books it. While it boots the bar reads **Starting**; once it is
up, **Join Server** connects you, and the connect string can be copied beside
it. If the server stops, is reaped, or fails to boot, the panel drops back to
**Start Server** and says why.

On a phone the Utility page is browse-only: the practice bar and every action
that sends something to a server are hidden there.

### While it is running

The bar stays at the foot of the card on every tab, and the top bar shows the
session wherever you are in the panel. Press the bar to pull up the session:

- **Session Access** can be changed by the host without restarting.
- **Invite players** puts players on the server's roster by name; they get a
  notification and can connect straight away. An invite link is offered for
  **Open** and **Friends** only, because **Invite** and **Private** decide on a
  list a link has no say in.
- **Server console** gives moderators and administrators RCON on the server.
- **Stop Server** (the host) or **Leave Session** (everyone else).

A running practice server does not count as being in a match: you can still
join a lobby, a draft or the matchmaking queue, and your friends list does not
show you as **In match**.

## Sending lineups from the website

Once you are on a practice server, the bar acts on whatever is open above it:

| Open in the card | Bar action         | What it does                                                                                 |
| ---------------- | ------------------ | -------------------------------------------------------------------------------------------- |
| A lineup         | **Load me in**     | Stands you on the throw — same spot, same stance, same aim — with a ghost showing the flight |
| A lineup         | **Repeat in game** | Drills it, three throws at a time                                                            |
| A collection     | **Practice**       | Drills the collection's lineups on this map, three throws each                               |
| An execute       | **Practice**       | Loads the execute into the session                                                           |
| The plan         | **Practice next**  | Loads the next lineup in your plan                                                           |
| A Discover throw | **Test in game**   | Stands you on a throw Discover found, before you save it                                     |

Nothing is saved by loading a throw. **Load in game** and **Repeat in game**
are also on a lineup's right-click menu in the list.

### Changing map

The map lives with the session, not the page. Open a lineup for another map and
the button reads **Switch map & load me in**: the server changes level and you
land on the throw once it loads. On a map the server is not on, the bar says
**Your practice server is on {map}.** and offers the host **Switch to {map}**.
Only the host (or an administrator) may change the map; everyone else is told
to ask the host. Everyone on the server gets a five-second warning before the
level changes.

The map can also be changed from inside the game: **Practice → Change Map**.

### Saving from the website

**Save From Practice**, in the open session, keeps the throw you have been
making as a lineup of your own, against the lineup you are drilling. **Save
Throw** on the in-game menu does the same with the throw in front of you.

## In game

On a server with the [HUD addon](#the-hud-addon), the welcome message says it
all: **TAB** opens the menu, **E** snaps onto the nearest lineup, **R**
rethrows, **DEL** clears smoke and fire.

### Keys

The plugin reacts to what a key is bound to, not the key itself, and the
on-screen legend draws whatever key you actually have bound.

| Key (default bind)           | Does                                                                                                                                            |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **TAB** (scoreboard), tap    | Opens the menu. Held, it is the scoreboard. With a panel open, it closes it                                                                     |
| **E** (use)                  | Snaps you onto the spot you are looking at, or the nearest one, and hands you its grenade. On a spot with several throws, steps to the next one |
| **R** (reload), tap          | Rethrows the loaded lineup, or your last throw, without moving you. With throws stacked, throws the whole stack                                 |
| **R**, hold                  | Zooms in while held                                                                                                                             |
| **R**, own grenade in flight | Follows the grenade to where it lands; press again to come back                                                                                 |
| **Ctrl** twice               | Places a bot where you stand                                                                                                                    |
| **Shift** twice              | Toggles noclip                                                                                                                                  |
| **F** (inspect) twice        | Hides or shows the aim ring                                                                                                                     |
| **Delete**                   | Clears smoke and fire. Twice removes the bots                                                                                                   |
| Ping key                     | Clears the utility in the world                                                                                                                 |

### The menu

Tap **TAB** for a wheel of eight wedges. Some wedges open another wheel, and
most carry one or two quick actions on an outer ring. The centre goes back a
wheel, or closes the menu on the first one.

| Wedge             | Does                                                      | Outer ring                      |
| ----------------- | --------------------------------------------------------- | ------------------------------- |
| **Rethrow**       | Throws it again (**Rethrow All** when throws are stacked) | **Add To Stack**, **Last Only** |
| **Clear Utility** | Clears smoke and fire                                     | **Clear Bots**, **Markers**     |
| **Last Throw**    | Takes you back to your last throw                         | **Earlier**, **Landing**        |
| **Save Throw**    | Saves the last throw as a private lineup                  | **Edit**, **Delete**            |
| **Lineups**       | Opens the lineup picker                                   | **Next**, **Prev**              |
| **Filters**       | Opens the filters                                         | **Reset**                       |
| **Practice**      | Opens drills, executes, bots and the map                  | **Execute**, **Unmastered**     |
| **Settings**      | Opens the settings                                        | **Spawns**, **No Damage**       |

- **Filters**: **Type** (**All**, **Smoke**, **Flash**, **Molotov**, **HE**),
  **Side** (**Both**, **T Side**, **CT Side**), **Whose** (**Everyone's**,
  **Mine**, **My Team's**, **Public**), **Reset Filters**, **Next Lineup** and
  **Previous**. Filters apply to the world markers as well as the picker.
- **Practice**: **Repeat Lineup**, **Drill Unmastered** (with **Skip This
  One**), **Execute**, **Smoke Outline**, **Change Map**, **Place A Bot**,
  **Remove Bots**, and **Spawn Points** (with **Prev Spawn** and **Next
  Spawn**).
- **Execute**: **Rethrow All**, **Add To Stack**, **Timing** (**together** or
  **as thrown**), **I Throw**, **Remove Last**, **Empty Stack**, **Run
  Execute** / **Stop Execute**, and **Load Execute**.
- **Settings**: **No Damage**, **World Markers**, **Aim Marker**, **Throw
  Colours**, **Compass** (with **Utility Out** and **Flash Card**), **Key
  Legend** (with **Sounds**), **Private Previews**, and **Reload Library**.

**Save Throw** never asks for a name: it names the throw from the map's
callouts ("Window Smoke from T Spawn"), or after the utility if the map has none
there. A smoke that is still spreading is held until it settles, so the save
can carry its [recorded smoke](/features/utility-library#recorded-smokes).
**Delete** asks first, on a page of its own.

**Edit** opens a panel for the loaded lineup: **NAME**, **WRITE-UP** and
**VISIBILITY** (**PRIVATE**, **TEAM**, **PUBLIC**), with **SAVE** and
**REVERT**. Clicking the name offers the name the map suggests; a name or
write-up of your own is typed in chat. Making a lineup public sends it for
review.

### The lineup picker

**Lineups** (or `.menu`) opens a radar of the map with up to 40 landing spots
and a list of 16 lineups at a time, nearest first. Click a spot for the throws
that land there; a spot with a single throw loads it straight away. Chips
narrow it by **SIDE**, **WHOSE** and **TYPE**, and **FROM HERE** keeps only
what you can throw from where you stand.

### The HUD

- **The throw card** appears while a lineup is in focus: its type and name,
  the stance and the keys it needs lit up, which mouse buttons, any run-up
  ("Hold Shift + W 1.2s first"), and two locks, **FEET** and **AIM**, that
  read **On spot** and **Lined up**. With both locked the card goes green. A
  **Mastery** meter shows your run of landed throws against the five that
  master it, and your last five throws as hits and misses.
- **The compass** across the top shows nearby spots and how many are off to
  either side, under a line saying which filters are on.
- **The key legend** says what each key does right now.
- **Recent utility** lists every grenade in the air or still burning, with
  its air time, time left, and how the throw scored.
- **The flash card** shows, for a flash, how long each player it caught was
  blind and how long fully white, and whether they were facing it. A molotov
  shows who took fire damage. Placed bots stand in as targets.
- **The left card** shows the drill in progress, the stack, or a summary when
  a drill ends.
- **The execute timeline** counts down and lists each step and who throws it
  while an execute runs.
- **Toasts** say what just happened.

### In the world

Every player sees only their own markers. A glowing grenade model floats over
each spot that passes your filters. Close to a spot, a ring marks each place
to stand, with a dot where your crosshair lands looking straight down and an
arrow for the throw in focus. On the spot, an aim ring sits on the wall exactly
where the lineup's crosshair goes, and it turns green when you are lined up.
The landing is marked in the utility's colour. Spawn points are drawn as white
squares on the floor; they are on by default.

Each throw takes the next colour off your cycle, smoke cloud included, so you
can tell your clouds apart. Green and red are never used: they belong to the
aim ring.

### The server

- Buying is off, buy zones are removed, and you are handed the whole grenade
  loadout. A thrown grenade is put back in your hand.
- **No Damage** is on by default. Flashes do not blind you; the flash card
  reports what they would have done.
- Bots join the other team where you stand, frozen, up to five, and adding
  one does not restart the round.
- The round clock is held at an hour. When it runs out the map reloads, with
  a countdown on screen from a minute out.
- Practice servers never hibernate.

### Executes and the plan

- **The stack** is how one person practises an execute that takes four:
  **Add To Stack** the throws, mark one with **I Throw**, and **R** throws the
  rest from their recorded seeds, **together** or **as thrown**, while you
  make yours.
- **Load Execute** lists your own and your team's executes for the map, built
  on the website, and turns the one you pick into the stack on its timings.
- **Run Execute** runs the execute loaded onto the session from the website,
  for everyone on the server. After a countdown, each step stands the player
  assigned to it on its lineup at its time (an unassigned step goes to
  everyone), and the timeline shows who throws what.
- **Drill Unmastered** walks every lineup you have not mastered on the map,
  worst first, three throws each. Your saved progress comes with you, so a
  lineup mastered in an earlier session shows as mastered before you throw it.

### Chat commands

Every action is on the menu, but the commands are still there, and `.help`
lists them. A handful have no menu entry:

| Command                            | Does                                           |
| ---------------------------------- | ---------------------------------------------- |
| `.save <name>`                     | Saves your last throw under a name you type    |
| `.load <query>`                    | Stands you on a lineup matching the search     |
| `.list` / `.back <n>`              | Your library / a throw further back            |
| `.pos save <name>` / `.pos <name>` | Saved positions                                |
| `.spawn <n>`                       | Teleports to a spawn point by number           |
| `.drill [count] [worst]`           | Drills your book, a given number of lineups    |
| `.solve [name]`                    | Finds a throw onto the spot you are looking at |
| `.hud`                             | Swaps the panels back to centre text for you   |

Chat commands start with `.` or `!`. In the console they are prefixed `sw_`.

## Scoring, streaks and mastery

Every throw made with a lineup loaded is scored against that lineup's landing
point. The game server reports; the panel decides, recomputing the distance from
the lineup it owns rather than trusting the server's arithmetic. Grenades the
plugin throws for you (rethrows, the stack) are never scored.

- A throw is a **hit** when it lands inside the **success radius** — 96 source
  units by default, against a smoke roughly 144 units across, so the default
  asks the utility to land well inside the smoke rather than merely clip it.
- **Five hits in a row masters the lineup.** Your record, hit rate, current
  streak and best streak are kept per lineup, and shown on the lineup's page
  and on the throw card in game.
- **Plan**, on the Utility page, ranks what you haven't mastered by how many
  players throw it on that map: **Never thrown**, **Popular**, **Unmastered**,
  or **Slipping** — one you had mastered whose streak has since broken.
- **Miss patterns** aggregate where _other_ people's throws land, reported as
  short, long, left, right, high, low, scattered, or no pattern. Below the
  sample floor it says so rather than inventing a tendency from a handful of
  attempts. A public lineup's miss pattern can be read signed out.

## The HUD addon

The menu, the picker and the panels are Panorama, so the files have to reach
the player's game rather than the server's. CS2 has no server-to-client file
transfer, so they go through the Steam Workshop: the server image names the
addon's Workshop item, and
[AddonsManager](https://github.com/SwiftlyS2-Plugins/AddonsManager) tells each
connecting client which item it needs.

Players do not subscribe to anything. Steam delivers it on a player's first
join — one download and one reconnect, then never again. The addon is
published with each release of the SwiftlyS2 game-server image, so a plugin
never asks for a layout players cannot download.

Practice servers only. A one-time download is a fair price for somebody who
came to drill; it is not something to ask ten people for before a knife round.
On a server without the addon the throw guidance falls back to centre text and
chat, and `.hud` does the same for one player, but the menu, the picker and the
edit panel need it.

## The practice plugin

- Practice servers boot the SwiftlyS2 game-server image with the practice
  plugin in place of the match plugin, whatever runtime the node uses for
  matches. A plugin version pinned for CounterStrikeSharp is ignored for
  practice. The CounterStrikeSharp image refuses to boot a practice server.
- If SwiftlyS2 does not yet support the node's CS2 build, starting a practice
  server says so instead of queueing you.
- A practice server's game-server job is named `u-<match id>` (match servers
  are `m-<match id>`), and so are the servers that film
  [lineup previews](/features/utility-library#preview-clips-and-stills) and
  run [Discover](/features/utility-library#discover). The practice match's
  page reads its server logs from that job.
- A dedicated server can be set up as a **Practice Server**: it hosts practice
  sessions, runs the practice plugin, and is never used for matchmaking. It is
  listed by name in the **Region** picker.

## Administration

**Settings → Application → Utility → Practice Servers**:

| Setting                            | What it controls                                                                                                                                      |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Practice Servers**               | Master switch for practice sessions and every Practice button                                                                                         |
| **Connect grace (minutes)**        | How long a booked server waits for its host to actually join before it is handed back                                                                 |
| **Maximum session (minutes)**      | Only enforced while somebody is queuing; with nobody waiting, a session runs as long as its host wants                                                |
| **Idle timeout (minutes)**         | How long an empty practice server sits before shutting itself down                                                                                    |
| **Queue entry lifetime (minutes)** | How long a player who was turned away still counts as waiting. Default 30                                                                             |
| **Reserved on-demand slots**       | Server slots practice may never take, so a drill cannot take the last slot from a scheduled match. Lineup preview renders and Discover respect it too |
| **Success radius (units)**         | How close a throw must land to score as a hit. Default 96                                                                                             |

::: tip Related
[Utility Library](/features/utility-library) ·
[GPU Nodes](/servers/gpu-nodes/) ·
[Plugin Runtimes](/servers/game-server-nodes/plugin-runtimes)
:::
