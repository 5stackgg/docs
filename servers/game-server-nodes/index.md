# Game Server Nodes

::: danger
Game server nodes are not supported on Windows.
:::

The 5Stack Panel can manage multiple game server nodes, providing a secure, dynamic, and scalable infrastructure for hosting Counter-Strike servers. To secure the game server nodes, Tailscale is used, you can read more about Tailscale in the [Tailscale Integration](/servers/game-server-nodes/tailscale) section.

The idea behind a game server node is to allow for ease of setup and management of game servers. In game server nodes section you can create a new node.
It will automatically generate the required Tailscale ACLs and other configurations so your main node can communicate with the game server node.

A game node server should be a clean linux server that is capable of running Counter-Strike. Once the node is created it will automatically install Counter-Strike and be available to create on demand servers.

## Running the Setup Script

Inside the 5Stack-Panel directory, run the setup script `./game-node-server-setup.sh`, which will guide you through the setup process.

