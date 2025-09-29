# CPU Governance

Your server has a concept of CPU governance, which controls how the CPU manages its frequency and power consumption. There are several governor modes available, each with different characteristics.

## Available CPU Governors

| Governor       | Description                                        |
| -------------- | -------------------------------------------------- |
| `performance`  | CPU runs at maximum frequency at all times         |
| `powersave`    | CPU runs at minimum frequency to save power        |
| `ondemand`     | CPU frequency scales based on current load         |
| `conservative` | Similar to ondemand but more gradual scaling       |
| `userspace`    | Allows manual control of CPU frequency             |
| `schedutil`    | Uses scheduler information for frequency decisions |

## Recommended Configuration

For game servers, it is **strongly recommended** to set the CPU governor to `performance` to ensure consistent, low-latency performance.

## Ubuntu/Debian Configuration

If you're using Ubuntu or Debian, you can install `cpufrequtils` and configure the governor:

1. Install cpufrequtils:

   ```bash
   apt update
   apt install cpufrequtils
   ```

2. Edit the configuration file:

   ```bash
   nano /etc/default/cpufrequtils
   ```

3. Set the governor to performance:

   ```bash
   GOVERNOR="performance"
   ```

4. Restart the service:
   ```bash
   systemctl restart cpufrequtils
   ```

## Verification

To verify your current CPU governor settings:

```bash
cat /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor
```
