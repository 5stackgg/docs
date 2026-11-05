# In-Browser Demo Playback

Demo Playback plays a match's demo in your browser as the real game, streamed
from a [GPU node](/servers/gpu-nodes/). Unlike the
[2D/3D replay](/features/match-replay), you get true player POVs, weapon view
models, and the in-game HUD, with no CS2 install required.

Start it from the **Watch demo** button on a map card of the match page.
Playback opens in its own window. If a map has more than one demo, the button
becomes a menu where you pick which one to watch. When every GPU is in use the
button is disabled and says why.

Playback takes a moment to start, and the window shows each stage as it
happens.

## What you can do

- **Spectate any player**: click a player in the CT/T slot grid, or press the
  number keys, to follow whoever you want.
- **Timeline**: a seek bar with a skull for every kill and a tick for every
  round start. Click or drag to seek, or click a round number above it to jump
  straight to that round.
- **Round and kill navigation**: jump round-to-round, kill-to-kill, or 15 seconds
  back and forward. Pick a player to step only through their kills (**Kills
  by**) or their deaths (**Deaths of**); otherwise kill navigation follows the
  spectated player.
- **Speed**: 0.25× to 4×.
- **X-ray**: see players through walls (on by default).
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

- Demo playback requires at least one **[GPU node](/servers/gpu-nodes/)** with demo
  playback enabled, plus a Steam account in the pool.
- Playback is open to the **Who can watch demos** role under **Settings →
  Application → Demos** (default Verified User), and match organizers can
  always watch their own matches. See [Demos](/features/demos#admin-controls).
- The default HUD is set on **Settings → Application → Broadcast HUDs**.
