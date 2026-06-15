# In-Browser Demo Playback

Demo Playback is a GOTV-style video viewer that runs the actual demo on a
[GPU node](/servers/gpu-nodes) and streams it back to your browser. Unlike the
[2D/3D replay](/features/match-replay) (which redraws the round from parsed data),
this is the real game render — so you get true player POVs, weapon view models,
and in-game HUD, with no CS2 install required.

When you start playback, a GPU pod boots (allocating a GPU, launching Steam and
CS2, loading the demo) before the stream begins. If a map has more than one demo,
you can pick which one to watch.

## What you can do

- **Spectate any player** — jump between the ten player slots to follow whoever
  you want.
- **X-ray** — see players through walls (great for review; on by default).
- **HUD** — toggle the overlay and switch between horizontal and vertical layouts.
- **Autodirector** — let the spectator camera follow the action automatically, or
  drive it yourself.
- **Round and kill navigation** — jump round-to-round or kill-to-kill.
- **Scoreboard** — hold to view the live scoreboard.

Streamers can also create [clips](/features/highlights) directly during
playback.

## Admin controls

- Demo playback requires at least one **[GPU node](/servers/gpu-nodes)** with demo
  playback enabled, plus a Steam account in the pool for the pod to log in with.
- Who can start playback and who can spectate are controlled by minimum-role
  settings.
- The default HUD layout is configurable.
