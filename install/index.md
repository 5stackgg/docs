# Install

One command sets up a server as a 5Stack panel. It installs the 5Stack
service, which installs k3s and the panel and keeps them updated from then on.
You answer a few questions on a setup page in your browser, or in the terminal
if you prefer.

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
- A [Tailscale](https://tailscale.com) account, if you will add
  [game server nodes](/servers/game-server-nodes/). See
  [Tailscale for game server nodes](#tailscale-for-game-server-nodes).

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

The link is good for 30 minutes. If it expires, run the install command again
for a new one.

## Answer on the setup page

Open the link from the terminal. Copy the whole line: the part after `#` carries
your server's key and never reaches 5Stack.

The page shows the server it is setting up and its key fingerprint, such as
`8F2C 19AA 03D1 7E55`. Check it matches the fingerprint in your terminal.

1. **Sign in through Steam.** This claims the server. The Steam account you sign
   in with becomes the panel's first admin, and 5Stack links the install to your
   account.
2. **Panel domain**, such as `panel.example.gg`. Certificates are issued once its
   DNS points at this server.
3. **Is the DNS on Cloudflare?** See [Cloudflare](/install/cloudflare/).
4. **Is a reverse proxy in front of this server?** Answer yes for Nginx, the
   Cloudflare proxy (orange cloud) or a Cloudflare Tunnel. See
   [Reverse Proxy](/install/reverse-proxy).
5. **Steam Web API key.** Steam sign-in needs it.
6. **Tailscale, for game nodes.** The client ID and secret of a Tailscale OAuth
   client. See [Tailscale for game server nodes](#tailscale-for-game-server-nodes).

Click **Send to Server**.

::: info Signing in first doesn't make you admin
Only the Steam account that claimed the install is made admin. Whoever signs in
to the panel first gets no special role.
:::

### Your answers stay private

HTTPS protects the trip, and the page also encrypts your answers in your browser
to your server's key before it sends them. 5Stack passes them to your server but
can't read them. Your server also checks that the answers carry a secret from the
link in your terminal, which 5Stack never sees.

If the page says **Don't continue: the server keys don't match**, the key in your
link is not the one 5Stack sent. Don't send anything. Press Enter in the terminal
and answer there instead.

### Tailscale for game server nodes

Game server nodes reach your panel over your own Tailscale network. The setup
page walks you through this, and it takes about two minutes:

1. In the Tailscale admin console, open **Access controls** and add the tag owner:

   ```json
   "tagOwners": { "tag:fivestack": ["autogroup:admin"] }
   ```

2. Open
   [Trust credentials](https://login.tailscale.com/admin/settings/trust-credentials/add)
   and add an OAuth client with **Auth Keys** write access, tagged
   `tag:fivestack`.
3. Paste its client ID and secret into the setup page. Tailscale shows the secret
   only once.

The panel uses this client to make a single-use key for each node you add.

## Or answer in the terminal

Press Enter in the terminal instead of opening the link. The installer asks the
same questions there:

```
Panel domain:
Is the DNS for panel.example.gg on Cloudflare? (y/n)
Is a reverse proxy in front of this server? (y/n)
Steam Web API key:
Tailscale OAuth client ID (Enter to skip):
Tailscale OAuth client secret:
```

Without the setup page there is no Steam sign-in, so claim the install with the
claim link the installer prints at the end. Open it and sign in through Steam
with the account you want as admin.

## Confirm in the terminal

Before it installs anything, the terminal shows the answers it received and asks
`Install with these answers? [Y/n]`. Check the domain and the account that
claimed the install, then press Enter.

The installer then checks that your Tailscale client works, installs k3s and the
panel, and requests certificates. The setup page shows the same progress, and
you can close it.

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
without sudo.

Commands that set up a server or change what it trusts still need root:
`install`, `join`, `restore`, `adopt`, `move`, `uninstall` and the `vault`
commands. See [The 5stack Command](/service/command).
