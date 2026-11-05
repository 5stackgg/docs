# Server Version Pinning

By default, every enabled game server node **auto-updates to the latest CS2 build** and runs the latest 5Stack game server plugin. A Counter-Strike update may not work correctly with your compiled plugins. Pinning lets you freeze a node on a known-good build until things catch up.

Pinning is configured **per node**. There is no global pin, so you can hold one node back while the rest track the latest build.

## Enabling CS2 build pinning

Only the latest CS2 build downloads without a Steam account, so to pin CS2 builds you must provide Steam credentials.

On the panel server, run this and type the account name and password when it asks. Both are typed hidden:

```bash
sudo 5stack config set STEAM_USER= STEAM_PASSWORD=
```

::: danger
You should use an account dedicated to updating servers, as we are unable to provide two-factor authentication automatically.
:::

Until credentials are set, the **Version** dropdown in the node inspector's **CS2** section is disabled, with a **Pinning not supported** link beside it (_"Version pinning is not supported on this server."_).

::: tip
Pinning the **plugin version** does not require Steam credentials, that dropdown works on any install.
:::

## Pinning a CS2 build

1. Go to **Game Server Nodes** in the admin navigation.
2. Click the node in the table to open its inspector. The table's **CS2** column shows the build each node is on.
3. In the inspector's **CS2** section, open the **Version** dropdown and choose the build you want.

The newest build is tagged **(current)**, and the build a node is pinned to is marked with a 📌 pin icon.

To remove a pin, choose **Use latest version** at the top of the same dropdown.

### Applying the pin

Pinning sets the node's **target** build; it does not move the node on its own. If the node is running a different build than the one you pinned, the **CS2** section reads **Update available**, the table marks the node **Behind**, and **Update** starts the update.

- The node must be **Online** for **Update** to be clickable.
- While the update runs, the section shows **Updating to {build}**, with **Watch log** to follow along.
- Rolling _back_ to an older build works exactly the same way, pin it, then run the update.

If an update fails, the node is marked **Update failed**, and its inspector says
how long ago, with the last lines of the log, **Open log** and **Retry**.
Administrators also get a **Game Update Failed** notification naming the node.

If a node has no CS2 installed yet, you'll see an **Install CS2** button instead of the dropdown.

## Pinning the plugin version

The **Plugin** dropdown, in the same **CS2** section of the inspector, controls which 5Stack game server plugin the node runs. Unpinned, it reads **Latest**; pick a version from the dropdown to pin it, or choose **Use latest plugin version** to go back to automatic.

The dropdown only lists releases for the [plugin runtime](/servers/game-server-nodes/plugin-runtimes) you have selected. A pinned node stays on the runtime it was pinned under, even if you switch runtimes later. Clear the pin to move it.

Each version shows a green **Supports: {build_id}+** line with the oldest CS2 build it works with. Use that to match a plugin to whatever build you pinned above.

If the node's current plugin can't run against its current CS2 build, the plugin reads **Not supported**, and the inspector warns "The pinned plugin doesn't support build {build}."

::: warning
Pinning a node to an older CS2 build while leaving the plugin on **Latest** is the most common way to end up in an unsupported combination. If you pin the build, pin a compatible plugin version too.
:::

## What happens when CS2 updates

When 5Stack detects a new CS2 build it marks it as current, notifies administrators, and then:

- **Nodes with no pin** update to the new build automatically.
- **Nodes pinned to the build they're already on** are skipped, and stay where they are.
- **Nodes pinned to a build they're not on yet** are moved to their pinned build.

The **CS2 build** card at the top of the Game Server Nodes page always shows the current version and when it was released. See [Managing Nodes](/servers/game-server-nodes/managing) for the rest of the inspector.
