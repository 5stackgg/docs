# Change the Default Ports

The panel serves HTTP on port `80` and HTTPS on port `443`. If another service on the machine already uses them, set different ports on the panel server, or pick **Config → Ports** in the [`5stack` menu](/service/command#the-menu):

```bash
sudo 5stack config set HTTP_PORT=8080 HTTPS_PORT=8443
```

It shows the change, asks, and applies the panel again.

Browsers are still sent to the standard ports, so put a [reverse proxy](/install/reverse-proxy) or a port forward in front that serves `80` and `443` publicly.
