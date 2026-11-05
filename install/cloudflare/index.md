# Cloudflare

If your domain's DNS is on Cloudflare, 5Stack can set Cloudflare up for you: the DNS records, Cloudflare's proxy and HTTPS. On the setup page, pick **Cloudflare · 5Stack sets it up** on the Domain and DNS step, then [connect Cloudflare](#connect-cloudflare) on the next step and pick your domain. On a running panel, press **Ask 5Stack to Manage It** on the 5Stack service's Integrations page. On a panel installed from the git checkout, run `./cloudflare.sh`.

## Which setup do I want?

| Setup | What you get | What you do | Free plan |
|---|---|---|---|
| **Managed by 5Stack** (recommended) | Cloudflare's proxy (orange cloud) in front of the panel, HTTPS Full (strict), and Let's Encrypt certificates renewed by your server. Streams can go through the [stream relay Worker](#streams-and-the-stream-relay-worker). | Pick **Cloudflare · 5Stack sets it up** and connect Cloudflare on the setup page, or run `./cloudflare.sh`. Nothing else. | Only names Cloudflare's free certificate covers are proxied; see [nested subdomains](/install/cloudflare/dns-and-ssl#deeply-nested-subdomains) |
| **DNS only** (grey cloud) | Visitors reach your server directly. The panel gets its own Let's Encrypt certificates. | Pick **Cloudflare · I manage the records**, point the records at your server, keep the cloud grey, and open ports 80 and 443. | Works at any depth |
| **Orange cloud you set up yourself** | Cloudflare's proxy in front, holding the certificate visitors see. The panel runs in reverse proxy mode. | Pick **Cloudflare · I manage the records**, tick the orange cloud, and set SSL/TLS to **Full**. See [Cloudflare Proxy](/install/cloudflare/proxy). | Same limit as managed |
| **Your own reverse proxy** | Nginx Proxy Manager, Caddy or a [Cloudflare Tunnel](/install/cloudflare/tunnel) in front, holding the HTTPS certificate | Answer **Yes** on the Reverse proxy step: [reverse proxy mode](/install/reverse-proxy). | Same limit when Cloudflare proxies |

Managed setup and your own reverse proxy work together: pick **Cloudflare · 5Stack sets it up** and answer **Yes** on the Reverse proxy step. Your proxy then holds the certificates.

## Connect Cloudflare

On the setup page's **Cloudflare** step:

1. Press **Connect Cloudflare**. Cloudflare's page opens in a pop-up window. If your browser blocks it, allow pop-ups for the setup page.
2. Approve 5Stack on Cloudflare's page. You come back to the setup page.
3. Pick the panel's domain from the domains in your Cloudflare account, grouped by account if you belong to several. 5Stack picks it for you when it can. If it isn't there, see [Add your domain to Cloudflare](#add-your-domain-to-cloudflare).

You only connect once. The Review step lists what 5Stack sets up for each address. Nothing changes on Cloudflare until you press **Install 5Stack**.

Cloudflare's page lists the permissions 5Stack asks for. **Account API Tokens Write** lets your server make its own Cloudflare key, `5Stack panel <your domain>`, limited to the panel's domain. Without it, your server stays signed in to Cloudflare instead. Both work.

When the panel is one level below its domain, like `panel.example.com`, and your server hasn't read the domain's plan from Cloudflare yet, the step asks which plan it's on, with **Free** picked. See [Keep every address one level deep](/install/cloudflare/dns-and-ssl#keep-every-address-one-level-deep).

**Rather use a key?** **Make a key on Cloudflare's page** opens Cloudflare's API token page with the permissions 5Stack needs filled in. Press **Create Token** there and paste the key into the setup page. The page offers this when it can't open Cloudflare's window, and when Cloudflare won't let 5Stack's sign-in change your DNS.

**Disconnect** forgets the connection and leaves Cloudflare as it is.

## What managed setup does

When you press **Install 5Stack**, the page sets Cloudflare up before your server installs anything. If Cloudflare can't be set up, nothing is installed, and Review says why.

- Checks that Cloudflare is ready first: WebSockets on, Bot Fight Mode off and Universal SSL on. If one isn't, it stops and says what to change.
- Adds a record for each panel address, pointing at your server. Records someone else made are listed and left alone, and only replaced after you press **Replace Them**. Email and other records are left alone.
- Proxies the panel's addresses (orange cloud) from the start. Demo uploads (`demos.`) and streams (`hls.`) stay DNS only, straight to your server.
- Adds rules for the panel's addresses: SSL/TLS Full (strict), and no caching for the API, live updates and streams. When the panel keeps its own certificates, it also turns **Always Use HTTPS** off and adds a redirect to HTTPS that lets Let's Encrypt's check through, and names any of your own Redirect Rules or Page Rules that would block the check. Your other rules stay as they are.
- At the end of the install, and on every update, puts the records and rules back the way it left them and checks each proxied address. An address Cloudflare can't reach goes back to DNS only, and the page or the update says why.

5Stack keeps its Cloudflare key, or its sign-in to Cloudflare, on your server for those updates, or in Vault at `kv/cloudflare` when the panel keeps its secrets in Vault.

## Add your domain to Cloudflare

After you connect Cloudflare, pick the domain the panel is on from the list of domains in your Cloudflare account. If it isn't there, add it to Cloudflare first (**Add a domain** on Cloudflare's home page), then press **Refresh**. Cloudflare imports your existing records when you add it; check that your email (MX and TXT) records came across before you switch nameservers.

A domain shows as pending until its nameservers point at Cloudflare. Change them at your registrar to the two Cloudflare shows you, wait for Cloudflare to mark the domain active, then press **Refresh**. A pending domain can't be picked.

Managed setup doesn't use a Cloudflare Tunnel. If you want a tunnel instead of open ports, set it up yourself as described in [Cloudflare Tunnel](/install/cloudflare/tunnel) and use reverse proxy mode.

## Checking it later

The 5Stack service's console checks Cloudflare, and its Overview shows all good, or what needs fixing. For a managed panel, the **Cloudflare** card on its Integrations page shows each address and setting, with **Fix** on any that changed. It suggests Tiered Cache, which is free on every plan, with **Turn On**. **Change Domain** picks another domain from your Cloudflare account.

A panel you set up on Cloudflare yourself gets the same card with fewer checks. Each problem says what to change in Cloudflare, and **Ask 5Stack to Manage It** connects Cloudflare from there.

## Streams and the stream relay Worker

Cloudflare's CDN terms on the Free, Pro and Business plans don't allow serving video through the plain proxy, so managed setup leaves `hls.` straight to your server. Viewers then reach your server's address directly.

The **stream relay Worker** puts streams back behind Cloudflare the allowed way, on `hls.yourdomain.com`. Viewers are served from Cloudflare's cache, and your server's address stays hidden.

What it costs: Cloudflare's free Workers plan covers 100,000 requests a day, roughly 14 hours of one person watching, and streams stop until the next day once those run out. A panel with regular viewers needs **Workers Paid**, $5 a month for 10 million requests.

To set it up:

- **On the setup page:** with 5Stack setting Cloudflare up, tick **Set up the stream relay Worker** on the Review step. It's off unless you tick it. It's offered when this server has a graphics card, or when you tick **I'll stream matches from GPU nodes** on the Game Server Nodes step.
- **Later:** on the 5Stack service's Integrations page, **Stream edge relay** → **Set Up**. From a git checkout, run `./stream-relay.sh`.

Live video in the panel's own player still connects to your server directly, whichever way streams are set up.

## Subdomains

5Stack provisions these subdomains. Each one must resolve to your server:

| Subdomain | Purpose |
|---|---|
| `yourdomain.com` | Panel |
| `api.yourdomain.com` | API |
| `ws.yourdomain.com` | WebSockets |
| `tv.yourdomain.com` | Live match relay |
| `demos.yourdomain.com` | Demo uploads and downloads |
| `hls.yourdomain.com` | Streams |
| `search.yourdomain.com` | Search |
| `console.yourdomain.com` | File storage console |

A panel below its domain's root can name them one level deep instead, like `panel-api.example.com`. See [Keep every address one level deep](/install/cloudflare/dns-and-ssl#keep-every-address-one-level-deep).

A wildcard record (`*.yourdomain.com`) covers all of these, but see the note on [deeply nested subdomains](/install/cloudflare/dns-and-ssl#deeply-nested-subdomains) before using one.

## In this section

- [DNS & SSL](/install/cloudflare/dns-and-ssl), records, SSL/TLS mode, and certificate problems
- [Cloudflare Proxy](/install/cloudflare/proxy), the orange cloud when you set it up yourself
- [Cloudflare Tunnel](/install/cloudflare/tunnel), expose 5Stack without opening ports (not part of managed setup)
- [Google Tag Manager](/install/cloudflare/google-tag-manager), Google Tag Gateway
