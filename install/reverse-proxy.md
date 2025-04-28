# Reverse Proxy

This guide covers setting up a reverse proxy using Nginx to securely expose your services while handling SSL termination.
To properly expose your services, you'll need to set up a reverse proxy forwards to port 443 (HTTPS).

## Nginx

When setting up Nginx as a reverse proxy, make sure to listen on HTTPS (port 443) and proxy to your services.

Here's a basic Nginx configuration example:

```nginx
server {
    # Listen on HTTPS port 443
    listen 443 ssl;
    server_name your-domain.com;

    # SSL certificate configuration
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    # Proxy configuration
    location / {
        proxy_pass https://<YOUR_HOST_MACHINE_IP>:443;

        # Forward headers to the proxied server
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```
