# AMD GPU Setup

A [GPU node](/servers/gpu-nodes/) with an AMD Radeon GPU needs only the `amdgpu`
kernel driver. There is no container toolkit, containerd runtime or device plugin
to install: the render image ships its own Mesa Vulkan and VA-API drivers, and
render pods reach the GPU directly.

::: warning Tested hardware
AMD support has been tested on an integrated **Radeon 8060S** (Ryzen AI Max).
Discrete Radeon cards haven't been through the same testing yet.
:::

## 1. Check the kernel driver

On each GPU node, run:

```bash
lspci -k | grep -A3 -E 'VGA|Display'
ls /dev/dri
```

You should see `Kernel driver in use: amdgpu` under your GPU, and a
`renderD128` (or similar) entry in `/dev/dri`. Ubuntu's stock kernel includes
`amdgpu`. If the driver isn't loaded, install `linux-firmware` and a kernel
recent enough for your GPU, then reboot.

Unlike [NVIDIA](/servers/gpu-nodes/nvidia), there is nothing to set up in K3s and
no kernel parameter to add.

## 2. Run the setup script

[Run `setup-gpu-nodes.sh`](/servers/gpu-nodes/#run-the-setup-script) from your
panel install directory and pick **AMD**. The script labels each selected node
`5stack-gpu-vendor=amd` and `5stack-game-streamer=true`, and removes
`nvidia-gpu` from it, since a node carrying both stays on the NVIDIA path.

### Integrated GPUs

After the node list, the script asks which of those nodes have an integrated GPU
(an APU), and labels them `5stack-gpu-integrated=true`. Integrated GPUs need
this opt-in:

- **Without it**, a node whose only AMD GPU is integrated reports no GPU.
- **With it**, a node that has both an integrated and a discrete GPU uses the
  integrated one.

An integrated GPU takes its memory from system RAM, which CS2 also uses. Render
pods default to a 16 GiB memory limit and an 8 GiB request. To change that on
AMD nodes, set both `GAME_STREAMER_AMD_MEMORY_LIMIT` and
`GAME_STREAMER_AMD_MEMORY_REQUEST` (for example `24Gi` and `12Gi`, with the
request no larger than the limit) in `overlays/config/api-config.env`, then run
`./update.sh`.

If something else on the machine also uses the integrated GPU heavily, viewers
can see short stutters while it saturates the GPU. A dedicated GPU doesn't show
this.

## Video encoding

AMD nodes encode with VA-API: live streams and demo playback in H.264 or
H.265 / HEVC, and highlights and utility clips through to their final MP4. A
request for HEVC on a GPU that can't encode it gets H.264 instead.

Under **Settings → Application → Video Encoding**, **Auto** retries a capture on
the CPU once if the GPU encoder fails to start or dies mid-render, and the next
job tries the GPU again. **GPU only** fails the job instead, and **CPU only**
always encodes on the CPU in H.264.

The **GPU Nodes** page shows the card by name with its VRAM, shared memory, load,
temperature and power, and the encoder each live stream and demo capture used.
AMD nodes only read these values. They never change GPU clocks or power levels.
