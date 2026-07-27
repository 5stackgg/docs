# One-Command Install

A plugin is a static build, so it can be hosted anywhere — see
[Deploying](/plugins/deploying). This page is about the other option: shipping
your plugin so an operator can install it **onto the 5Stack cluster itself**
with one command, from your repository, without reading your README.

```sh
./plugin.sh https://github.com/5stackgg/5stack-example-plugin
```

Run from their `5stack-panel` checkout. Also accepts an `owner/repo` shorthand,
or a local directory while you're developing.

```sh
./plugin.sh list                  # what's installed
./plugin.sh remove hello          # take it back off the cluster
```

## Why it doesn't ask questions

Everything an install needs, the operator already told the panel once. Asking
again is how sites get a plugin on the wrong cluster, or a certificate for a
domain that isn't theirs. So the installer reads:

| Source | What it settles |
| --- | --- |
| `.5stack-env.config` → `KUBECONFIG` | which cluster |
| `.5stack-env.config` → `REVERSE_PROXY` | **whether your plugin needs its own certificate** |
| `overlays/config/api-config.env` → `WEB_DOMAIN` | their domain, so your host defaults to `<prefix>.<their domain>` |
| the cluster's Postgres secret | your `DATABASE_URL`, if you asked for one |
| the node label | which node a node-bound plugin already lives on |

`REVERSE_PROXY` is the load-bearing one. It is the operator's own answer to "is
TLS terminated in front of the cluster", which is exactly the question that
decides which of your two installs to apply.

Every value can still be overridden: `--domain`, `--node`, `--database-url`,
`--kubeconfig`, `--tls` / `--no-tls`. `--dry-run` prints the manifests and
applies nothing. `-y` takes every default, for unattended installs.

Re-running upgrades in place. The plugin's code is replaced; its `.env` files —
the operator's domain, their database password — are kept.

## What you ship

### 1. An `install` block in your manifest

Same [`5stack-plugin.json`](/plugins/manifest) the panel already detects. Add an
`install` object and your plugin becomes installable; leave it out and the
installer will tell the operator to host your build themselves.

```json
{
  "name": "Hello World",
  "slug": "hello",
  "remoteEntry": "/assets/remoteEntry.js",
  "scope": "hello",
  "module": "./App",
  "deployments": ["example-plugin"],

  "install": {
    "overlays": {
      "http": "k8s/overlays/http",
      "https": "k8s/overlays/https"
    },
    "certificate": "example-plugin-ssl",
    "domain": {
      "prefix": "hello",
      "var": "EXAMPLE_PLUGIN_DOMAIN",
      "file": "k8s/base/example-plugin.env"
    }
  }
}
```

| Field | Required | Meaning |
| --- | --- | --- |
| `install.overlays.http` | ✓ | Path to the kustomize overlay with no certificate. |
| `install.overlays.https` | | The cert-manager overlay. Omit if your plugin has no TLS variant; the HTTP one is used either way. |
| `install.certificate` | | Name of the `Certificate` the https overlay declares. Only used to tell the operator what to watch. |
| `install.domain.var` | | Env var to write the chosen host into. |
| `install.domain.file` | | The env file to write it to, repo-relative. |
| `install.domain.prefix` | | Subdomain to default to. Defaults to your `slug`. |
| `install.database.var` / `.file` | | Ask for a Postgres URL and write it here. Its presence is the opt-in. |
| `install.node.label` | | Node label your workloads pin to. Its presence means "this plugin is node-bound" and the operator gets asked which node. |
| `deployments` | | Top-level, already part of the manifest. What to wait on after applying. |

Two of these are switches rather than settings: a plugin with no
`install.database` is never asked about Postgres, and one with no `install.node`
is never asked about nodes. Only claim what you actually need.

::: tip Node label naming
Use `5stack-<slug>`. That's what the panel's `./custom.sh` derives from a
`custom/<slug>/` directory, so a plugin installed either way lands on the same
node.
:::

### 2. A kustomize package in three parts

```
k8s/
  kustomization.yaml     # shim pointing at overlays/http, for ./custom.sh
  base/                  # everything, HTTP-only, with the env files
  overlays/http/         # base, unchanged — TLS terminated upstream
  overlays/https/        # base + Certificate + tls patch — cert-manager
```

**Two overlays, not one with a flag.** An operator behind Cloudflare and an
operator terminating TLS at nginx need genuinely different manifests, and the
difference is a whole resource — a `Certificate` — not a value. Two directories
also means either install is a plain `kustomize build` of a real directory,
readable and appliable by hand without the installer.

The rules the layout has to hold to:

**The base is the HTTP install.** No `tls:`, no certificate. The https overlay
only ever *adds*. A base that needed TLS stripped back out would break the
moment someone built it directly.

**The host comes from one place.** A `configMapGenerator` reads your env file,
and kustomize `replacements` push that one value into the ingress rule (base),
the tls SNI host and the certificate's SANs (https overlay). A certificate
covering a different host than the ingress routes is a long debugging session;
making it structurally impossible costs nothing.

```yaml
# overlays/https/kustomization.yaml
replacements:
  - source:
      kind: ConfigMap
      name: example-plugin-config
      fieldPath: data.EXAMPLE_PLUGIN_DOMAIN
    targets:
      - select: { kind: Ingress, name: example-plugin }
        fieldPaths: [spec.tls.0.hosts.0]
      - select: { kind: Certificate, name: example-plugin-ssl }
        fieldPaths: [spec.dnsNames.0]
```

**Your own `Certificate`, not an entry in the panel's.** The panel rebuilds its
shared `5stack-ssl` cert from its own overlay on every `./update.sh`, so
anything a plugin added there is dropped on the next panel update.

```yaml
# overlays/https/certificate.yaml
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: example-plugin-ssl
  namespace: 5stack
spec:
  secretName: example-plugin-ssl
  duration: 2160h
  renewBefore: 240h
  dnsNames:
    - ${EXAMPLE_PLUGIN_DOMAIN}
  issuerRef:
    name: 5stack-issuer
    kind: Issuer
```

`5stack-issuer` is the namespaced `Issuer` the panel install creates when the
site terminates TLS itself. The installer checks it exists and warns if not.

::: warning Declare the Certificate, don't annotate the Ingress
Reference the secret from your ingress' `tls:` block and stop there. Adding a
`cert-manager.io/issuer` annotation as well makes ingress-shim manage a *second*
Certificate for the same secret, which then fights the one you declared.
:::

**Ship `.env.example`, not `.env`.** The installer copies any `*.env.example` to
`*.env` on first install and writes the operator's values into the copy. Gitignore
the real ones.

### 3. Where it lands

Plugins are installed into the panel's `custom/<slug>/`, which is the same place
`./custom.sh` deploys from. Nothing is hidden: an operator can edit the package
and re-apply it by hand, and `./plugin.sh custom/<slug>` re-runs the install from
what's on disk.

## A worked example

[`5stackgg/5stack-example-plugin`](https://github.com/5stackgg/5stack-example-plugin)
is the smallest complete case: a frontend-only plugin, so its manifest declares
neither `database` nor `node`, and the installer skips both questions. Its `k8s/`
directory is meant to be copied.

[`lukepolo/5stack-inventory-plugin`](https://github.com/lukepolo/5stack-inventory-plugin)
is the full case: a backend, a Postgres schema in the panel's own database, and
host-path mounts that pin it to one node.

## Troubleshooting

| Symptom | Cause |
| --- | --- |
| "no 5stack-plugin.json in that repo" | The manifest must be in `public/`, the repo root, or `dist/`. |
| "ships no install block" | The manifest has no `install` — the plugin isn't meant for cluster install. |
| "couldn't download" | Private repo, or a default branch that isn't `main`/`master`. Use `--ref`. |
| Certificate stuck `Ready: False` | DNS for the host isn't live yet, or port 80 isn't reachable for the HTTP-01 challenge. |
| Pods `Pending` after install | Node-bound plugin, and the labeled node can't fit it — or you moved the label. |
