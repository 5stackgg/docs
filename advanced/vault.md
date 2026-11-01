# HashiCorp Vault

You can keep your panel's secrets in HashiCorp Vault instead of on the panel
server. The panel reads them from Vault through
[External Secrets](https://external-secrets.io), and you can rotate any of them
in Vault at any time.

The 5Stack service writes to Vault only when you run one of the commands below
and give it a token. It never keeps the token.

## Move a panel onto Vault

On the panel server, run:

```bash
sudo 5stack vault enable
```

It asks for:

1. **The Vault address**, such as `https://vault.example.com`. You can set
   `VAULT_ADDR` instead.
2. **An admin token**, typed hidden. You can set `VAULT_TOKEN` instead. It checks
   that Vault is initialized and unsealed and that the token works.
3. **A Kubernetes address Vault can reach.** Vault calls it to check the panel's
   service-account tokens. The default is `https://<this server's address>:6443`,
   using its public address or else its Tailscale address. It must be `https`,
   and a loopback address such as `127.0.0.1` is refused, because Vault couldn't
   reach it unless it runs on this server. Pass `--kubernetes-host <url>` to skip
   the question.

Then it shows what it is about to do and asks you to continue. It:

1. Installs External Secrets if the panel doesn't have it yet. This needs `helm`
   and the `vault` CLI on the panel server.
2. Sets up Kubernetes auth in Vault, with a read-only `external-secrets` policy
   when there is none yet.
3. Tests a login from the panel with that address. If it fails, it puts Vault's
   auth setup back as it was and stops.
4. Writes the panel's secrets to `kv/<name>` in Vault. A value Vault already has
   is kept, and the panel uses Vault's value from then on.
5. Applies the panel's release again so it reads its secrets from Vault, by the
   same rules as an [update](/updating#what-players-see).
6. Waits for every secret to sync, then removes the panel's own copies of the
   values.

If applying the release or the sync fails, the panel goes back to its own
secrets. What was already written to Vault stays there.

::: warning One Vault per panel
`vault enable` refuses a Vault that already serves another cluster, or that
holds different values for the panel's keys. It names each conflict and nothing
is changed. Give the panel its own Vault, or run it again with `--force`, which
points Vault's Kubernetes auth at this panel and keeps Vault's values.
:::

## Add secrets a new release needs

Before every update, a panel on Vault checks that Vault has every secret the new
release needs. If any are missing, the update stops before anything changes and
names them. Run:

```bash
sudo 5stack vault sync
```

It lists the missing secrets, each marked as generated, a release default, or
needing your value. It asks for a token, generates or fills in what it can, and
asks you for the rest, typed hidden. It only adds secrets Vault doesn't have, and
never overwrites one. Then it waits for the panel's secrets to sync. Update the
panel again afterwards.

Add `--version <version>` to prepare for a specific release.

## When Vault is sealed or unreachable

The panel warns when External Secrets can't sync its secrets, for example while
Vault is sealed or can't be reached. The 5Stack service checks every minute.

Once Vault is back, the panel recovers by itself: it syncs the secrets again and,
if that isn't enough, restarts External Secrets once.

To see Vault's health on the panel server, run:

```bash
5stack vault status
```

It shows whether Vault answers and is unsealed, which secrets aren't syncing and
why, and when the agent last checked. The **Vault** item in the
[`5stack` menu](/service/command#the-menu) shows the same.

If the secrets still don't sync after Vault is unsealed, sign External Secrets in
to Vault again and resync every secret:

```bash
sudo 5stack run fix-vault.sh
```

## Changing a secret

On a Vault install, change secrets in Vault. `sudo 5stack config set` refuses a
secret and names its Vault path. Settings that aren't secrets change with
`5stack config` as on any panel. See [Command Reference](/service/cli#config).

## Panels installed before the 5Stack service

A panel that already used Vault keeps it when you
[move it onto the 5Stack service](/service/existing-install). Use
`sudo 5stack vault sync` when a release needs new secrets.
