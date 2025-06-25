# Cookie Domain

The cookie domain is the domain that the cookies will be set to. This is used to secure the cookies and prevent cross-site scripting (XSS) attacks. By Default the cookie domain is set to your `WEB_DOMAIN` (e.g. `.5stack.gg`) environment variable.

This can be changed by setting the `AUTH_COOKIE_DOMAIN` environment variable which you can set in the `<INSTALL_DIR>/overlays/config/api-config.env` file.

::: warning
The cookie domain should have a `.` infront to allow the other subdomains to be used (e.g. `.api.5stack.gg`).
:::
