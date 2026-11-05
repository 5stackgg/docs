# Cloudflare

If your domain's DNS is on Cloudflare, 5Stack can set Cloudflare up for you: the DNS records, Cloudflare's proxy and HTTPS, with Let's Encrypt's certificate check let through. On the setup page, pick **Cloudflare · 5Stack sets it up** on the Domain and DNS step, then [connect Cloudflare](#connect-cloudflare) on the next step and pick your domain. 5Stack sets it all up when you press **Install 5Stack**. On a running panel, the 5Stack service's Integrations page does the same with **Ask 5Stack to Manage It**. On a panel installed from the git checkout, `./cloudflare.sh` does it.

## Which setup do I want?

| Setup | What you get | What you do | Free plan |
|---|---|---|---|
| **Managed by 5Stack** (recommended) | Cloudflare's proxy (orange cloud) in front of the panel from the start, HTTPS Full (strict), and certificates from Let's Encrypt, renewed by your server. Demo uploads go straight to your server, and streams go straight to it or through the [stream relay Worker](#streams-and-the-stream-relay-worker). | Pick **Cloudflare · 5Stack sets it up** and connect Cloudflare on the setup page, or run `./cloudflare.sh`. Nothing else. | Only names Cloudflare's free certificate covers are proxied; see [nested subdomains](/install/cloudflare/dns-and-ssl#deeply-nested-subdomains) |
| **DNS only** (grey cloud) | Visitors reach your server directly. The panel gets its own Let's Encrypt certificates. | Pick **Cloudflare · I manage the records**, point the records at your server, keep the cloud grey, and open ports 80 and 443. | Works at any depth |
| **Orange cloud you set up yourself** | Cloudflare's proxy in front, holding the certificate visitors see. The panel runs in reverse proxy mode. | Pick **Cloudflare · I manage the records**, tick the orange cloud, and set SSL/TLS to **Full**. See [Cloudflare Proxy](/install/cloudflare/proxy). | Same limit as managed |
| **Your own reverse proxy** | Nginx Proxy Manager, Caddy or a [Cloudflare Tunnel](/install/cloudflare/tunnel) in front, terminating HTTPS | Answer **Yes** on the Reverse proxy step: [reverse proxy mode](/install/reverse-proxy). The panel serves its own certificate and never asks Let's Encrypt. | Same limit when Cloudflare proxies |

Managed setup and your own reverse proxy work together: pick **Cloudflare · 5Stack sets it up** and answer **Yes** on the Reverse proxy step. Your proxy then holds the certificates, and 5Stack sets up the records, the proxy and HTTPS on Cloudflare.

## Connect Cloudflare

On the setup page's **Cloudflare** step:

1. Press **Connect Cloudflare**. Cloudflare's page opens in a pop-up window. If your browser blocks it, allow pop-ups for the setup page.
2. Approve 5Stack on Cloudflare's page. You come back to the setup page.
3. Pick the panel's domain from the domains in your Cloudflare account, grouped by account if you belong to several. 5Stack picks it for you when it can. If it isn't there, see [Add your domain to Cloudflare](#add-your-domain-to-cloudflare).

You only connect once. Your server then reads your DNS, and the Review step lists what happens to each address under **What 5Stack sets up on Cloudflare**. Nothing changes on Cloudflare until you press **Install 5Stack**.

Cloudflare's page lists the permissions 5Stack asks for. One of them, **Account API Tokens Write**, lets your server make a Cloudflare key of its own, named `5Stack panel <your domain>` and limited to the panel's domain, and then sign out of Cloudflare. Without it, your server stays signed in to Cloudflare instead. Both work.

When the panel is one level below its domain, like `panel.example.com`, and your server hasn't read the domain's plan from Cloudflare yet, the step asks which plan it's on, with **Free** picked. See [Keep every address one level deep](/install/cloudflare/dns-and-ssl#keep-every-address-one-level-deep).

**Rather use a key?** **Make a key on Cloudflare's page** opens Cloudflare's API token page with the permissions 5Stack needs filled in. Press **Create Token** there and paste the key into the setup page. The page offers this when it can't open Cloudflare's window, and when Cloudflare won't let 5Stack's sign-in change your DNS.

**Disconnect** forgets the connection and leaves Cloudflare as it is.

## What managed setup does

When you press **Install 5Stack**, the page sets Cloudflare up before your server installs anything, and shows each record and setting as it's done. If Cloudflare can't be set up, nothing is installed, and Review says why.

- Checks that Cloudflare is ready first: WebSockets on, Bot Fight Mode off, because it blocks game servers talking to the panel, and Universal SSL on. If one isn't, it stops and says what to change.
- Applies the settings, then adds the records. The settings:
  - One Configuration Rule for the panel's addresses: SSL/TLS Full (strict), with Rocket Loader, Email Obfuscation, Zaraz and Browser Integrity Check off.
  - One Cache Rule so the API, live updates, search, the relay and streams are never cached.
  - When the panel gets its own certificates, Let's Encrypt's plain HTTP check keeps reaching your server: **Always Use HTTPS** goes off, one Redirect Rule sends everything else to HTTPS, and security challenges stay off `/.well-known/acme-challenge/`. It names any of your own Redirect Rules or Page Rules that would send the check away.
  - Your other rules stay as they are.
- Adds an A record (and AAAA when the server has IPv6) for each panel address, pointing at your server. Records 5Stack made carry the comment `5stack-panel (managed by update.sh)`. Records someone else made are listed and left alone, and only replaced after you press **Replace Them**. Email and other records are left alone.
- Creates the panel site, `api.`, `ws.`, `search.`, `tv.` and `console.` proxied (orange cloud) from the start. Demo uploads (`demos.`), which can be larger than Cloudflare's 100 MB upload limit, and streams (`hls.`), which Cloudflare's terms keep off its plain proxy, stay DNS only, straight to your server. Addresses a Cloudflare Worker answers, like the [Backblaze proxy](/advanced/s3/backblaze) or the [stream relay](#streams-and-the-stream-relay-worker), are never touched.
- Files uploaded in the panel's file manager go to the API in 8 MB parts, so they work through the proxy up to the file manager's 100 MB limit.
- At the end of the install, checks that Cloudflare reaches the panel on each proxied address. An address it can't reach goes back to DNS only, and the page says why.
- On every update, puts the records and rules back the way it left them, proxied from the start, then checks each proxied address again. An address Cloudflare can't reach, or where Let's Encrypt's check is redirected or challenged, goes back to DNS only, and the update says why.

Behind your own reverse proxy, the panel issues no certificates, so the Let's Encrypt rules are left out, and the only reason an address goes back to DNS only is that Cloudflare can't reach it.

5Stack keeps its Cloudflare key, or its sign-in to Cloudflare, for those updates: in the 5Stack service's encrypted secrets on your server, or, for a key, in Vault at `kv/cloudflare` when the panel keeps its secrets in Vault. It's never stored as a Kubernetes Secret, so nothing running in the cluster can read it. It can read your zones, change DNS records, redirect, configuration and cache rules and zone settings, read SSL settings, Bot Management and Page Rules, and deploy the panel's Workers and their routes, nothing else.

## Add your domain to Cloudflare

After you connect Cloudflare, pick the domain the panel is on from the list of domains in your Cloudflare account. If it isn't there, add it to Cloudflare first (**Add a domain** on Cloudflare's home page), then press **Refresh**. Cloudflare imports your existing records when you add it; check that your email (MX and TXT) records came across before you switch nameservers.

A domain shows as pending until its nameservers point at Cloudflare. Change them at your registrar to the two Cloudflare shows you, wait for Cloudflare to mark the domain active, then press **Refresh**. A pending domain can't be picked.

Managed setup doesn't use a Cloudflare Tunnel. If you want a tunnel instead of open ports, set it up yourself as described in [Cloudflare Tunnel](/install/cloudflare/tunnel) and use reverse proxy mode.

## Checking it later

The 5Stack service checks Cloudflare as soon as you open its console, at most every two minutes, and the Overview shows one line: all good, or what needs fixing. Its Integrations page shows a **Cloudflare** card for a managed panel: each address against what setup left, with **Fix** on any that changed, the settings 5Stack relies on (HTTPS Full (strict), the next certificate renewal, WebSockets and Bot Fight Mode), and whether Let's Encrypt can reach your server. It suggests Tiered Cache, which is free on every plan, with **Turn On**. **Change Domain** picks another domain from your Cloudflare account.

A panel you set up on Cloudflare yourself gets the same card with the checks that need no Cloudflare key: Let's Encrypt can reach your server, SSL/TLS isn't Flexible, live updates connect, and demos and streams aren't on the plain proxy. Each problem says what to change in Cloudflare, with a link to these docs, and **Ask 5Stack to Manage It** connects Cloudflare from there. Anything wrong lights the Integrations page.

## Streams and the stream relay Worker

Cloudflare's CDN terms on the Free, Pro and Business plans don't allow serving video through the plain proxy, so managed setup leaves `hls.` straight to your server. Viewers then reach your server's address directly.

The **stream relay Worker** puts streams back behind Cloudflare the allowed way. It's a small Cloudflare Worker on `hls.yourdomain.com`: it fetches each piece of video from your server once per Cloudflare location and serves every other viewer there from Cloudflare's cache, keeps playlists for at most a second so live streams stay live, and only gives a viewer what your panel allows them to watch. Your server's address stays hidden.

What it costs: each viewer asks for about two pieces of a stream a second. Cloudflare's free Workers plan covers 100,000 requests a day, roughly 14 hours of one person watching, and streams stop until the next day once those run out. A panel with regular viewers needs **Workers Paid**, $5 a month for 10 million requests.

To set it up:

- **On the setup page:** with 5Stack setting Cloudflare up, tick **Set up the stream relay Worker** on the Review step. It's off unless you tick it. It's offered when this server has a graphics card, or when you tick **I'll stream matches from GPU nodes** on the Game Server Nodes step. It deploys near the end of the install.
- **Later:** on the 5Stack service's Integrations page, **Stream edge relay** → **Set Up**. On a managed panel it uses 5Stack's Cloudflare key; otherwise it signs in to Cloudflare first. The card shows whether viewers see your server's address. From a git checkout, run `./stream-relay.sh`.

Live video in the panel's own player uses WebRTC, which connects to your server directly whichever way streams are set up.

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
