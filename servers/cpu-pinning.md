# CPU Pinning

CPU pinning is particularly beneficial for Counter-Strike servers as it helps reduce latency and improve performance by dedicating specific CPU cores to the game server process. This prevents other system processes from interfering with the game server's CPU usage, leading to more consistent tick rates and lower latency for players.

## Configuration

Add the following configuration to enable static CPU Manager policy:

::: code-group

```[/etc/rancher/k3s/config.yaml]
kubelet-arg:
  - "cpu-manager-policy=static"
  - "cpu-manager-reconcile-period=5s"
  - "system-reserved=cpu=1"
```

:::

The one reserved core runs k3s and the node connector. Every other core can take a server, so an 8-core node runs 7 servers at one CPU each.

## Applying Changes

After making the configuration changes, follow these steps to apply them:

1. Remove the existing CPU manager state:

   ```bash
   rm /var/lib/kubelet/cpu_manager_state
   ```

2. Restart the K3s agent service:
   ```bash
   systemctl restart k3s-agent
   ```

## Nodes that reserve two cores

Nodes set up before this change also reserve `kube-reserved=cpu=1`, so an 8-core node fits 6 servers instead of 7, and the panel warns about it on the node. To free the extra core, run this on the node while it has no matches:

```bash
sed -i '/kube-reserved/d' /etc/rancher/k3s/config.yaml && rm -f /var/lib/kubelet/cpu_manager_state && systemctl restart k3s-agent
```
