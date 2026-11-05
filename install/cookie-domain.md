# Cookie Domain

The cookie domain is the domain the panel sets its cookies for. By default it's your panel's domain, such as `.5stack.gg`.

To change it, set `AUTH_COOKIE_DOMAIN` on the panel server, or pick **Config → Cookie domain** in the [`5stack` menu](/service/command#the-menu):

```bash
sudo 5stack config set AUTH_COOKIE_DOMAIN=.5stack.gg
```

::: warning
The cookie domain should have a `.` in front to allow the other subdomains to be used (e.g. `.api.5stack.gg`).
:::
