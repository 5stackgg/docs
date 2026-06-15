# GPU Nodes

A **GPU node** is a [game server node](/servers/game-server-nodes/) that has a GPU
and is enabled for rendering work. GPU nodes power everything in 5Stack that
produces video:

- [In-browser demo playback](/features/demo-playback)
- [Live streaming](/features/live-streaming)
- [Highlights and clip rendering](/features/highlights)

Without a GPU node, the panel still works — matches, stats, and 2D/3D replay all
run fine — but those video features are unavailable.

## How it works

A GPU node runs real CS2 instances to render demos and live observers in a GPU
pod. Each render job (a demo session, a live stream, or a highlight render) boots
a pod, does its work, and frees the GPU again. The **GPU Nodes** admin page shows
the node roster with live GPU/VRAM usage, what each node is currently doing, and
how many GPUs are free in the pool.

## Adding a GPU node

A GPU node is created the same way as any other
[game server node](/servers/game-server-nodes/create-game-server-node) — the node
is detected as GPU-capable and can be enabled for streaming, demo playback, and
rendering.

### Steam account pool

To render a demo or observe a live match, the pod has to log into CS2 with a Steam
account. GPU nodes draw from a shared **Steam account pool** that you manage from
the GPU Nodes page. Add at least as many accounts as you have GPU nodes so each
node can claim one; the page shows how many accounts are available versus how many
nodes are registered.

::: warning
Use dedicated Steam accounts for the pool, not your personal account — an account
in use by a render job can't be used to play at the same time.
:::

### Shader baking

The first time a GPU node renders, CS2 compiles its shader cache, which can take a
while. 5Stack can **bake shaders** ahead of time from the GPU Nodes page so the
first real render isn't slowed down by compilation. Bake progress and logs are
shown inline per node.

## Monitoring

The GPU Nodes page surfaces, per node: status and region, GPU model and VRAM, live
GPU/memory graphs, the current task (live stream, demo playback, or highlight
render) with a snapshot preview, and shader-bake state. Pool-level counters at the
top show free vs. registered GPUs and Steam pool usage.
