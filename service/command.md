# The 5stack Command

The `5stack` command talks to the 5Stack service running on the server. It works
the same on the panel server and on game server nodes.

## You don't need sudo

Only installing needs sudo. The installer and `service.sh` add you to the
`5stack` group. Log out and back in once so the group applies, and from then on
`5stack` commands work without sudo: they pass your request to the service, which
runs it as root.

Being in the `5stack` group means being trusted with the server, the same as the
`docker` group. Only add people you would give root to.

## Everyday commands

| Command                                  | What it does                                                                                                                         |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `5stack status`                          | Shows whether this server is a panel or a game server node, its install id and who claimed it, the channel and release, when updates run, and whether diagnostics are on. |
| `5stack update`                          | Applies the newest release on your channel now. See [Updates](/service/updates).                                                     |
| `5stack backup`                          | Makes an encrypted backup and keeps a copy with 5Stack. `--local` keeps it only on the server. See [Backup & Recovery](/service/backup). |
| `5stack recovery-key rotate`             | Replaces the recovery key. Run `sudo 5stack recovery-key show` afterwards to see the new one.                                      |
| `5stack channel set stable`              | Picks the release channel. Stay on `stable` unless 5Stack asks you to test a build on `branch/<name>`.                              |
| `5stack diagnostics on`, `off`           | Turns crash reports on or off. See [Diagnostics](/service/diagnostics).                                                             |
| `5stack nodes adopt`                     | Installs the agent on game server nodes that were added with the install script. The panel also does this by itself.               |
| `5stack leave`                           | On a game server node, leaves the panel.                                                                                             |
| `5stack leave --panel`                   | On the panel, removes the agent. The panel goes back to `./update.sh` and the install script for nodes.                             |
| `5stack version`                         | Prints the agent's version.                                                                                                          |
| `5stack help`, `5stack help <command>`   | Lists the commands, or explains one.                                                                                                 |

## Root-only commands

These change who can open your backups, who owns the install or where the panel
runs, so they work only as root on the server itself.

| Command                           | What it does                                                                                                                         |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `sudo 5stack recovery-key show`   | Prints the recovery key. Admins can also see it in the panel under **Backup & Recovery**.                                          |
| `sudo 5stack claim reset`         | Lets a different Steam account claim the install. The install stays with the account that first claimed it until root runs this.  |
| `sudo 5stack move --to <code> --key <key>` | Moves this panel to a new server, using the command the new server prints. See [Move to a New Server](/service/new-server). |

## Setting up a server

These run through the installer, as root:

| Command                                                                   | What it does                                                                                     |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `curl -fsSL https://get.5stack.gg \| sudo sh`                              | Sets the server up as a new panel. See [Install](/service/install).                              |
| `curl -fsSL https://get.5stack.gg \| sudo sh -s -- join --panel-key <key>` | Joins the server to a panel as a game server node. See [Add a Game Server Node](/service/game-server-nodes). |
| `curl -fsSL https://get.5stack.gg \| sudo sh -s -- migrate`                | Prepares the server to take over a panel. See [Move to a New Server](/service/new-server).       |
| `curl -fsSL https://get.5stack.gg \| sudo sh -s -- restore`                | Restores a panel from a backup kept with 5Stack. Add an install id to list only that panel's backups. See [Backup & Recovery](/service/backup). |
| `sudo ./service.sh`                                                       | Moves a git-checkout panel onto the service. See [Move an Existing Install](/service/existing-install). |

The installer takes two options, placed after `sh -s --`:

- `--channel branch/<name>` follows a branch build instead of `stable`.
- `--allow-downgrade` installs a signed build older than the one installed.

## Where things are

| Path                          | What it holds                                                    |
| ----------------------------- | ---------------------------------------------------------------- |
| `/usr/local/bin/5stack`       | The agent                                                        |
| `/var/lib/5stack`             | The agent's state, keys and local backups, readable only by root |
| `/etc/systemd/system/5stack.service` | The system service                                        |

To see what the service is doing, run `journalctl -u 5stack -f`.
