# Backups and Recovery

The 5Stack service backs up your panel's database, secrets and config into one
encrypted file. Only your recovery key opens it.

The panel also backs up its database to file storage every night by itself.
This page is about the 5Stack service's encrypted backups, which hold the rest
of the panel too.

## The recovery key

The recovery key is made on your panel server when you install it, or when you
run `service.sh`. It is printed once, in the framed **SAVE THESE NOW** block, on
a line starting with `AGE-SECRET-KEY-1`.

- **Keep it safe**, for example in a password manager, together with the install
  id printed with it. Anyone with the key and a backup can restore your panel.
- **5Stack can't recover it.** The key never leaves your server, so 5Stack
  doesn't have it. Without it, nobody can open your backups.
- **Show it again** on the panel server:

  ```bash
  sudo 5stack recovery-key show
  ```

  Each time it is shown is recorded in the install's audit log.

- **Replace it** on the panel server:

  ```bash
  5stack recovery-key rotate
  ```

  Existing backups are re-signed for the new key. Run
  `sudo 5stack recovery-key show` afterwards to see it.

## Make a backup

On the panel server, run:

```bash
5stack backup
```

A backup holds:

- the database,
- the panel's secrets and config,
- your custom overlays and plugins,
- the install's identity with 5Stack.

It is encrypted with the recovery key and saved on the panel server, in
`/var/lib/5stack/backups`. If that server is lost, so are its backups, so copy
the ones you want to keep somewhere else.

The panel key that game server nodes trust is left out of backups, so a leaked
recovery key exposes panel data but not your nodes.

## Restore a backup

On the panel server, run:

```bash
sudo 5stack restore /var/lib/5stack/backups/<backup>.age
```

Without a file, it restores the newest backup in `/var/lib/5stack/backups`.

1. Type the recovery key when the terminal asks for it. It never leaves the
   server.
2. The server checks that the backup was made with that recovery key and wasn't
   changed since. If the key is wrong, it says
   **This key does not open this backup. 5Stack cannot open it either.**
3. It restores the secrets, config, custom overlays and plugins, then stops the
   API and Hasura, restores the database and starts them again.

A restore makes a new panel key. Run the command from the
**Create game server node** dialog again on each game server node, as the
terminal tells you. See
[Add a Game Server Node](/servers/game-server-nodes/create-game-server-node).

## Moving to a new server

To move a panel whose old server still runs, use
[Move to a New Server](/service/new-server) instead of a backup. Everything
moves, including demos and clips, your game server nodes follow on their own,
and nothing is lost between the last backup and the move.
