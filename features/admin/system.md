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

A pod that has restarted says so ("{name} restarted {count} times"), with the
reason and exit code, and **Previous run** opens the log of the run that
crashed. Kubernetes can't hand that log over while the pod's node is offline.

## Database performance

A built-in database dashboard for keeping the backend healthy, covering:

- **Query performance**: slow queries and execution times.
- **Connections** and **locks / transactions**.
- **I/O & cache**: buffer cache hit rates and disk I/O.
- **Index usage** and **storage** sizes.
- **TimescaleDB** hypertable stats.

Refresh on demand or auto-poll on an adjustable interval. A query's **Query
details** panel labels its plan, and **Run EXPLAIN ANALYZE** runs it with values
for its parameters. It runs read-only, is rolled back, and stops after 25
seconds.

## Backups

5Stack takes **automatic database backups** so your matches, stats, and
configuration are protected. You can review backup status and history from the
database dashboard.

## Edge and storage checks

Two settings pages check the parts of the platform that live outside your
cluster:

- **Settings → Application → Demos**: **Cloudflare delivery** shows whether the
  Cloudflare Worker in front of your Backblaze bucket is answering and can read
  the bucket, and **Storage check** writes a test file to your bucket, reads it
  back (**Write**, **Read**), then fetches it through the worker (**Edge**) if you
  use one.
- **Settings → Application → Streaming**: **Edge relay (Cloudflare)**, shown when
  Playcast is on, says whether the relay worker is serving Playcast viewers from
  Cloudflare's cache.

Each reads **Online**, **Needs attention**, **Offline** or **Not set up**, with a
**Setup guide** link. See [Backblaze](/advanced/s3/backblaze) and
[Playcast Edge Relay](/advanced/playcast-edge-relay) for setting the workers up.

## Server and node alerts

Nodes going offline, regions going down, and dedicated servers that stop
answering are reported to administrators in the panel and on the Discord
support webhook. See
[Status notifications](/features/admin/servers#status-notifications) for exactly
when.

Game servers that crash leave a crash report on their node. See
[Game Server Crashes](/common-issues/game-server-crashes).

## Updates

The update button in the header opens a popover for administrators:

- **Needs attention**: the warnings your
  [game server nodes](/servers/game-server-nodes/managing#warnings-from-the-node)
  report, one row per kind with how many nodes it covers ("2 nodes need a
  reboot"), worst first. Each row opens the node, or the list of nodes it
  covers.
- **Updates**: when a newer image is published for one of the panel's
  services, the **Services** that have one, with **Update Now**. A rebuild that
  changes nothing doesn't show up as a pending update.
- **Kubernetes**, when a k3s update or node changes are waiting, to run now or
  schedule. See
  [Kubernetes updates](/servers/game-server-nodes/managing#kubernetes-updates).

When a new version of the web app is out, every tab left open offers **New
version** with **Reload**, so nobody keeps running an old build.

## Who changed it

Admin detail views, such as a node's inspector, a GPU node, a region, a
dedicated server, the Seasons page, system alerts and an award, show when they
were last changed and by whom ("Updated {time} by {name}").

## Media server

**Media Server**, under **Media** in the admin navigation, shows the live load
on MediaMTX. Game streams, player cameras, voice and video calls all share one
instance, so it's everything it is carrying at once:

- **Publishing**, **Paths** and **WebRTC sessions**. A path is one named stream
  slot, such as one person's microphone or one camera; publishing counts the
  ones sending media right now; every viewer of a stream is a session.
- **By feature**: game streams, player cameras, voice, video calls and camera
  talk-back, with what each received.
- **Resource usage** of the mediamtx pod, polled every 30 seconds, and a link to
  its logs.

When the media server can't be reached, the page says so, and its numbers read
as unknown rather than zero.

## Render queue

The render queue (administrator only, under **Media** in the admin navigation)
shows every clip and highlight render job
and its progress. Pair it with [GPU Nodes](/servers/gpu-nodes/) to see which node
each job is running on. If renders back up. Check GPU availability and the "pause
renders during live matches" setting on the
[Highlights](/features/highlights) page.
