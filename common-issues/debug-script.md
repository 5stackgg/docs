# Debugging the 5Stack Panel

If 5Stack support asks you to debug the panel, run the debug script on the panel
server:

```bash
sudo 5stack run debug.sh
```

Or pick **Diagnostics → Debug bundle** in the
[`5stack` menu](/service/command#the-menu). It saves pod logs, events and
certificate status to a file and prints where it saved it.

Support can also ask the panel for a debug bundle, with player data removed. See
[Diagnostics](/service/diagnostics#debug-bundles).

To see what the 5Stack service itself is doing, run `5stack status`, or
`journalctl -u 5stack -f` on the server.
