# NVIDIA GPU Setup

Game streaming on NVIDIA GPUs needs three things on every node that will run a streamer pod:

1. The NVIDIA driver and CUDA userland.
2. The NVIDIA Container Toolkit (so containerd can expose GPUs into pods).
3. The Kubernetes `nvidia` overlay applied to your cluster (registers the device plugin so pods can request `nvidia.com/gpu`).

## 1. Install drivers and the container toolkit

On Ubuntu / Debian-based hosts:

```bash
sudo apt install -y \
    nvidia-cuda-toolkit \
    nvidia-container-toolkit \
    nvidia-container-runtime \
    cuda-drivers-fabricmanager-590 \
    nvidia-headless-590-server-open \
    nvidia-utils-590-server \
    nvidia-driver-590-server-open
```

::: tip Driver version
The `590` package suffix tracks the driver branch. Pick the branch that matches your GPU and CUDA version — `nvidia-driver-590-server-open` is a recent open-kernel branch that works for the streamer pipeline. If `apt` doesn't have it, you may need NVIDIA's `cuda-keyring` repo: see [NVIDIA's installation guide](https://docs.nvidia.com/datacenter/tesla/driver-installation-guide/).
:::

Reboot, then verify:

```bash
nvidia-smi
```

You should see your GPU(s) listed with the driver version. and you can conitnue to the [game streaming setup](/advanced/game-streaming#install).
