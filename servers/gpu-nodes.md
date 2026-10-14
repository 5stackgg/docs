# GPU Nodes

A **GPU node** is a [game server node](/servers/game-server-nodes/) that has a GPU
and is enabled for rendering work. GPU nodes power everything in 5Stack that
produces video:

- [In-browser demo playback](/features/demo-playback)
- [Live streaming](/features/live-streaming)
- [Highlights and clip rendering](/features/highlights)
- [Utility lineup preview clips and stills](#utility-lineup-previews)

Without a GPU node, the panel still works, matches, stats, and 2D/3D replay all
run fine, but those video features are unavailable.

::: warning WSL is not supported
GPU nodes will not work under **WSL** (Windows Subsystem for Linux). Game
streaming, highlights/clip rendering, and in-browser demo playback all require a
native Linux host with direct GPU access. Use a bare-metal or virtualized Linux
install instead.
:::

## How it works

A GPU node runs real CS2 instances to render demos and live observers in a GPU
pod. Each render job (a demo session, a live stream, or a highlight render)
boots a pod, does its work, and frees the GPU again. Lineup previews work a
little differently: one pod films the whole queue (see
[Utility lineup previews](#utility-lineup-previews)). The **GPU Nodes** admin
page shows the node roster with live GPU/VRAM usage, what each node is
currently doing, and how many GPUs are free in the pool.

## Adding a GPU node

A GPU node is created the same way as any other
[game server node](/servers/game-server-nodes/create-game-server-node), the node
is detected as GPU-capable and can be enabled for streaming, demo playback, and
rendering.

### Steam account pool

To render a demo, observe a live match or film a lineup preview, the pod has to
log into CS2 with a Steam account. GPU nodes draw from a shared **Steam account pool** that you manage from
the GPU Nodes page. Add at least as many accounts as you have GPU nodes so each
node can claim one; the page shows how many accounts are available versus how many
nodes are registered.

::: warning
Use dedicated Steam accounts for the pool, not your personal account. An account
in use by a render job can't be used to play at the same time.
:::

### Shader baking

The first time a GPU node renders, CS2 compiles its shader cache, which can take a
while. 5Stack can **bake shaders** ahead of time from the GPU Nodes page so the
first real render isn't slowed down by compilation. Bake progress and logs are
shown inline per node.

## Utility lineup previews

A lineup's [preview clip and stills](/features/utility-library#preview-clips-and-stills)
are filmed by a render pod that joins a
[practice server](/features/practice-servers) as a player while the practice
plugin directs the shots. The pod connects to the server over loopback, so the
two always run on the same node:

- The practice server is only booked on a GPU node that is enabled, has the
  **Rendering** workload turned on, and has a free GPU. Until one is free, the
  queue waits and checks again every minute.
- The pod logs into CS2 with an account from the
  [Steam account pool](#steam-account-pool), and waits if none is free.
- The practice server respects **Reserved on-demand slots**, like any practice
  server, so previews cannot take the last slot from a scheduled match.
- **Pause Highlight Renders During Active Match** keeps lineup renders off a
  node while a match is live on it too. The render's own practice server does
  not count.

One pod and one practice server film the whole queue. Between lineups the pod
asks the API what to film next: another lineup on the same map, a change of
level onto the next map in the queue, a short wait, or stop. The practice
server changes map instead of being replaced, and the GPU stays held while the
pod keeps asking. A live stream waiting for a GPU gets it at the next map
change, or when the queue runs dry. The pod stops after the queue has been
empty for a little over a minute, or after three lineups in a row fail, so the
next batch starts with a fresh client.

Each lineup is captured at 1080p and 60 fps, re-encoded with NVENC (x264 when
NVENC is unavailable) so a shared link plays inline in Discord, with six stills
cut from the capture. Track the queue under **System → Render Queue**, on the
**Utility Lineups** tab.

The practice server for a render runs as the game-server job `u-<match id>`,
and the render pod as `gs-nades-queue`.

::: tip Discover needs no GPU
[Discover](/features/utility-library#discover) also throws on a practice
server, but nothing is filmed, so its server is not tied to a GPU node.
:::

::: details Image overrides
`UTILITY_RENDER_STREAMER_IMAGE` and `UTILITY_RENDER_SERVER_IMAGE` on the API
override the game-streamer and game-server images for lineup renders only
(the server image also applies to Discover). Without them, renders use the
same images as everything else.
:::

## Monitoring

The GPU Nodes page surfaces, per node: status and region, GPU model and VRAM, live
GPU/memory graphs, the current task (live stream, demo playback, or highlight
render) with a snapshot preview, and shader-bake state. Pool-level counters at the
top show free vs. registered GPUs and Steam pool usage.
