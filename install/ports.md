# Change the Default Ports

The panel serves HTTP on port `80` and HTTPS on port `443`. If another service on the machine already uses them, set different ports in `<INSTALL_DIR>/overlays/config/traefik-config.env`:

```env
HTTP_PORT=8080
HTTPS_PORT=8443
```

Then run `./update.sh` to apply them.

Browsers are still sent to the standard ports: the HTTP to HTTPS redirect and every link the panel builds use the bare domain. Put a [reverse proxy](/install/reverse-proxy) or a port forward in front that serves `80` and `443` publicly.

Installs from before the panel moved to Traefik kept these settings in `overlays/config/nginx-config.env`. `update.sh` renames that file for you.
