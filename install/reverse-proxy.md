# Reverse Proxy

A reverse proxy sits between your users and your backend services, forwarding requests and providing additional features such as SSL termination, load balancing, and enhanced security.

## Cloudflare

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
    ssl_certificate /path/to/cert.pem;
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
