# Tailscale Disconnected After Reboot

If Tailscale does not reconnect after a reboot, try restarting the Tailscale daemon.

First, check the connection status:

```bash
tailscale status
```

If you see errors such as `invalid state` or `invalid auth key`, restart the Tailscale service:

```bash
systemctl restart tailscaled
```

If the issue persists, view the status of the service for more information:

```bash
systemctl status tailscaled
```

Reviewing this output can help you diagnose authentication or connectivity problems.
