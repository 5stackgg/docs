# Backup & Recovery

The 5Stack service backs up your panel's database, secrets and config into one
encrypted file. Only your recovery key opens it, so a copy kept with 5Stack is
safe from anyone who doesn't have the key, 5Stack included.

<ArchitectureDiagram flows="backup" />

Click a box to see what it does and what it talks to.

## The recovery key

The recovery key is made on your panel server when you install it, or when you
run `service.sh`. It is printed once, in the terminal, on a line starting with
`AGE-SECRET-KEY-1`.

- **Keep it safe**, for example in a password manager, together with the claim
  link and install id printed with it. Anyone with the key and a backup can
  restore your panel.
- **5Stack can't recover it.** The key never leaves your server, so 5Stack
  doesn't have it. Without it, nobody can open your backups.
- **Show it again** on the server with `sudo 5stack recovery-key show`. As an
  admin, you can also click **Show** next to **Recovery key** under
  **Backup & Recovery** in the panel's settings. Each time it is shown is
  recorded.
- **Replace it** on the server with `sudo 5stack recovery-key rotate`, then run
  `sudo 5stack recovery-key show` to see the new key. The panel can't replace it.
  If the terminal says some backups kept with 5Stack still need the old key, keep
  the old key until you no longer need those backups.

## What a backup holds

- the database,
- the panel's secrets and config,
- your custom plugins,
- the install's identity with 5Stack.

Backups are made on the panel server and kept in `/var/lib/5stack/backups`. If
that server is lost, so are they, which is why a copy is also kept with 5Stack.

## Nightly backups

By default, the panel backs itself up every night at 03:00, server time, and
keeps the newest 7 backups on the server. While
**Keep an encrypted copy with 5Stack** is on, each backup is also uploaded to
5Stack.

Change these under **Backup & Recovery** in the panel's settings: the
**Nightly backup** switch and its **Time**, and the
**Keep an encrypted copy with 5Stack** switch.

To make a backup now, click **Back Up Now** there. Below it, the page shows the
last backup: whether one is running, its time and size, or the error if it
failed. Or, on the server, run:

```bash
5stack backup
```

Add `--local` to keep that backup only on the server.

## Restore on a new server

If the panel server is lost, set up a new server from a backup kept with 5Stack.
You need the recovery key and the Steam account that claimed the old install.

On the new server, run:

```bash
curl -fsSL https://get.5stack.gg | sudo sh -s -- restore
```

1. The server prints a link. Open it and sign in through Steam with the account
   that claimed the old install.
2. The terminal lists the backups kept with 5Stack for every panel that account
   claimed. Pick the one to restore.
3. Type the recovery key when the terminal asks for it. It never leaves the new
   server.
4. The server checks the backup was made with that recovery key, then restores
   the database, secrets, config and plugins. The old install's credential is
   revoked.

If you claimed several panels, add the old install's id to list only its
backups:

```bash
curl -fsSL https://get.5stack.gg | sudo sh -s -- restore 7f3c-91d0-e21a
```

If the key is wrong, the terminal says
**This key does not open this backup. 5Stack cannot open it either.**

## After a restore

1. Point your panel's DNS records at the new server.
2. Add each game server node again. A restored panel is a new cluster with a new
   panel key, so the nodes can't follow it on their own. On each node, run
   `5stack leave`, then the command from the panel's
   **Add Game Server Node** dialog. See
   [Add a Game Server Node](/service/game-server-nodes).

To move a panel whose old server still runs, use
[Move to a New Server](/service/new-server) instead. Nodes follow it on their own,
and nothing is lost between the last backup and the move.
