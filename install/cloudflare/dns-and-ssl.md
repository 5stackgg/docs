# DNS & SSL

## SSL/TLS encryption mode

In the Cloudflare dashboard, go to **SSL/TLS → Overview** and set the encryption mode to **Full**.

5Stack terminates TLS itself, so **Flexible** (Cloudflare → origin over plain HTTP) will cause redirect loops and failed logins.

## Deeply nested subdomains

If you are using a deeply nested subdomain such as `*.5stack.example.com`, note that Cloudflare's free SSL certificate does **not** cover these domains. To secure deeply nested subdomains. You must purchase an SSL certificate through Cloudflare's Advanced Certificate Manager.

Otherwise, keep 5Stack on a single-level wildcard (`*.example.com`).

## Certificate generation fails behind the Cloudflare proxy

If you are using Cloudflare's proxy and **not** using a reverse proxy, the 5Stack k3s cluster will attempt to generate its own SSL certificates using Let's Encrypt.

However, when Cloudflare's proxy is enabled. It blocks direct HTTP requests to your server. This prevents Let's Encrypt from verifying your domain and issuing SSL certificates, causing certificate generation to fail.

To resolve this use a Cloudflare Page Rule / Redirect Rule exception:

1. Go to **Rules → Redirect Rules** (or **Page Rules** if still enabled on your account)
2. Create a rule:
   - If URL path starts with `/.well-known/acme-challenge/*`
   - → Do not forward to HTTPS
3. Make sure this rule is above any global redirect

See [Cloudflare Proxy](/install/cloudflare/proxy) for the rest of the proxied setup.
