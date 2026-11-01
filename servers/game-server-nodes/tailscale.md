# Tailscale Integration

Tailscale is utilized for managing game server nodes in 5Stack. It provides a secure and reliable connection to facilitate on-demand servers for matches. The panel's setup page asks for a Tailscale OAuth client (see [Tailscale for game server nodes](/install/#tailscale-for-game-server-nodes)), and each node installs Tailscale and joins your Tailscale network when it [joins the panel](/servers/game-server-nodes/create-game-server-node).

:::warning
Verify your firewall allows Tailscale connections. See the [Tailscale firewall requirements](https://tailscale.com/kb/1181/firewalls) for more information.
:::
