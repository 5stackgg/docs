# Move to a New Server

You can move a panel to a new server with two commands: one on the new server,
one on the old. The database, secrets, config, plugins, demos and clips all move,
and your game server nodes re-join the new panel on their own.

<ArchitectureDiagram flows="migrate" />

The diagram shows the old panel. Click a box to see what it does.

## Before you start

- The new server meets the [Requirements](/install/requirements) and is fresh:
  not already a panel or a game server node.
- The old panel has Tailscale set up, as it needs for
  [game server nodes](/service/game-server-nodes). The two servers move the data
  directly over your Tailscale network, never through the 5Stack cloud.
- You can change the DNS records for your panel's domain.

## 1. Start the new server

On the new server, run:

```bash
curl -fsSL https://get.5stack.gg | sudo sh -s -- migrate
```

It installs the agent and prints a code, a key fingerprint and two commands for
the old server: one for a panel that runs the 5Stack service, and one for a panel
installed from the git checkout.

## 2. Pair the old server

On the old server, run the command that matches it.

If the old panel runs the 5Stack service:

```bash
sudo 5stack move --to QX4-71M --key age1qv3x…
```

If the old panel was installed from the git checkout and doesn't run the service
yet, run this in its 5Stack-Panel directory. It installs the agent first, as
described in [Move an Existing Install](/service/existing-install):

```bash
sudo ./service.sh --to QX4-71M --key age1qv3x…
```

`--key` is the new server's key. The old server sends its data only to a server
holding that key, so copy the whole command.

The old server prints its panel key fingerprint. The new server shows the same
fingerprint and asks whether it matches. Answer `y` only if the two are the same.

## 3. Check the estimate

The old server shows the size of the database, the size of the demos and clips,
the number of game server nodes, and how long the panel will be down.

## 4. Demos copy while the panel is live

Demos and clips copy from the old server's file storage to the new one while
players keep playing. If your panel uses [your own S3](/advanced/s3), both
servers already reach it and this step is skipped.

## 5. The old panel freezes

The old panel shows players a banner that it is moving, pauses new matches, and
waits for live matches to finish. If it hasn't finished within 30 minutes, the old
server asks whether to freeze anyway, which ends any live matches.

## 6. The database moves

This is the only downtime. The old server dumps the database and sends it,
encrypted to the new server's key, together with your secrets, config and
plugins. Only the demos and clips added or changed since the first copy are sent
now. The downtime is the database move plus that difference.

The new server restores the database into the same TimescaleDB version, then
updates the extension. If the old panel ran an older PostgreSQL major version,
the new server lands on the current one without a separate upgrade.

Search is rebuilt from the database, and the cache starts empty.

## 7. Game server nodes re-join

The new panel is a new cluster, so every game server node has to join it. The old
panel sends each node with the agent a signed message, and the node leaves the old
panel and joins the new one by itself. This includes nodes that were added with
the install script and got the agent from the panel later. You don't need to SSH
into them.

If a node has no agent, the move tells you to add it to the new panel again. See
[Add a Game Server Node](/service/game-server-nodes).

## 8. Point DNS at the new server

Change the DNS records for your panel's domain and its
[subdomains](/install/requirements#domain-requirements) to the new server's
address. The new server waits until the domain resolves to it before it requests
certificates.

Behind a reverse proxy or the Cloudflare proxy, the domain never resolves to the
server's own address. The new server waits instead until the domain reaches the
new panel through the proxy, so point your proxy at the new server.

## 9. The old server stays stopped

When the move finishes, the old panel stays stopped, not wiped, so its data is
still there if you need to go back. Its 5Stack install credential is revoked, and
the new server takes over the install, its claim and its backups.
