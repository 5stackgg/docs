# Game Server Nodes

The 5Stack Panel can manage multiple game server nodes, providing a secure, dynamic, and scalable infrastructure for hosting Counter-Strike servers. To secure the game server nodes, Tailscale is used; you can read more about Tailscale in the [Tailscale Integration](/servers/game-server-nodes/tailscale) section.

Not sure if you should use game server nodes or dedicated servers? See [Should I Use Dedicated Servers or Game Server Nodes?](/servers/#should-i-use-dedicated-servers-or-game-server-nodes) in the main Servers documentation for a detailed comparison.

## Panel Upgrade

The panel requires an upgrade to enable the installation of game server nodes. This is for upgrading the panel itself, not for setting up game node servers. Game node servers should be created through the panel interface.

::: warning
This should be ran after the base installation of the panel.
:::

Inside the 5Stack-Panel directory, run the setup script `./game-node-server-setup.sh`, which will guide you through the setup process.

::: danger
This is for upgrading the panel itself, not for setting up game node servers. Game node servers should be created through the panel interface.
:::
