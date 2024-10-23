# Game Server Nodes

::: danger
Game server nodes are not supported on Windows.
:::

The 5Stack Panel supports multiple game server nodes. This allows for a more dynamic and scalable setup.

The idea behind a game server node is to allow for ease of setup and management of game servers. In game server nodes section you can create a new node.
It will automatically generate the required Tailscale ACLs and other configurations so your main node can communicate with the game server node.

A game node server should be a clean linux server that is capable of running Counter-Strike. Once the node is created it will automatically install Counter-Strike and be available to create on demand servers.

::: warning
You will need to setup any port fowrading to allow connections to the game servers.
:::
