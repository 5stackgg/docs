# Tailscale Integration

Game server nodes join your panel over your own private Tailscale network. The
panel sends them matches over it, and players connect straight to the nodes.

On the setup page, the **Game Server Nodes** step asks for one temporary
Tailscale access token, made under
[Settings → Keys](https://login.tailscale.com/admin/settings/keys) with a 1-day
expiry. Your server adds a tag for this panel and the rules game nodes need to
your tailnet policy, makes its own key for adding nodes, tests it, and deletes
the token. See [Game server nodes](/install/#game-server-nodes) for the exact lines
and what happens with a policy managed in GitOps.

Skipped it at install? Add it later on the panel server with
`sudo 5stack config tailscale`. Each node installs Tailscale and joins your
Tailscale network when it [joins the panel](/servers/game-server-nodes/create-game-server-node).

:::warning
Verify your firewall allows Tailscale connections. See the [Tailscale firewall requirements](https://tailscale.com/kb/1181/firewalls) for more information.
:::
