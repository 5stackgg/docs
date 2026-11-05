# AMD GPU Setup

A [GPU node](/servers/gpu-nodes/) with an AMD Radeon GPU needs only the `amdgpu`
kernel driver. Unlike [NVIDIA](/servers/gpu-nodes/nvidia), there is nothing else
to install.

## Supported GPUs

What an AMD GPU can do depends on its video encoder:

| GPU family                                                   | Status                                                   |
| ------------------------------------------------------------ | -------------------------------------------------------- |
| Strix Halo (Ryzen AI Max)                                    | Supported, H.264 and HEVC                                |
| Other RDNA2, RDNA3 and RDNA3.5 GPUs, discrete and integrated | Experimental, H.264 and HEVC                             |
| RDNA4 (Radeon RX 9000 series)                                | Experimental, HEVC at 1080p, H.264 at other common sizes |
| RDNA1 (Radeon RX 5000 series) and Vega-based APUs            | Untested                                                 |
| Radeon RX 6400 / 6500 XT, and Vega or older discrete GPUs    | Not recommended, video is encoded on the CPU             |

Experimental GPUs should work but haven't been through the same testing. A GPU
whose encoder can't be used still renders CS2, but every capture is encoded on
the CPU, which isn't recommended for live streaming.

## 1. Check the kernel driver

On each GPU node, run:

```bash
lspci -k | grep -A3 -E 'VGA|Display'
ls /dev/dri
```

You should see `Kernel driver in use: amdgpu` under your GPU, and a
`renderD128` (or similar) entry in `/dev/dri`. If the driver isn't loaded:

- **Cloud and virtual machine kernels** leave the module out. Install it with
  `sudo apt install linux-firmware linux-modules-extra-$(uname -r)`.
- **Recent GPUs** need a recent kernel. On Ubuntu LTS, install the HWE kernel.
- **`nomodeset`** on the kernel command line (`cat /proc/cmdline`) stops `amdgpu`
  from loading. Remove it from `GRUB_CMDLINE_LINUX_DEFAULT` in `/etc/default/grub`
  and run `sudo update-grub`.

Reboot after any of these.

## 2. Run the setup script

[Run `sudo 5stack run setup-gpu-nodes.sh`](/servers/gpu-nodes/#run-the-setup-script)
on the panel server and pick **AMD**.

::: warning One vendor per cluster
The setup script configures every GPU node for the vendor you pick. Selecting an
NVIDIA node while picking AMD turns it into an AMD node with no GPU, and an
NVIDIA node you leave unselected stops being a GPU node. Mixing NVIDIA and AMD
GPU nodes in one cluster isn't supported by the script.
:::

### Integrated GPUs

After the node list, the script asks which of those nodes should render on the
GPU integrated into their CPU (an APU). Tick a node only when you want it to
render on its integrated GPU:

- **A node whose only AMD GPU is integrated** needs the tick, or it reports no GPU.
- **A node with a discrete Radeon card** should be left unticked, even if its CPU
  also has an integrated GPU, as every Ryzen 7000 and 9000 desktop CPU does.
  Ticked, it renders on the integrated GPU instead, or reports no GPU if the CPU
  has none.

On an integrated GPU, the VRAM shown on the **GPU Nodes** page is only the
memory reserved for it in the BIOS. The rest of what it uses comes from system
RAM, which CS2 also uses. Renders default to a 16 GiB memory limit and an
8 GiB request.

To change that on AMD nodes, set both as whole numbers with `Mi` or `Gi`, with
the request no larger than the limit:

```bash
sudo 5stack config set GAME_STREAMER_AMD_MEMORY_LIMIT=24Gi GAME_STREAMER_AMD_MEMORY_REQUEST=12Gi
```

The limit is also **Config → AMD GPU memory** in the
[`5stack` menu](/service/command#the-menu). Leave both unset to keep the
defaults. Any other value, including a request larger than the limit, stops
the panel's API from starting, and its log names the values it rejected.

If something else on the machine also uses the integrated GPU heavily, viewers
can see short stutters while it saturates the GPU.

## Video encoding

AMD nodes encode with VA-API, in H.264 or H.265 / HEVC. A request for HEVC on
a GPU that can't encode it gets H.264 instead.

Under **Settings → Application → Video Encoding**:

- **Auto** encodes on the GPU. If the GPU encoder fails to start or dies
  mid-capture, that capture is redone once on the CPU and the next one goes back
  to the GPU. A GPU without a usable encoder encodes on the CPU every time.
- **GPU only** fails the job instead of using the CPU.
- **CPU only** always encodes on the CPU in H.264.

The **GPU Nodes** page shows the card by name with its VRAM, load, temperature
and power, and the encoder each live stream and demo capture used.
