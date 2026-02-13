# Servers

5Stack provides two different methods of managing servers, [game server nodes](#what-is-a-game-server-node) and [dedicated servers](#what-is-a-dedicated-server) .

## What is a Game Server Node

A [5Stack Game Server Node](./game-server-nodes/index) is a Kubernetes cluster that automatically creates Counter-Strike servers on demand.

:::info
The number of servers you can run depends on your machine’s hardware specifications and the number of open ports available.
:::

:::warning
Each game server node should have around 150 GB of available disk space. This space is needed for the Counter-Strike game files and for storing demo recordings of each match (up to 1 GB per match, which will be uploaded and deleted after uploading).
:::

## What is a Dedicated Server

A [dedicated server](./dedicated-servers/) is a standalone server that runs independently from a Kubernetes cluster. Here are the advantages of running a dedicated server:

- Full control over server configuration and plugins
- Freedom to choose any hosting provider or self-host

## Should I Use Dedicated Servers or Game Server Nodes?

When deciding between dedicated servers and game server nodes, consider your use case and the unique features each option provides.

### Unique Features of Game Server Nodes

Game server nodes offer several advantages:

- Automatic Counter-Strike updates
- Automatic plugin updates and management
- Direct control over the number of servers and open ports from the panel
- Manage Counter-Strike and plugin versions through the panel interface
- Built-in Steam Relay integration
- Real-time CPU and memory monitoring for each node
- Demos are uploaded by a separate process, reducing server load
- Easy CPU pinning for performance optimization
- Reuse of Counter-Strike game files reduces disk space required

**Game server nodes are ideal for LAN tournaments or gaming centers**, where you want to maximize performance and reduce energy costs in a local environment.

**Dedicated servers are recommended for multi-regional competitive matches**, especially if you use a provider like [DATHOST](https://dathost.net/), giving you more flexibility in server location and hosting options.

:::info
While not officially affiliated with DATHOST, 5Stack plans to add support for automated server provisioning through their service in a future update.
:::
