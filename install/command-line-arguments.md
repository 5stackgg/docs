# Installer Options

The installer takes its options after `sh -s --`:

```bash
curl -fsSL https://get.5stack.gg | sudo sh -s -- --channel branch/<name>
```

| Option                     | What it does                                                                                                   |
| -------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `--channel branch/<name>`  | Follows a branch build instead of `stable`. Use it only when 5Stack asks you to test a build.                 |
| `--allow-downgrade`        | Installs a signed build older than the agent already installed.                                               |
| `-h`, `--help`             | Lists what the installer can do.                                                                               |

A role goes first, before any options:

| Role                         | What it does                                                                                                                                  |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| none                         | Sets the server up as a new panel. See [Install](/install/).                                                                                  |
| `join --panel-key <key>`     | Joins the server to a panel as a game server node. See [Add a Game Server Node](/servers/game-server-nodes/create-game-server-node).          |
| `migrate`                    | Prepares the server to take over a panel. See [Move to a New Server](/service/new-server).                                                    |
| `uninstall`                  | Removes 5Stack from the server. See [Uninstall](/uninstall).                                                                                  |

For example, to join a node to a panel on a branch build:

```bash
curl -fsSL https://get.5stack.gg | sudo sh -s -- join --panel-key <key> --channel branch/<name>
```

## Setup answers

The installer asks for the panel domain, whether the DNS is on Cloudflare,
whether a reverse proxy is in front of the server, the Steam Web API key and the
Tailscale OAuth client, on the setup page or in the terminal. See
[Install](/install/#answer-on-the-setup-page).

Use the reverse proxy answer for Nginx, the
[Cloudflare proxy](/install/cloudflare/proxy), or a
[Cloudflare Tunnel](/install/cloudflare/tunnel).

The installer asks its questions on the server's terminal, so run it from an
interactive SSH session, not from a script.

## Service logs

The installer prints its progress in the terminal. To see what the 5Stack
service is doing afterwards, for example during an update, run this on the
server:

```bash
journalctl -u 5stack -f
```
