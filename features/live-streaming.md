# Live Streaming

5Stack can broadcast a live match straight from the panel, rendered on a
[GPU node](/servers/gpu-nodes), with observer control, overlays, and a public
viewing hub. No OBS or third-party capture required.

## Watch hub

The watch hub is where viewers find the action: live tournaments, matches
streaming now, upcoming matches, recent highlights, and recently finished
matches. Matches with an active stream bubble to the top automatically.

Each match can surface multiple streams, and 5Stack also integrates external
sources. You can point a match at a **Twitch, YouTube, or Kick** stream.

## Stream Deck

The Stream Deck is the broadcaster's control panel:

- See all live, in-veto, and waiting matches.
- **Start / stop broadcasting** a match (with a confirm step so a stray click
  can't kill a live broadcast).
- **Spectator grid**: CT/T player slots fed by live game state; click a slot to
  spectate that player.
- **Autodirector** toggle for automatic spectator camera work.
- GPU availability and active stream count so you know your capacity.

## Scoreboard overlay

A drop-in scoreboard overlay can be layered on any stream embed. It shows the
current map score plus per-player K/D/A, HS%, damage, and ADR, and the results of
every map in the series. It has a compact mode for small windows.

Streams play over **WebRTC (WHEP)** for ultra-low latency, and you can **pop a
match out** into its own chromeless window to drag onto a second monitor.

## Picture-in-picture

Start watching, then keep browsing. A live stream **detaches into a floating,
resizable player** that follows you through the app, so a match keeps playing
while you dig into stats. Check another match, or sit on the watch hub. The
scoreboard pulldown works inside the floating frame too.

## Signalling

WebRTC peer negotiation runs on 5Stack's **own signalling server**, inside your
install. There's no dependency on a third-party streaming or signalling service,
and no per-viewer vendor cost.

## Admin controls

- **Minimum role to connect to TV (delayed)**: GOTV broadcast viewers connect to
  the delayed TV port, so broadcast delay applies. Safe for casters and audiences.
- **Minimum role to spectate (no delay)**: real-time spectating connects
  directly to the game server with no delay. Restrict this to trusted roles to
  prevent ghosting.
- **Require sign-in to view live streams**: hide live game streams from
  signed-out visitors, so every viewer is an identifiable account. 5Stack also
  blocks players and coaches of a live match from watching their own game, which
  closes the most obvious ghosting route.
- **Live video codec**: H.264 (recommended, broadest compatibility and the
  lowest-latency WebRTC path everywhere) or H.265/HEVC (~30% smaller at matched
  quality, but HEVC-over-WebRTC is Safari 17+ only; other browsers fall back to
  HLS, and H.265 falls back to H.264 if the GPU lacks NVENC HEVC).
- **Playcast**: enable CS2's GOTV broadcast (Playcast) format so spectators
  connect to relay infrastructure instead of the game server, increasing viewer
  capacity while reducing load on the match server.

Live streaming renders on a [GPU node](/servers/gpu-nodes); make sure at least one
node has streaming enabled and a Steam account available in the pool.
