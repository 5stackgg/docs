# 5Stack Service

Common problems with the [5Stack service](/service/), the message you see, and
what to do. To see what the service itself is doing, run
`journalctl -u 5stack -f` on the server.

## The installer or service.sh refuses the download {#download-refused}

The installer and `service.sh` check every download before they install it. When
a check fails, they stop with **Nothing was installed**, and the server is
unchanged.

**The SHA256SUMS signature is not valid.** The download isn't signed by 5Stack's
release key. Run the command again. For `service.sh`, run `git pull` first, so
the checkout has the current key in `utils/agent_signing_key.pem`.

**The ... checksum does not match SHA256SUMS.** The file changed or broke on the
way. Run the command again.

**The download is signed for channel '...', not '...'.** The build you got isn't
for the channel you asked for. Check the spelling of `--channel`: it is `stable`
or `branch/<name>`.

**The download is ..., older than the installed .... Run with --allow-downgrade
to install it anyway.** The channel's newest build is older than the agent you
have, which happens when you go back from a branch build to `stable`. Add
`--allow-downgrade` if that is what you want.

**The installed agent at /usr/local/bin/5stack did not report its version.** The
installed agent is damaged or for the wrong architecture. Run the command again
with `--allow-downgrade` to replace it.

**No agent signing key is pinned in this checkout yet.** Your checkout is older
than `service.sh`. Run `git pull` and try again.

**OpenSSL 3 or newer is needed to check the agent's signature.** Install it with
`apt install openssl`. Ubuntu 22.04 and newer, and Debian 12 and newer, ship
OpenSSL 3.

**This is not the k3s server for your panel.** Run `service.sh` on the server
the panel is installed on, not on a game server node.

## The setup link expired {#setup-link-expired}

Setup links last 30 minutes. Run the install command again for a new one.

## The setup page says the server keys don't match {#setup-keys-mismatch}

The key in your link differs from the one 5Stack sent, so the page won't send
your answers. Press Enter in the terminal and answer the questions there.

## No terminal to answer on {#no-terminal}

The installer asks its questions, and asks you to confirm your answers, on the
server's terminal, even though its script comes through `curl`. Run it from an
interactive SSH session, not from a script or a provisioning tool.

A node joining without `--panel-key` also needs a terminal to confirm the panel's
key. It stops with **without --panel-key this has to ask you to confirm the
panel's key on a terminal, and there is none here**. Use the command from the
panel's **Add Game Server Node** dialog, which includes `--panel-key`.

## 5stack commands need sudo {#group}

The installer added you to the `5stack` group, but group changes apply only to
new logins. Log out and back in, then try again.

## The node's code expired {#code-expired}

The node says **the code expired before it was approved**. Codes work once and
last 10 minutes. Run the same command on the node again for a new code. Nothing
was changed on the node.

If the panel says **no node is waiting with that code**, check you typed the code
the node shows now, or run the command on the node again.

## The fingerprint doesn't match {#fingerprint-mismatch}

Don't approve the node. Click **Cancel**. A different fingerprint means the code
you typed belongs to another server: a mistyped code, or a code someone else is
using. Run the command on the node again and use the new code.

The node and the panel check the keys as well. If either finds a key that isn't
the one it expects, it refuses, and nothing is changed on the node:

- **5Stack cloud showed fingerprint ..., but the node's key has .... Do not
  approve this node.**
- **the answer is signed by panel key ..., not the ... you were given.** Copy the
  command again from your own panel's **Add Game Server Node** dialog.

## This panel has no Tailscale address {#no-tailscale}

Game server nodes reach the panel over Tailscale. Check Tailscale is running on
the panel server with `tailscale status`, then approve the node again.

## The LXC container can't run Tailscale and k3s {#lxc}

The node lists what is wrong with the container. See
[Proxmox LXC containers](/service/game-server-nodes#proxmox-lxc-containers).

## Certificates aren't issued yet {#dns-not-pointing}

The server requests certificates only once your panel's domain resolves to it.
Until then, the install or move waits.

Behind a reverse proxy or the Cloudflare proxy, the domain never resolves to the
server's own address. The server waits instead until the domain reaches this
panel through the proxy. Check the proxy forwards to this server over HTTPS, as
[Reverse Proxy](/install/reverse-proxy) describes.

Point the domain and its
[subdomains](/install/requirements#domain-requirements) at the server's address.
DNS changes can take a while to spread, and the server carries on once they
reach it.

## The install is claimed by another Steam account {#claimed}

The setup page says **This server is already claimed by another Steam account**.
Sign in with the account that claimed it. A claim changes only through 5Stack
support, or by root on the server running `sudo 5stack claim reset`. Then claim
it again with the new account.
