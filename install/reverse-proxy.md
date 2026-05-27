# Reverse Proxy

A reverse proxy sits between your users and your backend services, forwarding requests and providing additional features such as SSL termination, load balancing, and enhanced security.

## Toggling the reverse proxy setting

The installer asks whether you're using a reverse proxy (Nginx or a Cloudflare proxied DNS record) and stores the answer in `INSTALL_DIR/.5stack-env.config`.

To change it later, edit that file and set:

```env
REVERSE_PROXY=false
```

Use `true` if you front the panel with Nginx or Cloudflare's orange-cloud DNS, `false` if traffic reaches the panel directly.

After saving, re-run `./update.sh` so the new value is applied.

## Cloudflare Proxies

Cloudflare acts as a reverse proxy when you enable the "Proxied" DNS (orange cloud). Incoming traffic to your domain first passes through Cloudflare before reaching your server, providing DDoS protection and performance benefits.

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
