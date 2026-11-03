# Cloudflare

If your domain's DNS is on Cloudflare, 5Stack can set Cloudflare up for you: the DNS records, Cloudflare's proxy, HTTPS and certificates. On the setup page, **Connect Cloudflare** on the Domain and DNS step does all of it with one approval. On a panel installed from the git checkout, `./cloudflare.sh` does the same.

## Which setup do I want?

| Setup | What you get | What you do | Free plan |
|---|---|---|---|
| **Managed by 5Stack** (recommended) | Cloudflare's proxy (orange cloud) in front of the panel, HTTPS Full (strict), and certificates renewed through Cloudflare DNS. Demo uploads go straight to your server. | Connect Cloudflare on the setup page, or run `./cloudflare.sh`. Nothing else. | Only names Cloudflare's free certificate covers are proxied; see [nested subdomains](/install/cloudflare/dns-and-ssl#deeply-nested-subdomains) |
| **DNS only** (grey cloud) | Visitors reach your server directly. The panel gets its own Let's Encrypt certificates. | Point the records at your server, keep the cloud grey, and open ports 80 and 443. | Works at any depth |
| **Proxy you set up yourself** | The orange cloud with the panel's own certificates | The [one Cloudflare setting](/install/cloudflare/proxy#let-s-encrypt-behind-the-orange-cloud) Let's Encrypt needs, and SSL/TLS Full (strict) | Same limit as managed |
| **Your own reverse proxy** | Nginx, Caddy or a [Cloudflare Tunnel](/install/cloudflare/tunnel) in front, terminating HTTPS | [Reverse proxy mode](/install/reverse-proxy). The panel serves its own certificate and never asks Let's Encrypt. | Same limit when Cloudflare proxies |

## What managed setup does

- Adds an A record (and AAAA when the server has IPv6) for each panel address, pointing at your server. Records 5Stack made carry the comment `5stack-panel (managed by update.sh)`. Records someone else made are shown first and only replaced after you say yes. Email and other records are left alone.
- Proxies every address except demo uploads (`demos.`), which can be larger than Cloudflare's 100 MB upload limit, and TURN, which isn't HTTP. Addresses a Cloudflare Worker answers, like the [Backblaze proxy](/advanced/s3/backblaze), are never touched.
- Adds one Configuration Rule for the panel's addresses: SSL/TLS Full (strict), with Rocket Loader, Email Obfuscation, Zaraz and Browser Integrity Check off. Adds one Cache Rule so the API, live updates, search, the relay and streams are never cached. Your other rules stay as they are.
- Proves your domain to Let's Encrypt through Cloudflare DNS, so nothing has to be let through for certificates.
- Stops and tells you when Bot Fight Mode is on, because it blocks game servers talking to the panel, or when WebSockets are off.
- Puts the records back the way it left them on every update, and turns the proxy on only once the panel has its certificates. An address Cloudflare can't reach goes back to DNS only.

5Stack keeps a Cloudflare API token on your server for those updates and certificate renewals. It can read your zones and change DNS records, rules and zone settings, nothing else.

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
- [Cloudflare Tunnel](/install/cloudflare/tunnel), expose 5Stack without opening ports
- [Google Tag Manager](/install/cloudflare/google-tag-manager), Google Tag Gateway
