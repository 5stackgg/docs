# Requirements

The 5Stack Panel operates on [K3s](https://docs.k3s.io/installation/requirements), a lightweight Kubernetes server.

Before proceeding, please ensure that you meet all the requirements for K3s installation.

1. Domain
   The 5Stack Panel requires a domain name to be configured. You will need to be able to point multiple subdomains to the 5Stack Panel.
2. Port 80 and 443
   The 5Stack Panel requires port 80 and 443 to be open and accessible, if that is not possible you can modify the [Nginx configuration](/install/nginx) to use different ports.
