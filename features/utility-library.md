# Utility Library

A lineup library for every map on your instance: where to stand, where to aim,
where the utility lands. Each lineup can carry a filmed preview clip and stills,
and a smoke lineup can carry the exact smoke the game produced. **Discover**
finds new smoke throws onto a spot you pick and has a server throw each one to
prove it lands. To walk a lineup in game, start a
[practice server](/features/practice-servers).

It lives under **Practice → Utility** in the left navigation. A map needs a
radar image to appear here. Rush maps are not listed.

Signed out, you can browse public lineups, the meta and public executes, play
preview clips, and read a lineup's miss pattern. **Mine**, **Team**, **Saved**,
collections, the plan, Discover, voting and practice servers need an account.

## What a lineup is

A lineup is one throw: where you stand, where you aim, how you throw it, and
where it lands. Each one has a utility (Smoke, Flash, Molotov, HE or Decoy), a
side (CT or T), a technique (Standing, Walking, Running, Crouch, Jump, Run
Jump, Walk Jump or Crouch Jump), and a throw (Left click, Left + right click, or
Right click). **Aim precision** (Exact, Tight, Normal or Loose) sets how close
your crosshair must be before the in-game marker turns green.

A lineup recorded in game also keeps its **run-up**, shown as a line such as
"Hold W 0.6s first".

### Where lineups come from

Every lineup says how it was made, and is graded for it:

| Source      | Grade              | What it means                                                         |
| ----------- | ------------------ | --------------------------------------------------------------------- |
| **In game** | **Recorded**       | Thrown on a practice server. The stance and the angles are exact.     |
| **Demo**    | **From a demo**    | Rebuilt from a match demo. The aim is usually within a degree or two. |
| **Editor**  | **Low confidence** | Drawn in the browser from two points on the radar. Walk it in first.  |
| **Import**  | **Low confidence** | Imported by an administrator.                                         |

A recorded lineup wears no mark. Anything else carries an amber triangle with
its grade on hover. A demo lineup whose aim looks off by more than a couple of
degrees is flagged **Verify this one**: the spot is right, but walk in the
crosshair placement.

### Verified, and difficulty

**Verified** is not a moderator's badge. A lineup becomes verified once
enough different players have mastered it on a practice server, **three** by
default. Once verified, a lineup stays verified. See
[Scoring, streaks and mastery](/features/practice-servers#scoring-streaks-and-mastery).

**Difficulty** is measured the same way, from everybody's attempts: **Easy**,
**Moderate**, **Hard**, **Very hard**, or **Unmeasured** when too few people
have thrown it.

## The maps index

**All maps** draws every map's radar with its saved lineups marked on it. A
mark is where lineups land, and the more that land together, the bigger it
gets. Each map shows its count of public lineups, plus any that are not public
but visible to you (yours, your team's, or waiting on review).

A rail of map emblems switches map and keeps your scope and filters.

## A map

A map page is the radar **board** beside one **card**. The card holds the tabs,
the list under them, whatever you open over the list, and the
[practice bar](/features/practice-servers#starting-a-server) at its foot.

### The board

- Landings are drawn as their grenade's icon. Where to stand is drawn only for
  the lineup you point at or open, with a line from the thrower to the landing.
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
| **Meta**        | What players actually throw on this map in real matches | Once the map has data from demos   |
| **Collections** | Your collections, and the ones shared with you          | Signed in                          |
| **Executes**    | Timed executes built from lineups                       | Everyone (public only, signed out) |
| **Plan**        | What you have not mastered yet, most thrown first       | Signed in                          |
| **Discover**    | Find throws that land a smoke on a spot                 | Signed in                          |

**Add a Lineup** sits at the foot of the Lineups and Meta tabs, and opens the
editor in place of the list.

### The list

- The list is grouped by utility type. A row of **type chips** above it (in the
  **Filters** menu on a phone) carries a count per type; a chip, or a heading,
  narrows both the list and the board to that type.
- **Scope**: **Public**, **Mine**, **Team**, **Saved**, **Archived**, and
  **Review** for moderators. Each scope shows its count.
- **Search lineups**, and a filter menu for side, technique, throw, tags, and
  the sort (**Top rated** or **Newest**).
- Each row shows the landing picture with a play badge when the lineup **Has
  video**, how to throw it, and who submitted it.
- Under **Mine**, each row shows its state as one icon (**Private**, **Team**,
  **Under review**, **Public**, **Rejected**, or **Archived**) with a line
  saying what it means. A declined lineup shows the reviewer's reason as
  "Declined: …".
- On a desktop, right-click a row for **Load in game** (or **Switch map & load
  me in**), **Repeat in game**, **Fork**, **Submit for public**, **Mark as
  bad**, **Copy lineup link**, and **Archive lineup**, without opening it.

The list updates without a reload. A lineup you save from a practice server
shows **Lineup saved: {name}** with a **Show** button.

While you're in a practice server, the lineups you save there land in a **This
Server** group at the top of **Mine**, newest first, and are numbered on the
map. They stay private until you submit them.

### Addresses and Back

The page's address keeps the tab, the filters and whatever you have open, so a
refresh or a shared link lands on the same view. **Back** and **Forward** step
out of and back into what you opened, and **Escape** closes the top layer.

### On a phone

The card becomes a sheet over the map that you drag between a peek, half and
full height. On a phone the page is browse-only: the practice bar and every
action that sends something to a server are hidden.

## A lineup

A lineup opens over the list. **Back** puts the list back where it was.

- **The header**: **Save to your list** (the heart), **Add to a collection**,
  **Share lineup** (copies its link), and the **⋯** menu with **Edit** and
  **Archive lineup**, or **Restore lineup** and **Delete lineup** once it is
  archived.
- **What it is**: the utility, map and side, who can see it, and the upvote,
  then its name, its grade, who submitted it and their team.
- **Library actions**: **Fork**, **Submit for public** (your own, not yet
  public), **Mark as bad** (someone else's public lineup), and **Re-render
  preview** for moderators.
- **The preview clip** with **Copy lineup link** and **Download clip**, then
  the [stills](#preview-clips-and-stills).
- **How to throw it**: the stance, the run-up if one was recorded, and which
  mouse button.
- **Your record** on it and its [miss pattern](/features/practice-servers#scoring-streaks-and-mastery).
- **Technical details**, folded: the raw positions, angles and air time.

The practice bar under the lineup offers **Load me in** and **Repeat in game**
once you are on a practice server. For a moderator looking at a lineup waiting
on review, it offers **Decline** and **Make public** instead.

### Watch in 3D

On a map with a 3D mesh, the **3D** button on the clip throws the lineup in 3D
in the board's place, as in the [match replay](/features/match-replay). **Show
the map** puts the board back. On a phone it swaps the clip for the throw. A
smoke lineup with a [recorded smoke](#recorded-smokes) shows that smoke.

### Editing, forking and retiring

- **Edit** changes the name, description, tags and who can see it. Where you
  stand, where you aim and how far it flies cannot be edited, so **Fork** it to
  change the throw itself.
- **Visibility** is **Private**, **Team**, or **Public**. Public is a review:
  **Submit for public** puts the lineup in a moderator's **Review** scope.
  **Decline** asks the moderator for a reason (**Doesn't land**, **Already in
  the library**, **Name doesn't say where**, or **Needs a clip**), which the
  author sees.
- **Fork** copies a lineup into your own library so you can rename, retag and
  rewrite it. The copy starts Private; votes, saves and drill progress stay with
  the original.
- **Archive** hides a lineup from every library, board and search while keeping
  progress, votes and any execute using it. **Delete** is permanent, and is
  refused while an execute still uses the lineup.
- **Collections** group the lineups you drill together, such as a smoke set or
  a warm-up, and can be sent to a practice server as a set.

### Sharing

A public lineup's link, pasted into Discord or any other app that unfurls
links, shows its name, how to throw it, and its preview clip playing inline.

## Preview clips and stills

A lineup's preview is filmed in the real game, on a
[GPU node](/servers/gpu-nodes/#utility-lineup-previews). Each preview is a clip
plus six stills, in the order you work through a throw:

| Still              | Shows                                   |
| ------------------ | --------------------------------------- |
| **Where to stand** | The spot, from a camera that can see it |
| **From the spot**  | Your feet, from your eyes               |
| **Aim**            | The view at the aim                     |
| **Lineup**         | The aim with the pin pulled             |
| **Aim close-up**   | A zoomed look at the exact pixel        |
| **Where it lands** | The utility after it detonates          |

The arrow keys move between stills, and **+**, **-** and **0** zoom the two
crosshair stills. On a touch screen the stills swipe.

A lineup is filmed when it becomes public, and a moderator can film it again
with **Re-render preview**. Only a lineup graded **Recorded** can be filmed;
anything else counts as **Cannot be filmed**.

### The render queue

Administrators follow renders under **Media → Render Queue** in the admin
navigation, on the **Utility Lineups** tab:

- **Preview coverage** counts public lineups that are **Up to date**,
  **Missing**, **Outdated** (filmed by an older **Render version**), **Cannot
  be filmed**, or **In queue**, filtered by map. **Render Missing** and
  **Re-render Outdated** queue them in bulk after a confirm.
- **Needs a render** lists the lineups behind those counts, each with its own
  **Render preview** button.
- The queue lists each render by map with its state: **Queued**, **Filming**,
  **Uploading**, **Done**, **Failed**, **Skipped**, or **Cancelled**. **Live**
  marks the render that is the lineup's preview right now.

::: tip Outdated previews
Nothing re-renders on its own. Press **Re-render Outdated** to bring outdated
previews up to date.
:::

## Recorded smokes

A smoke lineup can carry the exact smoke the game produced for that throw, not
a guess at it. The 3D views of a lineup and an execute show where that smoke
really filled.

A smoke is recorded:

- when you save a smoke throw on a practice server. The save waits up to eight
  seconds for the smoke to settle, and a smoke cut short is not kept.
- when a preview render throws the lineup.
- for a lineup mined from a demo, once that demo is parsed with smoke grids.

## Discover

**Discover** finds smoke throws onto a spot you pick, including ones nobody has
saved yet.

1. **Landing**: click the map where the smoke should land. The spot snaps to
   the floor under it and shows the area a smoke would cover there.
2. **Throw from**: click where you could throw from, then drag the corners of
   the box. A side can be up to 2048 units.
3. **Land within**: **Tight 32u**, **Close 64u**, or **Loose 128u**.
4. **Ways to throw**: **Standing**, **Jump throw**, and **While moving** in
   any of **Forward**, **Left**, **Back** and **Right**, at a **Walk** or a
   **Run**, optionally **+ Jump throw**.
5. **Throw**: **Left click**, **Right click**, and/or **Left + right click**.
6. **Discover throws**.

Discover predicts up to 40 throws, then a server throws each one for real. The
search moves through **Predicting throws**, **Waiting for a server** and
**Throwing them on a server** to **Done**, and each throw is marked
**Predicted**, **Landed** or **Missed**. **Stop** cancels a search.

Each result shows its technique, the keys to hold, how easy it is (**Easy**,
**Medium**, **Hard**, or **Untested**), how far from the spot it landed, and
**New** when no public lineup or meta spot already has a throw from about the
same place onto about the same landing. Private lineups don't count. A
**Landed** throw can be saved with **Save as lineup** (a
private lineup of your own, named from the map if you leave the name empty), or
stood on with **Test in game** if you are on a practice server. A **Predicted**
throw cannot be saved until the server has landed it.

::: warning Moving throws
Moving throws can be harder for a person to repeat. A saved moving throw is
graded **From a demo** rather than **Recorded**. A standing or jump throw is
graded **Recorded**.
:::

**Your recent searches** lists your last ones, with how many landed.

You can have one search running at a time, and start up to 6 an hour by
default. Every search shares one practice server, so searches queue behind
each other. Discover does not need a GPU, but it needs both the Utility Library
and Practice Servers turned on.

## Executes

An execute is an ordered set of lineups with timings: each step has a time from
the start, an optional player from a team roster, and a call ("after the
flash"). Every step is numbered on the map.

- **Timed to land together.** The editor works out each step's time so the
  smokes land at once and the rest land three seconds later. Adding, repeating
  or removing a step works it out again. A time you set yourself is locked and
  kept when steps change; the lock on a step hands it back, and **Re-time all**
  hands every step back.
- The editor flags mistakes that make an execute unrunnable: a lineup the
  execute already uses, and a player throwing more grenades, or more of one
  type, than they can carry.
- **Run** plays the execute on its clock. On a map with a 3D mesh it plays in
  3D with its recorded smokes, like a video: pause, scrub, and **Show the map**
  to put the board back.
- An open execute reads as a run sheet: each step's time, grenade, how to throw
  it and who throws it. **Mine** cuts it down to your own steps.
- Someone else's execute can be read and copied with **Save a copy**. Your own
  has **Edit**, **Duplicate**, **Copy link** and **Delete execute**.
- Public executes can be read signed out, with their author and team.
- **Practice** in the bar loads the execute into your practice server, where
  it can also be picked from the [in-game menu](/features/practice-servers#executes-and-the-plan).

## The meta

The **Meta** tab is not the library. It is every grenade thrown in **real
matches on your instance**, taken from parsed demos and grouped by where it was
thrown from and where it landed.

- Dashed circles are spots players actually throw at, sized by how many
  different players do. Each shows usage (players, throws, matches) and a
  **Representative Aim**: the typical aim of everyone seen throwing it.
- Circles that sit on top of each other collapse into one with a count. The
  first click fans them out.
- **Min players** filters out one person's habit, and **All spots**,
  **Unwritten** and **Written** narrow the list to the spots nobody has written
  up, or the ones somebody has.
- Spots with no saved lineup are the interesting ones. **Write this up**
  prefills a new lineup with that origin and aim; **Copy setpos and aim** puts a
  `setpos …; setang …` line on your clipboard; **Copy link to this spot**
  shares it.

The same matching drives two reports:

- The match page's [Utility tab](/features/match-analysis#utility): every
  grenade in that map's demo drawn on the map, on or off the meta spot. Save
  one and it becomes a lineup.
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
| **Utility Library**            | Master switch. Off, the library is hidden and nothing new is taken in                                                                                       |
| **Lineups per player per day** | Spam limit across in-game recording, demo mining and browser authoring                                                                                      |
| **Practice Servers**           | Master switch for practice sessions, Discover, and every Practice button. Its settings are on [Practice Servers](/features/practice-servers#administration) |
| **Lineup Imports**             | Whether lineups can be imported, with a dry run first, and **Purge Imported** to remove only imported lineups                                               |
| **Re-scan demos**              | Rebuilds the meta from demos that have already been parsed. Does not re-parse them                                                                          |
| **Sync callouts**              | Refreshes the map callout names that lineups, meta spots and new throws are named from                                                                      |

### Utility Drift

**Utility Drift** (`/utility/drift`, administrators) shows what a map update did
to the lineups already saved on it. Pick a **Map**, a **From revision** and a
**To revision** (**Latest** by default), and **Start Scan**. Each lineup comes
back **Unchanged**, **Moved**, **Broken** (for example, the spot it's thrown
from was walled off), or **Not simulatable**, with how far its end point moved.
When a scan finishes, administrators get a **Utility drift scans** notification
with a link to it.

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
