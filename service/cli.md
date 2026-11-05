# Command Reference

Every `5stack` command and its flags. `5stack help <command>` prints the same on
the server.

Commands shown with `sudo` run only as root on the server. The rest work without
sudo once you are in the `5stack` group. See
[The 5stack Command](/service/command). Most of them are also an item in the
[menu](/service/command#the-menu), which shows the command before it runs it.

## Status and help

| Command                                | What it does                                                                                                                                                                        |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `5stack`, `5stack menu`                | Opens the menu. `5stack menu --plain` opens the numbered menu.                                                                                                                      |
| `5stack status`                        | What this server is, its install id and who claimed it, the release and channel, when updates run, Vault, backups, diagnostics, the game server nodes, and anything that needs you. |
| `5stack status --json`                 | The same, as one JSON document.                                                                                                                                                     |
| `5stack version`                       | Prints the agent's version.                                                                                                                                                         |
| `5stack help`, `5stack help <command>` | Lists the commands, or explains one.                                                                                                                                                |

## Updates

| Command                                               | What it does                                                                                                    |
| ----------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `5stack update`                                       | Applies the newest release on your channel now, by the same rules as **Update Now**. See [Updating](/updating). |
| `5stack update --version <version>`                   | Applies that release instead of the newest.                                                                     |
| `5stack update --no-drain`                            | Applies without holding new matches first. Live matches end if the update restarts something they need.         |
| `5stack update --at 03:00`                            | Schedules the update, like **Pick a time** in the panel. Add `--version <version>` for another release.         |
| `5stack update-policy manual`                         | Updates wait until you start one.                                                                               |
| `5stack update-policy scheduled --window 03:00-06:00` | Updates run in that window.                                                                                     |
| `5stack update-policy idle --window 03:00-06:00`      | Updates run in that window once no matches are live.                                                            |
| `5stack channel set stable`                           | Picks the release channel. Stay on `stable` unless 5Stack asks you to test a build on `branch/<name>`.          |

`--at` takes a clock time, which is the next time it comes round on the server,
or an ISO time such as `2026-11-02T03:00:00Z`. When the time comes, it runs like
an update scheduled in the panel, holding new matches first when it has to, so
`--at` doesn't take `--no-drain`. A new `--at` replaces the one you scheduled
before. If an update scheduled in the panel is already waiting, change it in the
panel's update center instead.

## Config

The 5Stack service keeps the panel's config and secrets, and every update
applies them. Change them with `5stack config`, not by editing files on the
server.

| Command                                  | What it does                                                                                                                                                        |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `5stack config list`                     | Every setting, grouped by file. Secrets show as `••••••••`, `(empty)` or `(not set)`, and as `in Vault (kv/<path>)` on a Vault install.                             |
| `5stack config get <KEY>`                | One setting. A secret stays masked. As root, `--show` prints it.                                                                                                    |
| `sudo 5stack config set <KEY>=<VALUE> …` | Changes settings, then applies the panel's release again.                                                                                                           |
| `sudo 5stack config unset <KEY> …`       | Removes settings, then applies again.                                                                                                                               |
| `sudo 5stack config import`              | Takes the edits you made in an [upgraded panel's](/service/existing-install) checkout. `--from <dir>`, an absolute path, takes every setting from another checkout. |
| `sudo 5stack config tailscale`           | Sets the Tailscale OAuth client and joins this server to your tailnet. For a panel installed without Tailscale, or to replace the client.                           |
| `sudo 5stack config apply`               | Applies the release again with the stored config, for example after an apply that failed.                                                                           |

`set`, `unset`, `import` and `tailscale` show what changes and ask first. They
take:

- `--yes` to skip the question. `apply` takes it too.
- `--no-apply` to save without applying. The change applies with the next
  update.

And for some of them:

| Flag                    | With                  | What it does                                                                                         |
| ----------------------- | --------------------- | ---------------------------------------------------------------------------------------------------- |
| `--file <file>`         | `get`, `set`, `unset` | Picks the file, such as `overlays/config/api-config.env`, for a key that is in more than one.        |
| `--force --file <file>` | `set`                 | Adds a key that none of the panel's files list.                                                      |
| `--from-file <path>`    | `set`, `tailscale`    | Reads the value of one setting, such as a secret, from a file by its absolute path. `-` reads stdin. |
| `--client-id <id>`      | `tailscale`           | Gives the OAuth client ID instead of being asked.                                                    |
| `--tailnet <name>`      | `tailscale`           | Sets the tailnet name. Without it, the stored one is kept.                                           |
| `--force`               | `tailscale`           | Goes on although game server nodes that aren't on Tailscale yet would lose the panel.                |
| `--no-drain`            | `apply`               | Applies without waiting for live matches, which end.                                                 |

### Changing a setting

```bash
sudo 5stack config set REVERSE_PROXY=true
```

It lists each change, old value to new, and asks
`Save these and apply release <version> again? [y/N]`. The apply follows the
update rules: new matches wait only when a restart needs it.

Secrets are never taken from the command line, where shell history would keep
them. Give the key with no value and type it hidden:

```bash
sudo 5stack config set FACEIT_API_KEY=
```

### What it accepts

- A value is one line, with no space or tab at either end.
- `REVERSE_PROXY` and `CLOUDFLARE` are `true` or `false`. Ports are 1 to 65535.
  `*_DOMAIN` and `*_HOST` are host names. `GAME_STREAMER_AMD_MEMORY_*` are like
  `24Gi` or `512Mi`.
- The panel's scripts read `.5stack-env.config` as shell, so its values take
  only letters, digits and `. _ , : / @ + = -`, or double quotes around a list
  such as `GPU_NODES="node-a node-b"`.
- Only the keys the panel's scripts read are written into `.5stack-env.config`.
  Any other key there is kept but ignored, and `5stack status` warns
  **ignored .5stack-env.config keys this agent doesn't know**. A newer panel
  that needs one also needs a newer agent.
- A key no panel file lists is refused, unless you add `--force --file <file>`.
- `WEB_DOMAIN` and `STEAM_WEB_API_KEY` can change, but not be emptied.
- The service sets these itself: `KUBECONFIG`, `VAULT_MANAGER`
  (`sudo 5stack vault enable`), `K3S_TOKEN`, `POSTGRES_CONNECTION_STRING` and the
  `TAILSCALE_*` settings (`sudo 5stack config tailscale`).
- On a [Vault](/advanced/vault) install, secrets change in Vault. `config set`
  refuses them and names the Vault path.

## Panel scripts

`sudo 5stack run <script>` runs one of the panel's own scripts from the
installed release, with the panel's config, in your terminal, so its questions
work as usual. You can also pick each one in the menu.

| Script               | What it does                                                                                                                                        |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `plugin.sh`          | Installs, upgrades, lists or removes a panel plugin. See [One-Command Install](/plugins/installing).                                                |
| `custom.sh`          | Deploys one of your overlays in `/etc/5stack/custom` onto a node. See [Custom Kubernetes YAML](/advanced/custom-k8s).                               |
| `setup-gpu-nodes.sh` | Picks the GPU nodes and the Steam account render pods use, then applies the panel again. See [GPU Nodes](/servers/gpu-nodes/#run-the-setup-script). |
| `playcast-relay.sh`  | Deploys the Playcast edge relay. See [Playcast Edge Relay](/advanced/playcast-edge-relay).                                                          |
| `backblaze-proxy.sh` | Deploys the Backblaze B2 worker and points the panel at it. See [Backblaze + Cloudflare](/advanced/s3/backblaze).                                   |
| `fix-ssl.sh`         | Requests new certificates for the ones that aren't valid, then applies the panel again.                                                             |
| `fix-vault.sh`       | Signs External Secrets in to Vault again and resyncs every secret, after Vault is unsealed. See [HashiCorp Vault](/advanced/vault).                 |
| `fix-versions.sh`    | Removes the cached `ghcr.io/5stackgg` images on this server, so they are pulled again.                                                              |
| `debug.sh`           | Saves pod logs, events and certificate status to a file for a bug report. See [Debugging](/common-issues/debug-script).                             |

`5stack run --list` lists them, without sudo.

- **Arguments** after the script name go to the script unchanged:
  `sudo 5stack run plugin.sh list`.
- **`--yes`**, before the script name, answers yes for a script that asks:
  `plugin.sh`, `custom.sh`, `setup-gpu-nodes.sh`, `fix-ssl.sh` and
  `fix-vault.sh`. The others refuse it.
- **Live matches.** `plugin.sh`, `custom.sh`, `backblaze-proxy.sh`,
  `setup-gpu-nodes.sh` and `fix-ssl.sh` apply to the cluster. When that would
  restart something, they hold new matches and wait for live ones first, like an
  update. `--no-drain` before the script name skips the wait, and live matches
  end. The other scripts refuse it.
- **One at a time.** A script doesn't start while an update, a move, an
  uninstall, a config change or another script runs on the panel, and none of
  those start while it runs.
- **What a script changes is kept.** Config a script writes, such as the GPU
  nodes `setup-gpu-nodes.sh` saves, is stored by the service and applies with
  every update.
- `update.sh` and `install.sh` aren't run this way. Use `5stack update`, or the
  [installer](/install/).

## Browser console

`sudo 5stack ui` opens a console for the panel in your browser, through
`get.5stack.gg`, so you can run panel commands without keeping an SSH session
open.

1. Run `sudo 5stack ui` on the panel server. It prints a link and the server's
   key fingerprint. The link works once, in one browser.
2. Open it and sign in through Steam with the account that claimed the panel.
   Any other account is refused, and the terminal shows who tried.
3. Type commands in the page. The server's terminal shows each one as it runs.

The console runs only these:

| Command                                                | What it does                                                                                     |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| `status`                                               | What `5stack status` shows.                                                                      |
| `logs <service>… [--follow] [--previous] [--tail <n>]` | A service's logs. `logs 5stack` and `logs k3s` show the 5Stack service and k3s.                  |
| `debug-bundle [--send]`                                | Pods, events and logs with player data removed, to download, or to send to 5Stack with `--send`. |
| `run <script>`                                         | A [panel script](#panel-scripts).                                                                |
| `config …`                                             | [`5stack config`](#config).                                                                      |
| `session`, `end`, `help`                               | Who is signed in and for how long, end the session, or list the commands.                        |

Updates, backups, the recovery key, Vault changes, moving and uninstalling are
never in the console.

- **Risky commands wait for the server.** Changing a setting, a script that asks
  questions, and `--yes` or `--no-drain` wait for `y` typed in the server's
  terminal within 2 minutes. The browser then answers the script's questions.
- **Script arguments are limited.** The console passes `custom.sh` only an
  overlay name, `backblaze-proxy.sh` only a hostname, and `plugin.sh` only
  `list`, `remove <slug>`, or a GitHub repository with `--ref`, `--domain`,
  `--node`, `--tls`, `--no-tls` or `--dry-run`. The other scripts take none. For
  anything else, run the script on the server.
- **It ends** 8 hours after you sign in, after 30 minutes without a command, on
  **End Session**, or with Ctrl-C in the server's terminal. A link nobody opens
  expires after 15 minutes. A reloaded page needs the link again.

Only a claimed panel opens a console. An unclaimed one prints its claim link
instead. Commands and their output are encrypted between the server and your
browser, so 5Stack passes them along but can't read them. The server records
each session and every command.

## Game server nodes

| Command                           | What it does                                                                                                                                |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `5stack nodes list`               | Lists the cluster's nodes: Ready or not, the panel's own node, whether each has the agent, and any removal in progress.                     |
| `5stack nodes join-command`       | Prints the command that joins a new server to this panel, with the panel key in it, as the **Create game server node** dialog shows it.     |
| `5stack nodes adopt`              | Installs the agent on game server nodes added with the old install script. The panel also does this by itself.                              |
| `sudo 5stack nodes remove <name>` | Uninstalls 5Stack from a game server node and deletes it from the cluster. It asks you to type the node's name. `--yes` skips the question. |
| `5stack leave`                    | On a game server node, leaves the panel: removes the k3s agent and logs out of Tailscale.                                                   |

See [Add a Game Server Node](/servers/game-server-nodes/create-game-server-node).

## Vault

| Command                        | What it does                                                                                                  |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| `5stack vault status`          | Whether Vault answers and is unsealed, which secrets aren't syncing and why, and when the agent last checked. |
| `sudo 5stack vault enable`     | Moves the panel's secrets into Vault. Takes `--kubernetes-host <url>` and `--force`.                          |
| `sudo 5stack vault sync`       | Adds the secrets a new release needs. `--version <version>` prepares for a specific release.                  |
| `sudo 5stack run fix-vault.sh` | Signs External Secrets in to Vault again and resyncs every secret.                                            |

See [HashiCorp Vault](/advanced/vault).

## Backups and diagnostics

| Command                         | What it does                                                                          |
| ------------------------------- | ------------------------------------------------------------------------------------- |
| `5stack backup`                 | Makes an encrypted backup of the panel. See [Backups and Recovery](/service/backups). |
| `sudo 5stack restore [<file>]`  | Restores a backup, with the recovery key typed on the server.                         |
| `sudo 5stack recovery-key show` | Prints the recovery key.                                                              |
| `5stack recovery-key rotate`    | Replaces the recovery key.                                                            |
| `5stack diagnostics on`, `off`  | Turns crash reports on or off. See [Diagnostics](/service/diagnostics).               |

## Moving, leaving and uninstalling

| Command                                    | What it does                                                                                                                                                                                                                         |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `sudo 5stack move --to <code> --key <key>` | Moves this panel to a new server, with the command the new server prints. See [Move to a New Server](/service/new-server).                                                                                                           |
| `5stack leave --panel`                     | On the panel, removes the agent and stops the service. `sudo ./service.sh --remove` runs this.                                                                                                                                       |
| `sudo 5stack uninstall`                    | Removes 5Stack from this server. On the panel, `--everything` includes every game server node and `--this-server` doesn't. `--yes` answers without questions, and `--no-backup` skips the final backup. See [Uninstall](/uninstall). |
| `sudo 5stack claim reset`                  | Lets a different Steam account claim the install. The install stays with the account that first claimed it until root runs this.                                                                                                     |

Servers are set up through the installer: see
[Setting up a server](/service/command#setting-up-a-server). `adopt`,
`adopt-node` and `daemon` are run for you, by `service.sh`, the panel and
systemd.
