# Requirements

The 5Stack Game Node Server runs on [K3s](https://docs.k3s.io/installation/requirements), a lightweight Kubernetes distribution. Please ensure that your system meets all the requirements for K3s installation, as well as the following additional requirements specific to the 5Stack Panel.

## Sizing

Each Counter-Strike server takes **2 CPU cores** by default (see
[CPU Pinning](/servers/cpu-pinning) to change that) and about **1 GB of
memory** when empty, more once players join. K3s and the game server node
connector hold back one core and a few hundred MB for themselves. Each node
also needs around 150 GB of disk for the game files and demo recordings.

## Panel Tailscale Setup

Before setting up a Game Server Node, make sure your panel has Tailscale set up. On a panel installed with the 5Stack service, you give the setup page a Tailscale OAuth client, as described in [Tailscale for game server nodes](/install/#tailscale-for-game-server-nodes). For a panel installed before the 5Stack service, see [Panel Upgrade](/servers/game-server-nodes/panel-upgrade).
