# Reverse Proxy

Use reverse proxy mode when something in front of your panel, such as Nginx Proxy Manager, Caddy or a Cloudflare Tunnel, holds the HTTPS certificate and forwards to it.

## Turning reverse proxy mode on

On the [setup page](/install/#answer-on-the-setup-page), the **Reverse proxy** step picks an answer for you: **No** when port 80 reaches this server, **Yes** when something else answers, such as Nginx Proxy Manager. Change it if that's wrong.

Ticking **Proxied by Cloudflare (orange cloud)** for records you manage, on the Domain and DNS step, turns reverse proxy mode on too. See [Cloudflare](#cloudflare).

In reverse proxy mode your proxy holds the certificate visitors see, and the panel doesn't ask Let's Encrypt for one.

To change it later, run this on the panel server, or pick **Config → Reverse proxy** in the [`5stack` menu](/service/command#the-menu):

```bash
sudo 5stack config set REVERSE_PROXY=true
```

Use `true` if a proxy in front of the panel ends HTTPS for it, `false` if traffic reaches the panel directly. It shows the change, asks, and applies the panel again.

## Settings for your proxy

When you answer **Yes**, the setup page shows the settings for your proxy, with this server's address filled in:

1. Forward all 8 addresses from the Domain and DNS step to `https://<this server's LAN IP>:443`, with websockets on.
2. Add these lines:

```nginx
# forward to https://<this server's LAN IP>:443 with websockets on
proxy_read_timeout 7d;
proxy_send_timeout 7d;
client_max_body_size 5G;
proxy_buffering off;
proxy_request_buffering off;
```

### Nginx Proxy Manager

Add a proxy host with all 8 addresses as its domain names, or one per address, with scheme `https`, this server's LAN IP as the forward hostname, port `443`, and **Websockets Support** on. Paste the lines above on its **Advanced** tab. Its **SSL** tab holds the certificate visitors see.

## Forward to HTTPS on 443

Point your proxy at the panel server over HTTPS on port 443 (or your `HTTPS_PORT`), not plain HTTP on 80. Through port 80 nobody can stay signed in. The panel answers with a self-signed certificate of its own, so turn off certificate verification for this upstream if your proxy does it (Nginx doesn't by default).

## Cloudflare

Cloudflare's orange cloud on records you manage puts the panel in reverse proxy mode: the setup page turns it on when you tick **Proxied by Cloudflare (orange cloud)**. Set SSL/TLS to **Full**, or **Full (strict)** if your own proxy in front of the panel holds valid certificates. See [Cloudflare Proxy](/install/cloudflare/proxy).

With **Cloudflare · 5Stack sets it up**, the orange cloud doesn't need reverse proxy mode: the panel keeps its own Let's Encrypt certificates behind it. Answer **Yes** on the Reverse proxy step only when your own proxy, or a [Cloudflare Tunnel](/install/cloudflare/tunnel), is in front of the panel as well.

See [Which setup do I want?](/install/cloudflare/#which-setup-do-i-want).

## Nginx Proxy

A basic Nginx configuration, listening on HTTPS and forwarding to the panel server:

```nginx
server {
    # Listen on HTTPS port 443
    listen 443 ssl;
    server_name your-domain.com *.your-domain.com;

    # SSL certificate configuration
    ssl_certificate /path/to/fullchain.pem;
    ssl_certificate_key /path/to/key.pem;

    # Proxy configuration
    location / {
        proxy_pass https://<YOUR_HOST_MACHINE_IP>:443;

        # Standard proxy headers
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # WebSocket support
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        # Settings for your proxy, from the setup page
        proxy_read_timeout 7d;
        proxy_send_timeout 7d;
        client_max_body_size 5G;
        proxy_buffering off;
        proxy_request_buffering off;
    }
}
```
