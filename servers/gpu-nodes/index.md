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
GPU nodes will not work under **WSL** (Windows Subsystem for Linux). They need
a native Linux host with direct GPU access. Use a bare-metal or virtualized
Linux install instead.
:::

## Adding a GPU node

1. [Create a game server node](#create-the-node) on the machine with the GPU.
2. [Install the GPU driver](#install-the-gpu-driver) on that node.
3. [Run `setup-gpu-nodes.sh`](#run-the-setup-script) on the panel server.
4. [Add Steam accounts](#steam-account-pool) to the pool on the **GPU Nodes**
   page.

### Create the node

A GPU node starts out as an ordinary
[game server node](/servers/game-server-nodes/create-game-server-node). Create
it the same way, on a native Linux host with the GPU installed.

### Install the GPU driver

Every GPU node needs its vendor's driver. NVIDIA also needs its container
runtime. Follow the guide for your GPU:

| Vendor                              | Status                                                                                        |
| ----------------------------------- | --------------------------------------------------------------------------------------------- |
| [NVIDIA](/servers/gpu-nodes/nvidia) | Supported                                                                                     |
| [AMD](/servers/gpu-nodes/amd)       | Supported on Strix Halo, experimental on other Radeon GPUs                                    |
| [Intel](/servers/gpu-nodes/intel)   | Not yet supported, [tracking issue #468](https://github.com/5stackgg/5stack-panel/issues/468) |

### Run the setup script

On the panel server, run:

```bash
sudo 5stack run setup-gpu-nodes.sh
```

Or pick **GPU node setup** in the [`5stack` menu](/service/command#the-menu).

The script will walk you through:

1. **GPU vendor selection**, NVIDIA, AMD, or Intel. Intel exits early with a link to the tracking issue.
2. **GPU node selection**, pick which nodes have GPUs. Run the script again to change the selection.
3. **Integrated GPUs** (AMD only), pick which of those nodes should render on the GPU integrated into their CPU. Leave nodes with a discrete Radeon card unticked. See [Integrated GPUs](/servers/gpu-nodes/amd#integrated-gpus).
4. **Steam credentials**, username and password for a dedicated account GPU nodes use to download CS2. Asked only when they aren't saved yet.
5. **Playback domain**, the domain viewers' browsers load [game streams](/advanced/game-streaming/) from (default `hls.<your web domain>`).

If the panel has to restart something to apply your choices, new matches are
held and live ones finish first.

::: warning Steam account must NOT have 2FA / Steam Guard
With Steam Guard or the Steam Mobile Authenticator on, every render gets stuck waiting for a code that nobody can enter.

**Use a dedicated Steam account with 2FA disabled.** Do not reuse a personal account.
:::

### Steam account pool

To render a demo, observe a live match or film a lineup preview, a GPU node has
to log into CS2 with a Steam account. GPU nodes draw from a shared **Steam
account pool** that you manage from the GPU Nodes page. Add at least as many
accounts as you have GPU nodes so each node can claim one; the page shows how
many accounts are available versus how many nodes are registered.

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
are filmed on a [practice server](/features/practice-servers) on a GPU node:

- Filming only runs on a GPU node that is enabled, has the **Rendering**
  workload turned on, and has a free GPU. Until one is free, the queue waits.
- It needs an account from the [Steam account pool](#steam-account-pool), and
  waits if none is free.
- The practice server respects **Reserved on-demand slots**, like any practice
  server, so previews cannot take the last slot from a scheduled match.
- **Pause Highlight Renders During Active Match** keeps lineup renders off a
  node while a match is live on it too.

Track the queue under **Media → Render Queue** in the admin navigation, on the
**Utility Lineups** tab.

::: tip Discover needs no GPU
[Discover](/features/utility-library#discover) also throws on a practice
server, but nothing is filmed, so its server is not tied to a GPU node.
:::

## Workloads

Each GPU runs one job at a time, and each GPU node has four workload switches,
under **GPU workloads** in its node control menu on **GPU Nodes** or **Game
Server Nodes**:

| Workload           | What it takes                                                               |
| ------------------ | --------------------------------------------------------------------------- |
| **Live streaming** | Live spectator [streams](/features/live-streaming)                          |
| **Demo playback**  | On-demand [demo replay](/features/demo-playback)                            |
| **Highlights**     | Match [highlight](/features/highlights) clips                               |
| **Rendering**      | [Utility lineup previews](#utility-lineup-previews)                         |

A node that is switched off (**Enabled** off) takes no GPU work at all. While
any workload is off, the node's inspector on **Game Server Nodes** says so
(**Some GPU workloads are off**).

The **GPU Nodes** page can filter by **Node type**:

- **GPU only**: a node with a GPU that hosts no matches and has no ports. It
  runs CS2 only to film lineup previews, so it needs **Rendering** on to
  install CS2 at all.
- **Match + GPU**: a node that hosts matches and does GPU work as well.
  **Pause Highlight Renders During Active Match** keeps renders off it while a
  match is live there.

Each GPU node also has **Video settings**: the CS2 graphics quality its jobs
render with, as a preset or **Custom**. Left on its default, CS2 tunes its video
settings to the card on first launch.

## Video encoding

**Settings → Application → Video Encoding** decides how every GPU job encodes.
NVIDIA nodes encode with NVENC and AMD nodes with VA-API, detected per node.
Saved settings apply to new jobs; running jobs and existing videos keep theirs.

- **Video Encoder**: **Auto (recommended)** encodes on the GPU and switches a
  job to the CPU if the GPU encoder fails. **GPU only** fails the job instead.
  **CPU only** always encodes on the CPU, in H.264, using more CPU cores. Every
  job still needs a GPU node to run CS2.
- **Live streams & demo playback**: **Live stream codec**, **H.264
  (recommended)** or **H.265 / HEVC**. HEVC is smaller at the same quality,
  but only Safari 17 and newer play it over WebRTC, so other browsers fall back
  to HLS. It falls back to H.264 on a GPU that can't encode HEVC.
- **Highlights & utility videos**: **Highlight codec**, **Highlight FPS** (60
  or 30) and **Highlight resolution** (1080p or 720p), for highlights, edited
  clips and utility videos.

See [AMD](/servers/gpu-nodes/amd#video-encoding) for what Auto does on AMD
cards.

## Monitoring

The GPU Nodes page shows each node's status, GPU, live usage, current task and
shader-bake state, with counts of free GPUs and Steam pool accounts at the top.
