# DNS & SSL

New to Cloudflare with 5Stack? Start with [Which setup do I want?](/install/cloudflare/#which-setup-do-i-want). With setup managed by 5Stack, everything on this page is done for you.

## SSL/TLS encryption mode

In the Cloudflare dashboard, go to **SSL/TLS → Overview** and set the encryption mode to **Full (strict)**. Cloudflare then checks the certificate your server presents. Before the panel has its first certificate, **Full** also works.

5Stack terminates TLS itself, so **Flexible** (Cloudflare → origin over plain HTTP) will cause redirect loops and failed logins.

Managed setup sets Full (strict) with a Configuration Rule for the panel's addresses only, so other sites on the same domain keep their own mode.

## Deeply nested subdomains

If you are using a deeply nested subdomain such as `*.5stack.example.com`, note that Cloudflare's free SSL certificate does **not** cover these domains. It covers your domain and one level below it (`example.com` and `*.example.com`). To secure deeply nested subdomains, you must purchase an SSL certificate through Cloudflare's Advanced Certificate Manager.

Otherwise, keep 5Stack on a single-level wildcard (`*.example.com`), or keep the deeper names DNS only (grey cloud). Managed setup does the second for you: a name the certificate doesn't cover goes straight to your server.

## Certificate generation fails behind the Cloudflare proxy

With the orange cloud, Let's Encrypt checks your domain over plain HTTP, through Cloudflare, at `http://yourdomain.com/.well-known/acme-challenge/…`. With SSL/TLS **Full** or **Full (strict)**, Cloudflare passes a plain HTTP request to your server as plain HTTP, and the panel answers the check itself. What breaks it is a redirect or a challenge at Cloudflare:

- **Always Use HTTPS** (SSL/TLS → Edge Certificates) sends every plain HTTP request to HTTPS before it reaches your server. Cloudflare can't turn it off for one path, so turn it off. The panel already sends visitors to HTTPS itself, everywhere except the Let's Encrypt check. If other sites on the same domain rely on it, give them a Redirect Rule to HTTPS instead.
- A **Redirect Rule** or **Page Rule** that sends HTTP to HTTPS for the panel's addresses has the same effect. Leave `/.well-known/acme-challenge/` out of its match.
- **Under Attack mode** or a WAF challenge on the panel's addresses can block the check too.

With setup managed by 5Stack, none of this applies: certificates are proved through Cloudflare DNS instead.

See [Cloudflare Proxy](/install/cloudflare/proxy) for the rest of the proxied setup.
