# Backups

A 5Stack panel keeps two kinds of backup. Both are on the **Backups** page of the
[browser console](/service/console), under **Config**, one kind on
each tab.

|                 | Database backups                                                      | Recovery backups                                                                                                                          |
| --------------- | --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| What's in it    | The panel's data: matches, players, stats, tournaments and settings.  | Everything to rebuild the panel: its config and secrets, your custom files and plugins, the Tailscale sign-in and a copy of the database. |
| Who makes it    | The panel, every night.                                               | The 5Stack service, when you press **Back Up Now**, or every night once you turn that on.                                                 |
| Where it's kept | Your file storage. The panel keeps the latest 7.                      | The panel server, encrypted to your recovery key. The latest 7 are kept, plus a copy in 5Stack cloud if you have the cloud copy.          |
| Use one to      | Undo a mistake in the data. It works even when the panel won't start. | Rebuild the panel when its server breaks or is lost.                                                                                      |

## Database backups

The panel saves its database every night into your file storage and keeps the
latest 7. The **Database Backups** tab lists them newest first. Each shows its
time in your time zone and in UTC, so a backup made at 03:00 UTC shows as the
evening before if you are in the Americas.

The list is read from your file storage, which can take a minute the first time.
After that the console shows the last list straight away and checks for newer
backups in the background.

If the panel uses its built-in storage, the backups sit on the panel server's
disk and go with it if the disk fails. The tab shows an amber icon when that's
the case. [Your own S3](/advanced/s3/) keeps them off the server.

### Restore a database backup

1. Open the **Database Backups** tab.
2. Press **Restore** beside the backup you want, and confirm.

- The panel is down while it restores.
- Everything after that backup is lost: matches, stats and sign-ups.
- The database it replaces is kept on the panel server. Delete it under
  **Kept From a Restore** once you're happy with the restore.
- If the restore fails part way, the old database is put back and the panel
  starts again.

## Recovery backups

A recovery backup is one file with everything needed to rebuild the panel. It's
encrypted to your recovery key, and only that key opens it.

- **Make one now** with **Back Up Now** on the **Recovery Backups** tab, or on
  the panel server: run `5stack` and pick **Backups**, then **Back up now**.
- **Every night**: tick **Back up every night at** under **Nightly Recovery
  Backups**, pick a time on the server's clock, and save.

They're kept in `/var/lib/5stack/backups` on the panel server. If that server is
lost, so are they, unless you have the [cloud copy](#the-5stack-cloud-copy).

### The recovery key

The recovery key is made when the panel is installed, and printed once in the
framed **SAVE THESE NOW** block, on a line starting with `AGE-SECRET-KEY-1`.

- **Keep it safe**, for example in a password manager, together with the
  install id printed with it. Anyone with the key and a backup can restore your
  panel.
- **5Stack can't recover it.** The key never leaves your server, so 5Stack
  doesn't have it. Without it, nobody can open your recovery backups.
- **Show it again** on the panel server: run `5stack` and pick **Backups**, then
  **Show the recovery key**. Each time it's shown is recorded in the install's
  audit log.

To replace the key, see the [Command Reference](/service/cli#backups-and-diagnostics).

### Restore a recovery backup

A restore runs on the panel server, because it needs your recovery key and the
key is only ever typed there.

1. Connect to the panel server and run `5stack`.
2. Pick **Backups**, then **Restore a recovery backup**.
3. Pick the backup. The list shows the ones on this server, newest first, with
   their date and size. **Another file…** takes a backup kept somewhere else.
4. Type your recovery key.

- The server first checks that the backup was made with that key and wasn't
  changed since. If the key is wrong, it says
  **This key does not open this backup. 5Stack cannot open it either.**
- The panel is down while it restores.
- Config, secrets, custom files, plugins and the database all go back to when
  the backup was made.
- **Game server nodes have to be added again.** Game server nodes trust the
  panel's signing key, so recovery backups leave it out on purpose: a leaked
  recovery key exposes your panel's data, not your nodes. The restore makes a
  new key, so run the command from the **Create game server node** dialog again
  on each node. See
  [Add a Game Server Node](/servers/game-server-nodes/create-game-server-node).

## Moving to a new server

Both ways start on the new server, because it has no 5Stack yet.

### While the old server still works

Everything comes across: the database, demos and clips, config, plugins and
game server nodes. The nodes re-join the new panel on their own, and the panel
is down for a few minutes.

1. On the new server, run:

   ```bash
   curl -fsSL https://get.5stack.gg | sudo sh -s -- migrate
   ```

2. It shows a code and a key. On the old server, run `5stack`, pick
   **Move to a new server**, and type them.
3. Point your panel's DNS at the new server.

[Move to a New Server](/service/new-server) walks through each step.

### After losing the old server

This brings the panel back from a recovery backup in 5Stack cloud, so it needs
the [cloud copy](#the-5stack-cloud-copy) to have been on.

1. On the new server, run:

   ```bash
   curl -fsSL https://get.5stack.gg | sudo sh -s -- restore
   ```

2. Sign in through Steam with the account that claimed the panel, then pick a
   backup.
3. Type your recovery key.
4. Point your panel's DNS at the new server, and add your game server nodes
   again.

Without the cloud copy, the recovery backups were on the lost server. Database
backups in your own S3 bucket are still there.

## The 5Stack cloud copy

5Stack can keep an encrypted copy of each recovery backup off-site, so a new
server can bring the panel back after the old one is lost.

- The copy is encrypted to your recovery key before it leaves the server, so
  5Stack can't open it.
- It's a paid add-on. Once your install has it, turn it on from the panel
  server: run `5stack` and pick **Backups**, then **5Stack cloud copy**. The
  browser console shows it but can't turn it on.
- The **Recovery Backups** tab shows whether it's on, and which backups are in
  5Stack cloud.
- **Back up on this server only**, in the same menu, makes a backup without a
  cloud copy.
