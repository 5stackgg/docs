# Install

One command sets up a server as a 5Stack panel. It installs the 5Stack
service, which installs k3s and the panel and keeps them updated from then on.
You answer the setup questions on a page in your browser, or in the terminal if
you prefer, and the server checks each answer as you give it.

<InstallVideo />

::: danger
Please ensure you have met the [Requirements](/install/requirements) before you begin.
:::

Want to see what runs where? See
[How It Fits Together](/service/how-it-fits-together).

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

The link stops working once the install finishes. Opening it again shows that
the setup is finished, with a button to open your panel.

## Answer on the setup page

Open the link from the terminal. Copy the whole line: the part after `#` carries
your server's key and never reaches 5Stack.

The page shows the server it's connected to, with its hostname and IP address.
If the page loses its connection, it says **Reconnecting** until it's back.
Your account menu shows the install ID and the server key, such as
`8F2C 19AA 03D1 7E55`. Check the key matches the one in your terminal.

First, **sign in with Steam** and press **Claim This Server**. The account that
claims it becomes the panel's first admin, and 5Stack links the install to
your account.

Then the page walks you through the steps, with the list of steps on the left
and **Back**, **Skip** and **Next** at the bottom. Your server checks each
answer while you fill the page in: it looks up your DNS, checks who answers on
port 80, tries the Steam key, and tests the Tailscale and storage keys. The page
shows each result as it comes back. You can go on past a step that fails and
fix it before you install.

1. **Domain and DNS.** Your panel's domain, such as `panel.example.gg`, and
   where its DNS is. Your server looks up the panel's 8 addresses once you stop
   typing, and lists any that are missing or point somewhere else. It also
   checks whether the domain is on Cloudflare, and picks an answer for you:
   - **Cloudflare · 5Stack sets it up.** Recommended when the domain is on
     Cloudflare. 5Stack adds the records, puts Cloudflare's proxy on the panel's
     addresses (not demos or video), and sets HTTPS to Full (strict). You
     connect Cloudflare in the next step.
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
   panel's domain from your Cloudflare account. Nothing changes on Cloudflare
   until you install. See
   [Connect Cloudflare](/install/cloudflare/#connect-cloudflare).
3. **Reverse proxy.** Whether something in front of this server holds the HTTPS
   certificate and forwards to it, such as Nginx Proxy Manager, Caddy or
   Traefik. 5Stack checks from outside your network who answers on port 80, and
   picks the answer for you: **No** when port 80 reaches this server, **Yes**
   when something else answers. Change it if that's wrong. Cloudflare's orange
   cloud doesn't count here, because it was the Domain and DNS step. **Yes**
   shows the settings for your proxy. See
   [Reverse Proxy](/install/reverse-proxy#settings-for-your-proxy).
4. **Steam.** Your Steam Web API key, from
   [steamcommunity.com/dev/apikey](https://steamcommunity.com/dev/apikey). The
   server checks it with Steam. The step also shows the account that claimed
   the server.
5. **Game Server Nodes.** Optional. One temporary Tailscale access token sets up
   the private network game server nodes join. Tick
   **I'll stream matches from GPU nodes** if you will. See
   [Game server nodes](#game-server-nodes).
6. **Security updates.** Turns on automatic security updates. See
   [Security updates](#security-updates).
7. **Performance.** The CPU governor, and a low-latency kernel option. See
   [Performance](#performance).
8. **Storage.** Where demos and clips go. **On this server** is the default. See
   [Storage](#storage).
9. **GPU nodes.** Only when this server has an NVIDIA or AMD graphics card. It
   names the card and asks whether to use this server as a
   [GPU node](/servers/gpu-nodes/) for streaming and clips. It's off unless you
   choose it. A GPU node also needs a Steam account without Steam Guard, which
   you add on the GPU Nodes page of your panel. To add a GPU node later, open
   Game Server Nodes in your panel.
10. **Review.** One row per step, each checked again. A row that needs work has
    **Fix**, which takes you back to its step. With Cloudflare set up by 5Stack,
    Review also lists what 5Stack sets up on Cloudflare for each address. Then
    press **Install 5Stack**.

Game Server Nodes, Security updates and Performance can be skipped.

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

### Game server nodes

Matches run on game server nodes: other machines, near your players or wherever
you have spare hardware. Your panel stays responsive, and you add capacity by
adding machines. Each node joins your panel over a private network,
[Tailscale](https://tailscale.com). The panel sends it matches, players connect
straight to the node, and adding a node later takes a short code. GPU nodes are
game server nodes too.

The setup page asks for one thing, a temporary Tailscale access token:

1. In Tailscale's admin, go to
   [Settings → Keys](https://login.tailscale.com/admin/settings/keys) →
   **Generate access token**.
2. Set it to expire in 1 day.
3. Paste it into the setup page.

Make the token from an Owner, Admin or Network admin account, so it can edit
your tailnet policy. Your server checks it while you fill in the page, without
changing anything. At install, it:

1. Adds what game nodes need to your
   [tailnet policy](https://login.tailscale.com/admin/acls/file), only where
   it's missing, and keeps every other line and comment as it is. Each panel
   gets a tag of its own, named after its install ID, and an address range for
   its pods that no other panel on your tailnet uses. For install ID
   `7f3c-91d0-e21a`, with the first free range:

   ```json
   "tagOwners": {
     "tag:fivestack": ["autogroup:admin"],
     "tag:fivestack-7f3c91d0e21a": ["autogroup:admin"],
   },
   "autoApprovers": {
     "routes": {
       "10.52.0.0/16": ["tag:fivestack-7f3c91d0e21a"],
     },
   },
   "grants": [
     {
       "src": ["tag:fivestack-7f3c91d0e21a", "10.52.0.0/16"],
       "dst": ["tag:fivestack-7f3c91d0e21a", "10.52.0.0/16"],
       "ip": ["*"],
     },
   ],
   ```

   The range is picked from `10.52.0.0/16` to `10.242.0.0/16`, skipping any your
   policy or this server already uses. The grant is left out when your policy
   already lets that traffic through, such as Tailscale's default
   allow-everything rule.
2. Makes its own key for adding game nodes, an OAuth client that can only add
   this panel's tagged devices and remove them again, and tests it once by
   making a single-use key and deleting it. You never make or manage this
   client.
3. Deletes the token. If Tailscale doesn't let the token delete itself, the
   page and the terminal say so: it expires on its own within a day, or delete
   it under Settings → Keys.

The token is never saved. The panel uses its own key to make a single-use key
for each node you add.

If your tailnet policy is managed in GitOps, 5Stack doesn't edit it. The page
shows the exact lines for your panel: add them in your repository, then press
**Check Again**. The same happens if Tailscale refuses the edit.

Already have an OAuth client of your own? Open
**Advanced: use an OAuth client you already have** under the token field and
paste its client ID and secret instead.

#### Use your own OAuth client

Only if you'd rather not paste a token, or for a panel that gets Tailscale later
with `sudo 5stack config tailscale`. A panel with its own OAuth client uses the
shared `tag:fivestack` tag and the `10.42.0.0/16` pod range:

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
   (core) access, tagged `tag:fivestack`. Devices write lets the panel remove a
   game node's device from your tailnet when you remove the node.
3. Paste its client ID and secret. Tailscale shows the secret only once.

**Skip for Now** leaves Tailscale for later; no game server node can join until
it's set up. Add it later on the panel server with `sudo 5stack config tailscale`.

### Security updates

With this on, the server installs security fixes every day through
`unattended-upgrades`. Nothing is held back, NVIDIA drivers included, because a
held driver breaks the next kernel. The server never reboots by itself for an
update: when one needs a reboot, the panel tells you, and the reboot waits for
the node maintenance window, so a match is never cut off.

### Performance

Two settings that help game servers keep a steady tick:

- **CPU governor.** Keeps every core at full speed. It uses more power, and stays
  set after a reboot.
- **Low latency.** Offered only if you tick
  **Game servers will run on this server**. Game servers run best on their own
  game server nodes, so it's off by default. It boots the kernel with
  `preempt=full`, which needs one reboot at the end of the install. Undo it any
  time from the node's settings.

### Storage

Demos and highlight clips are kept for every match, about 250 MB a match. The
page shows how many matches this server's disk holds, and warns under 200 GB
free.

- **On this server.** The default. Nothing more to set up. You can move to S3
  later in Settings.
- **Backblaze B2.** Storage that never fills up, and the recommended choice for
  a small disk. Make a free Backblaze account, create an application key with
  access to all buckets, and paste its keyID and applicationKey. Setup makes two
  private buckets named after your domain: one for demos and clips, and one
  ending in `-db-backups` for the panel's nightly database backups. Downloads
  are allowed from your panel's domain.
- **Another S3-compatible store.** AWS S3, Wasabi, MinIO or similar. Give the
  endpoint, region, bucket, access key ID and secret key. Demos and clips go to
  that bucket, and the panel's nightly database backups go to a second bucket
  in the same account, named like the first with `-db-backups` added:
  `my-5stack` and `my-5stack-db-backups`. Create both, and a key that can read
  and write both, before you install.

The server writes and deletes a small test file in each bucket. Bucket names are
global, so when the key can list its account's buckets, both must be in the
list. A key that can't list them only gets a warning: make sure both buckets
are yours. Database backups need an `https` endpoint on port 443. See
[Bring Your Own S3](/advanced/s3/).

## Or answer in the terminal

Press Enter in the terminal instead of opening the link. The installer walks you
through the setup there, and checks each answer as you enter it:

```
8 steps. Enter keeps the answer in [brackets]. Type back to return to the step before.
==> Step 1 of 8 · Domain and DNS
Panel domain:
```

- The steps are the same as on the page, except that DNS and the reverse proxy
  are one step, **How visitors reach this server**: straight to this server,
  the Cloudflare proxy or a Tunnel, or your own reverse proxy. The terminal
  doesn't set Cloudflare up for you.
- Enter keeps the answer in brackets, and `back` returns to the step before.
- A failed check asks again. Press Enter to check again, or type `next` to go on
  and fix it before installing. At the Game Server Nodes step, `skip` skips it, and at
  the storage step, `local` keeps files on this server.
- Keys and secrets are read without echo and shown masked.
- The review step checks everything again, sends you back to any step that still
  fails, then asks `Install with these answers? [Y/n, or a step number]`.

Without the setup page there is no Steam sign-in, so claim the install with the
claim link the installer prints at the end. Open it and sign in through Steam
with the account you want as admin.

## Install 5Stack

When you press **Install 5Stack**, your server checks every answer once more.
If one fails, the install doesn't start, and Review shows which step to fix.

With **Cloudflare · 5Stack sets it up**, the page sets Cloudflare up first: the
settings, then the records. The panel's addresses are created proxied (orange
cloud) from the start, while demos and streams (`demos.` and `hls.`) stay DNS
only, straight to your server. If Cloudflare can't be set up, nothing is
installed, and Review says why. See
[What managed setup does](/install/cloudflare/#what-managed-setup-does).

Your server then installs k3s and the panel with your answers. The page shows
each step as it runs, with a timer, and the terminal shows the same:

- Installing k3s and the panel.
- Setting up your tailnet for game server nodes.
- Turning on security updates, and setting the CPU governor and boot option.
- Setting up storage for demos and clips.
- Booting the panel.
- Requesting certificates. Each address shows its certificate live, from
  waiting for Let's Encrypt to issued. If one waits a long time, the page says
  why, such as port 80 not reaching this server or something else answering on
  it. Behind your own reverse proxy, the panel requests no certificates.
- Putting Cloudflare in front of the panel, when 5Stack set Cloudflare up. A
  last check that Cloudflare reaches the panel on each proxied address. An
  address Cloudflare can't reach goes back to DNS only, and the page says why.

Steps you skipped show as skipped. **Stop the Install**, then
**Confirm Stop**, stops it where it is: change your answers on the page and
install again. You can close the page, and the
install carries on.

## Save the recovery key

When the install finishes, the page asks you to copy the recovery key from your
terminal. It's shown only there, and only once, in a framed block:

```
================================================================
  SAVE THESE NOW · the recovery key is shown only once
================================================================

  Recovery key   AGE-SECRET-KEY-1…
  Install id     7f3c-91d0-e21a
  Claim link     https://get.5stack.gg/claim/7f3c-91d0-e21a

  Without the recovery key nobody can open your backups,
  not you and not 5Stack. 5stack recovery-key show
  prints it again on this server.
================================================================
```

The claim link is listed only while nobody has claimed the install, which
happens when you answered in the terminal.

Save the recovery key and the install id together somewhere safe, such as a
password manager. The key never leaves your server, so 5Stack doesn't have it.
The installer then asks you to type the key's last 4 characters, to confirm you
saved it. On the page, tick **I've saved my recovery key** to open your panel.
See [Backups](/install/backups#the-recovery-key).

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

Commands that set up a server, change its config or what it trusts, or run its
scripts still need root. See [Command Reference](/service/cli).
