# Panel Upgrade

A panel needs Tailscale before it can add game server nodes. When you
[install](/install/) the panel, give the setup page a Tailscale OAuth client, as
[Tailscale for game server nodes](/install/#tailscale-for-game-server-nodes)
describes. The panel is then set up for game server nodes, and you don't need
anything on this page.

## Panels installed before the 5Stack service

This script runs from the 5Stack-Panel checkout, on panels installed before the
5Stack service. Inside the 5Stack-Panel directory, run the setup script `./game-node-server-setup.sh`, which will guide you through the setup process.

::: danger
This is for upgrading the panel itself, not for setting up game node servers. Game node servers should be created through the panel interface.
:::
