# CPU Governance

Your server has a concept of CPU governance, which controls how the CPU manages its frequency and power consumption. There are several governor modes available, each with different characteristics.

## Recommended Configuration

For game servers. It is **strongly recommended** to set the CPU governor to `performance` to ensure consistent, low-latency performance.

## Ubuntu/Debian Configuration

On an Ubuntu 22.04 or newer node, **Set CPU Governor to Performance** in the node inspector does this for you; see [Tuning a node](/servers/game-server-nodes/managing#tuning-a-node).

If you're using Ubuntu or Debian. You can install `cpufrequtils` and configure the governor:

```bash
   apt update
   apt install cpufrequtils
   echo 'GOVERNOR="performance"' | sudo tee /etc/default/cpufrequtils
   systemctl restart cpufrequtils
```

## Verification

To verify your current CPU governor settings:

```bash
cat /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor
```
