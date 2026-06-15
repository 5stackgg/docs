# Live Streaming

5Stack can broadcast a live match straight from the panel — rendered on a
[GPU node](/servers/gpu-nodes), with observer control, overlays, and a public
viewing hub. No OBS or third-party capture required.

## Watch hub

The watch hub is where viewers find the action: live tournaments, matches
streaming now, upcoming matches, recent highlights, and recently finished
matches. Matches with an active stream bubble to the top automatically.

Each match can surface multiple streams, and 5Stack also integrates external
sources — you can point a match at a **Twitch, YouTube, or Kick** stream.

## Stream Deck

The Stream Deck is the broadcaster's control panel:

- See all live, in-veto, and waiting matches.
- **Start / stop broadcasting** a match (with a confirm step so a stray click
  can't kill a live broadcast).
- **Spectator grid** — CT/T player slots fed by live game state; click a slot to
  spectate that player.
- **Autodirector** toggle for automatic spectator camera work.
- GPU availability and active stream count so you know your capacity.

## Scoreboard overlay

A drop-in scoreboard overlay can be layered on any stream embed. It shows the
current map score plus per-player K/D/A, HS%, damage, and ADR, and the results of
every map in the series. It has a compact mode for small windows.

Streams play over **WebRTC (WHEP)** for ultra-low latency, and you can **pop a
match out** into its own chromeless window to drag onto a second monitor.

## Admin controls

- **Minimum role to stream** — who can start a broadcast.
- **Minimum role to spectate** — who can watch.
- **Live video codec** — H.264 or H.265.
- **Playcast** — enable CS2's GOTV broadcast (Playcast) format so spectators
  connect to relay infrastructure instead of the game server, increasing viewer
  capacity while reducing load on the match server.

Live streaming renders on a [GPU node](/servers/gpu-nodes); make sure at least one
node has streaming enabled and a Steam account available in the pool.
