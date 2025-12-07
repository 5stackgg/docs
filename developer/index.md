# Developer Environment Setup

### Requirements

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [k3d](https://k3d.io/stable/#releases)
- [mkcert](https://github.com/FiloSottile/mkcert) for generating local SSL certificates

:::info
    After installing mkcert, make sure to run `mkcert -install`
:::

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
