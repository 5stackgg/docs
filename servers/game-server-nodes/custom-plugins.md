# Custom Counter-Strike Sharp (CSS) Plugins

5Stack Game Node Server Containers support custom plugins. To set up custom plugins, there is a special folder located at `/opt/5stack/custom-plugins` directory on your Game Server Node.

Any files placed in `/opt/5stack/custom-plugins` will automatically be transferred to `<install-dir>/game/csgo` when the game server starts. A [CounterStrikeSharp](https://docs.cssharp.dev/) plugin typically includes an `addons` folder.

::: warning
Game Node servers operate independently, so you'll need to copy your plugin files to each game server node where you want them to run.
:::

## Example : gamedata.json

Sometimes when Counter-Strike is updated, it can break CounterStrikeSharp. While waiting for an official fix, you can update the `gamedata.json` file as a temporary solution.

::: code-group

```[/opt/5stack/custom-plugins/addons/counterstrikesharp/gamedata/gamedata.json]
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
  "CCSPlayerController_SwitchTeam": {
    "signatures": {
      "library": "server",
      "windows": "40 56 57 48 81 EC ? ? ? ? 48 8B F9 8B F2 8B CA",
      "linux": "55 48 89 E5 41 55 49 89 FD 89 F7"
    }
  },
  "CCSPlayerController_ChangeTeam": {
    "offsets": {
      "windows": 100,
      "linux": 99
    }
  },


....

```

This file will be copied to the game folder, preserving its directory structure.

#### Custom Kubernetes YAML

If your plugin requires additional services like MySQL, please refer to the [Custom Kubernetes Setup Guide](/advanced/custom-k8s).
