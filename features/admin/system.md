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

Read live logs for any of the panel's services, with follow and timestamp
toggles. Per-**match** server logs are available from the match's server tab (see
[Match server controls](/features/admin/servers#match-server-controls)).

A service that has restarted says so, with the reason, and **Previous run**
opens the log of the run that crashed. That log can't be read while its node is
offline.

## Database performance

A built-in database dashboard showing slow queries, connections, locks, cache
and disk I/O, index usage, and storage sizes. Refresh it on demand or on an
interval. **Run EXPLAIN ANALYZE**, in a query's **Query details**, runs the
query read-only and rolls it back.

## Backups

5Stack takes **automatic database backups** so your matches, stats, and
configuration are protected. You can review backup status and history from the
database dashboard.

## Edge and storage checks

Two settings pages check the parts of the platform that live outside your
cluster:

- **Settings → Application → Demos**: **Cloudflare delivery** shows whether the
  Cloudflare Worker in front of your Backblaze bucket is working, and **Storage
  check** tests your bucket (**Write**, **Read**) and the worker if you use one
  (**Edge**).
- **Settings → Application → Streaming**: **Edge relay (Cloudflare)**, shown when
  Playcast is on, says whether the relay worker is serving Playcast viewers.

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
- **Updates**: when a newer version of one of the panel's services is out, the
  **Services** that have one, with **Update Now**.
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
on the media server. Game streams, player cameras, voice and video calls all
share it, so it shows everything at once:

- **Publishing**, **Paths** and **WebRTC sessions**: the streams sending right
  now, the stream slots (such as one person's microphone or one camera), and the
  viewers.
- **By feature**: game streams, player cameras, voice, video calls and camera
  talk-back, with what each received.
- **Resource usage**, and a link to its logs.

When the media server can't be reached, the page says so, and its numbers read
as unknown rather than zero.

## Render queue

The render queue (administrator only, under **Media** in the admin navigation)
shows every clip and highlight render job
and its progress. Pair it with [GPU Nodes](/servers/gpu-nodes/) to see which node
each job is running on. If renders back up, check GPU availability and the "pause
renders during live matches" setting on the
[Highlights](/features/highlights) page.
