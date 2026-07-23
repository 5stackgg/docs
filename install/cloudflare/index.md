# Cloudflare

If your domain's DNS is managed by Cloudflare. There are a few 5Stack specific settings you need to get right. Cloudflare sits in front of your panel and can interfere with certificate generation, WebSockets, and login if it isn't configured correctly.

Pick the setup that matches how you want traffic to reach your server:

| Setup | When to use it | Guide |
|---|---|---|
| **DNS only** (grey cloud) | Your server is reachable from the internet on ports 80/443. Simplest option. | [DNS & SSL](/install/cloudflare/dns-and-ssl) |
| **Proxied** (orange cloud) | You want Cloudflare's DDoS protection and caching in front of the panel. | [Cloudflare Proxy](/install/cloudflare/proxy) |
| **Cloudflare Tunnel** | You can't (or don't want to) open inbound firewall ports. | [Cloudflare Tunnel](/install/cloudflare/tunnel) |

## Required settings

Regardless of which setup you choose:

- **SSL/TLS encryption mode** must be set to **Full** (or **Full (strict)** only if Cloudflare can validate your origin certificate). Under **Flexible**, Cloudflare talks to your origin over HTTP and 5Stack will end up in a redirect loop.
- 5Stack provisions several subdomains, make sure each one resolves to your server:

| Subdomain | Purpose |
|---|---|
| `yourdomain.com` | Panel |
| `api.yourdomain.com` | API |
| `ws.yourdomain.com` | WebSockets |
| `demos.yourdomain.com` | Demo downloads |
| `search.yourdomain.com` | Search |
| `console.yourdomain.com` | Console |
| `inventory.yourdomain.com` | Inventory |

A wildcard record (`*.yourdomain.com`) covers all of these, but see the note on [deeply nested subdomains](/install/cloudflare/dns-and-ssl#deeply-nested-subdomains) before using one.

## In this section

- [DNS & SSL](/install/cloudflare/dns-and-ssl), records, SSL/TLS mode, and certificate problems
- [Cloudflare Proxy](/install/cloudflare/proxy), using the orange cloud in front of 5Stack
- [Cloudflare Tunnel](/install/cloudflare/tunnel), expose 5Stack without opening ports
- [Google Tag Manager](/install/cloudflare/google-tag-manager), Google Tag Gateway
