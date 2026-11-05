# Panel Upgrade

A panel needs Tailscale before it can add game server nodes. When you
[install](/install/) the panel, give the setup page a Tailscale API token or
OAuth client, as
[Tailscale for game server nodes](/install/#tailscale-for-game-server-nodes)
describes. The panel is then set up for game server nodes, and you don't need
anything on this page.

## Add Tailscale later

If you skipped Tailscale at install, or the panel was installed without it, add
an OAuth client on the panel server. Set up the tag owner and the client as the
[OAuth client steps](/install/#tailscale-for-game-server-nodes) describe, then
run:

```bash
sudo 5stack config tailscale
```

Or pick **Config → Tailscale** in the [`5stack` menu](/service/command#the-menu).
It asks for the client ID and the secret, typed hidden, checks the client with
Tailscale, and joins this server to your tailnet. It shows what it will do and
asks before it changes anything.

When k3s on the panel doesn't route over Tailscale yet, it has to restart. The
change runs like an update that restarts k3s: new matches are held, live ones
finish first, and then k3s restarts. If something goes wrong, the old k3s config
is put back.

It refuses, with nothing changed, when this server is already on a tailnet
without the `tag:fivestack` tag, or on another tailnet: log it out or tag it
first. It also names any game server node that isn't on Tailscale and would lose
the panel; `--force` goes on anyway.

Run it again to replace the client. A panel already on the tailnet keeps
running, and nothing restarts.

## Panels installed before the 5Stack service

Move the panel onto the service first, with `git pull && sudo ./service.sh`
(see [Upgrade an Existing Panel](/service/existing-install)), then run
`sudo 5stack config tailscale`.

::: danger
This is for upgrading the panel itself, not for setting up game node servers. Game node servers should be created through the panel interface.
:::
