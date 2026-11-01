# Cloudflare Proxy

Cloudflare acts as a reverse proxy when you enable **Proxied** DNS (the orange cloud). Incoming traffic to your domain first passes through Cloudflare before reaching your server, providing DDoS protection and performance benefits.

## Tell 5Stack it is behind a proxy

The [setup page](/install/#answer-on-the-setup-page) asks how visitors reach the server. If your DNS records are proxied, pick **Cloudflare proxy or Tunnel**.

To set it later, run this on the panel server, or pick **Config → Reverse proxy** in the [`5stack` menu](/service/command#the-menu):

```bash
sudo 5stack config set REVERSE_PROXY=true
```

See [Reverse Proxy](/install/reverse-proxy) for details.

## Allow Let's Encrypt through

The proxy blocks the HTTP challenge Let's Encrypt uses to issue certificates. Add a redirect rule exception for `/.well-known/acme-challenge/*`. See [DNS & SSL](/install/cloudflare/dns-and-ssl#certificate-generation-fails-behind-the-cloudflare-proxy).

## WebSockets

`ws.yourdomain.com` must be able to upgrade connections. Cloudflare enables WebSockets by default (**Network → WebSockets**); if live match data or chat never connects, confirm it is still on.

## Ports

Cloudflare's proxy only forwards a [fixed set of ports](https://developers.cloudflare.com/fundamentals/reference/network-ports/). If you [changed the default 80/443 ports](/install/ports), the proxy will not reach your panel. Use a [Cloudflare Tunnel](/install/cloudflare/tunnel) or DNS-only records instead.
