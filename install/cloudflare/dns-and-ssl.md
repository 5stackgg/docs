# DNS & SSL

New to Cloudflare with 5Stack? Start with [Which setup do I want?](/install/cloudflare/#which-setup-do-i-want). With setup managed by 5Stack, everything on this page is done for you.

## SSL/TLS encryption mode

In the Cloudflare dashboard, go to **SSL/TLS → Overview** and set the encryption mode:

- **Full (strict)** when the panel keeps its own Let's Encrypt certificates, or your own reverse proxy in front of it holds valid ones. Cloudflare then checks the certificate your server presents. Before the panel has its first certificate, **Full** also works.
- **Full** for the orange cloud on records you manage, with nothing else in front of the panel. The setup page then runs the panel in [reverse proxy mode](/install/reverse-proxy), and the panel answers HTTPS with a self-signed certificate of its own, which Full (strict) refuses.

Don't use **Flexible** (Cloudflare → origin over plain HTTP). It causes redirect loops and failed logins.

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

For a panel below its domain's root, the setup page ticks **Keep every address one level deep** for you, wherever its DNS is. The box is on the Domain and DNS step, or on the Cloudflare step when 5Stack sets Cloudflare up. Its info icon lists the new names.

- On Cloudflare's **Free** plan it's marked **Recommended on Free**, because the free certificate covers only one level below your domain.
- On **Pro or higher**, your plan can cover deeper addresses, so keeping them one level deep is up to you. The box stays ticked until you untick it.
- Untick it to keep `api.panel.example.com` and the other addresses under the panel. On the free plan, Cloudflare then leaves them straight to your server, without its proxy.

When the panel is one level below a domain on Cloudflare and your server hasn't read the domain's plan from Cloudflare yet, the page asks **Which Cloudflare plan is example.com on?**, with **Free** picked. Once Cloudflare is connected, the plan comes from Cloudflare and the page doesn't ask. Once 5Stack has set Cloudflare up, disconnect Cloudflare to change the box.

A domain at its zone's root never needs this. In the terminal, the Domain and DNS step asks whether to keep every address one level deep, with yes picked. Without managed Cloudflare, create DNS records for the names in the last column.

::: warning Sign-in cookie
The panel and its API then share only `example.com`, so the sign-in cookie is set for all of `example.com`. Every other site on `example.com` receives the panel's sign-in cookie. Pick this only if you trust every site on that domain, or give the panel a domain of its own.
:::

## Certificate generation fails behind the Cloudflare proxy

This is for a panel that keeps its own Let's Encrypt certificates behind the orange cloud. Managed setup does all of it for you. With the orange cloud on records you manage, the setup page turns reverse proxy mode on and the panel asks Let's Encrypt for nothing, so you need these steps only if you turned reverse proxy mode off yourself.

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

With setup managed by 5Stack, all of this is done for you: it creates this rule for the panel, turns Always Use HTTPS off, and keeps challenges off the check's path. On every update, an address where the check doesn't get through goes back to DNS only, and the update says why.

See [Cloudflare Proxy](/install/cloudflare/proxy) for the rest of the proxied setup.
