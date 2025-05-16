# Custom Counter-Strike Sharp (CSS) Plugins

5Stack Game Node Server Containers support custom plugins. To set up a custom plugin, navigate to the `/opt/5stack/custom-plugins` directory on your Game Server Node.

Any files placed in `/opt/5stack/custom-plugins` will automatically be transferred to `<install-dir>/game/csgo` when the game server starts. A [CounterStrikeSharp](https://docs.cssharp.dev/) plugin typically includes an `addons` folder.

::: warning
Game Node servers operate independently, so you'll need to copy your plugin files to each game server node where you want them to run.
:::

#### Custom K8s

If your plugin requires additional services like MySQL, please refer to the [Custom Kubernetes Setup Guide](/custom-k8s.md).
