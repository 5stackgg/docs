# Installing Low-Latency Kernel on Ubuntu

The low-latency kernel is optimized for systems that require minimal latency, which is crucial for Counter-Strike game servers. In competitive gaming, especially Counter-Strike, even milliseconds of delay can impact player performance and gameplay experience.

## Why Low-Latency Kernel for Counter-Strike Servers?

Counter-Strike is an extremely latency-sensitive game where:

- Player actions like shooting and movement need to be processed as quickly as possible
- Lower system latency gives players better hit registration and movement accuracy
- Competitive play demands minimal delay between player input and server response
- High-performance servers need to handle 10+ concurrent players with minimal lag

A low-latency kernel helps achieve these requirements by:

- Minimizing processing delays in the operating system
- Providing more predictable response times
- Reducing system jitter and inconsistencies
- Optimizing CPU scheduling for real-time game server processes
- Improving network packet processing speed

For Counter-Strike servers, the target is to maintain system latency yo ensure optimal competitive gameplay. The low-latency kernel is a key component in achieving this goal alongside proper server configuration.

## Prerequisites

This guide provides instructions for installing the low-latency kernel on Ubuntu systems.

::: warning

- Not all applications require a low-latency kernel
- The low-latency kernel sacrifices some throughput for better latency
- Keep both standard and low-latency kernels installed for testing and backup
  :::

## Installation Steps

1. Update your package lists and install the low-latency kernel:

   ```bash
   apt update
   apt install linux-lowlatency
   ```

2. Once installation is complete, reboot your system:

   ```bash
   reboot now
   ```

3. After rebooting, verify that the low-latency kernel is active:

   ```bash
   uname -r
   ```

   The output should show "lowlatency" in the kernel version.

## Kernel Parameter Optimization

After installing the low-latency kernel, you'll want to optimize several kernel parameters for better performance:

1. Configure TCP and system parameters by editing sysctl configuration:

   ```bash
   nano /etc/sysctl.conf
   ```

   Add or modify the following lines:

   ```bash
   # TCP Low Latency Settings
   net.ipv4.tcp_low_latency = 1
   net.ipv4.tcp_congestion_control = cubic
   ```

   Next, apply the changes by running:

   ```bash
   sysctl -p
   ```

2. Verify the settings:

   ```bash
   # Check TCP settings
   sysctl net.ipv4.tcp_low_latency
   sysctl net.ipv4.tcp_congestion_control
   ```

:::info
For even better low-latency performance, consider setting your [CPU Governor](./cpu-governance.md) to "performance" mode and ensuring this setting persists after reboot.
:::

## Reverting to Standard Kernel

If needed, you can switch back to the standard kernel:

1. Boot into the standard kernel from GRUB menu
2. Remove the low-latency kernel:
   ```bash
   apt remove linux-lowlatency
   LOWLAT_PACKAGES=$(dpkg --list | grep lowlatency | awk '{print $2}')
   apt purge -y $LOWLAT_PACKAGES
   update-grub
   ```
