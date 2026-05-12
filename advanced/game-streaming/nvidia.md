# NVIDIA GPU Setup

Game streaming on NVIDIA GPUs needs three things on every node that will run a streamer pod:

1. The NVIDIA driver and CUDA userland.
2. The NVIDIA Container Toolkit (so containerd can expose GPUs into pods).
3. The Kubernetes `nvidia` overlay applied to your cluster (registers the device plugin so pods can request `nvidia.com/gpu`).

## 1. Add the NVIDIA Container Toolkit repository

Before installing the drivers, install the prerequisites and add NVIDIA's apt repository so the container toolkit packages are available.

```bash
sudo apt-get update && sudo apt-get install -y --no-install-recommends \
    ca-certificates \
    curl \
    gnupg2

curl -fsSL https://nvidia.github.io/libnvidia-container/gpgkey | sudo gpg --dearmor -o /usr/share/keyrings/nvidia-container-toolkit-keyring.gpg \
  && curl -s -L https://nvidia.github.io/libnvidia-container/stable/deb/nvidia-container-toolkit.list | \
    sed 's#deb https://#deb [signed-by=/usr/share/keyrings/nvidia-container-toolkit-keyring.gpg] https://#g' | \
    sudo tee /etc/apt/sources.list.d/nvidia-container-toolkit.list

sudo apt-get update
```

## 2. Install the NVIDIA runtime

Install the CUDA toolkit and the container runtime packages so containerd can launch GPU-enabled containers:

```bash
sudo apt install -y \
    nvidia-container-toolkit \
    nvidia-container-runtime
```

## 3. Install the NVIDIA drivers

On Ubuntu / Debian-based hosts:

```bash
sudo apt install -y \
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

You should see your GPU(s) listed with the driver version.

::: warning Secure Boot
If Secure Boot is enabled, `nvidia-smi` won't load the driver because the kernel module isn't signed by a trusted key. Enroll NVIDIA's Machine Owner Key so the module is accepted:

```bash
sudo mokutil --import /var/lib/shim-signed/mok/MOK.der
```

You'll be prompted to set a one-time password. Reboot, complete MOK enrollment in the blue MOK Manager screen using that password, then re-run `nvidia-smi`. Alternatively, disable Secure Boot in your firmware.
:::

## 4. Restart K3s containerd

K3s detects the NVIDIA container runtime when it starts and adds the matching runtime entries to its generated containerd config. Restart the K3s agent on each GPU node:

```bash
sudo systemctl restart k3s-agent
```

Confirm the runtime was detected:

```bash
grep nvidia /var/lib/rancher/k3s/agent/etc/containerd/config.toml
```

You can now continue to the [game streaming setup](/advanced/game-streaming/#install).
