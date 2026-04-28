# Uninstalling 5Stack Panel

Follow the steps below to completely remove the 5Stack Panel, all game nodes, and related components from your system.

---

## Uninstall Panel and Game Nodes

### Main Panel Server

Run the following command on the main panel server:

```bash
/usr/local/bin/k3s-uninstall.sh
```

## Game Server Nodes

Run the following command on each game server node:

```bash
/usr/local/bin/k3s-agent-uninstall.sh
```

:::warning
Tailscale should be removed next. Follow the instructions below.
:::

## Remove 5Stack systemd Helpers

The panel and game node installers add standalone systemd helpers (a CPU state check and a Tailscale state check + timer). These are not removed by the k3s uninstallers — clean them up on each host where they were installed:

```bash
systemctl disable --now 5stack-tailscale-state-check.timer 2>/dev/null || true
rm -f /etc/systemd/system/5stack-tailscale-state-check.timer
rm -f /etc/systemd/system/5stack-tailscale-state-check.service
rm -f /usr/local/bin/5stack-tailscale-state-check.sh
rm -f /usr/local/bin/5stack-cpu-state-check.sh
systemctl daemon-reload
```

## Remove Tailscale

To disconnect and remove Tailscale state, run:

```bash
tailscale logout
tailscale down
rm -rf /var/lib/tailscale/tailscaled.state
```

### Uninstall Tailscale Completely

To fully uninstall Tailscale, run:

```bash
apt-get remove tailscale
```

## 5Stack Panel Files

Then you will want to remove all files associated with 5Stack Panel under `/opt/5stack`

```bash
rm -rf /opt/5stack
```
