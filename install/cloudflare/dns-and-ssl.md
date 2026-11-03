# DNS & SSL

New to Cloudflare with 5Stack? Start with [Which setup do I want?](/install/cloudflare/#which-setup-do-i-want). With setup managed by 5Stack, everything on this page is done for you.

## SSL/TLS encryption mode

In the Cloudflare dashboard, go to **SSL/TLS → Overview** and set the encryption mode to **Full (strict)**. Cloudflare then checks the certificate your server presents. Before the panel has its first certificate, **Full** also works.

5Stack terminates TLS itself, so **Flexible** (Cloudflare → origin over plain HTTP) will cause redirect loops and failed logins.

Managed setup sets Full (strict) with a Configuration Rule for the panel's addresses only, so other sites on the same domain keep their own mode.

## Deeply nested subdomains

If you are using a deeply nested subdomain such as `*.5stack.example.com`, note that Cloudflare's free SSL certificate does **not** cover these domains. It covers your domain and one level below it (`example.com` and `*.example.com`). To secure deeply nested subdomains, you must purchase an SSL certificate through Cloudflare's Advanced Certificate Manager.

Otherwise, keep 5Stack on a single-level wildcard (`*.example.com`), or keep the deeper names DNS only (grey cloud). Managed setup does the second for you: a name the certificate doesn't cover goes straight to your server.

### Keep every address one level deep

A panel at `panel.example.com` can name its other addresses beside it instead of under it, so the free certificate covers them all:

| Address | Under the panel | One level deep |
| --- | --- | --- |
| API | `api.panel.example.com` | `panel-api.example.com` |
| Live updates | `ws.panel.example.com` | `panel-ws.example.com` |
| Match relay | `tv.panel.example.com` | `panel-tv.example.com` |
| Demo uploads | `demos.panel.example.com` | `panel-demos.example.com` |
| Streams | `hls.panel.example.com` | `panel-hls.example.com` |
| File storage console | `console.panel.example.com` | `panel-console.example.com` |
| Search | `search.panel.example.com` | `panel-search.example.com` |

When the panel's domain is one level below its zone and the DNS is on Cloudflare, the setup page asks **Which Cloudflare plan is example.com on?** If you connected Cloudflare, it doesn't ask: it moves the addresses when your zone's certificate doesn't cover the deeper names.

- **Free:** every address moves one level deep, and an alert lists the new names. Untick **Keep every address one level deep** to keep them under the panel; they then go straight to your server, without Cloudflare's proxy.
- **Pro or Higher:** the addresses stay under the panel. You can still tick the checkbox yourself.

A domain at its zone's root never needs this. The classic installer asks the same plan question. Without managed Cloudflare, create DNS records for the names in the last column.

::: warning Sign-in cookie
The panel and its API then share only `example.com`, so the sign-in cookie is set for all of `example.com`. Every other site on `example.com` receives the panel's sign-in cookie. Pick this only if you trust every site on that domain, or give the panel a domain of its own.
:::

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
