# Uninstalling 5Stack Panel

Run the following on every host where 5Stack was installed (panel server or game server node). The script auto-detects whether k3s or k3s-agent is present, runs the right uninstaller, and removes all 5Stack-added systemd units, drop-ins, helper scripts, sysctl config, k3s config, Tailscale, and `/opt/5stack`.

:::warning
This is destructive and irreversible. It will remove all k3s state, 5Stack files, and disconnect Tailscale.
:::

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
# to /etc/sysctl.conf — remove the net.ipv4.ip_forward and
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
