# Game Plugin Runtimes

::: info Game plugins, not panel plugins
This page is about **CS2 server-side plugins** that load into your game servers.
If you're looking to build a web app that runs inside the panel, see
[5Stack Plugin Development](/plugins/).
:::

5Stack ships its match plugin for **two different CS2 plugin frameworks**. Both run matches the same way. What differs is which third-party plugins and gamedata files they understand.

|                  | SwiftlyS2                              | CounterStrikeSharp                     |
| ---------------- | -------------------------------------- | -------------------------------------- |
| Image            | `ghcr.io/5stackgg/game-server-sw`      | `ghcr.io/5stackgg/game-server-css`     |
| Addons directory | `addons/swiftlys2`                     | `addons/counterstrikesharp`            |
| Default          | ✅ Yes                                 | No                                     |

## Which should I use?

- **Stay on SwiftlyS2** unless you have a reason not to. It's the default and what new installs are tested against.
- **Choose CounterStrikeSharp** if you run third-party [CSS plugins](https://docs.cssharp.dev/) that have no SwiftlyS2 equivalent, or you already have a working `gamedata.json` workflow you don't want to rewrite.

The two frameworks are **not** interchangeable at the plugin level. A CounterStrikeSharp plugin will not load under SwiftlyS2, and vice versa. See [Custom Game Plugins](/servers/game-server-nodes/custom-plugins) for the per-framework directory layouts.

## Switching runtimes

The runtime is one setting for every node and match.

1. Go to **Settings → Application → Servers**.
2. Under **Plugin Runtime**, pick **SwiftlyS2** or **CounterStrikeSharp**.

The change saves immediately, with no update or restart. New game servers use
the new runtime when they start. Servers already running keep the old one until
they restart.

::: warning
Switching runtimes does **not** migrate your custom plugins. Anything under `addons/counterstrikesharp` is ignored by SwiftlyS2, and anything under `addons/swiftlys2` is ignored by CounterStrikeSharp. Move your files to the matching directory before you switch, or your servers will start without them.
:::

## Runtime versions

Each runtime comes with its framework version built in, so you don't manage it yourself.

Each runtime has its **own plugin releases**, numbered separately: `v0.0.42` of the SwiftlyS2 plugin is unrelated to `v0.0.42` of the CounterStrikeSharp plugin. The **Plugin Version** dropdown on a node only offers releases from the runtime you have selected. See [Version Pinning](/servers/game-server-nodes/version-pinning).

A node pinned to a plugin version stays on the runtime it was pinned under, even if you switch runtimes later. Clear the pin to move that node onto the selected runtime.

## Advanced: custom images

If you build your own plugin image, or mirror the official ones into a private registry, set `SERVER_IMAGE` to the full image reference on the panel server, or pick **Config → Game server image** in the [`5stack` menu](/service/command#the-menu):

```bash
sudo 5stack config set SERVER_IMAGE=registry.example.com/my-org/my-game-server:latest
```

`sudo 5stack config unset SERVER_IMAGE` goes back to the Plugin Runtime setting.

`SERVER_IMAGE` **overrides the Plugin Runtime setting**. While it is set, the selector in Settings is disabled. Version pinning still applies, replacing the image tag with `:v{version}`.
