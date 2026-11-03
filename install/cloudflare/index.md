# Cloudflare

If your domain's DNS is on Cloudflare, 5Stack can set Cloudflare up for you: the DNS records, Cloudflare's proxy and HTTPS, with Let's Encrypt's certificate check let through. On the setup page, **Connect Cloudflare** on the Domain and DNS step does all of it with one approval: pick your domain from the list and press **Set Up Cloudflare**. On a running panel, the 5Stack service's Integrations page does the same with **Ask 5Stack to Manage It**. On a panel installed from the git checkout, `./cloudflare.sh` does it.

## Which setup do I want?

| Setup | What you get | What you do | Free plan |
|---|---|---|---|
| **Managed by 5Stack** (recommended) | Cloudflare's proxy (orange cloud) in front of the panel, HTTPS Full (strict), and certificates from Let's Encrypt, renewed by your server. Demo uploads go straight to your server, and streams go straight to it or through the [stream relay Worker](#streams-and-the-stream-relay-worker). | Connect Cloudflare on the setup page, or run `./cloudflare.sh`. Nothing else. | Only names Cloudflare's free certificate covers are proxied; see [nested subdomains](/install/cloudflare/dns-and-ssl#deeply-nested-subdomains) |
| **DNS only** (grey cloud) | Visitors reach your server directly. The panel gets its own Let's Encrypt certificates. | Point the records at your server, keep the cloud grey, and open ports 80 and 443. | Works at any depth |
| **Proxy you set up yourself** | The orange cloud with the panel's own certificates | The [one Cloudflare setting](/install/cloudflare/proxy#let-s-encrypt-behind-the-orange-cloud) Let's Encrypt needs, and SSL/TLS Full (strict) | Same limit as managed |
| **Your own reverse proxy** | Nginx, Caddy or a [Cloudflare Tunnel](/install/cloudflare/tunnel) in front, terminating HTTPS | [Reverse proxy mode](/install/reverse-proxy). The panel serves its own certificate and never asks Let's Encrypt. | Same limit when Cloudflare proxies |

## What managed setup does

- Adds an A record (and AAAA when the server has IPv6) for each panel address, pointing at your server. Records 5Stack made carry the comment `5stack-panel (managed by update.sh)`. Records someone else made are shown first and only replaced after you say yes. Email and other records are left alone.
- Proxies every address except demo uploads (`demos.`), which can be larger than Cloudflare's 100 MB upload limit, streams (`hls.`), which Cloudflare's terms keep off its plain proxy, and TURN, which isn't HTTP. Addresses a Cloudflare Worker answers, like the [Backblaze proxy](/advanced/s3/backblaze) or the [stream relay](#streams-and-the-stream-relay-worker), are never touched.
- Files uploaded in the panel's file manager go to the API in 8 MB parts, so they work through the proxy up to the file manager's 100 MB limit.
- Adds one Configuration Rule for the panel's addresses: SSL/TLS Full (strict), with Rocket Loader, Email Obfuscation, Zaraz and Browser Integrity Check off. Adds one Cache Rule so the API, live updates, search, the relay and streams are never cached. Your other rules stay as they are.
- Keeps Let's Encrypt's plain HTTP check reaching your server: turns **Always Use HTTPS** off and adds one Redirect Rule that sends everything else to HTTPS, keeps security challenges off `/.well-known/acme-challenge/`, and names any of your own Redirect Rules or Page Rules that would send the check away.
- Stops and tells you when Bot Fight Mode is on, because it blocks game servers talking to the panel, or when WebSockets are off.
- Puts the records back the way it left them on every update, and turns the proxy on only once the panel has its certificates and `http://<address>/.well-known/acme-challenge/5stack-check` gets the panel's own answer through Cloudflare. An address Cloudflare can't reach, or where the check is redirected or challenged, goes back to DNS only, and the update says why.

5Stack keeps a Cloudflare API token for those updates: in the 5Stack service's encrypted secrets on your server, or in Vault at `kv/cloudflare` when the panel keeps its secrets in Vault. It's never stored as a Kubernetes Secret, so nothing running in the cluster can read it. It can read your zones, change DNS records, redirect, configuration and cache rules and zone settings, read Page Rules, and deploy the panel's Workers and their routes, nothing else.

## Add your domain to Cloudflare

After you connect Cloudflare, pick the domain the panel is on from the list of domains in your Cloudflare account, grouped by account if you belong to several. If it isn't there, add it to Cloudflare first (**Add a domain** on Cloudflare's home page), then press **Refresh**. Cloudflare imports your existing records when you add it; check that your email (MX and TXT) records came across before you switch nameservers.

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

- **On the setup page:** with Cloudflare connected, leave **Set up the stream relay Worker** checked on the Domain and DNS step. It's offered when the server has a GPU or you say on the GPU nodes step that you'll stream matches. It deploys near the end of the install, once certificates are ready.
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

A wildcard record (`*.yourdomain.com`) covers all of these, but see the note on [deeply nested subdomains](/install/cloudflare/dns-and-ssl#deeply-nested-subdomains) before using one.

## In this section

- [DNS & SSL](/install/cloudflare/dns-and-ssl), records, SSL/TLS mode, and certificate problems
- [Cloudflare Proxy](/install/cloudflare/proxy), the orange cloud when you set it up yourself
- [Cloudflare Tunnel](/install/cloudflare/tunnel), expose 5Stack without opening ports (not part of managed setup)
- [Google Tag Manager](/install/cloudflare/google-tag-manager), Google Tag Gateway
