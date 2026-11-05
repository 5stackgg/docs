# Uninstalling 5Stack Panel

:::warning
This is destructive and irreversible. It removes all k3s state, 5Stack files and
the server's Tailscale connection. Afterwards, remove the machines from your
Tailscale admin console yourself. See [Finish in Tailscale](#finish-in-tailscale).
:::

On the server, run:

```bash
sudo 5stack uninstall
```

Or pick **Uninstall** in the [`5stack` menu](/service/command#the-menu).

It asks you to type the server's hostname to confirm. It removes, in this order:
k3s and its data, the 5Stack systemd drop-ins and helper scripts, the k3s config
and the Tailscale sysctl file, Tailscale, `/opt/5stack`, the install's
registration with 5Stack, and the 5Stack service itself.

Each step skips what is already gone, and a failed step doesn't stop the rest.
It ends with a summary of what was removed, what was kept and, for anything left
over, the exact command to finish it by hand. Running it twice is fine.

## On the panel server

The panel lists its game server nodes and asks what to remove:

- **Everything**: this panel and every game server node. Each node is
  uninstalled first, while the panel still runs, and gets its own line in the
  summary.
- **Only this server**: the panel only. Each game server node keeps a k3s agent
  pointing at a panel that is gone, and needs its own uninstall.

Before it deletes anything, it offers a final encrypted backup, saved as
`/root/5stack-final-backup-<date>.age`. Restoring it needs the
[recovery key](/install/backups#the-recovery-key). If the backup fails, nothing
is removed.

To answer without questions, add `--yes` with `--everything` or
`--this-server`, and `--no-backup` to skip the final backup.

## On a game server node

On a node, `sudo 5stack uninstall` removes only that node. The panel and the
other game server nodes keep running, and the panel drops the node once it
stops reporting.

You can also do this from the panel: remove the node on the
**Game Server Nodes** page with **Also uninstall 5Stack from the server** turned
on, or run `sudo 5stack nodes remove <name>` on the panel server. See
[Remove a node](/servers/game-server-nodes/create-game-server-node#remove-a-node).

## Finish in Tailscale

Uninstall logs the server out of your tailnet and removes Tailscale. On the
panel, it also tries to remove the panel's machine, and with **Everything** its
game server nodes' machines, from your Tailscale dashboard. Its summary says
what it removed and what is still there.

Removing 5Stack doesn't clean up your tailnet for you. Finish in the
[Tailscale admin console](https://login.tailscale.com/admin) yourself:

- **Machines.** Open [Machines](https://login.tailscale.com/admin/machines) and
  remove the panel and every game server node that is still listed. Uninstall
  names the ones it couldn't remove. A node uninstalled on its own is removed
  by the panel once it stops reporting; if it is still there after a few
  minutes, remove it too.
- **Your tailnet policy.** Under
  [Access controls](https://login.tailscale.com/admin/acls/file), remove this
  panel's lines for its tag and pod range. 5Stack can't edit your policy after
  the install, so the summary prints the lines to remove. Keep the shared
  `tag:fivestack` line if another 5Stack panel uses it.
- **The OAuth client.** Under
  [Trust credentials](https://login.tailscale.com/admin/settings/trust-credentials),
  remove this panel's OAuth client. The summary names it. A client can't delete
  itself.

On a panel installed before the 5Stack service, nothing is removed from your
Tailscale dashboard: remove its machines there yourself.

## Without the 5stack command

On a server where the `5stack` command is missing or old, run the uninstaller
through the installer instead. It works the same way:

```bash
curl -fsSL https://get.5stack.gg | sudo sh -s -- uninstall
```

## Panels installed before the 5Stack service

On a panel installed before the 5Stack service, and on its game server nodes,
run the following on every host. `sudo 5stack uninstall` also points here for a
node it couldn't reach. The script auto-detects whether k3s or k3s-agent is
present, runs the right uninstaller, and removes all 5Stack-added systemd units,
drop-ins, helper scripts, sysctl config, k3s config, Tailscale, and
`/opt/5stack`.

```bash
sudo bash <<'EOF'
set -e

# 1. Run the appropriate k3s uninstaller
if [ -x /usr/local/bin/k3s-uninstall.sh ]; then
    /usr/local/bin/k3s-uninstall.sh
elif [ -x /usr/local/bin/k3s-agent-uninstall.sh ]; then
    /usr/local/bin/k3s-agent-uninstall.sh
fi

# 2. Remove 5Stack systemd drop-ins (panel uses k3s.service.d, game node uses k3s-agent.service.d)
for d in /etc/systemd/system/k3s.service.d /etc/systemd/system/k3s-agent.service.d; do
    rm -f "$d/cpu-state-check.conf" "$d/update-tailscale-ip.conf" "$d/tailscale-state-check.conf"
    rmdir "$d" 2>/dev/null || true
done

# 3. Remove 5Stack helper scripts and Tailscale state-check timer/service
systemctl disable --now 5stack-tailscale-state-check.timer 2>/dev/null || true
rm -f /etc/systemd/system/5stack-tailscale-state-check.timer
rm -f /etc/systemd/system/5stack-tailscale-state-check.service
rm -f /usr/local/bin/5stack-tailscale-state-check.sh
rm -f /usr/local/bin/5stack-cpu-state-check.sh
rm -rf /run/5stack-tailscale-state-check
systemctl daemon-reload

# 4. Remove k3s config
rm -rf /etc/rancher/k3s

# 5. Remove sysctl IP forwarding drop
rm -f /etc/sysctl.d/99-tailscale.conf
# (if /etc/sysctl.d/ didn't exist on this host, the entries were appended
# to /etc/sysctl.conf, remove the net.ipv4.ip_forward and
# net.ipv6.conf.all.forwarding lines from there manually if needed)

# 6. Disconnect and remove Tailscale
if command -v tailscale >/dev/null 2>&1; then
    tailscale logout 2>/dev/null || true
    tailscale down 2>/dev/null || true
fi
rm -rf /var/lib/tailscale
if command -v apt-get >/dev/null 2>&1; then
    apt-get remove -y tailscale tailscale-archive-keyring 2>/dev/null || true
fi

# 7. Remove 5Stack files
rm -rf /opt/5stack

echo "5Stack uninstall complete."
EOF
```

`curl -fsSL https://get.5stack.gg | sudo sh -s -- uninstall` also works on these
servers, and does the same.
