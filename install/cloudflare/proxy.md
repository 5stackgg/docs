# Cloudflare Proxy

Cloudflare acts as a reverse proxy when you turn on **Proxied** DNS (the orange cloud): traffic to your domain passes through Cloudflare before it reaches your server.

With setup managed by 5Stack, all of this page is done for you. See [Which setup do I want?](/install/cloudflare/#which-setup-do-i-want).

## Tell 5Stack it is behind a proxy

On the [setup page](/install/#answer-on-the-setup-page), pick **Cloudflare · I manage the records** on the Domain and DNS step and tick **Proxied by Cloudflare (orange cloud)**. The panel then runs in [reverse proxy mode](/install/reverse-proxy), and Cloudflare holds the certificate visitors see. Set SSL/TLS to **Full** in Cloudflare. **Full (strict)** only works when something in front of the panel, like your own reverse proxy, holds a valid certificate for every address.

To set it later, run this on the panel server, or pick **Config → Reverse proxy** in the [`5stack` menu](/service/command#the-menu):

```bash
sudo 5stack config set REVERSE_PROXY=true
```

To keep the panel's own Let's Encrypt certificates behind the orange cloud, with **Full (strict)**, pick **Cloudflare · 5Stack sets it up** instead. It sets up everything Let's Encrypt needs through the proxy. If you do it by hand, the steps are in [Certificate generation fails behind the Cloudflare proxy](/install/cloudflare/dns-and-ssl#certificate-generation-fails-behind-the-cloudflare-proxy).

## Keep demo uploads off the proxy

Leave `demos.yourdomain.com` **DNS only** (grey cloud). Game servers upload whole demos there in one request, which can be larger than Cloudflare's 100 MB upload limit on the Free and Pro plans.

Leave `hls.yourdomain.com` **DNS only** too. Cloudflare's CDN terms on the Free, Pro and Business plans don't allow serving video through the proxy; the [stream relay Worker](/install/cloudflare/#streams-and-the-stream-relay-worker) is the way to put streams behind Cloudflare.

## WebSockets

`ws.yourdomain.com` must be able to upgrade connections. Cloudflare enables WebSockets by default (**Network → WebSockets**); if live match data or chat never connects, confirm it is still on.

## Bot Fight Mode

Turn **Bot Fight Mode** off (Security → Bots). It challenges the game servers and the 5Stack service when they talk to the panel, and they can't answer a challenge.

## Ports

Cloudflare's proxy only forwards a [fixed set of ports](https://developers.cloudflare.com/fundamentals/reference/network-ports/). If you [changed the default 80/443 ports](/install/ports), the proxy will not reach your panel. Use a [Cloudflare Tunnel](/install/cloudflare/tunnel) or DNS-only records instead.
