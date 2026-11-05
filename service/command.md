# The 5stack Command

The `5stack` command talks to the 5Stack service running on the server. It works
the same on the panel server and on game server nodes. Every command and its
flags are in the [Command Reference](/service/cli).

## The menu

Run `5stack` on its own in a terminal to open a menu of everything you do on the
server: status, updates, config, plugins, game server nodes, the browser
console, Vault, backups, diagnostics, the add-on scripts, moving and
uninstalling.

```bash
5stack
```

- Arrow keys pick an item and `/` searches. The pane beside the list shows what
  the item does.
- Each item runs the real `5stack` command and shows it before it runs, so you
  can type the same command yourself next time.
- Items that need root say so, and offer to run the command with `sudo`, which
  asks for your password as usual.
- Items that remove something ask first, with No as the default.

The full-screen menu needs a terminal of at least 80×20. In a smaller one, or
with `5stack menu --plain`, you get a numbered menu instead. On a game server
node the menu shows Status, Diagnostics, Leave the panel and Uninstall.

As root on a claimed panel, `sudo 5stack` opens the
[browser console](/service/console) first and prints its link. Press Enter to
close it and open the menu, or Ctrl+C to close it.

## You don't need sudo

The installer and `service.sh` add you to the `5stack` group. Log out and back
in once so the group applies, and from then on everyday `5stack` commands work
without sudo.

Being in the `5stack` group means being trusted with the server, the same as the
`docker` group. Only add people you would give root to.

Commands that change the panel's config, run its scripts, open the browser
console, set up a server, change what it trusts or involve the recovery key work
only as root on the server itself. The
[Command Reference](/service/cli) shows them with `sudo`.

## Setting up a server

These run through the installer, as root:

| Command                                                                    | What it does                                                                                                         |
| -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `curl -fsSL https://get.5stack.gg \| sudo sh`                              | Sets the server up as a new panel. See [Install](/install/).                                                         |
| `curl -fsSL https://get.5stack.gg \| sudo sh -s -- join --panel-key <key>` | Joins the server to a panel as a game server node. See [Add a Game Server Node](/servers/game-server-nodes/create-game-server-node). |
| `curl -fsSL https://get.5stack.gg \| sudo sh -s -- migrate`                | Prepares the server to take over a panel. See [Move to a New Server](/service/new-server).                           |
| `curl -fsSL https://get.5stack.gg \| sudo sh -s -- uninstall`              | Removes 5Stack from a server whose `5stack` command is missing or old. See [Uninstall](/uninstall).                  |
| `git pull && sudo ./service.sh`                                            | Moves a git-checkout panel onto the service. See [Upgrade an Existing Panel](/service/existing-install).             |

The installer takes two options, placed after `sh -s --`:

- `--channel branch/<name>` follows a branch build instead of `stable`.
- `--allow-downgrade` installs a signed build older than the one installed.

## Where things are

| Path                      | What it holds                              |
| ------------------------- | ------------------------------------------ |
| `/var/lib/5stack/backups` | Encrypted backups                          |
| `/etc/5stack/custom`      | Your custom overlays and installed plugins |

To see what the service is doing, run `journalctl -u 5stack -f`.
