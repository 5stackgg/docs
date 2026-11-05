# Cookie Domain

The cookie domain is the domain that the cookies will be set to. This is used to secure the cookies and prevent cross-site scripting (XSS) attacks. By Default the cookie domain is set to your `WEB_DOMAIN` (e.g. `.5stack.gg`) environment variable.

To change it, set `AUTH_COOKIE_DOMAIN` on the panel server, or pick **Config → Cookie domain** in the [`5stack` menu](/service/command#the-menu):

```bash
sudo 5stack config set AUTH_COOKIE_DOMAIN=.5stack.gg
```

::: warning
The cookie domain should have a `.` infront to allow the other subdomains to be used (e.g. `.api.5stack.gg`).
:::
