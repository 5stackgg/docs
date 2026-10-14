# Match Replay (2D & 3D)

Every match in 5Stack can be replayed straight from the browser, no CS2
install, no downloading the demo. As soon as a demo is parsed, each map can be
replayed on the **replay stage**: the real map, rebuilt in your browser, viewed
from straight above (2D) or in 3D.

> Replay reconstructs the round from the parsed demo data. It does **not** stream
> video, and it runs entirely in your browser, so it needs no GPU node. For a true
> GOTV-style video feed with player POVs, see
> [In-Browser Demo Playback](/features/demo-playback).

## Opening a replay

On the match page, each map card has **2D** and **3D** buttons (**Open 2D
Replay** / **Open 3D Replay**), and the **Map Analysis** tab has the same pair.
They appear once the map's demo is parsed: **3D** on any map with a 3D model,
**2D** on the maps 5Stack has a radar calibration for. Both open the same player
in its own window, starting in the view you picked; switch at any time with the
**2D** / **3D** buttons or `V`.

The replay needs a browser with WebGL 2. On a phone or tablet, turn it to
landscape.

## The stage

- **2D** is the map seen from straight above, north up like the in-game radar,
  with the roofs cut away so you can see inside.
- **3D** tilts the same map; anything more than a storey and a half up turns into
  a see-through ghost, so roofs never block the action.
- **Themed maps**: each map is drawn as a clean, flat-shaded model in its own
  colors, with the bomb sites marked. Night versions of a map get a moonlit look.
- **Stacked maps** such as Nuke and Vertigo show **Both** floors side by side by
  default, or one floor at a time (**Upper** / **Lower**), following the player
  you follow. `L` switches between the two.

## What you see

- **Players**: an avatar (or slot number) with name, weapon, and a health ring.
  You can see who's crouching, who's blinded, and plant or defuse progress.
- **Shots**: every bullet, from the shooter's eye along their aim. Hits land on
  the body part they struck, misses stop where they hit the wall, and damage
  numbers float off the victim.
- **Smokes**: each smoke is rebuilt from CS2's own smoke simulation, so it fills
  the room, stops at walls, pours off ledges onto the floor below, and merges
  with other smokes the way it did in the game. HE grenades and the bomb blast
  punch holes in it.
- **Flashes**: players glow while blinded, for as long as they really were.
- **Utility**: grenades fly their real bounce paths, molotovs burn as one spreading
  pool of fire, and smokes, fires, and decoys carry countdowns.
- **Bomb**: the dropped or planted bomb and dropped defuse kits show through
  walls, the planted bomb counts down, and the explosion rolls through the map's
  corridors, using Valve's own bomb damage data on maps that ship it.

## Playing it back

- **Speeds** from **0.5×** to **8×**. Changing round skips freeze time, and
  playback rolls on into the next round.
- **Seek bar**: drag to scrub. Kills are marked in the victim's side color, with
  lanes for the bomb (plant, defuse attempts, defuse, explosion) and for utility;
  click a grenade there to highlight it on the map.
- **Round strip**: every round, colored by the side that won it.
- **HUD**: the score (counting only rounds already played, so it never spoils
  the result), the round, and the round clock or bomb timer.
- **Scoreboard**: each side's buy (**Full buy**, **Force buy**, **Eco**, or
  **Pistol**, with equipment value), and per player K/D/A, damage, health and
  armor, weapon, utility, kit, and bomb. Click a player to follow them. **Hide
  scoreboard** collapses it.
- **PLAY BY PLAY**: the round's events, newest first: kills with weapon and
  headshot, whether each death was traded and how fast, utility (flashes say who
  they blinded and for how long), and the bomb. On desktop it opens with a round
  summary: **Traded deaths**, **Enemies flashed**, **Team flashes**, **Flash
  assists**, and **Flashes by player**.

## Camera

Drag to pan, right-drag (or middle-drag) to orbit and tilt, and scroll to zoom
toward the cursor; on touch, one finger pans and two pinch, orbit, and tilt. Click
a player to follow them, or press `C` to follow the fight.

**BROADCAST** hands the camera to an auto-director that plans each round ahead,
cutting between fights, executes, plants, retakes, and clutches, with a caption
for each shot. It can slow down for big plays and speed through quiet stretches
(both toggles), and offers an instant **Replay** after a multi-kill or a fight it
cut away from. Move the camera yourself and it pauses; click it or press `B` to
resume.

## Analysis layers

| Layer               | What it shows                                                                                                 |
| ------------------- | ------------------------------------------------------------------------------------------------------------- |
| **TRACE**           | Each player's movement through the round                                                                      |
| **VISION**          | Fog of war: dims what a side can't see and draws who can see whom, for CT, T, or **BOTH** (`G`)               |
| Death markers       | Where each player died                                                                                        |
| Callouts            | The map's callout names                                                                                       |
| **UTILITY HEATMAP** | Where the round's grenades went off; click one to see its whole flight                                        |
| **UTIL SUMMARY**    | Stacks several buy rounds on one clock from the end of freeze time, to compare each team's setups and timings |

**UTIL** filters each grenade type on or off.

## Share and export

**Share** has:

- **Copy link to this moment**: a link that opens the replay at the same round,
  time, view, floor, followed player, and camera.
- **Export clip**: record **This round**, the **Last 10 seconds**, or **Mark in
  to mark out** (`I` / `O`) as a video file, right in your browser, up to 1080p
  at 60 fps, with the teams, score, round, and clock captioned.

## Keyboard shortcuts

| Key               | Action                  |
| ----------------- | ----------------------- |
| `Space`           | Play / pause            |
| `←` / `→`         | Step frame              |
| `[` / `]`         | Previous / next round   |
| `1` to `5`        | Speed                   |
| `I` / `O`         | Mark clip in / out      |
| `W` `A` `S` `D`   | Pan                     |
| `Z` / `X`, scroll | Zoom                    |
| `Q` / `E`         | Rotate (3D)             |
| `R` / `F`         | Tilt (3D)               |
| `Shift`           | Move faster             |
| `C`               | Follow on / off         |
| `0`               | Whole map               |
| `V`               | 2D / 3D                 |
| `B`               | Broadcast camera        |
| `G`               | Fog of war              |
| `L`               | Both floors / one floor |

## On phones and tablets

The controls are compact, and phones start with the scoreboard and play-by-play
collapsed. **BROADCAST**, the play-by-play, and the utility heatmap move into
**More options**, and only smokes are shown until you turn on other utility.

## Map models and older demos

The stage loads a 3D model of each map, published for each CS2 update.
Workshop maps get one from the map-asset job, which builds them from the
workshop downloads on your game server nodes, so a workshop map needs to have
been played on one of your servers first. Without a model, the **3D** button is
hidden and the replay says **The map for this replay couldn't load.**

The recorded smokes, real blind times, and hit locations come from demos parsed
by the current parser. Older matches still replay, with smokes and flashes
approximated, until their demo is reparsed.
