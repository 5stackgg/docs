# Add a Game Server Node

On a panel with the 5Stack service, you add a game server node by running one
command on it and typing the code it shows into the panel. No keys or tokens are
copied by hand.

<ArchitectureDiagram flows="running,join" />

Pick **Add a node** to see what happens when a node joins, and click a box to see
what it does.

## Before you start

- The node meets the
  [game server node requirements](/servers/game-server-nodes/requirements). It
  runs Linux on x86_64 or arm64, with `curl` and OpenSSL 3 or newer.
- Your panel has Tailscale set up. You give it a Tailscale OAuth client during
  [install](/service/install#tailscale-for-game-nodes).

## Add the node

1. In the panel, go to **Game Server Nodes** and click
   **Create game server node**.
2. Copy the command the **Add Game Server Node** dialog shows. It looks like
   this:

   ```bash
   curl -fsSL https://get.5stack.gg | sudo sh -s -- join --panel-key q7Hc2Lw9Zf0mR1xT…
   ```

   `--panel-key` is your panel's public key. The node uses it to check that the
   join keys it receives really come from your panel. The dialog also shows the
   key's fingerprint under **Panel key**.

3. SSH into the node as a user who can use sudo, and run the command. It installs
   the agent, checks the server can run Tailscale and k3s, and shows a code and a
   key fingerprint:

   ```
   ==> Joining a panel
       In your panel: Game Server Nodes → Create game server node, then enter this code
       482 913
       key fingerprint 8F2C 19AA 03D1 7E55 · expires in 10:00
   ```

4. Type the 6-digit code into the dialog and click **Find Server**.
5. The dialog shows the node's hostname, address, system and key fingerprint.
   Compare the fingerprint with the one on the node's screen.
   - If they match, pick the node's region and click **Approve**.
   - If they don't, click **Cancel**. See
     [The fingerprint doesn't match](/common-issues/5stack-service#fingerprint-mismatch).
6. The panel sends the node its join keys. The dialog shows the node joining your
   Tailscale network and installing the k3s agent, until it comes online. The
   node's terminal ends with `Joined`.

To add a server without the agent, click **Use the install script instead** in
the dialog. That opens the
[install script](/servers/game-server-nodes/create-game-server-node) setup.

Anyone who sees a code, on a stream or in a screenshot, could try to use it for a
different server. Comparing the fingerprint makes sure you approve the server you
are looking at.

### What the node receives

The panel makes a single-use Tailscale key and a k3s token that expires in 15
minutes and can only join as a worker. Both are encrypted to the node's key
before they leave the panel, so the 5Stack cloud only passes them along. After
it joins, the node talks to your panel over Tailscale only.

## If the code expired

Codes work once and expire after 10 minutes. If you take longer, the node says
**the code expired before it was approved**. Run the same command on the node
again for a new code. Nothing was changed on the node.

## Without --panel-key

If you run the command without `--panel-key`, the node shows your panel key's
fingerprint once you approve it and asks
`Matches the panel key shown in the Add Game Server Node dialog? [y/N]`. Compare it
with the fingerprint under **Panel key** in the dialog. Without a terminal to ask
on, the node refuses. The command from the dialog already includes the key, so
you won't see this question when you use it.

## Proxmox LXC containers

Before it shows a code, the node checks that an LXC container can run Tailscale
and k3s. If it can't, the node lists what is wrong and stops. On the Proxmox host,
where `CTID` is the container's ID:

1. If the container is unprivileged, restore a backup of it as privileged:

   ```bash
   pct stop CTID && vzdump CTID
   pct restore CTID <the backup file vzdump wrote> --unprivileged 0 --force --storage <the storage of its disk now, such as local-lvm>
   ```

2. Add these lines to `/etc/pve/lxc/CTID.conf`:

   ```
   features: nesting=1
   lxc.apparmor.profile: unconfined
   lxc.cgroup2.devices.allow: a
   lxc.cap.drop:
   lxc.mount.auto: proc:rw sys:rw
   lxc.mount.entry: /dev/kmsg dev/kmsg none bind,optional,create=file
   lxc.mount.entry: /dev/net/tun dev/net/tun none bind,optional,create=file
   ```

   `proc:rw` lets the kubelet set `vm.overcommit_memory=1`, `kernel.panic=10`
   and `kernel.panic_on_oops=1`. These apply to the whole host, which then
   reboots 10 seconds after a kernel oops.

3. Load the kernel modules k3s needs, and list the same modules, one per line, in
   `/etc/modules-load.d/k3s.conf` so they load after a reboot:

   ```bash
   modprobe -a overlay br_netfilter nf_conntrack vxlan ip_tables iptable_nat iptable_filter iptable_mangle xt_conntrack xt_mark xt_comment nf_tables tun
   ```

4. Restart the container with `pct reboot CTID` and run the command again.

## Nodes added with the install script

Nodes you added before the panel ran the 5Stack service keep working. The panel
installs the agent on them for you, without SSH and without re-joining them, so
they can follow the panel if you [move it to a new server](/service/new-server).

Panels without the 5Stack service add nodes with the install script instead. See
[Create Game Server Node](/servers/game-server-nodes/create-game-server-node).

## Remove a node

On the node, run:

```bash
5stack leave
```

It removes the k3s agent and logs the node out of your Tailscale network. Then
remove the node on the panel's **Game Server Nodes** page.
