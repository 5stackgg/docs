# Utility Library

A lineup library for every map on your instance: where to stand, where to aim,
where the utility lands. Each lineup can carry a filmed preview clip and stills,
and a smoke lineup can carry the cloud the game itself simulated. **Discover**
finds new smoke throws onto a spot you pick and has a server throw each one to
prove it lands. To walk a lineup in game, start a
[practice server](/features/practice-servers).

It lives under **Utility** in the left navigation, and under
**Community → Utility Library** in the top navigation. A map needs a radar image
to appear here; a map without one has nothing to draw a lineup on. Rush maps are
not listed.

Signed out, you can browse public lineups, the meta and public executes, play
preview clips, and read a lineup's miss pattern. **Mine**, **Team**, **Saved**,
collections, the plan, Discover, voting and practice servers need an account.

## What a lineup is

A lineup is one throw, stored precisely enough to be reproduced:

| Field                         | Meaning                                                                                               |
| ----------------------------- | ----------------------------------------------------------------------------------------------------- |
| **Throw from** / **Lands at** | World positions of the origin and the detonation                                                      |
| **Eye over feet**             | Eye height at release, so a crouch or a jump throw restores correctly                                 |
| **Yaw / Pitch**               | The view angles to aim at                                                                             |
| **Technique**                 | Standing, Walking, Running, Crouch, Jump, Run Jump, Walk Jump, Crouch Jump                            |
| **Throw**                     | Left click (full), Left + right click (half), or Right click (drop)                                   |
| **Air time**                  | How long the grenade is in the air after you throw it                                                 |
| **Aim precision**             | Exact, Tight, Normal, or Loose: how close the crosshair must be before the in-game marker turns green |
| **Utility & side**            | Smoke, Flash, Molotov, HE, or Decoy, thrown as CT or T                                                |

A lineup recorded in game also keeps its **run-up**: the last two seconds before
the throw. The lineup shows it as a line such as "Hold W 0.6s first", and the
preview render acts it out.

### Where lineups come from

Every lineup says how it was captured, and the library grades it accordingly.
Nothing is presented as measured when it wasn't.

| Source      | Confidence         | Notes                                                                                                                                                                                                     |
| ----------- | ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **In game** | **Recorded**       | The practice plugin captured the throw off the engine's own physics seed (`m_vInitialPosition` / `m_vInitialVelocity`). The stance and the angles are exact, and the throw can be replayed shot-for-shot. |
| **Demo**    | **From a demo**    | Reconstructed from a parsed match demo. The aim is inferred from the grenade's flight, usually within a degree or two.                                                                                    |
| **Editor**  | **Low confidence** | Authored in the browser from two points on the radar. A starting point to walk in, never a measurement.                                                                                                   |
| **Import**  | **Low confidence** | Seeded from a payload by an administrator. Never graded as recorded.                                                                                                                                      |

A recorded lineup wears no mark. Anything else carries an amber triangle with
its grade on hover. A demo-derived lineup whose inferred aim and recorded view
angles disagree by more than a couple of degrees is flagged **Verify this one**,
with the disagreement shown as `±°`. The spot is real; the crosshair placement
needs walking in.

A smoke saved from [Discover](#discover) was thrown by a server, so it is graded
**Recorded** when it is a standing or jump throw. A moving throw is graded
**From a demo** instead, because its walk and run speeds are estimated rather
than measured.

### Verified, and difficulty

**Verified** is not a moderator's badge. A lineup becomes verified once **three
different players have mastered it** in a practice server (configurable via
`public.utility_verify_masteries`). Nothing can un-verify a lineup — a later
miss is not evidence against a throw that three people landed five times in a
row. See [Scoring, streaks and mastery](/features/practice-servers#scoring-streaks-and-mastery).

**Difficulty** is measured the same way, from everybody's attempts: **Easy**,
**Moderate**, **Hard**, **Very hard**, or **Unmeasured** when too few people
have thrown it to grade honestly.

## The maps index

**All maps** draws every map's radar with its saved lineups marked on it. A
mark is where lineups land, and the more that land together, the bigger it
gets. Each map shows its count of public lineups, plus any that are not public
but visible to you (yours, your team's, or waiting on review).

A rail of map emblems sits beside the map on a wide screen and as a strip
above it on a narrow one. Switching map from the rail keeps your scope and
filters. The radars are 5Stack's own 2D map art, baked from the
[replay stage](/features/match-replay), wherever a map has been baked.

## A map

A map page is the radar **board** beside one **card**. The card holds the tabs,
the list under them, whatever you open over the list, and the
[practice bar](/features/practice-servers#starting-a-server) at its foot.

### The board

- Landings are drawn as their grenade's icon. Where to stand is drawn only for
  the lineup you point at or open, and its throw line draws from the thrower
  to the landing.
- Resting on a mark opens a small peek with the lineup's crosshair still and
  where it lands. Clicking it opens the lineup.
- The row above the board holds the zoom controls, **Show the map's callouts**,
  and **Meta overlay**, which draws the [meta](#the-meta) rings on any tab.
  With the overlay on, **Min players** (10+, 25+, 50+, 100+) sets how many
  different players a spot needs before it is drawn.

### Tabs

| Tab             | Shows                                                   | Who                                |
| --------------- | ------------------------------------------------------- | ---------------------------------- |
| **Lineups**     | The library, filtered                                   | Everyone                           |
| **Meta**        | What players actually throw on this map in real matches | Once the map has mined data        |
| **Collections** | Your collections, and the ones shared with you          | Signed in                          |
| **Executes**    | Timed executes built from lineups                       | Everyone (public only, signed out) |
| **Plan**        | What you have not mastered yet, most thrown first       | Signed in                          |
| **Discover**    | Find throws that land a smoke on a spot                 | Signed in                          |

**Add a Lineup** sits at the foot of the Lineups and Meta tabs, and opens the
editor in place of the list.

### The list

- The list is cut into utility types, each under a heading that stays pinned
  while you scroll. A row of **type chips** above it (in the **Filters** menu
  on a phone) carries a count per type; a chip, or a heading, narrows both the
  list and the board to that type.
- **Scope**: **Public**, **Mine**, **Team**, **Saved**, **Archived**, and
  **Review** for moderators. Each scope shows its count.
- **Search lineups**, and a filter menu for side, technique, throw, tags, and
  the sort (**Top rated** or **Newest**).
- Each row shows the preview's landing picture with a play badge when the
  lineup **Has video**, how to throw it, and who submitted it.
- Under **Mine**, each row shows its state as one icon — **Private**,
  **Team**, **Under review**, **Public**, **Rejected**, or **Archived** — with a
  line saying what it means. A declined lineup shows the reviewer's reason as
  "Declined: …".
- On a desktop, right-click a row for **Load in game** (or **Switch map & load
  me in**), **Repeat in game**, **Fork**, **Submit for public**, **Mark as
  bad**, **Copy lineup link**, and **Archive lineup**, without opening it.

The list is live. A lineup saved elsewhere, a review answered, or an archive
undone shows up without a reload, and a lineup you save from a practice server
announces itself as **Lineup saved: {name}** with a **Show** button.

### Addresses and Back

Everything the page holds goes into its address: the tab, the scope and
filters, the open lineup (`?lineup=<id>`), a meta spot (`?spot=<key>`),
executes (`?tab=executes`), a Discover search (`?discover=<id>`). A refresh
lands you where you were, and a link opens the same view. **Back** and
**Forward** step out of and back into what you opened without reloading the
page, and **Escape** closes the top layer.

### On a phone

The card becomes a sheet over the map with three heights: a peek that shows
only the type chips, half, and full. The map pinches, pans with a fling and
double-taps to zoom. Marks keep their size at every zoom with a finger-sized
touch target, and the map pans far enough that nothing under the sheet is out
of reach. On a phone the page is browse-only: the practice bar and every action
that sends something to a server are hidden.

## A lineup

A lineup opens over the list. **Back** puts the list back where it was.

- **The header**: **Save to your list** (the heart), **Add to a collection**,
  **Share lineup** (copies its link), and the **⋯** menu with
  **Edit** and **Archive lineup** — or **Restore lineup** and **Delete
  lineup** once it is archived.
- **What it is**: the utility, map and side, who can see it, and the upvote,
  then its name, its confidence mark, who submitted it and their team.
- **Library actions**: **Fork**, **Submit for public** (your own, not yet
  public), **Mark as bad** (someone else's public lineup), and **Re-render
  preview** for moderators.
- **The preview clip** with **Copy lineup link** and **Download clip**, then
  the [stills](#preview-clips-and-stills).
- **How to throw it**: the stance, the run-up if one was recorded, and which
  mouse button.
- **Your record** on it and its [miss pattern](/features/practice-servers#scoring-streaks-and-mastery).
- **Technical details**, folded: stand and landing coordinates, throw distance,
  eye over feet, yaw and pitch, aim precision, source and air time.

The practice bar under the lineup offers **Load me in** and **Repeat in game**
once you are on a practice server. For a moderator looking at a lineup waiting
on review, it offers **Decline** and **Make public** instead.

### Watch in 3D

On a map with a 3D mesh, the **3D** button on the clip throws the lineup on the
replay stage, in the board's place, with the smoke, fire and camera of the
[match replay](/features/match-replay). **Show the map** puts the board back.
On a phone it swaps the clip for the throw.

A smoke lineup with a [recorded smoke](#recorded-smokes) draws that cloud.
Without one, the stage floods a smoke from where it landed instead.

### Editing, forking and retiring

- **Edit** changes the name, description, tags and who can see it. Where you
  stand, where you aim and how far it flies cannot be edited: everyone's drill
  record points at them, so **Fork** it to change the throw itself.
- **Visibility** is **Private**, **Team**, or **Public**. Public is a review:
  **Submit for public** puts the lineup in a moderator's **Review** scope.
  The review tile shows the landing, air time and submitter; **Decline** asks
  for a reason (**Doesn't land**, **Already in the library**, **Name doesn't
  say where**, or **Needs a clip**), which the author sees.
- **Fork** copies a lineup into your own library so you can rename, retag and
  rewrite it. The copy starts Private; votes, saves and drill progress stay with
  the original.
- **Archive** hides a lineup from every library, board and search while keeping
  progress, votes and any execute using it. **Delete** is permanent, and is
  refused outright while an execute still has a step pointing at the lineup.
- **Collections** group the lineups you drill together — a smoke set, a
  warm-up — and can be sent to a practice server as a set.

### Sharing

**Share lineup** copies `/utility/<map>?lineup=<id>`. Pasted into Discord or
any other app that unfurls links, a public lineup's link shows its name, how to
throw it, and its preview clip playing inline.

## Preview clips and stills

A lineup's preview is filmed, not simulated. A render pod on a
[GPU node](/servers/gpu-nodes/#utility-lineup-previews) joins a practice server
as a player, and the practice plugin directs the take on the game tick: it
stands the player on the lineup, frames each shot, snaps the grenade onto the
recorded physics seed so the flight is exactly the lineup's, chases the grenade
along its own flight path, and holds on the bloom.

Each preview is a clip plus six stills, in the order you work through a throw:

| Still              | Shows                                   |
| ------------------ | --------------------------------------- |
| **Where to stand** | The spot, from a camera that can see it |
| **From the spot**  | Your feet, from your eyes               |
| **Aim**            | The view at the aim                     |
| **Lineup**         | The aim with the pin pulled             |
| **Aim close-up**   | A zoomed look at the exact pixel        |
| **Where it lands** | The utility after it detonates          |

The stills viewer opens on the closest look at the crosshair there is. The
arrow keys move between stills, and **+**, **-** and **0** zoom the two
crosshair stills. On a touch screen the stills swipe.

A lineup is filmed when it becomes public, and a moderator can film it again
with **Re-render preview**. Only a lineup graded **Recorded**, with its physics
seed, can be filmed; anything else counts as **Cannot be filmed**. A new take
replaces the old preview when it finishes. A lineup made private after it was
filmed keeps its preview for whoever can still see it.

### The render queue

Administrators follow renders under **System → Render Queue**, on the
**Utility Lineups** tab:

- **Preview coverage** counts public lineups that are **Up to date**,
  **Missing**, **Outdated**, **Cannot be filmed**, or **In queue**, against the
  current **Render version**, filtered by map. **Render Missing** and
  **Re-render Outdated** queue them in bulk after a confirm.
- **Needs a render** lists the lineups behind those counts, each with its own
  **Render preview** button.
- The queue itself is one card for the render pod, with a header per map and
  each row's state: **Queued**, **Filming**, **Uploading**, **Done**,
  **Failed**, **Skipped**, or **Cancelled**. Finished rows show the version
  that filmed them; **Live** marks the render that is the lineup's preview
  right now.

::: tip Render versions
Every preview records the render version that filmed it, so a change to how
previews are filmed is rolled out by re-rendering what is outdated. Nothing
re-renders on its own: press **Re-render Outdated**. If the render pod in use
films an older version than the API expects, the page warns **The render pod
is behind this API** and the API refuses to re-render outdated previews until
the game-server and game-streamer images are updated.
:::

## Recorded smokes

A smoke lineup can carry the cloud the game itself simulated, not a guess at
it. CS2 does not network a smoke's cloud: it sends a small log of where the
smoke emits from and what geometry surrounds it, and the server and every
client run the same simulation from that. The practice plugin reads that log
off the real grenade, frame by frame, while it blooms.

- **When a smoke is recorded**: when you save a smoke throw in a practice
  server (the save waits up to eight seconds for the cloud to settle; a smoke
  cut short is discarded), and when a preview render throws the lineup.
- **How it is rebuilt**: the demo parser replays the log through a port of
  the game's own smoke simulation, one step per logged frame, on the game's
  20-unit voxel grid. A smoke that pops on a ledge pours down to the floor the
  way the game's does, because the game itself places emitters down the drop.
- **Lineups mined from a demo** keep the smoke from that demo, once the demo
  has been parsed by a parser that exports smoke grids.
- The raw log is kept with the rebuilt smoke, so it can be rebuilt again later
  without recording the throw again.

The 3D views of a lineup and an execute draw the recorded cloud out to the
voxels the game filled.

## Discover

**Discover** finds smoke throws onto a spot you pick, including ones nobody has
saved yet.

1. **Landing**: click the map where the smoke should land. The spot snaps to
   the floor under it and shows the footprint a smoke would cover there.
2. **Throw from**: click where you could throw from, then drag the corners of
   the box. A side can be up to 2048 units.
3. **Land within**: **Tight 32u**, **Close 64u**, or **Loose 128u**.
4. **Ways to throw**: **Standing**, **Jump throw**, and **While moving** in
   any of **Forward**, **Left**, **Back** and **Right**, at a **Walk** or a
   **Run**, optionally **+ Jump throw**.
5. **Throw**: **Left click**, **Right click**, and/or **Left + right click**.
6. **Discover throws**.

Throws are predicted in seconds against the map's collision mesh, then a server
throws each one for real. The search moves through **Predicting throws**,
**Waiting for a server** and **Throwing them on a server** to **Done**, and
each throw is marked **Predicted**, **Landed** or **Missed** as the server
reports it. **Stop** cancels a search.

Each result shows its technique, the keys to hold, how easy it is (**Easy**,
**Medium**, **Hard**, or **Untested**), how far from the spot it landed, and
**New** when no public lineup or meta spot is thrown from within 64 units of it
onto within 64 units of where it lands. Private lineups never count against
**New**.
A **Landed** throw can be saved with **Save as lineup** (as a private lineup of
your own, named from the map if you leave the name empty), or stood on with
**Test in game** if you are on a practice server. A **Predicted** throw cannot
be saved until the server has landed it.

::: warning Moving throws
Moving throws are proposed from estimated walk and run speeds. The server still
throws each one, but they can be harder for a person to repeat, and one saved
is graded **From a demo** rather than **Recorded**.
:::

A search proposes up to 40 throws, and the server gets up to 400 grenades and
four minutes to verify them, refining near misses as it goes. **Your recent
searches** lists your last ones, with how many landed.

A player can have one search running at a time, and starting searches is
limited per hour (`public.utility_discoveries_per_hour`, default 6). One shared
practice server throws every search in turn, changing map between them, so
searches queue behind each other. It does not need a GPU.
Discover needs both the Utility Library and Practice Servers turned on.

## Executes

An execute is an ordered set of lineups with timings: each step carries a
second-offset from the start, an optional player assignment from a team roster,
and a call ("after the flash"). Every step is numbered on the map.

- **Timed to land together.** The editor works each step's time back from its
  grenade's flight, so the smokes land at once and the rest land three seconds
  later. Adding, repeating or removing a step works it out again. A time you set
  yourself is locked and kept when steps change; the lock on a step hands it
  back, and **Re-time all** hands every step back.
- The editor flags the mistakes that make an execute unrunnable rather than
  letting you save them quietly: a lineup the execute already spends, and a
  player throwing more grenades — or more of one type — than they can carry.
- **Run** plays the execute on its clock. On a map with a 3D mesh it is thrown
  on the replay stage with its recorded smokes, and plays like a video: pause,
  scrub, and **Show the map** to put the board back.
- An open execute reads as a run sheet: each step's time, grenade, how to throw
  it and who throws it. **Mine** cuts it down to your own steps.
- Someone else's execute can be read and copied with **Save a copy**. Your own
  has **Edit**, **Duplicate**, **Copy link** and **Delete execute**.
- Public executes can be read signed out, with their author and team.
- **Practice** in the bar loads the execute into your practice server, where
  it can also be picked from the [in-game menu](/features/practice-servers#executes-and-the-plan).

## The meta

The **Meta** tab is not the library — it is every grenade thrown in **real
matches on your instance**, mined from parsed demos and clustered by where it
was thrown from and where it landed.

- Dashed circles are spots players actually throw at, sized by how many distinct
  players do. Each carries usage (players, throws, matches) and a
  **Representative Aim**: the median yaw and pitch of everyone seen throwing it.
- Circles that sit on top of each other collapse into one with a count. The
  first click fans them out, each one toward where you stand to throw it.
- **Min players** filters out one person's habit, and **All spots**,
  **Unwritten** and **Written** narrow the list to the spots nobody has written
  up, or the ones somebody has.
- Spots with no saved lineup are the interesting ones. **Write this up**
  prefills a new lineup with that origin and aim; **Copy setpos and aim** puts a
  `setpos …; setang …` line on your clipboard; **Copy link to this spot**
  shares it.

The same matching drives two report surfaces:

- **Utility vs Lineups** on a match, plus a browsable list of every grenade in
  that map's demo — save one and it becomes a lineup.
- **Utility Lineups** on a team page: which saved lineups a roster's grenades
  looked like in real matches, and how often they landed.

::: tip Matched, not proven
A throw is matched to a lineup by where it started and where it ended. These are
throws that _look like_ the lineup, not a record of the lineup being called.
:::

## Administration

**Settings → Application → Utility**:

| Setting                        | What it controls                                                                                                                                            |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Utility Library**            | Master switch. Off, the library is not served and nothing new is taken in                                                                                   |
| **Lineups per player per day** | Spam ceiling across in-game recording, demo mining and browser authoring                                                                                    |
| **Practice Servers**           | Master switch for practice sessions, Discover, and every Practice button. Its settings are on [Practice Servers](/features/practice-servers#administration) |
| **Lineup Imports**             | Whether lineups may be seeded from a payload, with a dry run, a per-entry error report, and a **Purge Imported** that removes only what the importer wrote  |
| **Re-scan demos**              | Rebuilds the mined meta from demos that have already been parsed. Does not re-parse them                                                                    |
| **Sync callouts**              | Refreshes the map callout names that lineups, meta spots and new throws are named from                                                                      |

## What each part needs

| Capability                                    | Requires                                                                                                     |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| The library, authoring, collections, executes | Nothing extra                                                                                                |
| Practice servers                              | On-demand server capacity in at least one region, or a dedicated practice server                             |
| Recording lineups in game, and drills         | A practice server (always SwiftlyS2)                                                                         |
| The meta, and the match/team utility reports  | Parsed demos                                                                                                 |
| Recorded smokes                               | A smoke saved in a practice server, filmed by a preview render, or mined from a demo parsed with smoke grids |
| Discover                                      | A practice server slot and the demo parser; no GPU                                                           |
| Preview clips and stills                      | A [GPU node](/servers/gpu-nodes/#utility-lineup-previews)                                                    |
| Watching a lineup or an execute in 3D         | A 3D mesh for the map, and WebGL2 in the browser                                                             |

::: tip Related
[Practice Servers](/features/practice-servers) ·
[Match Analysis](/features/match-analysis) ·
[Match Replay](/features/match-replay) ·
[GPU Nodes](/servers/gpu-nodes/)
:::
