# Match Replay (2D & 3D)

Every match in 5Stack can be replayed straight from the browser — no CS2
install, no downloading the demo. As soon as a demo is parsed, each map gets a
**2D** (radar) and **3D** replay you can scrub through.

> Replay reconstructs the round from the parsed demo data. It does **not** stream
> video, so it loads instantly and works on any device. For a true GOTV-style
> video feed with player POVs, see [In-Browser Demo Playback](/features/demo-playback).

## 2D Replay (radar)

A top-down view on the map's radar image. You get:

- **Timeline scrubbing** with a progress indicator, and playback speeds from
  **0.5× to 8×**.
- **Kill feed** — killer, victim, weapon, and headshots.
- **Utility** — smokes, HE, flashes, molotovs, and decoys, including throw
  trajectories.
- **Bomb events** — plant and defuse locations.
- **Buy round overlay** — each team's economy and loadout at the start of a round.
- **Player equipment** — weapons, grenades, armor, bomb, and defuser per player.

## 3D Replay

The same round rebuilt on the map's real geometry, rendered with WebGL:

- **Camera modes** — orbit, follow a player, or top-down.
- Right-drag to free-look, middle-drag to pan, scroll to zoom.
- **Roof-cut slider** to hide the upper part of the map so you can see the action
  underneath.
- **Utility heatmap** showing where grenades land most, plus a "ghost" of the
  thrower for a selected nade.
- All the same kill, bomb, and equipment data as the 2D view.

Replays open in their own window so you can keep the match open alongside them.

## HUD

Both views share the same HUD — live scores, round timer, bomb timer, and the
kill feed. You can toggle it on or off while watching.

## Map geometry

3D replay loads a lightweight collision **mesh** for each map. When a mesh isn't
available for a map, the 3D view automatically falls back to the flat radar, so
replay always works — the 3D geometry simply improves once the mesh exists.
