# Game Plugin Configuration

The plugin configuration file lives under your runtime's addons directory, and the
two runtimes use different file names **and different formats**:

- **SwiftlyS2**: `<server_path>/game/csgo/addons/swiftlys2/configs/plugins/FiveStack/config.jsonc`
- **CounterStrikeSharp**: `<server_path>/game/csgo/addons/counterstrikesharp/configs/plugins/FiveStack/FiveStack.json`

The easiest way to get the config is from the panel: open your dedicated server's
page, go to the **Settings** tab, and under **Server Plugin Config** pick your runtime
and press **Show Config**. It generates the file contents, including the server's API
password, in the correct format for the selected runtime, ready to copy and paste.
The Settings tab is administrator-only.

::: tip Community servers use a different plugin
This page is for the match plugin, which a **Ranked Server** runs. A community server
(a Valve preset) runs the [Player Management plugin](./player-management) instead, with
its own config file.
:::

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
container. You can configure it entirely through environment variables instead.
:::

## Match Configuration Files

Once the plugin has been added. It will download any of the following configuration
files that are missing and store them in the cfg directory at `<game-directory>/csgo/cfg`:

- 5stack.competitive.cfg
- 5stack.wingman.cfg
- 5stack.duel.cfg
- 5stack.rush.cfg
- 5stack.lan.cfg
- 5stack.warmup.cfg
- 5stack.knife.cfg

The match type's config (competitive, wingman, duel or rush) is executed first, then
the LAN config on a LAN region, then the layers the panel sends, such as the
[Global](/features/admin/game-modes#global-configuration) config, game plugin cvars
and the game mode's cvars. Warmup and the knife round exec their own configs on top.

These configs can be modified to suit your needs. A file that already exists is never
downloaded again.
