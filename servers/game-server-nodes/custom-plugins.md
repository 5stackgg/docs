# Custom Game Plugins

5Stack Game Node Server containers support custom plugins for both supported frameworks. To set up custom plugins. There is a special folder located at `/opt/5stack/custom-plugins` on your Game Server Node.

Any files placed in `/opt/5stack/custom-plugins` are mirrored into `<install-dir>/game/csgo` when the game server starts, preserving their directory structure. So lay your files out exactly as they would sit inside `game/csgo`.

::: warning
Game Node servers operate independently, so you'll need to copy your plugin files to each game server node where you want them to run.
:::

::: danger Pick the directory that matches your runtime
Plugins are **framework-specific**. A CounterStrikeSharp plugin will not load under SwiftlyS2, and vice versa. Files under the wrong `addons/` directory are copied to the server and then silently ignored.

Check which runtime you're on first. See [Game Plugin Runtimes](/servers/game-server-nodes/plugin-runtimes). **SwiftlyS2 is the default.**
:::

## Where files go

|          | SwiftlyS2 (default)                          | CounterStrikeSharp                                 |
| -------- | -------------------------------------------- | -------------------------------------------------- |
| Plugins  | `addons/swiftlys2/plugins/<Name>/`           | `addons/counterstrikesharp/plugins/<Name>/`        |
| Configs  | `addons/swiftlys2/configs/`                  | `addons/counterstrikesharp/configs/`               |
| Gamedata | `addons/swiftlys2/gamedata/cs2/core/*.jsonc` | `addons/counterstrikesharp/gamedata/gamedata.json` |

All paths are relative to `/opt/5stack/custom-plugins`.

## Installing a plugin

Drop the plugin into the `plugins` directory for your runtime. A plugin is normally a folder containing a `.dll` of the same name.

::: code-group

```sh [SwiftlyS2]
/opt/5stack/custom-plugins/addons/swiftlys2/plugins/MyPlugin/MyPlugin.dll
```

```sh [CounterStrikeSharp]
/opt/5stack/custom-plugins/addons/counterstrikesharp/plugins/MyPlugin/MyPlugin.dll
```

:::

The `configs` directory is symlinked rather than copied, so anything a plugin writes there persists across server restarts.

## Gamedata overrides

Sometimes when Counter-Strike is updated. It breaks the plugin framework's signatures before an official fix ships. Overriding the gamedata files is the temporary workaround.

The two frameworks store gamedata very differently. CounterStrikeSharp uses a single `gamedata.json`, while SwiftlyS2 splits it into three `.jsonc` files. **If a file exists in your custom-plugins folder it replaces the shipped one wholesale**, so copy the original out of a running server first and edit that, rather than writing a file containing only your changes.

### SwiftlyS2

SwiftlyS2 reads `offsets.jsonc`, `patches.jsonc`, and `signatures.jsonc` from `addons/swiftlys2/gamedata/cs2/core/`. Override any subset of the three, each is replaced independently.

::: code-group

```json [.../gamedata/cs2/core/signatures.jsonc]
{
  "UTIL_ClientPrintAll": {
    "lib": "server",
    "windows": "48 89 5C 24 08 48 89 6C 24 10 48 89 74 24 18 57 48 81 EC 70 01 ? ? 8B E9",
    "linux": "55 48 89 E5 41 57 49 89 D7 41 56 49 89 F6 41 55 41 89 FD"
  },
  "ClientPrint": {
    "lib": "server",
    "windows": "48 85 C9 0F 84 ? ? ? ? 48 89 5C 24 ? 55",
    "linux": "55 48 89 E5 41 57 49 89 CF 41 56 49 89 D6 41 55 41 89 F5 41 54 4C 8D A5 A0 FE FF FF"
  }
}
```

```json [.../gamedata/cs2/core/offsets.jsonc]
{
  "CCSPlayerController_ChangeTeam": {
    "lib": "server",
    "windows": 100,
    "linux": 99
  }
}
```

:::

Note the differences from CounterStrikeSharp: the key is `lib` (not `library`), signatures and offsets live in **separate files**, and there is no nested `"signatures": { ... }` object. The patterns sit directly on the entry. These files are `.jsonc`, so comments and trailing commas are allowed.

### CounterStrikeSharp

CounterStrikeSharp reads a single `gamedata.json`. Signatures are nested under a `signatures` key, offsets under `offsets`, and the binary is named with `library`.

::: code-group

```json [/opt/5stack/custom-plugins/addons/counterstrikesharp/gamedata/gamedata.json]
{
  "UTIL_ClientPrintAll": {
    "signatures": {
      "library": "server",
      "windows": "48 89 5C 24 08 48 89 6C 24 10 48 89 74 24 18 57 48 81 EC 70 01 ? ? 8B E9",
      "linux": "55 48 89 E5 41 57 49 89 D7 41 56 49 89 F6 41 55 41 89 FD"
    }
  },
  "ClientPrint": {
    "signatures": {
      "library": "server",
      "windows": "48 85 C9 0F 84 ? ? ? ? 48 89 5C 24 ? 55",
      "linux": "55 48 89 E5 41 57 49 89 CF 41 56 49 89 D6 41 55 41 89 F5 41 54 4C 8D A5 A0 FE FF FF"
    }
  },
  "CCSPlayerController_ChangeTeam": {
    "offsets": {
      "windows": 100,
      "linux": 99
    }
  }
}
```

:::

## Custom Kubernetes YAML

If your plugin requires additional services like MySQL, please refer to the [Custom Kubernetes Setup Guide](/advanced/custom-k8s).
