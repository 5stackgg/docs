# CPU Pinning

CPU pinning gives each Counter-Strike server its own CPU cores, so other processes on the node don't interfere with it. Players get more consistent tick rates and lower latency.

## Configuration

On the node, add the following configuration:

::: code-group

```[/etc/rancher/k3s/config.yaml]
kubelet-arg:
  - "cpu-manager-policy=static"
  - "cpu-manager-reconcile-period=5s"
  - "system-reserved=cpu=1"
```

:::

One core is held back for the node itself. Every other core can take a server, so an 8-core node fits 7 servers at the default of 1 CPU per server, or 3 at 2.

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

Nodes set up before this change also reserve `kube-reserved=cpu=1`, so an 8-core node fits 6 servers instead of 7, and the panel warns about it on the node. To free the extra core, run this as root on the node while it has no matches:

```bash
sed -i '/kube-reserved/d' /etc/rancher/k3s/config.yaml && rm -f /var/lib/kubelet/cpu_manager_state && systemctl restart k3s-agent
```
