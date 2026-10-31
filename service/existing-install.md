# Move an Existing Install onto the Service

If you installed the panel from the git checkout (`git clone` and
`./install.sh`), `service.sh` moves it onto the 5Stack service in place. Your
config and secrets carry over, and nothing is reinstalled.

`./update.sh` and your `.env` files keep working afterwards, so you can still
update the old way if you need to.

## Run service.sh

On the panel server, in the 5Stack-Panel directory, pull the latest scripts and
run `service.sh` as root:

```bash
git pull
sudo ./service.sh
```

It asks no setup questions. It checks that:

- it runs as root,
- this server is the k3s server for your panel
  (`/var/lib/rancher/k3s/server/token` and `/etc/rancher/k3s/k3s.yaml` exist),
- the server runs Linux on x86_64 or arm64,
- `curl` and OpenSSL 3 or newer are installed.

Then it downloads the `5stack` agent and checks its signature against the key in
your checkout (`utils/agent_signing_key.pem`), and its checksum. If anything
fails to check out, it stops and installs nothing. It also refuses a build older
than the agent already installed.

Once the agent is installed, it takes over the checkout:

- It imports `overlays/config`, `overlays/local-secrets` and your custom plugins
  in `/opt/5stack/custom-plugins`. If you use [Vault](/advanced/vault), Vault
  stays the source of your secrets.
- It installs `5stack.service` and adds you to the `5stack` group, so `5stack`
  commands work without sudo once you log in again.
- It registers the install with 5Stack and prints a claim link, the install id
  and your recovery key.

It doesn't change the checkout, the `.env` files, `update.sh` or `install.sh`.

## Claim the install

Open the claim link `service.sh` printed, and sign in through Steam with your
account. The panel's current admins stay admins. If the panel has no admin, the
account that claims it becomes one. Otherwise the claim links the install to your
5Stack account, for support.

## Save the recovery key

`service.sh` prints a recovery key on a line starting with `AGE-SECRET-KEY-1`,
along with the claim link and the install id. Save the recovery key together with
the install id somewhere safe. The key never leaves your server, so 5Stack doesn't
have it. `sudo 5stack recovery-key show` prints it again on this server.

## What changes in the panel

- The header update center shows the panel's release and when it updates. See
  [Updates](/service/updates).
- **Create game server node** opens a dialog that shows a command and takes a
  code from the node. See
  [Add a Game Server Node](/service/game-server-nodes).
- Game server nodes you added with the install script keep running. The panel
  installs the agent on them for you, without SSH and without re-joining them.

## Options

| Option                     | What it does                                                                                                                                       |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--channel <name>`         | Follows another release channel, `stable` or `branch/<name>`. The default is `stable`. Change it only when 5Stack asks you to test a build.        |
| `--binary <path>`          | Installs a `5stack` binary you copied to the server yourself. It skips the signature check and prints a warning, so use it only for a build you trust. |
| `--allow-downgrade`        | Installs a signed build even though it is older than the one installed.                                                                          |
| `--remove`                 | Removes the agent: it runs `5stack leave --panel` and deletes the binary. The panel goes back to `./update.sh` and the install script for nodes. |
| `--to <code> --key <key>`  | Moves this panel to a new server. See [Move to a New Server](/service/new-server).                                                                |

Running `sudo ./service.sh` again upgrades the agent the same way.

`--remove` keeps `/var/lib/5stack`, which holds the agent's state and keys.
Delete it yourself if you no longer need it.
