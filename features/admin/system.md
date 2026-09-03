# System & Monitoring

Tools for watching the health and performance of the whole platform.
(For configuring servers themselves; see [Servers & Regions](/features/admin/servers).)

## System metrics

Live performance across your infrastructure:

- **Game server nodes**: CPU and memory per node, with search, filters (only
  enabled / only online), sorting, and expandable history charts.
- **GPU nodes**: per-node GPU and VRAM usage.
- **Services**: the platform's internal services, with CPU/memory (warning and
  critical thresholds) and a jump to that service's logs.

## System logs

Tail live logs for any service, api, web, game-server-node, demo-parser, hasura,
typesense, timescaledb, redis, rustfs, mediamtx, with follow and timestamp
toggles. Per-**match** server logs are available from the match's server tab (see
[Match server controls](/features/admin/servers#match-server-controls)).

## Database performance

A built-in database dashboard for keeping the backend healthy, covering:

- **Query performance**: slow queries and execution times.
- **Connections** and **locks / transactions**.
- **I/O & cache**: buffer cache hit rates and disk I/O.
- **Index usage** and **storage** sizes.
- **TimescaleDB** hypertable stats.

Refresh on demand or auto-poll on an adjustable interval.

## Backups

5Stack takes **automatic database backups** so your matches, stats, and
configuration are protected. You can review backup status and history from the
database dashboard.

## Render queue

The render queue (administrator only) shows every clip and highlight render job
and its progress. Pair it with [GPU Nodes](/servers/gpu-nodes) to see which node
each job is running on. If renders back up. Check GPU availability and the "pause
renders during live matches" setting on the
[Highlights](/features/highlights) page.
