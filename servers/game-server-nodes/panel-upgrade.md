# Panel Upgrade

The panel requires an upgrade to enable the installation of game server nodes. This is for upgrading the panel itself, not for setting up game node servers. Game node servers should be created through the panel interface.

::: warning
This should be ran after the base installation of the panel.
:::

::: tip Panels on the 5Stack service
If you installed the panel with the [5Stack service](/service/install) and gave the setup page a Tailscale OAuth client, the panel is already set up for game server nodes. You don't need this script.
:::

Inside the 5Stack-Panel directory, run the setup script `./game-node-server-setup.sh`, which will guide you through the setup process.

::: danger
This is for upgrading the panel itself, not for setting up game node servers. Game node servers should be created through the panel interface.
:::
