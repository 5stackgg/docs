# Custom Plugins

5Stack Game Node Server Containers support custom plugins. To set up a custom plugin, navigate to the `/opt/5stack/custom-plugins` directory on the Game Server Node.
After locating the directory, create a new folder for your plugin. All files within this folder will be automatically loaded into the `<install-dir>/game/csgo` directory.

::: warning
Each Game Server Node must have its own dedicated folder for storing plugins.
:::

Example:

::: code-group

```[/opt/5stack/custom-plugins/Ranks]
addons
    counterstrikesharp
        configs
            ...
        plugins
            ...
        shared
            ...
```

:::

If you need to add a service like MySQL for a plugin, please refer to the [Custom Kubernetes Setup Guide](/custom-k8s.md).