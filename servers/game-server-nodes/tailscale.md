# Tailscale Integration

Tailscale is utilized for managing game server nodes in 5Stack. It provides a secure and reliable connection to facilitate on-demand servers for matches. The panel's setup page asks for a Tailscale API token or OAuth client (see [Tailscale for game server nodes](/install/#tailscale-for-game-server-nodes)), or you add an OAuth client later with `sudo 5stack config tailscale` on the panel server. Each node installs Tailscale and joins your Tailscale network when it [joins the panel](/servers/game-server-nodes/create-game-server-node).

:::warning
Verify your firewall allows Tailscale connections. See the [Tailscale firewall requirements](https://tailscale.com/kb/1181/firewalls) for more information.
:::
