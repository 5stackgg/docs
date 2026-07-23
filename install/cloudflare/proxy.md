# Cloudflare Proxy

Cloudflare acts as a reverse proxy when you enable **Proxied** DNS (the orange cloud). Incoming traffic to your domain first passes through Cloudflare before reaching your server, providing DDoS protection and performance benefits.

## Tell 5Stack it is behind a proxy

The installer asks whether you're using a reverse proxy. If your DNS records are proxied, answer **yes**, or set it later in `INSTALL_DIR/.5stack-env.config`:

```env
REVERSE_PROXY=true
```

Re-run `./update.sh` after changing it. See [Reverse Proxy](/install/reverse-proxy) for details.

## Allow Let's Encrypt through

The proxy blocks the HTTP challenge Let's Encrypt uses to issue certificates. Add a redirect rule exception for `/.well-known/acme-challenge/*`. See [DNS & SSL](/install/cloudflare/dns-and-ssl#certificate-generation-fails-behind-the-cloudflare-proxy).

## WebSockets

`ws.yourdomain.com` must be able to upgrade connections. Cloudflare enables WebSockets by default (**Network → WebSockets**); if live match data or chat never connects, confirm it is still on.

## Ports

Cloudflare's proxy only forwards a [fixed set of ports](https://developers.cloudflare.com/fundamentals/reference/network-ports/). If you [changed the default 80/443 ports](/install/nginx). The proxy will not reach your panel. Use a [Cloudflare Tunnel](/install/cloudflare/tunnel) or DNS-only records instead.
