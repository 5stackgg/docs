# CPU Governance

The CPU governor controls how your CPU manages its frequency and power use.

## Recommended Configuration

For game servers, it is **strongly recommended** to set the CPU governor to `performance` for consistent, low-latency performance.

## Ubuntu/Debian Configuration

On an Ubuntu 22.04 or newer node, **Set CPU Governor to Performance** in the node inspector does this for you; see [Tuning a node](/servers/game-server-nodes/managing#tuning-a-node).

On Ubuntu or Debian, you can also install `cpufrequtils` and set the governor yourself:

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
