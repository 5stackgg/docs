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

A setup link stays open while the setup page is open, and closes 30 minutes
after. Run the install command again for a new one.

A link also stops working once the install finishes. The page then says the
setup is finished, with a button to open your panel.

## A setup check fails {#setup-check-failed}

The setup page and the terminal show why each answer failed. Fix it and the
server checks it again. A refused Steam key, a missing or wrong hostname,
Tailscale credentials that don't work, and S3 keys or buckets that don't work
stop the install. The rest only warn. See [Install](/install/#install-5stack).

- **DNS.** Point each hostname it lists at the server's address. If your
  records are on Cloudflare, pick a Cloudflare answer on the Domain and DNS
  step. If your own reverse proxy is in front of the server, answer **Yes** on
  the Reverse proxy step.
- **S3 backup bucket.** Create a second bucket named like yours plus
  `-db-backups`, in the same account. See [Storage](/install/#storage).
- **Tailscale policy managed in GitOps.** 5Stack won't edit it. The page shows
  the lines for your panel: add them in your GitOps repository, then press
  **Check Again**.

## The setup page says the server keys don't match {#setup-keys-mismatch}

The key in your link differs from the one 5Stack sent, so the page won't send
your answers. Press Enter in the terminal and answer the questions there.

## No terminal to answer on {#no-terminal}

The installer reads from the server's terminal, even though its script comes
through `curl`: to answer the questions there instead of on the setup page, and
to confirm you saved the recovery key. Run it from an interactive SSH session,
not from a script or a provisioning tool.

A node joining without `--panel-key` also needs a terminal to confirm the panel's
key. It stops with **without --panel-key this has to ask you to confirm the
panel's key on a terminal, and there is none here**. Use the command from the
panel's **Create Game Server Node** dialog, which includes `--panel-key`.

## 5stack commands need sudo {#group}

The installer added you to the `5stack` group, but group changes apply only to
new logins. Log out and back in, then try again.

Commands that set up a server, change its config or what it trusts, or run its
scripts always need root, even in the group: `install`, `join`, `restore`,
`adopt`, `move`, `uninstall`, `ui`, `run`, `nodes remove`, `vault enable`,
`vault sync`, and `config set`, `unset`, `import`, `tailscale` and `apply`. Run
them with `sudo`, or pick them in the [`5stack` menu](/service/command#the-menu),
which offers to run them with sudo. See [Command Reference](/service/cli).

## 5stack menu needs a terminal {#menu-terminal}

The menu opens only in an interactive terminal. Over SSH from a script, use
`ssh -t`, or run the command itself. `5stack help` lists them.

## Nothing was started, or nothing was changed {#busy}

The panel runs one thing at a time: an update, a move, an uninstall, a
`5stack run` script or a config change. Another one stops with a message such
as **an update is applying on this panel, so nothing was started**. Run it again
once that finishes.

## Ignored .5stack-env.config keys {#ignored-keys}

`5stack status` warns **ignored .5stack-env.config keys this agent doesn't
know**. The panel's scripts read `.5stack-env.config` as shell, so the service
writes only the keys it knows into it. It keeps the others but doesn't use them.
If a newer panel needs one, update the agent. `5stack config list` marks them
ignored.

## The checkout's config differs {#checkout-differs}

On a panel [upgraded with service.sh](/service/existing-install), an update or a
config change warns **the checkout's config differs from the 5Stack service's**.
You edited an env file in the checkout, and updates apply the service's copy.
Run `sudo 5stack config import` to take your edits, or the next update ignores
them.

## Claim this install first {#claim-first}

The panel can't look up a node's code, or a new server's code when you move,
until its install is claimed. Open the claim link from the install's
**SAVE THESE NOW** block, or the one `service.sh` printed, and sign in through
Steam.

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
  command again from your own panel's **Create Game Server Node** dialog.

## This panel has no Tailscale address {#no-tailscale}

Game server nodes reach the panel over Tailscale. Check Tailscale is running on
the panel server with `tailscale status`, then approve the node again.

## The LXC container can't run Tailscale and k3s {#lxc}

The node lists what is wrong with the container. See
[Proxmox LXC containers](/servers/game-server-nodes/create-game-server-node#proxmox-lxc-containers).

## Certificates aren't issued yet {#dns-not-pointing}

Let's Encrypt checks each address over plain HTTP on port 80. During the
install, the setup page shows each address's certificate as it goes, and says
why one keeps waiting: port 80 doesn't reach this server, or something else
answers on it, such as a reverse proxy. Forward ports 80 and 443 to this
server, or answer **Yes** on the Reverse proxy step if a proxy is in front of
it. With Cloudflare's proxy in front, see
[Certificate generation fails behind the Cloudflare proxy](/install/cloudflare/dns-and-ssl#certificate-generation-fails-behind-the-cloudflare-proxy).

A move waits until your panel's domain resolves to the new server. Behind a
reverse proxy or the Cloudflare proxy, the domain never resolves to the
server's own address, so the move waits instead until the domain reaches the
new panel through the proxy. Check the proxy forwards to this server over
HTTPS, as [Reverse Proxy](/install/reverse-proxy) describes.

Point the domain and its
[subdomains](/install/requirements#domain-requirements) at the server's address.
DNS changes can take a while to spread, and the server carries on once they
reach it.

## The install is claimed by another Steam account {#claimed}

The setup page says **This server is already claimed by another Steam account**.
Sign in with the account that claimed it. A claim changes only through 5Stack
support, or by root on the server running `sudo 5stack claim reset`. Then claim
it again with the new account.
