# Game Server Crashes

When a game server exits with an error, 5Stack saves a crash report on the node
it ran on. There is no page for them in the panel yet: read them on the node, or
attach them when you report the crash.

Reports are written by both runtime images, for match servers and dedicated
servers alike, from plugin versions `sw-v0.0.91` and `css-v0.0.437`.

## Where they are

On a game server node:

```
/opt/5stack/demos/.crash-reports/<server id>/<UTC time>/
```

For example `/opt/5stack/demos/.crash-reports/5df7aa6c-…/20261002T143015Z/`. In
a container you run yourself, the same path is under the container's
`/opt/demos`.

An on-demand match server reuses a slot's server id, so its report also records
the match id; see `match_id` below.

## What is in one

| File          | What it holds                                                                                                                                                                                                                                       |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `crash.txt`   | The server and match ids, server type, exit status, when it started and crashed, the map it was on, the image and plugin version, the CS2 version, the plugins it loaded and its launch parameters. Passwords in the launch parameters are redacted |
| `console.log` | The last 2000 lines of the server console                                                                                                                                                                                                           |
| `*.dmp`       | Any minidumps the engine wrote, and SwiftlyS2's own crash dumps                                                                                                                                                                                     |

On CS2 the console is captured line by line, so the log reaches the moment of the
crash instead of stopping partway through a buffered line.

The newest 10 reports are kept per server; older ones are deleted when a new one
is written.

A server stopped from the panel is a clean exit and leaves no report.
