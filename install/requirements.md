# Requirements

The 5Stack Panel runs on [K3s](https://docs.k3s.io/installation/requirements), a lightweight Kubernetes distribution. Please ensure that your system meets all the requirements for K3s installation, as well as the following additional requirements specific to the 5Stack Panel.

# Domains

The 5Stack Panel requires a domain name to be configured. You will need to be able to point multiple subdomains to the 5Stack Panel.

The following subdomains are required:

- `yourdomain.com`
- `api.yourdomain.com`
- `ws.yourdomain.com`
- `demos.yourdomain.com`
- `console.yourdomain.com`

# Server with Available Ports 80 and 443

The 5Stack Panel requires port 80 and 443 to be open and accessible, if that is not possible you can modify the [Nginx configuration](/install/nginx) to use different ports.

:::info
It is recommended to use a Linux-based server such as [Ubuntu](https://ubuntu.com/download/server).
:::
