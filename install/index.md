# Install

One command sets up a server as a 5Stack panel. It installs the 5Stack
service, which installs k3s and the panel and keeps them updated from then on.
You answer the setup questions on a page in your browser, or in the terminal if
you prefer, and the server checks each answer as you give it.

::: danger
Please ensure you have met the [Requirements](/install/requirements) before you begin.
:::

<ArchitectureDiagram flows="install" />

Click a box to see what it does and what it talks to.

::: tip Already running a panel?
If you installed your panel from the git checkout with `./install.sh`, don't
reinstall. Move it onto the 5Stack service instead: see
[Upgrade an Existing Panel](/service/existing-install).
:::

## Before you start

Have these ready:

- A server running Linux on x86_64 or arm64, with `curl` and OpenSSL 3 or newer.
  Ubuntu or Debian is recommended.
- A domain, with the [subdomains](/install/requirements#domain-requirements)
  pointed at the server.
- A [Steam Web API key](https://steamcommunity.com/dev/apikey).
- The Steam account you want as the panel's first admin.
- Optional: a [Tailscale](https://tailscale.com) account, if you will add
  [game server nodes](/servers/game-server-nodes/). See
  [Tailscale for game server nodes](#tailscale-for-game-server-nodes).
- Optional: S3 storage for demos and clips, with two buckets. See
  [Storage](#storage).

## Run the installer

SSH into the server as a user who can use sudo, and run:

```bash
curl -fsSL https://get.5stack.gg | sudo sh
```

The installer:

1. Checks the server: Linux, x86_64 or arm64, `curl` and OpenSSL 3.
2. Downloads the `5stack` agent and checks its signature and checksum. If either
   doesn't match, it stops and installs nothing.
3. Installs the agent as a system service, `5stack.service`.
4. Adds you to the `5stack` group, so `5stack` commands work without sudo once
   you log in again. See [Commands without sudo](#commands-without-sudo).
5. Prints a link to the setup page and waits for your answers.

```
==> Finish setup in your browser
    https://get.5stack.gg/setup/K7QX-29MD#k=age1…&s=…
    server key 8F2C 19AA 03D1 7E55 · your answers are encrypted to it
    Rather answer here? Press Enter.
```

The link stays good while the setup page is open, and expires 30 minutes after
you close it. If it expires, run the install command again for a new one.

## Answer on the setup page

Open the link from the terminal. Copy the whole line: the part after `#` carries
your server's key and never reaches 5Stack.

The page shows the server it is setting up and its key fingerprint, such as
`8F2C 19AA 03D1 7E55`. Check it matches the fingerprint in your terminal.

First, **sign in through Steam**. This claims the server. The Steam account you
sign in with becomes the panel's first admin, and 5Stack links the install to
your account.

Then the page walks you through nine steps. Your server checks each answer while
you fill the page in: it looks up your DNS, tries the Steam key, and tests the
Tailscale and S3 credentials, and the page shows each result as it comes back.
You can go on past a step that fails and fix it before you send.

1. **Domain and DNS.** Your panel's domain, such as `panel.example.gg`, and its
   [subdomains](/install/requirements#domain-requirements). The server looks
   each one up and lists any that are missing or point somewhere else.
2. **How visitors reach this server.** Straight to this server, through the
   Cloudflare proxy or a Cloudflare Tunnel, or through your own reverse proxy
   such as Nginx or Caddy. For the first and last, say whether the DNS is on
   Cloudflare. See [Cloudflare](/install/cloudflare/) and
   [Reverse Proxy](/install/reverse-proxy).
3. **Steam.** Your Steam Web API key. The server checks it with Steam.
4. **Tailscale, for game server nodes.** Optional. See
   [Tailscale for game server nodes](#tailscale-for-game-server-nodes).
5. **Security updates.** Turns on automatic security updates. See
   [Security updates](#security-updates).
6. **Performance.** The CPU governor, and a low-latency kernel option. See
   [Performance](#performance).
7. **Storage.** Keep demos and clips on this server, or put them in S3. See
   [Storage](#storage).
8. **GPU nodes.** Nothing to answer. It shows what a
   [GPU node](/servers/gpu-nodes/) adds, and what it needs, so you can add one
   later.
9. **Review.** Every answer is checked again. Fix anything that fails, then
   click **Send to Server**.

::: info Signing in first doesn't make you admin
Only the Steam account that claimed the install is made admin. Whoever signs in
to the panel first gets no special role.
:::

### Your answers stay private

HTTPS protects the trip, and the page also encrypts your answers in your browser
to your server's key before it sends them. 5Stack passes them to your server but
can't read them. Your server also checks that the answers carry a secret from the
link in your terminal, which 5Stack never sees. Check results never repeat a
key or secret you entered.

If the page says **Don't continue: the server keys don't match**, the key in your
link is not the one 5Stack sent. Don't send anything. Press Enter in the terminal
and answer there instead.

### Tailscale for game server nodes

Game server nodes, GPU nodes included, reach your panel over your own Tailscale
network. Pick one of these on the setup page:

- **Paste a Tailscale API token.** The easiest. Make an access token with a
  1-day expiry under
  [Settings → Keys](https://login.tailscale.com/admin/settings/keys). At install,
  your server adds `tag:fivestack` to your tailnet policy, makes an OAuth client
  that can only make `tag:fivestack` keys, and revokes the token. It never saves
  the token.
- **Use an OAuth client.** Set it up yourself, in about two minutes:
  1. In the Tailscale admin console, open **Access controls** and add the tag
     owner:

     ```json
     "tagOwners": { "tag:fivestack": ["autogroup:admin"] }
     ```

  2. Open
     [Trust credentials](https://login.tailscale.com/admin/settings/trust-credentials/add)
     and add an OAuth client with **Auth Keys** write access, tagged
     `tag:fivestack`.
  3. Paste its client ID and secret into the setup page. Tailscale shows the
     secret only once.
- **Skip for now.** No game server node can join until you add it. Add it later
  on the panel server with `sudo 5stack config tailscale`, which asks for an
  OAuth client.

The server checks the token or client before you send: that the token may edit
your tailnet policy, or that the client can make a `tag:fivestack` key. If your
tailnet policy is managed in GitOps, the token can't edit it, so use an OAuth
client and add the tag owner in your repository.

The panel uses the OAuth client to make a single-use key for each node you add.

### Security updates

With this on, the server installs security fixes every day through
`unattended-upgrades`. Nothing is held back, NVIDIA drivers included. The server
never reboots by itself: when an update needs a reboot, the panel shows it as a
to-do in its header.

### Performance

Two settings that help game servers keep a steady tick:

- **CPU governor.** Keeps every core at full speed. It uses more power, and stays
  set after a reboot.
- **Low latency.** Offered only if game servers will run on this server too.
  It boots the kernel with `preempt=full`, which needs Ubuntu 24.04 or newer and
  one reboot at the end of the install.

### Storage

Demos and highlight clips are kept for every match. The page shows how long this
server's disk lasts, and warns under 200 GB free.

- **Keep files on this server.** Nothing more to set up. You can move to S3
  later.
- **Use S3 storage.** Give the endpoint, region, bucket, access key ID and
  secret key. Demos and clips go to that bucket, and the panel's nightly
  database backups go to a second bucket in the same account, named like the
  first with `-db-backups` added: `my-5stack` and `my-5stack-db-backups`. Create
  both before you send.

The server writes and deletes a small test file in each bucket. Bucket names are
global, so when the key can list its account's buckets, both must be in the
list. A key that can't list them only gets a warning: make sure both buckets
are yours. Database backups need an `https` endpoint on port 443. See
[Bring Your Own S3](/advanced/s3/).

## Or answer in the terminal

Press Enter in the terminal instead of opening the link. The installer walks you
through the same nine steps there, and checks each answer as you enter it:

```
9 steps. Enter keeps the answer in [brackets]. Type back to return to the step before.
==> Step 1 of 9 · Domain and DNS
Panel domain:
```

- Enter keeps the answer in brackets, and `back` returns to the step before.
- A failed check asks again. Press Enter to check again, or type `next` to go on
  and fix it before installing. At the Tailscale step, `skip` skips it, and at
  the storage step, `local` keeps files on this server.
- Keys and secrets are read without echo and shown masked.
- The review step checks everything again, sends you back to any step that still
  fails, then asks `Install with these answers? [Y/n, or a step number]`.

Without the setup page there is no Steam sign-in, so claim the install with the
claim link the installer prints at the end. Open it and sign in through Steam
with the account you want as admin.

## Confirm in the terminal

Before it installs anything, the terminal shows the answers it received, with
the Steam key masked, and checks them all again. If nothing failed, it asks
`Install with these answers? [Y/n]`. Check the domain and the account that
claimed the install, then press Enter.

These stop the install until you fix them: a Steam key Steam refuses, a
hostname that is missing or points somewhere else, Tailscale credentials that
don't work (unless you skipped Tailscale), and S3 keys or buckets that don't
work (unless files stay on the server). Fix them on the page and send again, or
press Enter and answer in the terminal. Everything else only warns: a missing
`hls.` record, which only GPU live streams use, less than 200 GB free, a check
that couldn't reach its service, or a performance or update setting the server
can't apply.

The installer then installs k3s and the panel with the settings you chose, and
requests certificates. The setup page shows the same progress, and you can close
it.

Certificates are requested once your domain resolves to this server. Behind a
reverse proxy or the Cloudflare proxy, the domain never resolves to the server's
own address, so the installer waits instead until the domain reaches the panel
through the proxy.

## Save the recovery key

The install ends with a framed block:

```
================================================================
  SAVE THESE NOW · the recovery key is shown only once
================================================================

  Recovery key   AGE-SECRET-KEY-1…
  Install id     7f3c-91d0-e21a
  Claim link     https://get.5stack.gg/claim/7f3c-91d0-e21a

  Without the recovery key nobody can open your backups,
  not you and not 5Stack. sudo 5stack recovery-key show
  prints it again on this server.
================================================================
```

The claim link is listed only while nobody has claimed the install, which
happens when you answered in the terminal.

Save the recovery key and the install id together somewhere safe, such as a
password manager. The key never leaves your server, so 5Stack doesn't have it.
The installer then asks you to type the key's last 4 characters, to confirm you
saved it. See [Backups and Recovery](/service/backups).

If you chose low latency, the server reboots a minute later.

## Sign in

Open your panel at its domain, such as `https://panel.example.gg`, and sign in
through Steam with the account that claimed the install.

Next, [add a game server node](/servers/game-server-nodes/create-game-server-node)
to host matches.

## Diagnostics

The panel sends 5Stack crash reports, with player data removed. This is on by
default. Turn it off in the panel under **Settings → System → Diagnostics**. See
[Diagnostics](/service/diagnostics) for what is sent.

## Commands without sudo

Log out and back in once after the install, so your new `5stack` group applies.
From then on, `5stack` commands such as `5stack status` and `5stack update` work
without sudo, and `5stack` on its own opens the
[menu](/service/command#the-menu).

Commands that set up a server, change its config or what it trusts, or run its
scripts still need root. See [Command Reference](/service/cli).
