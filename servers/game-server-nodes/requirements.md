# Requirements

A game server node must meet the [K3s requirements](https://docs.k3s.io/installation/requirements), plus the following.

## Sizing

Each Counter-Strike server takes **2 CPU cores** by default (see
[CPU Pinning](/servers/cpu-pinning) to change that) and about **1 GB of
memory** when empty, more once players join. The node itself holds back one
core and a few hundred MB. Each node also needs around 150 GB of disk for the
game files and demo recordings.

## Storage

Put CS2's server files and k3s on an SSD or NVMe disk. A hard drive is fine for demo recordings, but on a hard drive CS2 and streams start slower and matches can time out. See [Storage](/servers/game-server-nodes/storage).

## Panel Tailscale Setup

Before setting up a Game Server Node, make sure your panel has Tailscale set up. You paste a Tailscale access token on the setup page's Game Server Nodes step, as described in [Game server nodes](/install/#game-server-nodes). For a panel without Tailscale, see [Panel Upgrade](/servers/game-server-nodes/panel-upgrade).
