# Hosting FAQ

Common questions about running your own 5Stack instance. If you're a player
looking for how a 5Stack site works rather than how to host one, every instance
has an in-app **Help & FAQ** page that covers that side.

## Is 5Stack free?

Yes. It's free and open source, and you host it yourself, so there's no per-seat
or per-match cost from the project. You pay for whatever infrastructure you
choose to run it on.

It's built and maintained by one developer.
[Sponsoring](https://github.com/sponsors/lukepolo) is what keeps the CS2 plugin
updates, GPU rendering work, and the roadmap moving.

## Is there a hosted or managed version I can buy?

No. 5Stack is self-hosted only, and there's no SaaS tier or managed offering.
[5stack.gg](https://5stack.gg) is the maintainer's own public instance, which is
the easiest way to see the software running before you install it.

## What am I actually installing?

One command brings up the whole stack:

```bash
git clone https://github.com/5stackgg/5stack-panel; cd 5stack-panel; ./install.sh
```

That installs [K3s](https://docs.k3s.io) (a lightweight Kubernetes
distribution), the database, S3-compatible storage (RustFS by default), and the
panel itself. See [What is Installed?](/install/what-is-installed) for the full
inventory, and [Configuration Options](/install/command-line-arguments) for the
flags the installer accepts.

## What do I need to run the panel?

A Linux server with at least **3 GB** of memory, and a domain you control. See
[Requirements](/install/requirements) for the details, but the two things that
catch people out are:

- **Ports.** `80` and `443` for routing, plus `8585` on every 5Stack server for
  the game server node connector. If you can't use 80/443, you can
  [change them](/install/nginx).
- **Subdomains.** The panel needs several records pointing at it — the root
  domain plus `api`, `ws`, `demos`, `search`, and `console`. Deeply nested
  domains like `api.deep.example.com` are fine.

## Why Kubernetes? That seems heavy.

Game servers are created and destroyed constantly, and that's the problem
Kubernetes is actually good at. The install uses K3s rather than a full
distribution, so the footprint is much smaller than "Kubernetes" usually
implies. The reasoning is written up in
[Why Kubernetes?](/install/why-k8s).

## Can I run it on a cluster I already have?

Yes — see [Custom Kubernetes](/advanced/custom-k8s).

## Can I put it behind Cloudflare or an existing reverse proxy?

Both are supported. See [Reverse Proxy](/install/reverse-proxy) for the general
case, and the Cloudflare guides for
[DNS & SSL](/install/cloudflare/dns-and-ssl),
[the Cloudflare proxy](/install/cloudflare/proxy), and
[Cloudflare Tunnel](/install/cloudflare/tunnel) if you'd rather not expose the
host directly.

## Where do the matches actually run?

Not on the panel. You attach servers to it, in one of two ways:

- **[Game server nodes](/servers/game-server-nodes/)** — a machine that creates
  CS2 servers on demand. Budget around **150 GB of disk** per node for the game
  files and in-progress demo recordings, and note that how many servers a node
  can run depends on its hardware and available ports.
- **[Dedicated servers](/servers/dedicated-servers/)** — a standalone server you
  manage yourself, registered with the panel.

You can mix both, and point at a third-party host. CS2 updates are applied
automatically, and regions, [Steam Relay](/servers/steam-relay), and LAN setups
are all supported.

## Do I need a GPU?

Only for the features that produce video —
[in-browser demo playback](/features/demo-playback),
[live streaming](/features/live-streaming), and
[highlight and clip rendering](/features/highlights). Those run on a
[GPU node](/servers/gpu-nodes), which needs an **NVIDIA** GPU on a native Linux
host (WSL will not work).

Everything else — matchmaking, tournaments, stats, the 2D and 3D replays,
servers, chat — runs fine without one.

## Where do demos get stored, and can I use my own storage?

Demos and backups go to S3-compatible storage. The install ships RustFS running
inside the cluster, but you can point it at any S3 provider instead — see
[Bring Your Own S3](/advanced/s3/), including a
[Backblaze](/advanced/s3/backblaze) walkthrough.

## Can it run at a LAN with no internet?

Game server nodes support offline operation — see
[Offline Support](/servers/game-server-nodes/offline-support).

## How do updates work?

Two separate things:

- **The install itself**: `git pull` in the install directory, then
  `./update.sh`. See [Updating](/updating).
- **The components** (API, web, connector): these update from the update notice
  inside the panel, no shell needed.

If you edited anything under `overlays/config` or `overlays/local-secrets`,
you need to run the update to apply it.

## Can I make it look like my organization?

Yes. Name, logo, favicon, login page, and the full color theme are configurable
from the admin settings — see [Branding & Theming](/features/admin/branding).
An instance should read as your platform, not as someone else's software with
your logo pasted on.

## Can I extend it with my own code?

In two places, and they're often confused:

- **[Panel plugins](/plugins/)** — your own web apps embedded as native panel
  pages. They inherit the panel session and design system, so there's no fork to
  maintain.
- **[Game plugins](/servers/game-server-nodes/plugin-runtimes)** — your own CS2
  server-side plugins running alongside 5Stack's, on either CounterStrikeSharp
  or SwiftlyS2.

There's also a [GraphQL API](/advanced/api) if you want to build against your
own data from outside.

## Something is broken. Where do I start?

Run the [debug script](/common-issues/debug-script) first — it collects the
state that any support conversation is going to ask for anyway. The
[Troubleshooting](/common-issues/debug-script) section covers the failures that
come up most: [login problems](/common-issues/unable-to-login),
[updates not applying](/common-issues/system-not-updating), and
[RCON commands failing](/common-issues/rcon-fails).

## Where do I get help?

[Discord](https://5stack.gg/discord-invite) is the fastest route to a human, and
the people running other 5Stack instances are in there. Bugs and feature
requests belong on
[GitHub](https://github.com/5stackgg/5stack-panel/issues).
