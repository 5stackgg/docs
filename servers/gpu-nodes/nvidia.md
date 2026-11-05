# NVIDIA GPU Setup

A [GPU node](/servers/gpu-nodes/) with an NVIDIA GPU needs the NVIDIA driver
and the NVIDIA Container Toolkit. Steps 1 to 5 below install them on each GPU
node. [`setup-gpu-nodes.sh`](/servers/gpu-nodes/#run-the-setup-script) does the
rest.

## 1. Add the NVIDIA Container Toolkit repository

Before installing the drivers, install the prerequisites and add NVIDIA's apt repository.

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

## 2. Install the NVIDIA drivers

On Ubuntu / Debian-based hosts:

```bash
sudo ubuntu-drivers autoinstall
```

This picks the recommended driver branch for your GPU automatically. To pin a specific branch, see [NVIDIA's installation guide](https://docs.nvidia.com/datacenter/tesla/driver-installation-guide/).

Reboot, then verify:

```bash
nvidia-smi
```

You should see your GPU(s) listed with the driver version.

::: warning Secure Boot {#secure-boot}
If Secure Boot is enabled, `nvidia-smi` won't load the driver. Enroll NVIDIA's Machine Owner Key:

```bash
sudo mokutil --import /var/lib/shim-signed/mok/MOK.der
```

You'll be prompted to set a one-time password. Reboot, complete MOK enrollment in the blue MOK Manager screen using that password, then re-run `nvidia-smi`. Alternatively, disable Secure Boot in your firmware.

5Stack warns on the node while Secure Boot keeps the NVIDIA driver from loading.
:::

## 3. Turn on kernel modesetting {#modeset}

Clip renders need the driver's kernel modesetting. Check it:

```bash
cat /sys/module/nvidia_drm/parameters/modeset
```

If it prints `N`, edit `/etc/default/grub`: remove `nomodeset` from `GRUB_CMDLINE_LINUX_DEFAULT` if it's there, and add `nvidia-drm.modeset=1`, keeping the line's other options. For example:

```bash
GRUB_CMDLINE_LINUX_DEFAULT="quiet splash nvidia-drm.modeset=1"
```

Apply it and reboot:

```bash
sudo update-grub
sudo reboot
```

The check should now print `Y`. Without it, renders still work through a fallback, and each clip logs `nvidia-drm modeset is OFF — using ximagesrc`. 5Stack also warns on the node while modesetting is off.

## 4. Install the NVIDIA runtime

Install the container runtime packages:

```bash
sudo apt install -y \
    nvidia-container-toolkit \
    nvidia-container-runtime
```

## 5. Restart K3s

Restart the K3s agent on each GPU node so it picks up the NVIDIA runtime:

```bash
sudo systemctl restart k3s-agent
```

Confirm the runtime was detected:

```bash
grep nvidia /var/lib/rancher/k3s/agent/etc/containerd/config.toml
```

You can now continue to [run the setup script](/servers/gpu-nodes/#run-the-setup-script).
