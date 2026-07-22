# Command Line Arguments

While running the installation or update script, you can pass the following options to the script to configure the installation.

## Kubeconfig Location

You may wish to specify the location of your kubeconfig file.

```bash
./update --kubeconfig $HOME/.kube/config
```

## Debug mode

```bash
./update.sh -- debug
```

## Non-interactive answers

The installer asks whether your DNS is managed by Cloudflare and whether traffic reaches
the panel through a proxy. Pass either answer up front to skip the prompt:

```bash
./install.sh --cloudflare=y --reverse-proxy=y
```

Both accept `y`/`n` (`1`/`0`). `--reverse-proxy=y` sets `REVERSE_PROXY=true` — use it for
Nginx, the [Cloudflare proxy](/install/cloudflare/proxy), or a
[Cloudflare Tunnel](/install/cloudflare/tunnel). Answers are stored in
`INSTALL_DIR/.5stack-env.config`.
