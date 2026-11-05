# Installer Options

The installer takes its options after `sh -s --`:

```bash
curl -fsSL https://get.5stack.gg | sudo sh -s -- --channel branch/<name>
```

| Option                     | What it does                                                                                                   |
| -------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `--channel branch/<name>`  | Follows a branch build instead of `stable`. Use it only when 5Stack asks you to test a build.                 |
| `--allow-downgrade`        | Installs a build older than the one already installed.                                                         |
| `-h`, `--help`             | Lists what the installer can do.                                                                               |

A role goes first, before any options:

| Role                         | What it does                                                                                                                                  |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| none                         | Sets the server up as a new panel. See [Install](/install/).                                                                                  |
| `join --panel-key <key>`     | Joins the server to a panel as a game server node. See [Add a Game Server Node](/servers/game-server-nodes/create-game-server-node).          |
| `migrate`                    | Prepares the server to take over a panel. See [Move to a New Server](/service/new-server).                                                    |
| `restore [<install id>]`     | Brings a lost panel back on this server from its recovery backup in 5Stack cloud. See [Backups](/install/backups#after-losing-the-old-server). |
| `uninstall`                  | Removes 5Stack from the server. See [Uninstall](/uninstall).                                                                                  |

For example, to join a node to a panel on a branch build:

```bash
curl -fsSL https://get.5stack.gg | sudo sh -s -- join --panel-key <key> --channel branch/<name>
```

## Setup answers

The installer asks its setup questions on the setup page or in the terminal.
See [Install](/install/#answer-on-the-setup-page). Run it from an interactive
SSH session, not from a script.

To change the proxy, keys or storage after the install, use
`sudo 5stack config`. See [Command Reference](/service/cli#config).

## Service logs

To see what the 5Stack service is doing, for example during an update, run
this on the server:

```bash
journalctl -u 5stack -f
```
