# Utility Library & Practice Servers

A lineup library for every map on your instance — where to stand, where to aim,
where the utility lands — plus one-click CS2 **practice servers** to walk those
lineups in, with every throw scored against the one you loaded.

It lives under **Utility** in the left navigation (and under
**Community → Utility Library** in the top navigation). A map needs a radar
image to appear here; a map without one has nothing to draw a lineup on.

## What a lineup is

A lineup is one throw, stored precisely enough to be reproduced:

| Field                         | Meaning                                                                                               |
| ----------------------------- | ----------------------------------------------------------------------------------------------------- |
| **Throw from** / **Lands at** | World positions of the origin and the detonation                                                      |
| **Eye over feet**             | Eye height at release, so a crouch or a jump throw restores correctly                                 |
| **Yaw / Pitch**               | The view angles to aim at                                                                             |
| **Technique**                 | Standing, Walking, Running, Crouch, Jump, Run Jump, Walk Jump, Crouch Jump                            |
| **Throw**                     | Full, Half, or Drop — left click, right click, or both                                                |
| **Flight time**               | How long the grenade is in the air                                                                    |
| **Aim precision**             | Exact, Tight, Normal, or Loose: how close the crosshair must be before the in-game marker turns green |
| **Utility & side**            | Smoke, Flash, Molotov, HE, or Decoy, thrown as CT or T                                                |

### Where lineups come from

Every lineup says how it was captured, and the library grades it accordingly.
Nothing is presented as measured when it wasn't.

| Source      | Confidence         | Notes                                                                                                                                                                                                     |
| ----------- | ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **In game** | **Recorded**       | The practice plugin captured the throw off the engine's own physics seed (`m_vInitialPosition` / `m_vInitialVelocity`). The stance and the angles are exact, and the throw can be replayed shot-for-shot. |
| **Demo**    | **From a demo**    | Reconstructed from a parsed match demo. The aim is inferred from the grenade's flight, usually within a degree or two.                                                                                    |
| **Editor**  | **Low confidence** | Authored in the browser from two points on the radar. A starting point to walk in, never a measurement.                                                                                                   |
| **Import**  | **Low confidence** | Seeded from a payload by an administrator. Never graded as recorded.                                                                                                                                      |

A demo-derived lineup whose inferred aim and recorded view angles disagree by
more than a couple of degrees is flagged **Verify this one**, with the
disagreement shown as `±°`. The spot is real; the crosshair placement needs
walking in.

### Verified, and difficulty

**Verified** is not a moderator's badge. A lineup becomes verified once **three
different players have mastered it** in a practice server (configurable via
`public.utility_verify_masteries`). Nothing can un-verify a lineup — a later
miss is not evidence against a throw that three people landed five times in a
row.

**Difficulty** is measured the same way, from everybody's attempts: **Easy**,
**Moderate**, **Hard**, **Very hard**, or **Unmeasured** when too few people
have thrown it to grade honestly.

## Browsing a map

The map page pairs a radar **board** with a list. Squares are throw origins,
dots are landings; picking one on the board filters the list to it, and vice
versa.

- **Filters**: utility type, side, technique, throw strength, tags, and free
  text, sorted by top rated or newest.
- **Scopes**: **Public**, **Mine**, **Team**, **Saved**, **Archived**, and
  **Review** for moderators.
- **Density**: cards (one lineup at a time, with your drill record and author)
  or rows (one line each, opening in place).
- **Preview clips** play on the card — see [Preview renders](#preview-renders).

Tabs across the top of the list switch what the board is showing:
**Lineups**, **Meta**, **Executes**, **Add**, and — once you have a practice
server up — **Plan** and **Collections**.

### Sharing, forking and retiring

- **Visibility** is **Private**, **Team**, or **Public**. Public is a review:
  **Submit for public** puts the lineup in a moderator's **Review** scope.
- **Fork** copies a lineup into your own library so you can rename, retag and
  rewrite it. The copy starts Private; votes, saves and drill progress stay with
  the original.
- **Archive** hides a lineup from every library, board and search while keeping
  progress, votes and any playbook using it. **Delete** is permanent, and is
  refused outright while a playbook still has a step pointing at the lineup.
- **Collections** group the lineups you drill together — a smoke set, an
  execute, a warm-up — and can be loaded onto a practice server as a set.

## Practice servers

**Practice** provisions an on-demand CS2 server on the map you're looking at.
Pick a region, or leave it on **Any region**: 5Stack takes a free practice
server if one is standing, and otherwise starts a fresh one in your closest
region.

Once it's up, a practice bar follows you around the panel with the session's
state, and lineups gain a **Load me in** action.

- **Load me in** teleports you onto the throw — same spot, same stance, same
  aim — with a ghost line showing the flight. On a lineup for another map,
  **Switch map & load me in** changes the level (everyone on the server gets a
  five-second warning) and lands you on the throw once it loads.
- **Session access** is **Open**, **Friends**, **Invite**, or **Private**.
  Invite players by name, or copy an invite link — the link is only offered for
  Open and Friends, because Invite and Private decide on a list a link has no
  say in.
- **Executes and collections** can be loaded into the session, so `.run` and
  `.drill` have something to work from.

### In-game commands

The practice plugin ships in the server image for both runtimes. `.help` lists
everything:

| Command                                                                 | Does                                                        |
| ----------------------------------------------------------------------- | ----------------------------------------------------------- |
| `.save [name]`                                                          | Saves the throw you just made. Skip the name and the map names it |
| `.load <query>`                                                         | Teleports you to a matching lineup                          |
| `.next` / `.prev`                                                       | Walks the last search — or moves a drill to the next lineup  |
| `.rethrow`                                                              | Back to the lineup you loaded                               |
| `.last` / `.back <n>`                                                   | Back to a throw you made                                    |
| `.list` / `.reload` / `.delete`                                         | Manage your library from in game                            |
| `.edit`                                                                 | Rename the loaded lineup, describe it, change who can see it |
| `.drill`                                                                | Reps the lineup you are standing on until you stop it       |
| `.drill [count] [worst]` / `.skip`                                      | Drills your book, three throws each, and scores it          |
| `.playbook` / `.run` / `.playbook stop`                                 | Runs the loaded execute on its timings                      |
| `.bloom`                                                                | Outlines where the loaded smoke lands                       |
| `.pos save <name>` / `.pos <name>`                                      | Saved positions                                             |
| `.spawns` / `.spawn <n>`                                                | Shows the competitive spawns, and teleports to one          |
| `.noclip`, `.god`, `.timer`, `.solo`, `.ghosts`, `.colors`, `.clear`    | Practice conveniences                                       |

#### On-screen panels

Servers with the HUD addon mounted get clickable panels instead of centre text.
They fall back to the old text on any server without it, so nothing is lost by
not having it.

| Command  | Does                                                                     |
| -------- | ------------------------------------------------------------------------ |
| `.menu`  | The lineup picker — scope, side and type filters, sixteen scrolling rows  |
| `.map`   | A minimap of the map's landing spots; click one to see and load its throws |
| `.hud`   | Swaps the panels back to centre text for you alone                       |
| `.here`  | Narrows the list to lineups you can throw from where you stand           |

The guidance panel names the place a throw lands, tells you which way to look in
words rather than only in colour, and shows how many of your throws have landed
while drilling. During an execute a second panel lists who throws what and when,
with your own steps in colour and everyone else's greyed.

#### Mounting the HUD

The panels are Panorama, which means the files have to reach the player's game
rather than the server's. CS2 has no server-to-client file transfer, so the only
route is the Workshop: publish the addon, then name its id in
[AddonsManager](https://github.com/SwiftlyS2-Plugins/AddonsManager) on the
practice servers.

Players do not subscribe to anything. The server tells a connecting client which
id it needs and Steam delivers it — one download and one reconnect on a player's
first join, then never again.

Practice servers only. A one-time download is a fair price for somebody who came
to drill; it is not something to ask ten people for before a knife round. And
because everything degrades to the centre text it replaced, a server without the
addon loses the panels and nothing else.

Several players can practise in one server without their throws crossing: a
projectile names its own owner, so nothing is keyed on "whoever threw last".

### Scoring, streaks and mastery

Every throw made with a lineup loaded is scored against that lineup's landing
point. The game server reports; the panel decides, recomputing the distance from
the lineup it owns rather than trusting the server's arithmetic.

- A throw is a **hit** when it lands inside the **success radius** — 96 source
  units by default, against a smoke roughly 144 units across, so the default
  asks the utility to land well inside the smoke rather than merely clip it.
- **Five hits in a row masters the lineup.** Your record, hit rate, current
  streak and best streak are kept per lineup.
- **Plan** ranks what you haven't mastered by how many players throw it on that
  map: never thrown, popular and unmastered, unmastered, or **slipping** — one
  you had mastered whose streak has since broken.
- **Miss patterns** aggregate where _other_ people's throws land, reported as
  short, long, left, right, high, low, scattered, or no pattern. Below the
  sample floor it says so rather than inventing a tendency from a handful of
  attempts.

## Executes (playbooks)

An execute is an ordered set of lineups with timings: each step carries a
second-offset from the start, an optional player assignment from a team roster,
and a call ("after the flash"). Every step is numbered on the map.

The editor flags the mistakes that make an execute unrunnable rather than
letting you save them quietly: steps that land before the step above them,
a lineup the execute already spends, and a player throwing more grenades — or
more of one type — than they can carry.

## The meta

The **Meta** tab is not the library — it is every grenade thrown in **real
matches on your instance**, mined from parsed demos and clustered by where it
was thrown from and where it landed.

- Dashed circles are spots players actually throw at, sized by how many distinct
  players do. Each carries usage (players, throws, matches) and a
  **representative aim**: the median yaw and pitch of everyone seen throwing it.
- **Min players** filters out one person's habit.
- Spots with no saved lineup are the interesting ones. **Write this up**
  prefills a new lineup with that origin and aim; **Copy setang** puts the aim on
  your clipboard.

The same matching drives two report surfaces:

- **Utility vs Lineups** on a match, plus a browsable list of every grenade in
  that map's demo — save one and it becomes a lineup.
- **Utility Lineups** on a team page: which saved lineups a roster's grenades
  looked like in real matches, and how often they landed.

::: tip Matched, not proven
A throw is matched to a lineup by where it started and where it ended. These are
throws that _look like_ the lineup, not a record of the lineup being called.
:::

## Preview renders

A lineup's preview clip is filmed, not simulated. A [GPU node](/servers/gpu-nodes)
joins a practice server as a player, is teleported onto the lineup, throws it,
and records its own first-person view — which is also the framing you need in
order to copy the alignment. Administrators track this under
**Utility → Lineup Previews**, with per-render status (Queued, Filming,
Uploading, Done, Failed, Skipped, Cancelled), re-render, and cancel.

## Administration

**Settings → Application → Utility**:

| Setting                        | What it controls                                                                                                                                           |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Utility Library**            | Master switch. Off, the library is not served and nothing new is taken in                                                                                  |
| **Lineups per player per day** | Spam ceiling across in-game recording, demo mining and browser authoring                                                                                   |
| **Practice Servers**           | Master switch for practice sessions and every Practice button                                                                                              |
| **Connect grace (minutes)**    | How long a booked server waits for its host to actually join before it is handed back                                                                      |
| **Maximum session (minutes)**  | Only enforced while somebody is queuing; with nobody waiting, a session runs as long as its host wants                                                     |
| **Idle timeout (minutes)**     | How long an empty practice server sits before shutting itself down                                                                                         |
| **Reserved on-demand slots**   | Server slots practice may never take, so a drill cannot take the last slot from a scheduled match                                                          |
| **Success radius (units)**     | How close a throw must land to score as a hit. Default 96                                                                                                  |
| **Lineup Imports**             | Whether lineups may be seeded from a payload, with a dry run, a per-entry error report, and a **Purge Imported** that removes only what the importer wrote |
| **Re-scan demos**              | Rebuilds the mined meta from demos that have already been parsed. Does not re-parse them                                                                   |

## What each part needs

| Capability                                    | Requires                                         |
| --------------------------------------------- | ------------------------------------------------ |
| The library, authoring, collections, executes | Nothing extra                                    |
| Practice servers                              | On-demand server capacity in at least one region |
| Recording lineups in game, and drills         | The practice plugin in the server image          |
| The meta, and the match/team utility reports  | Parsed demos                                     |
| Preview clips                                 | A [GPU node](/servers/gpu-nodes)                 |

::: tip Related
[Match Analysis](/features/match-analysis) ·
[Performance Rating](/features/performance-rating) ·
[GPU Nodes](/servers/gpu-nodes) ·
[Plugin Runtimes](/servers/game-server-nodes/plugin-runtimes)
:::
