# Reverse Proxy

A reverse proxy sits between your users and your backend services, forwarding requests and providing additional features such as SSL termination, load balancing, and enhanced security.

## Toggling the reverse proxy setting

The [setup page](/install/#answer-on-the-setup-page) asks whether a reverse proxy is in front of the server (Nginx, a Cloudflare proxied DNS record or a Cloudflare Tunnel). Answer yes if it is.

::: info Panels installed before the 5Stack service
`.5stack-env.config` is in the 5Stack-Panel checkout, on panels installed before
the 5Stack service. Run `./update.sh` there to apply a change.
:::

To change it later, edit `INSTALL_DIR/.5stack-env.config` and set:

```env
REVERSE_PROXY=false
```

Use `true` if you front the panel with Nginx or Cloudflare's orange-cloud DNS, `false` if traffic reaches the panel directly.

After saving, re-run `./update.sh` so the new value is applied.

## Forward to HTTPS on 443

Point your proxy at the node over HTTPS on port 443 (or your `HTTPS_PORT`), not plain HTTP on 80. The panel's login cookie is only set over HTTPS, so through port 80 nobody can stay signed in. With `REVERSE_PROXY=true` the node answers 443 with a self-signed certificate of its own, so turn off certificate verification for this upstream if your proxy does it (Nginx doesn't by default).

## Cloudflare

Cloudflare acts as a reverse proxy when you enable "Proxied" DNS (the orange cloud), and a [Cloudflare Tunnel](/install/cloudflare/tunnel) does the same. Both need `REVERSE_PROXY=true`.

Cloudflare has its own setup requirements. See the [Cloudflare](/install/cloudflare/) section.

## Nginx Proxy

To use Nginx as a reverse proxy, configure it to listen on HTTPS (port 443) and forward requests to your backend services.

Below is a basic Nginx configuration example:

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
    }
}
```
