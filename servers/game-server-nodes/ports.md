# Game Server Node Port Forwarding

Game server nodes are required to use ports between 30000 and 32767. This is due to how [Kubernetes reserves ports](https://kubernetes.io/docs/reference/networking/ports-and-protocols/).

## Port Forwarding

Only UDP traffic should be forwarded to the game server node ports. TCP interactions are handled through the Tailscale network. This configuration provides the best of both worlds - RCON remains available while blocking all other TCP traffic.
