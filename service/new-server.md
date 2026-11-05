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
  [game server nodes](/servers/game-server-nodes/create-game-server-node). If it
  doesn't, add it with `sudo 5stack config tailscale` on the old server.
- The old panel runs the 5Stack service, and you have claimed its install. An
  unclaimed panel can't look up the new server's code. For a panel still on the
  git checkout, run `git pull && sudo ./service.sh` on it and
  [claim the install](/service/existing-install) first.
- You can change the DNS records for your panel's domain.

## 1. Start the new server

On the new server, run:

```bash
curl -fsSL https://get.5stack.gg | sudo sh -s -- migrate
```

It prints a code, a key fingerprint and the commands to run on the old server.

## 2. Pair the old server

On the old server, run the `5stack move` command the new server printed:

```bash
sudo 5stack move --to QX4-71M --key age1qv3x…
```

Copy the whole command, including `--key`. The new server also prints a
`sudo ./service.sh --to … --key …` command, for a panel still on the git
checkout. Use `5stack move` once you've moved that panel onto the service and
claimed it, as above.

The old server prints its panel key fingerprint. The new server shows the same
fingerprint and asks whether it matches. Answer `y` only if the two are the same.

## 3. Check the estimate

The old server shows the size of the database, the size of the demos and clips,
the number of game server nodes, and how long the panel will be down.

## 4. Demos copy while the panel is live

Demos and clips copy from the old server's file storage to the new one while
players keep playing. If your panel uses [your own S3](/advanced/s3/), both
servers already reach it and this step is skipped.

## 5. The old panel freezes

The old panel shows players a banner that it is moving, pauses new matches, and
waits for live matches to finish. If it hasn't finished within 30 minutes, the old
server asks whether to freeze anyway, which ends any live matches.

## 6. The database moves

This is the only downtime. The old server sends the database, your secrets,
config and plugins, and the demos and clips added or changed since the first
copy. If the old panel ran an older PostgreSQL version, the new server lands on
the current one without a separate upgrade.

## 7. Game server nodes re-join

Each game server node with the agent leaves the old panel and joins the new one
by itself, including nodes added with the install script that got the agent from
the panel later. You don't need to SSH into them.

If a node has no agent, the move tells you to add it to the new panel again. See
[Add a Game Server Node](/servers/game-server-nodes/create-game-server-node).

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
still there if you need to go back. The new server takes over the install and its
claim.
