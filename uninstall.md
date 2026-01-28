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
