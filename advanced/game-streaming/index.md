# Game Streaming

5Stack renders CS2 on a GPU to [stream live matches](/features/live-streaming),
play demos back in the browser ([demo playback](/features/demo-playback)), and
render [highlights](/features/highlights). The same streamer pods do all three,
with a broadcast HUD from JTs Hud Manager (formerly OpenHud) laid over the game.
You can import other HUDs from **Settings → Application → Broadcast HUDs**.

## Requirements

- At least one [game server node](/servers/game-server-nodes/) with a supported GPU and the relevant Kubernetes runtime installed (see GPU vendor pages below).
- A Steam account dedicated to the streamer.
- A native Linux host. **WSL is not supported.**

## GPU Support

| Vendor                                    | Status                                                                                        |
| ----------------------------------------- | --------------------------------------------------------------------------------------------- |
| [NVIDIA](/advanced/game-streaming/nvidia) | Supported                                                                                     |
| [AMD](/advanced/game-streaming/amd)       | Not yet supported, [tracking issue #467](https://github.com/5stackgg/5stack-panel/issues/467) |
| [Intel](/advanced/game-streaming/intel)   | Not yet supported, [tracking issue #468](https://github.com/5stackgg/5stack-panel/issues/468) |

::: warning Steam account must NOT have 2FA / Steam Guard
The streamer logs into Steam non-interactively via `steamcmd` to download and run CS2. Steam Guard / Steam Mobile Authenticator will break this, every Job will get stuck waiting for a code that nobody can enter.

**Use a dedicated Steam account with 2FA disabled.** Do not reuse a personal account.
:::

## Install

Make sure the GPU drivers and Kubernetes runtime are set up on every node that will run the streamer. See [NVIDIA](/advanced/game-streaming/nvidia) for the full driver/toolkit steps.

From your panel install directory, run:

```bash
./game-streamer.sh
```

The script will walk you through:

1. **GPU vendor selection**, NVIDIA, AMD, or Intel. AMD and Intel exit early with a link to the tracking issue.
2. **GPU node selection**, pick which cluster nodes have GPUs (multi-select). The script labels selected nodes with `nvidia-gpu=true` and `5stack-game-streamer=true`. Re-running the script with a different selection will add the labels to newly-selected nodes and remove them from previously-selected nodes.
3. **Steam credentials**, username and password for the dedicated streamer account. Asked only when they aren't saved yet.
4. **Playback domain**, the domain viewers' browsers load streams from (default `hls.<your web domain>`). Asked every run, with the current value as the default.

Your selections are persisted to `.5stack-env.config`, and the script finishes by running `update.sh` to apply them.

## Networking

Streams reach viewers through MediaMTX, which runs on the node labelled `5stack-mediamtx=true` using the host's network:

- The playback domain must resolve to that node.
- WebRTC media uses a single UDP port, **8189**. Forward it to that node so viewers outside your network connect directly. Without it, viewers can still often connect through STUN hole punching, but there's no TURN relay for game streams, so some networks won't.
- Viewers whose browser can't connect over WebRTC fall back to HLS over HTTPS on the same domain.
