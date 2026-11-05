# Game Server Node Port Forwarding

Game server nodes use ports between 30000 and 32767.

## Port Forwarding

Forward only UDP traffic to the game server node ports. TCP, including RCON, goes over Tailscale, so you don't forward it.
