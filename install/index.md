# Install

One command sets up a server as a 5Stack panel, and keeps it updated from then
on. You answer the setup questions on a page in your browser, or in the
terminal if you prefer.

<InstallVideo />

::: danger
Please ensure you have met the [Requirements](/install/requirements) before you begin.
:::

::: tip Already running a panel?
If you installed your panel from the git checkout with `./install.sh`, don't
reinstall. Move it onto the 5Stack service instead: see
[Upgrade an Existing Panel](/service/existing-install).
:::

## Before you start

Have these ready:

- A server running Linux on x86_64 or arm64, with `curl` and OpenSSL 3 or newer.
  Ubuntu or Debian is recommended.
- A domain for the panel. If its DNS is on Cloudflare, 5Stack can add the
  records for you. Otherwise, point its
  [subdomains](/install/requirements#domain-requirements) at the server.
- A [Steam Web API key](https://steamcommunity.com/dev/apikey).
- The Steam account you want as the panel's first admin.
- Optional: a [Tailscale](https://tailscale.com) account, if you will add
  [game server nodes](/servers/game-server-nodes/). See
  [Game server nodes](#game-server-nodes).
- Optional: a Backblaze B2 account or other S3 storage for demos and clips. See
  [Storage](#storage).

## Run the installer

SSH into the server as a user who can use sudo, and run:

```bash
curl -fsSL https://get.5stack.gg | sudo sh
```

It prints a link to the setup page.

## Answer on the setup page

Open the link from the terminal. Copy the whole line, including the part after
`#`. Your answers are encrypted to your server, so 5Stack can't read them.

If the page says **Don't continue: the server keys don't match**, don't send
anything. Press Enter in the terminal and answer there instead.

First, **sign in with Steam** and press **Claim This Server**. The account that
claims it becomes the panel's first admin.

Then the page walks you through the steps. Your server checks each answer as
you go. You can go on past a step that fails and fix it before you install.

1. **Domain and DNS.** Your panel's domain, such as `panel.example.gg`, and
   where its DNS is. The page lists any of the panel's 8 addresses that are
   missing or point somewhere else, and picks an answer for you:
   - **Cloudflare · 5Stack sets it up.** Recommended when the domain is on
     Cloudflare. 5Stack adds the records and sets up Cloudflare's proxy and
     HTTPS. You connect Cloudflare in the next step.
   - **Cloudflare · I manage the records.** You add the records yourself, on
     the grey or the orange cloud. Tick **Proxied by Cloudflare (orange cloud)**
     if they're proxied. See [Cloudflare Proxy](/install/cloudflare/proxy).
   - **Somewhere else.** Point the 8 addresses at this server.

   For a panel below its domain's root, such as `panel.example.gg`, the page
   keeps every address one level deep by default, like `panel-api.example.gg`.
   See
   [Keep every address one level deep](/install/cloudflare/dns-and-ssl#keep-every-address-one-level-deep).
2. **Cloudflare.** Only when 5Stack sets Cloudflare up. Press
   **Connect Cloudflare**, approve once on Cloudflare's page, then pick the
   panel's domain from your Cloudflare account. See
   [Connect Cloudflare](/install/cloudflare/#connect-cloudflare).
3. **Reverse proxy.** Whether something in front of this server holds the HTTPS
   certificate and forwards to it, such as Nginx Proxy Manager, Caddy or
   Traefik. 5Stack picks **No** when port 80 reaches this server, and **Yes**
   when something else answers. Change it if that's wrong. Cloudflare's orange
   cloud doesn't count here. **Yes** shows the settings for your proxy. See
   [Reverse Proxy](/install/reverse-proxy#settings-for-your-proxy).
4. **Steam.** Your Steam Web API key, from
   [steamcommunity.com/dev/apikey](https://steamcommunity.com/dev/apikey).
5. **Game Server Nodes.** Optional. A temporary Tailscale access token, so game
   server nodes can join. Tick **I'll stream matches from GPU nodes** if you
   will. See [Game server nodes](#game-server-nodes).
6. **Security updates.** Turns on automatic security updates. See
   [Security updates](#security-updates).
7. **Performance.** The CPU governor, and a low-latency kernel option. See
   [Performance](#performance).
8. **Storage.** Where demos and clips go. **On this server** is the default. See
   [Storage](#storage).
9. **GPU nodes.** Only when this server has an NVIDIA or AMD graphics card.
   Choose whether to use this server as a [GPU node](/servers/gpu-nodes/) for
   streaming and clips. It's off unless you choose it. A GPU node also needs a
   Steam account without Steam Guard, which you add on the GPU Nodes page of
   your panel. To add a GPU node later, open Game Server Nodes in your panel.
10. **Review.** One row per step. A row that needs work has **Fix**, which takes
    you back to its step. Then press **Install 5Stack**.

Game Server Nodes, Security updates and Performance can be skipped.

::: info Signing in first doesn't make you admin
Only the Steam account that claimed the install is made admin. Whoever signs in
to the panel first gets no special role.
:::

### Game server nodes

Matches run on game server nodes: other machines, near your players or wherever
you have spare hardware. Each node joins your panel over
[Tailscale](https://tailscale.com). GPU nodes are game server nodes too.

The setup page asks for one thing, a temporary Tailscale access token:

1. In Tailscale's admin, go to
   [Settings → Keys](https://login.tailscale.com/admin/settings/keys) →
   **Generate access token**.
2. Set it to expire in 1 day.
3. Paste it into the setup page.

Make the token from an Owner, Admin or Network admin account, so it can edit
your tailnet policy. At install, 5Stack adds what game nodes need to your
[tailnet policy](https://login.tailscale.com/admin/acls/file), keeps the rest
as it is, and deletes the token. If Tailscale doesn't let the token delete
itself, the page says so: it expires on its own within a day, or delete it
under Settings → Keys.

If your tailnet policy is managed in GitOps, 5Stack doesn't edit it. The page
shows the exact lines for your panel: add them in your repository, then press
**Check Again**. The same happens if Tailscale refuses the edit.

Already have an OAuth client of your own? Open
**Advanced: use an OAuth client you already have** under the token field and
paste its client ID and secret instead.

#### Use your own OAuth client

Only if you'd rather not paste a token, or for a panel that gets Tailscale later
with `sudo 5stack config tailscale`:

1. In the Tailscale admin console, open
   [Access controls](https://login.tailscale.com/admin/acls/file) and add these
   lines:

   ```json
   "tagOwners": {
     "tag:fivestack": ["autogroup:admin"],
   },
   "autoApprovers": {
     "routes": {
       "10.42.0.0/16": ["tag:fivestack"],
     },
   },
   "grants": [
     {
       "src": ["tag:fivestack", "10.42.0.0/16"],
       "dst": ["tag:fivestack", "10.42.0.0/16"],
       "ip": ["*"],
     },
   ],
   ```

2. Open
   [Trust credentials](https://login.tailscale.com/admin/settings/trust-credentials/add)
   and add an OAuth client with **Auth Keys** write and **Devices** write
   (core) access, tagged `tag:fivestack`.
3. Paste its client ID and secret. Tailscale shows the secret only once.

**Skip for Now** leaves Tailscale for later; no game server node can join until
it's set up. Add it later on the panel server with `sudo 5stack config tailscale`.

### Security updates

With this on, the server installs security fixes every day. It never reboots by
itself for an update: when one needs a reboot, the panel tells you, and the
reboot waits for the node maintenance window, so a match is never cut off.

### Performance

Two settings that help game servers keep a steady tick:

- **CPU governor.** Keeps every core at full speed. It uses more power.
- **Low latency.** Offered only if you tick
  **Game servers will run on this server**. Game servers run best on their own
  game server nodes, so it's off by default. It needs one reboot at the end of
  the install. Undo it any time from the node's settings.

### Storage

Demos and highlight clips are kept for every match, about 250 MB a match. The
page shows how many matches this server's disk holds.

- **On this server.** The default. Nothing more to set up. You can move to S3
  later in Settings.
- **Backblaze B2.** Storage that never fills up, and the recommended choice for
  a small disk. Make a free Backblaze account, create an application key with
  access to all buckets, and paste its keyID and applicationKey. Setup makes the
  two buckets for you, named after your domain: one for demos and clips, and
  one for the panel's nightly database backups.
- **Another S3-compatible store.** AWS S3, Wasabi, MinIO or similar. Give the
  endpoint, region, bucket, access key ID and secret key. Demos and clips go to
  that bucket, and the panel's nightly database backups go to a second bucket
  in the same account, named like the first with `-db-backups` added:
  `my-5stack` and `my-5stack-db-backups`. Create both, and a key that can read
  and write both, before you install.

Database backups need an `https` endpoint on port 443. See
[Bring Your Own S3](/advanced/s3/).

## Or answer in the terminal

Press Enter in the terminal instead of opening the link. The installer walks you
through the setup there.

- The steps are the same as on the page, except that DNS and the reverse proxy
  are one step, **How visitors reach this server**: straight to this server,
  the Cloudflare proxy or a Tunnel, or your own reverse proxy. The terminal
  doesn't set Cloudflare up for you.
- Enter keeps the answer in brackets, and `back` returns to the step before.
- A failed check asks again. Press Enter to check again, or type `next` to go on
  and fix it before installing. At the Game Server Nodes step, `skip` skips it, and at
  the storage step, `local` keeps files on this server.
- The review step asks `Install with these answers? [Y/n, or a step number]`.

Without the setup page there is no Steam sign-in, so claim the install with the
claim link the installer prints at the end. Open it and sign in through Steam
with the account you want as admin.

## Install 5Stack

When you press **Install 5Stack**, your server checks every answer once more.
If one fails, the install doesn't start, and Review shows which step to fix.

With **Cloudflare · 5Stack sets it up**, the page sets Cloudflare up first. If
Cloudflare can't be set up, nothing is installed, and Review says why. See
[What managed setup does](/install/cloudflare/#what-managed-setup-does).

The page and the terminal show each install step as it runs. If a certificate
waits a long time, the page says why, such as port 80 not reaching this server.

**Stop the Install**, then **Confirm Stop**, stops it where it is: change your
answers on the page and install again. You can close the page, and the install
carries on.

## Save the recovery key

When the install finishes, the page asks you to copy the recovery key from your
terminal, in the framed **SAVE THESE NOW** block. It's shown only there, and
only once.

Save the recovery key and the install id together somewhere safe, such as a
password manager. 5Stack doesn't have the key, and without it nobody can open
your backups. The installer then asks you to type the key's last 4 characters,
to confirm you saved it. On the page, tick **I've saved my recovery key** to
open your panel. See [Backups](/install/backups#the-recovery-key).

If you chose low latency, the server reboots a minute later. The panel is back a
few minutes after that.

## Sign in

Open your panel at its domain, such as `https://panel.example.gg`, and sign in
through Steam with the account that claimed the install.

Next, [add a game server node](/servers/game-server-nodes/create-game-server-node)
to host matches.

## Diagnostics

The panel sends 5Stack crash reports, with player data removed. This is on by
default. Turn it off in the panel under **Settings → System → Diagnostics**, or
run `5stack diagnostics off` on the panel server. See
[Diagnostics](/service/diagnostics) for what is sent.

## Commands without sudo

Log out and back in once after the install, so your new `5stack` group applies.
From then on, `5stack` commands such as `5stack status` and `5stack update` work
without sudo, and `5stack` on its own opens the
[menu](/service/command#the-menu).

Commands that set up the server or change its config still need sudo. See
[Command Reference](/service/cli).
