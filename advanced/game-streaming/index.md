# Game Streaming

5Stack renders CS2 on a GPU to [stream live matches](/features/live-streaming),
play demos back in the browser ([demo playback](/features/demo-playback)), and
render [highlights](/features/highlights). The same streamer pods do all three,
with a broadcast HUD from JTs Hud Manager (formerly OpenHud) laid over the game.
You can import other HUDs from **Settings → Application → Broadcast HUDs**.

## Requirements

Streamer pods run on [GPU nodes](/servers/gpu-nodes/). Set one up first by
following [Adding a GPU node](/servers/gpu-nodes/#adding-a-gpu-node), which
covers the GPU driver, the `setup-gpu-nodes.sh` script, and the Steam accounts
the pods log in with. This page covers what is specific to streaming.

## Playback domain

The playback domain is where viewers' browsers load streams from. It defaults to
`hls.<your web domain>`. To change it, re-run `./setup-gpu-nodes.sh` from your
panel install directory; it asks for the domain on every run, with the current
value as the default.

## Networking

Streams reach viewers through MediaMTX, which runs on the node labelled `5stack-mediamtx=true` using the host's network:

- The playback domain must resolve to that node.
- WebRTC media uses a single UDP port, **8189**. Forward it to that node so viewers outside your network connect directly. Without it, viewers can still often connect through STUN hole punching, but there's no TURN relay for game streams, so some networks won't.
- Viewers whose browser can't connect over WebRTC fall back to HLS over HTTPS on the same domain.
