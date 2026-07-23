# Game Plugin Runtimes

::: info Game plugins, not panel plugins
This page is about **CS2 server-side plugins** that load into your game servers.
If you're looking to build a web app that runs inside the panel, see
[5Stack Plugin Development](/plugins/).
:::

5Stack ships its match plugin for **two different CS2 plugin frameworks**. Both implement the same match logic, knife rounds, ready-up, overtime, map veto, backups, stats, and both talk to the panel over the same API. What differs is the framework they load into, and therefore which third-party plugins and gamedata files they understand.

|                  | SwiftlyS2                                                                       | CounterStrikeSharp                                              |
| ---------------- | ------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| Image            | `ghcr.io/5stackgg/swiftly-game-server`                                          | `ghcr.io/5stackgg/game-server`                                  |
| Source           | [5stackgg/swiftly-game-server](https://github.com/5stackgg/swiftly-game-server) | [5stackgg/game-server](https://github.com/5stackgg/game-server) |
| Loads via        | SwiftlyS2                                                                       | Metamod → CounterStrikeSharp                                    |
| Addons directory | `addons/swiftlys2`                                                              | `addons/counterstrikesharp`                                     |
| Default          | ✅ Yes                                                                          | No                                                              |

::: tip
**SwiftlyS2 is the default.** New installs run it unless you pick otherwise. CounterStrikeSharp remains fully supported and is the right choice if you depend on existing CSS plugins.
:::

## Which should I use?

- **Stay on SwiftlyS2** unless you have a reason not to. It's the default and what new installs are tested against.
- **Choose CounterStrikeSharp** if you run third-party [CSS plugins](https://docs.cssharp.dev/) that have no SwiftlyS2 equivalent, or you already have a working `gamedata.json` workflow you don't want to rewrite.

The two frameworks are **not** interchangeable at the plugin level. A CounterStrikeSharp plugin will not load under SwiftlyS2, and vice versa. See [Custom Game Plugins](/servers/game-server-nodes/custom-plugins) for the per-framework directory layouts.

## Switching runtimes

The runtime is a **deployment-wide** choice, not a per-node or per-match one.

1. Go to **Settings → Application → Servers**.
2. Under **Plugin Runtime**, pick **SwiftlyS2** or **CounterStrikeSharp**.

The change saves immediately. No redeploy, no `./update.sh`, no restart.

New game servers pick up the new image the next time they start. Servers already running keep the image they were created with until they're recycled.

::: warning
Switching runtimes does **not** migrate your custom plugins. Anything under `addons/counterstrikesharp` is ignored by SwiftlyS2, and anything under `addons/swiftlys2` is ignored by CounterStrikeSharp. Move your files to the matching directory before you switch, or your servers will start without them.
:::

## Runtime versions

Each image pins the framework version it was built against:

- **SwiftlyS2**: the plugin is built against a specific `SwiftlyS2.CS2` NuGet package, and the image downloads the matching SwiftlyS2 runtime release. The two must agree, so they're bumped in lockstep.
- **CounterStrikeSharp**: the image downloads a pinned Metamod and CounterStrikeSharp release.

You don't need to manage these yourself; they come with the image.

Each framework has its **own plugin release history**, and the two number their releases independently, `v0.0.42` of the SwiftlyS2 plugin is unrelated to `v0.0.42` of the CounterStrikeSharp plugin. The panel tracks both, and the **Plugin Version** dropdown on a node only offers releases from the runtime you have selected. See [Version Pinning](/servers/game-server-nodes/version-pinning).

A node pinned to a plugin version stays on the framework it was pinned under, even if you later switch the deployment-wide runtime. Clear the pin to move that node onto the selected runtime.

## Advanced: custom images

If you build your own plugin image, or mirror the official ones into a private registry, set `SERVER_IMAGE` on the panel API:

1. Open `INSTALL_DIR/overlays/config/api-config.env`.
2. Add the full image reference:

```sh
SERVER_IMAGE=registry.example.com/my-org/my-game-server:latest
```

3. Run `./update.sh`.

`SERVER_IMAGE` **overrides the Plugin Runtime setting**. While it is set, the selector in Settings is disabled and shows a note saying the runtime is managed by the environment. Version pinning still applies, replacing the image tag with `:v{version}`.
