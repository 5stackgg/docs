# Low-Latency Kernel on Ubuntu

A low-latency kernel lets the CPU switch to a game server's work sooner, which matters for Counter-Strike: hit registration and movement depend on every tick being processed on time, with as little jitter as possible.

It helps by:

- Minimizing processing delays in the operating system
- Providing more predictable response times
- Reducing system jitter and inconsistencies

::: warning

- Not every node needs it. Low latency trades some throughput for faster response.
- Keep a way back: the steps below only add a boot option, so removing it restores the old behaviour.
  :::

## Ubuntu 24.04 and newer (recommended)

Ubuntu no longer builds a separate low-latency kernel (it was dropped in 25.04). Canonical's replacement is the standard **generic** kernel booted with `preempt=full`, which makes the kernel fully preemptible. This also works on 24.04.

1. Add the boot option and update GRUB:

   ```bash
   echo 'GRUB_CMDLINE_LINUX_DEFAULT="$GRUB_CMDLINE_LINUX_DEFAULT preempt=full"' \
     | sudo tee /etc/default/grub.d/99-5stack-low-latency.cfg
   sudo update-grub
   ```

   Files in `/etc/default/grub.d/` are read after `/etc/default/grub`, so this adds to the boot options you already have instead of replacing them.

2. Reboot:

   ```bash
   sudo reboot
   ```

3. Verify that `preempt=full` is active:

   ```bash
   cat /proc/cmdline
   ```

   The output should include `preempt=full`.

Within a minute the node shows **Low Latency** on the Game Server Nodes page.

To undo it, delete `/etc/default/grub.d/99-5stack-low-latency.cfg`, run `sudo update-grub` and reboot.

## Legacy: the `linux-lowlatency` kernel

Older guides, including earlier versions of this one, installed the `linux-lowlatency` kernel. Ubuntu no longer builds it, so 5stack shows a warning on nodes that still run it. Move those nodes to the generic kernel:

1. Install the generic kernel and add the boot option from the section above:

   ```bash
   sudo apt update
   sudo apt install linux-generic
   echo 'GRUB_CMDLINE_LINUX_DEFAULT="$GRUB_CMDLINE_LINUX_DEFAULT preempt=full"' \
     | sudo tee /etc/default/grub.d/99-5stack-low-latency.cfg
   sudo update-grub
   ```

2. Reboot, then check that you are on the generic kernel:

   ```bash
   uname -r
   ```

   The output should end in `-generic`. If it still shows `lowlatency`, choose the generic kernel for the next boot first. One way to do this is [GrubReboot](https://wiki.debian.org/GrubReboot), for example `grub-reboot '1>4'`, where the numbers depend on your GRUB menu.

3. Once `uname -r` shows the generic kernel and `cat /proc/cmdline` includes `preempt=full`, remove the low-latency packages:

   ```bash
   LOWLAT_PACKAGES=$(dpkg --list | grep lowlatency | awk '{print $2}')
   sudo apt purge -y $LOWLAT_PACKAGES
   sudo update-grub
   ```

The warning on the node clears on its next status update.

:::info
For even better low-latency performance, set your [CPU Governor](./cpu-governance.md) to "performance" mode and make sure the setting persists after reboot.
:::
