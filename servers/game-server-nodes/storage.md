# Storage

A game node reads CS2's server files every time a server starts, and the game streamer reads its files every time a stream or clip starts. On a spinning hard drive that is slow, and a match can time out while something else, like a CS2 update or a demo upload, is using the same disk. Keep these on an SSD or NVMe disk:

| Path                           | What it holds                                      |
| ------------------------------ | -------------------------------------------------- |
| `/opt/5stack/serverfiles`      | CS2's server files, about 60 GB                    |
| `/opt/5stack/serverfiles-csgo` | CS:GO's server files, when the node runs CS:GO     |
| `/opt/5stack/steamcmd`         | SteamCMD, which downloads the server files         |
| `/opt/5stack/game-streamer`    | The game streamer's files and caches, on GPU nodes |
| `/var/lib/rancher`             | k3s and its container images                       |

Demo recordings in `/opt/5stack/demos` are written once and read rarely, so a hard drive is fine for them.

## The hard drive warning

A node warns "Game files are on a hard drive" when every disk under one of the paths above is a spinning hard drive. The warning names the paths and the disk.

It stays quiet when it can't be sure: SSDs, a mix of disks, USB disks, RAID controllers, network storage and disks inside a virtual machine never warn. To check a node yourself, run:

```bash
findmnt -T /opt/5stack/serverfiles
lsblk -o NAME,ROTA,TRAN,MODEL,SIZE,MOUNTPOINTS
```

`ROTA` is `1` for a spinning disk. Virtual machines and many RAID controllers report `1` for every disk, so it only counts on bare metal.

## Move the game files to a fast disk

The game files stay at `/opt/5stack`. A bind mount puts each folder on the fast disk, so nothing else on the node changes. These steps assume the fast disk is already formatted and mounted from `/etc/fstab`, here at `/mnt/fast`.

1. In the panel, turn off **Accepting matches** on the node, wait for its matches to end, then turn off **Enabled**.

2. On the node, as root, stop k3s and copy each folder to the fast disk. The old copies are kept as `/opt/5stack/.<folder>.before-move`:

   ```bash
   FAST=/mnt/fast
   systemctl stop k3s-agent
   /usr/local/bin/k3s-killall.sh
   for dir in serverfiles serverfiles-csgo steamcmd game-streamer; do
     [ -d "/opt/5stack/$dir" ] || continue
     mkdir -p "$FAST/5stack/$dir"
     rsync -aHAX "/opt/5stack/$dir/" "$FAST/5stack/$dir/" || break
     mv "/opt/5stack/$dir" "/opt/5stack/.$dir.before-move"
     mkdir "/opt/5stack/$dir"
     unit=$(systemd-escape -p --suffix=mount "/opt/5stack/$dir")
     printf '[Unit]\nDescription=5Stack %s on %s\nRequiresMountsFor=%s\n\n[Mount]\nWhat=%s\nWhere=%s\nType=none\nOptions=bind\n\n[Install]\nWantedBy=local-fs.target\n' \
       "$dir" "$FAST" "$FAST/5stack/$dir" "$FAST/5stack/$dir" "/opt/5stack/$dir" > "/etc/systemd/system/$unit"
     systemctl daemon-reload
     systemctl enable --now "$unit"
   done
   ```

3. Keep k3s from starting without the fast disk, so a missing disk shows the node offline instead of CS2 downloading again onto the hard drive, then start k3s:

   ```bash
   mkdir -p /etc/systemd/system/k3s-agent.service.d
   printf '[Unit]\nRequiresMountsFor=%s\n' \
     "$(ls -d /opt/5stack/serverfiles /opt/5stack/serverfiles-csgo /opt/5stack/steamcmd /opt/5stack/game-streamer 2>/dev/null | tr '\n' ' ')" \
     > /etc/systemd/system/k3s-agent.service.d/5stack-game-files.conf
   systemctl daemon-reload
   systemctl start k3s-agent
   ```

4. Turn **Enabled** and **Accepting matches** back on. Once a match has run, delete the old copies:

   ```bash
   rm -rf /opt/5stack/.*.before-move
   ```

On a panel that also runs game servers, use `k3s` instead of `k3s-agent` in steps 2 and 3.

## k3s on a hard drive

k3s keeps its container images in `/var/lib/rancher`. Moving it on a running node means reinstalling k3s, so the node only warns about it. When you set a node up, mount the fast disk, or a folder on it, at `/var/lib/rancher` before you run the join command.

## The panel server

The panel's own server shows an amber warning on its Overview page when the database (`/opt/5stack/timescaledb`), search (`/opt/5stack/typesense`), file storage (`/opt/5stack/minio`), Redis (`/opt/5stack/redis`) or k3s (`/var/lib/rancher/k3s/server`) is on a spinning hard drive. Pages load slower, and matches can be slow to start. It uses the same checks as a game node, so it stays quiet when it can't be sure, such as inside a virtual machine.

These folders hold the panel's data, so the panel only warns about them. Set `/opt/5stack` and `/var/lib/rancher` up on an SSD or NVMe disk before you install the panel.
