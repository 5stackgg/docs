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

With the orange cloud, Let's Encrypt checks your domain over plain HTTP, through Cloudflare, at `http://yourdomain.com/.well-known/acme-challenge/…`. With SSL/TLS **Full** or **Full (strict)**, Cloudflare passes a plain HTTP request to your server as plain HTTP, and the panel answers the check itself. The panel sends every other plain HTTP request to HTTPS on its own.

What breaks it is a redirect or a challenge at Cloudflare. Send plain HTTP to HTTPS with a Redirect Rule that lets the check through, instead of **Always Use HTTPS**:

1. In the Cloudflare dashboard, go to **Rules → Overview**, then **Create rule → Redirect Rule**.
2. Under **When incoming requests match**, choose **Custom filter expression**, then **Edit expression**, and enter:

   ```
   (not ssl and not starts_with(http.request.uri.path, "/.well-known/acme-challenge/"))
   ```

3. Under **Then**, make the target URL dynamic with `concat("https://", http.host, http.request.uri.path)`, set the status code to **301**, turn **Preserve query string** on, and select **Deploy**.
4. Turn off **Always Use HTTPS** (SSL/TLS → Edge Certificates). The rule replaces it, and Always Use HTTPS redirects every plain HTTP request, the check included.

Also check:

- Any other Redirect Rule or Page Rule that sends HTTP to HTTPS for the panel's addresses leaves `/.well-known/acme-challenge/` out. A Page Rule can't leave one path out, so replace it with a Redirect Rule like the one above.
- **Under Attack mode** and WAF rules that challenge visitors leave `/.well-known/acme-challenge/` alone, because Let's Encrypt can't answer a challenge.

To test it, open `http://yourdomain.com/.well-known/acme-challenge/5stack-check`. The panel answers it itself, with an `X-5Stack-Check: acme-path` header; a redirect to `https://` means Cloudflare is still sending the check away.

With setup managed by 5Stack, all of this is done for you: it creates this rule for the panel, turns Always Use HTTPS off, keeps challenges off the check's path, and only turns the proxy on for an address once the check gets through.

See [Cloudflare Proxy](/install/cloudflare/proxy) for the rest of the proxied setup.
