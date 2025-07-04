# Invalid SSL

## Reverse Proxy Enabled

### Cloudflare

If you are using a deeply nested subdomain such as `*.5stack.example.com`, Cloudflare's free SSL certificate does not cover these domains. You must purchase an SSL certificate using their Advanced Certificate Manager.

## Not Using a Reverse Proxy (5Stack-Generated SSL Certificates)

If you are not using a reverse proxy, 5Stack generates its own SSL certificates. Occasionally, these certificates may become invalid, which can lead to SSL errors when accessing your site.

To resolve this issue and regenerate the SSL certificates:

1. Go to your 5Stack installation directory.
2. Run `git pull` to ensure you have the latest updates.
3. Regenerate the certificates by running:
   ```sh
   ./fix-ssl.sh
   ```
