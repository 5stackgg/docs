# Debugging the 5Stack Panel

If requested to debug the 5Stack Panel, run the debug script:

::: info Panels installed before the 5Stack service
`./debug.sh` runs from the 5Stack-Panel checkout, on panels installed before the
5Stack service. On a panel that runs the service, 5Stack support asks the panel
for a debug bundle instead. See
[Diagnostics](/service/diagnostics#debug-bundles).
:::

1. Navigate to the installation directory.
2. Execute

```bash
./debug.sh
```

This will create an output file in the current directory.

To see what the 5Stack service itself is doing, run `5stack status`, or
`journalctl -u 5stack -f` on the server.
