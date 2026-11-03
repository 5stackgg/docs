# Cloudflare Proxy

Cloudflare acts as a reverse proxy when you enable **Proxied** DNS (the orange cloud). Incoming traffic to your domain first passes through Cloudflare before reaching your server, providing DDoS protection and performance benefits.

With setup managed by 5Stack, all of this page is done for you. See [Which setup do I want?](/install/cloudflare/#which-setup-do-i-want).

## Keep the panel's own certificates

The orange cloud doesn't need reverse proxy mode. Answer **Straight to this server** on the setup page, as with the grey cloud: the panel keeps getting its own Let's Encrypt certificates, and Cloudflare checks them with SSL/TLS **Full (strict)**.

[Reverse proxy mode](/install/reverse-proxy) is the alternative, for when something else terminates HTTPS in front of the panel. The panel then serves a certificate of its own and never asks Let's Encrypt, and Cloudflare must be on **Full**, not Full (strict).

## Let's Encrypt behind the orange cloud

Let's Encrypt checks your domain over plain HTTP, through Cloudflare. Send plain HTTP to HTTPS with a Redirect Rule that leaves `/.well-known/acme-challenge/` out, and turn off **Always Use HTTPS** (SSL/TLS → Edge Certificates), which the rule replaces. The steps are in [Certificate generation fails behind the Cloudflare proxy](/install/cloudflare/dns-and-ssl#certificate-generation-fails-behind-the-cloudflare-proxy).

## Keep demo uploads off the proxy

Leave `demos.yourdomain.com` **DNS only** (grey cloud). Game servers upload whole demos there in one request, which can be larger than Cloudflare's 100 MB upload limit on the Free and Pro plans.

Leave `hls.yourdomain.com` **DNS only** too. Cloudflare's CDN terms on the Free, Pro and Business plans don't allow serving video through the proxy; the [stream relay Worker](/install/cloudflare/#streams-and-the-stream-relay-worker) is the way to put streams behind Cloudflare.

## WebSockets

`ws.yourdomain.com` must be able to upgrade connections. Cloudflare enables WebSockets by default (**Network → WebSockets**); if live match data or chat never connects, confirm it is still on.

## Bot Fight Mode

Turn **Bot Fight Mode** off (Security → Bots). It challenges the game servers and the 5Stack service when they talk to the panel, and they can't answer a challenge.

## Ports

Cloudflare's proxy only forwards a [fixed set of ports](https://developers.cloudflare.com/fundamentals/reference/network-ports/). If you [changed the default 80/443 ports](/install/ports), the proxy will not reach your panel. Use a [Cloudflare Tunnel](/install/cloudflare/tunnel) or DNS-only records instead.
