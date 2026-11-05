# Game Server Crashes

When a game server exits with an error, 5Stack saves a crash report on the node
it ran on. There is no page for them in the panel yet: read them on the node, or
attach them when you report the crash.

Match servers and dedicated servers both write them, from plugin versions
`sw-v0.0.91` and `css-v0.0.437`.

## Where they are

On a game server node:

```
/opt/5stack/demos/.crash-reports/<server id>/<UTC time>/
```

For example `/opt/5stack/demos/.crash-reports/5df7aa6c-…/20261002T143015Z/`. In
a container you run yourself, the same path is under the container's
`/opt/demos`.

## What is in one

| File          | What it holds                                                                                                                                                                      |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `crash.txt`   | The server and match ids, exit status, when it started and crashed, the map, the plugin and CS2 versions, the plugins it loaded and its launch parameters, with passwords redacted |
| `console.log` | The last 2000 lines of the server console                                                                                                                                          |
| `*.dmp`       | Any crash dumps CS2 or SwiftlyS2 wrote                                                                                                                                             |

The newest 10 reports are kept per server; older ones are deleted when a new one
is written.

A server stopped from the panel is a clean exit and leaves no report.
