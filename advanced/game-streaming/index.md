# Game Streaming

5Stack renders CS2 on a GPU to [stream live matches](/features/live-streaming),
play demos back in the browser ([demo playback](/features/demo-playback)), and
render [highlights](/features/highlights), with a broadcast HUD from JTs Hud
Manager (formerly OpenHud) laid over the game. You can import other HUDs from
**Settings → Application → Broadcast HUDs**.

## Requirements

Streaming needs a [GPU node](/servers/gpu-nodes/). Set one up first by
following [Adding a GPU node](/servers/gpu-nodes/#adding-a-gpu-node).

## Playback domain

The playback domain is where viewers' browsers load streams from. It defaults to
`hls.<your web domain>`. To change it, run `sudo 5stack run setup-gpu-nodes.sh`
on the panel server again; it asks for the domain on every run, with the current
value as the default.

## Networking

Streams reach viewers from the node labelled `5stack-mediamtx=true`:

- The playback domain must resolve to that node.
- Forward UDP port **8189** to that node so viewers outside your network connect directly. Without it, many viewers can still connect, but some networks won't.
