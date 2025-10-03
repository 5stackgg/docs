# Invalid SSL

## Cloudflare

### Deeply Nested Subdomains

If you are using a deeply nested subdomain such as `*.5stack.example.com`, note that Cloudflare's free SSL certificate does **not** cover these domains. To secure deeply nested subdomains, you must purchase an SSL certificate through Cloudflare's Advanced Certificate Manager.

### Cloudflare Proxy (not to be confused with reverse proxies)

If you are using Cloudflare's proxy and **not** using a reverse proxy, the 5Stack k3s cluster will attempt to generate its own SSL certificates using Let's Encrypt.

However, when Cloudflare's proxy is enabled, it blocks direct HTTP requests to your server. This prevents Let's Encrypt from verifying your domain and issuing SSL certificates, causing certificate generation to fail.

To resolve this, disable the Cloudflare proxy. Also, ensure that any automatic HTTP to HTTPS redirects are turned off; otherwise, Let's Encrypt will still be unable to complete the verification process and the issue will persist.

## Debugging

If you are not using a reverse proxy, 5Stack generates its own SSL certificates. Occasionally, these certificates may become invalid, which can lead to SSL errors when accessing your site.

To fix this and regenerate the SSL certificates:

1. Go to your 5Stack installation directory.
2. Run `git pull` to ensure you have the latest updates.
3. Regenerate the certificates by running:

```sh
./fix-ssl.sh
```

Wait a couple of minutes, then check the status of your SSL certificates by running:

```sh
./debug.sh
```
