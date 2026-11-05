# Why Kubernetes?

5Stack runs on Kubernetes (K3s). It takes care of much of the work of running
game servers across many machines, and keeps competitive matches smooth and
reliable.

## Key Benefits

- **Game server nodes on many machines**, networked together securely with
  Tailscale.
- **Live matches come first.** Background jobs and maintenance tasks never
  starve a live match.
- **Fast server start-up.** New game servers start in seconds instead of
  minutes, so matches can be created on demand.
- **Self-healing.** Game servers restart or move by themselves when a process
  or a machine fails.
- **Rolling updates.** Game server versions and settings change with zero
  downtime.
- **Health checks, logs and metrics** for CPU, memory, network and disk across
  every game server.

## Why Not Docker Compose?

Docker Compose is built for a single machine. It can't spread game servers
across several machines, decide where each one should run, move them when a
machine fails, or update them without stopping containers.

It works well for local development, prototyping and small single-host
communities. 5Stack goes beyond that: multiple nodes and regions, high uptime
and competitive integrity.
