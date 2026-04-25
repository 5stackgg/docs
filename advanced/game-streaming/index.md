# Game Streaming

5Stack can spectate live matches and render highlight clips from match demos. Match organizers see "Start Live Stream", "Stop Live Stream", and "Create Clips" actions on the match detail page; clicking them tells the API to run the work on any game server node that has been labeled as a GPU node.

## Requirements

- At least one [game server node](/servers/game-server-nodes/) with a supported GPU and the relevant Kubernetes runtime installed (see GPU vendor pages below).
- A Steam account dedicated to the streamer.

## GPU Support

| Vendor | Status |
|---|---|
| [NVIDIA](/advanced/game-streaming/nvidia) | Supported |
| [AMD](/advanced/game-streaming/amd) | Not yet supported — [tracking issue #467](https://github.com/5stackgg/5stack-panel/issues/467) |
| [Intel](/advanced/game-streaming/intel) | Not yet supported — [tracking issue #468](https://github.com/5stackgg/5stack-panel/issues/468) |

::: warning Steam account must NOT have 2FA / Steam Guard
The streamer logs into Steam non-interactively via `steamcmd` to download and run CS2. Steam Guard / Steam Mobile Authenticator will break this — every Job will get stuck waiting for a code that nobody can enter.

**Use a dedicated Steam account with 2FA disabled.** Do not reuse a personal account.
:::

## Install

Make sure the GPU drivers and Kubernetes runtime are set up on every node that will run the streamer — see [NVIDIA](/advanced/game-streaming/nvidia) for the full driver/toolkit steps.

From your panel install directory, run:

```bash
./game-streamer.sh
```

The script will walk you through:

1. **GPU vendor selection** — NVIDIA, AMD, or Intel. AMD and Intel exit early with a link to the tracking issue.
2. **GPU node selection** — pick which cluster nodes have GPUs (multi-select). The script labels selected nodes with `nvidia-gpu=true` and `5stack-game-streamer=true`. Re-running the script with a different selection will add the labels to newly-selected nodes and remove them from previously-selected nodes.
3. **Steam credentials** — username and password for the dedicated streamer account.

Your selections are persisted to `.5stack-env.config` 