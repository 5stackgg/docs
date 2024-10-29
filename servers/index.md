 # Servers
 5Stack provides two different methods of managing servers, [game server nodes](#what-is-a-game-server-node) and [dedicated servers](#what-is-a-dedicated-server) .

# What is a Game Server Node

A [5Stack Game Server Node](/servers/game-server-nodes) is a Kubernetes cluster that automatically creates Counter-Strike servers on demand. Here are the advantages of running a game server node:

* Automatic Counter-Strike Updates
* Zero Plugin Configuration 
* Ability to spin up multiple servers on demand

:::info
The number of servers you can run depends on your machine's specifications.
:::


# What is a Dedicated Server

A [dedicated server](./dedicated-servers) is a standalone server that runs independently from a Kubernetes cluster. Here are the advantages of running a dedicated server:

* Full control over server configuration and plugins
* Freedom to choose any hosting provider or self-host


# Should I Use Dedicated Servers or Game Server Nodes?

There are several factors to consider when deciding between dedicated servers and game server nodes.

Game server nodes are recommended if you plan on running a LAN tournament or operating in a Gaming Center, as they can help reduce energy costs and provide better performance in LAN environments.

If you're primarily hosting multi-regional competitive matches, using a dedicated server provider like [DATHOST](https://dathost.net/) would be a good choice.

:::info
While not officially affiliated with DATHOST, 5Stack plans to add support for automated server provisioning through their service in a future update.
:::