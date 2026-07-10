# Plugin Configuration

The plugin configuration file lives under your runtime's addons directory, and the
two runtimes use different file names **and different formats**:

- **SwiftlyS2** — `<server_path>/game/csgo/addons/swiftlys2/configs/plugins/FiveStack/config.jsonc`
- **CounterStrikeSharp** — `<server_path>/game/csgo/addons/counterstrikesharp/configs/plugins/FiveStack/FiveStack.json`

The easiest way to get the config is from the panel: open your dedicated server's
page, and under **Server Plugin Config** pick your runtime and press **Show Config**.
It generates the file contents — including the server's API password — in the correct
format for the selected runtime, ready to copy and paste.

## SwiftlyS2 (`config.jsonc`)

SwiftlyS2 reads the settings from a `FiveStack` section inside `config.jsonc`:

```jsonc
{
  "FiveStack": {
    "WS_DOMAIN": "wss://ws.5stack.gg",
    "API_DOMAIN": "https://api.5stack.gg",
    "RELAY_DOMAIN": "https://tv.5stack.gg",
    "DEMOS_DOMAIN": "https://demos.5stack.gg",
    "SERVER_ID": "<your-server-id>",
    "SERVER_API_PASSWORD": "<your-server-api-password>",
  },
}
```

## CounterStrikeSharp (`FiveStack.json`)

CounterStrikeSharp reads the same settings as a flat object from `FiveStack.json`:

```json
{
  "WS_DOMAIN": "wss://ws.5stack.gg",
  "API_DOMAIN": "https://api.5stack.gg",
  "RELAY_DOMAIN": "https://tv.5stack.gg",
  "DEMOS_DOMAIN": "https://demos.5stack.gg",
  "SERVER_ID": "<your-server-id>",
  "SERVER_API_PASSWORD": "<your-server-api-password>"
}
```

::: tip
Environment variables with the same names (`SERVER_ID`, `SERVER_API_PASSWORD`, etc.)
take precedence over the config file in both runtimes. If you run the server via the
container, you can configure it entirely through environment variables instead.
:::

## Match Configuration Files

Once the plugin has been added, it will download the following configuration files and store them in the cfg directory at `<game-directory>/csgo/cfg`:

- 5stack.base.cfg
- 5stack.warmup.cfg
- 5stack.knife.cfg
- 5stack.live.cfg

The base config is always executed first, followed by either the warmup, knife, or live config depending on the current phase of the match.

These configs can be modified to suit your needs.
