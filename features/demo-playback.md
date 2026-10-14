# In-Browser Demo Playback

Demo Playback is a GOTV-style video viewer that runs the actual demo on a
[GPU node](/servers/gpu-nodes) and streams it back to your browser. Unlike the
[2D/3D replay](/features/match-replay) (which redraws the round from parsed data),
this is the real game render, so you get true player POVs, weapon view models,
and in-game HUD, with no CS2 install required.

Start it from the **Watch demo** button on a map card of the match page.
Playback opens in its own window. If a map has more than one demo, the button
becomes a menu where you pick which one to watch. When every GPU is in use the
button is disabled and says why.

When you start playback, a GPU pod boots (allocating a GPU, launching Steam and
CS2, loading the demo) before the stream begins, and the window shows each stage
as it happens.

## What you can do

- **Spectate any player**: click a player in the CT/T slot grid, or press the
  number keys, to follow whoever you want.
- **Timeline**: a seek bar with a skull for every kill (colored by the victim's
  team, bolder for headshots) and a tick for every round start. Hover for the
  round and time, click or drag to seek; clicks near a round marker snap to the
  round start. A strip of round numbers above it, colored by the round's winner,
  jumps straight to a round. While CS2 catches up after a seek, the clock pulses.
- **Round and kill navigation**: jump round-to-round, kill-to-kill, or 15 seconds
  back and forward. Pick a player to step only through their kills (**Kills
  by**) or their deaths (**Deaths of**); otherwise kill navigation follows the
  spectated player.
- **Speed**: 0.25× to 4×.
- **X-ray**: see players through walls (great for review; on by default).
- **HUD**: pick any [broadcast HUD](/features/live-streaming#broadcast-huds) from
  your library, hide it, or swap its sides. **Toggle CS2 demo HUD** opens or
  closes CS2's own demo playback bar.
- **Auto director**: let the spectator camera follow the action automatically, or
  drive it yourself.
- **Scoreboard**: hold to view the live scoreboard.
- **Reload demo** if the game gets stuck.

Streamers can also create [clips](/features/highlights) directly during
playback, from a preset or in the clip editor.

### Keyboard shortcuts

Press **?** for the full list.

| Key        | Action                  |
| ---------- | ----------------------- |
| `Space`    | Play / pause            |
| `←` / `→`  | Skip back / forward 15s |
| `[` / `]`  | Previous / next round   |
| `P` / `N`  | Previous / next kill    |
| `1` to `0` | Switch player           |
| `X`        | Toggle x-ray            |
| `H`        | Hide / show the HUD     |
| `R`        | Reload demo             |

## Admin controls

- Demo playback requires at least one **[GPU node](/servers/gpu-nodes)** with demo
  playback enabled, plus a Steam account in the pool for the pod to log in with.
- Playback is available to match organizers and to the **Streamer** role and
  above.
- The default HUD is set on **Settings → Application → Broadcast HUDs**.
