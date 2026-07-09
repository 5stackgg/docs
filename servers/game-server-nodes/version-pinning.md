# Server Version Pinning

By default, every enabled game server node **auto-updates to the latest CS2 build** and runs the latest 5Stack game server plugin. When Counter-Strike updates, it may not work correctly with your compiled plugins — pinning lets you freeze a node on a known-good build until things catch up.

Pinning is configured **per node**. There is no global pin, so you can hold one node back while the rest track the latest build.

## Enabling CS2 build pinning

Downloading anything other than the latest build requires an authenticated Steam account — anonymous SteamCMD can only fetch the current build. To pin CS2 builds you must provide Steam credentials:

1. Open `INSTALL_DIR/overlays/local-secrets/steam-secrets.env` and set the `STEAM_USER` and `STEAM_PASSWORD` values.
2. Run `./update.sh`.

::: danger
You should use an account dedicated to updating servers, as we are unable to provide two-factor authentication automatically.
:::

Until credentials are set, the **CS2 Build** dropdown is disabled and a warning icon appears next to it reading _"Version pinning is not supported on this server."_

::: tip
Pinning the **plugin version** does not require Steam credentials — that dropdown works on any install.
:::

## Pinning a CS2 build

1. Go to **Game Server Nodes** in the admin navigation.
2. Find the node in the table. The **CS2 Build** column shows the build it is currently running, as `version (build_id)`.
3. Click the dropdown and choose the build you want.

Every entry lists the version, its build id, and when it was published. The build 5Stack considers newest is tagged **(current)** in green, and the build a node is pinned to is marked with a 📌 pin icon. Selecting a build confirms with a _"Server version pinned"_ toast.

To remove a pin, choose **Use Latest Version** ("Use the latest CS2 version automatically") at the top of the same dropdown.

::: info
On screens narrower than the full table layout, the **CS2 Build** and **Plugin Version** columns are hidden. Expand the node's row and open the **Game Server Versions** section to reach the same two dropdowns.
:::

### Applying the pin

Pinning sets the node's **target** build; it does not move the node on its own. If the node is running a different build than the one you pinned, a yellow update button appears next to the dropdown, with the tooltip **Update to {version}**. Click it to start the update.

- The node must be **Online** for the update button to be clickable.
- While the update runs, the column is replaced by a spinner and **Updating to {version}**. Click **Show Update Logs** to follow along.
- Rolling _back_ to an older build works exactly the same way — pin it, then run the update.

If a node has no CS2 installed yet, you'll see an **Install CS2** button instead of the dropdown.

## Pinning the plugin version

The **Plugin Version** column controls which 5Stack game server plugin the node runs. Unpinned, it reads **Latest**; pick a version from the dropdown to pin it, or choose **Use Latest Plugin Version** to go back to automatic.

The dropdown only lists releases for the [plugin runtime](/servers/game-server-nodes/plugin-runtimes) you have selected — SwiftlyS2 and CounterStrikeSharp number their releases independently. A pin remembers the runtime it was made under, so a pinned node stays on that framework even if you switch the deployment-wide runtime later. Clear the pin to move it.

Each version shows when it was published, and — where the plugin declares a minimum — a green **Supports: {build_id}+** line telling you the oldest CS2 build it works with. Use that to match a plugin to whatever build you pinned above.

If the node's current plugin can't run against its current CS2 build, a red **Plugin version not supported** icon appears next to the dropdown.

::: warning
Pinning a node to an older CS2 build while leaving the plugin on **Latest** is the most common way to end up in an unsupported combination. If you pin the build, pin a compatible plugin version too.
:::

## What happens when CS2 updates

When 5Stack detects a new CS2 build it marks it as current, notifies administrators, and then:

- **Nodes with no pin** update to the new build automatically.
- **Nodes pinned to the build they're already on** are skipped, and stay where they are.
- **Nodes pinned to a build they're not on yet** are moved to their pinned build.

The **CS2 Version Information** strip at the top of the Game Server Nodes page always shows the current build and when it was last updated.
