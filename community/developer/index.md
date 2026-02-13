# Developer Environment Setup

### Requirements

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [k3d](https://k3d.io/stable/#releases)
- [mkcert](https://github.com/FiloSottile/mkcert) for generating local SSL certificates

### Setup

#### Clone the 5stack Panel Repository

First, create a `5stack` folder before cloning the 5stack Panel repository:

```bash
mkdir -p ~/code/5stack
```

Then clone the repository:

```bash
git clone git@github.com:5stackgg/5stack-panel.git ~/code/5stack
```

## Running the Development Environment

Run `./dev.sh` to start the development environment.

:::warning

- The game-server does not currently support ARM-based systems.
- Installing or running CS servers is not currently available on ARM-based systems.
- Displayed CPU information may be inaccurate.
- Multi-node setups with Tailscale are not currently supported.
- Update warnings will persist and not disappear.

If you encounter any issues, please report them to the development team.
:::

### Working with Firefox

If you want to run this in Firefox on macOS, install `nss` via Homebrew to enable local development support:

```bash
brew install nss
```
