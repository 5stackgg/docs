# Cloudflare Tunnel

> **Requirements:** DNS managed by Cloudflare — SSL/TLS mode set to **Full**

You can expose your 5Stack installation through a [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/) (`cloudflared`) without opening inbound firewall ports.

## Create the tunnel

1. Sign in to the [Cloudflare dashboard](https://dash.cloudflare.com) with the account that owns your domain.
2. Navigate to **Protect & Connect → Networking → Tunnels**.
3. Click **+ Create Tunnel**, enter a name, and click **Create Tunnel**.
4. Follow the on-screen installation guide and select **Install as a service**.

## Add routes

5. Open the tunnel, go to **Routes**, and click **Add route**.
6. Select **Published application** and fill in the fields. Repeat for each subdomain 5Stack provisions:

| Domain | Service address |
|---|---|
| `yourdomain.com` | `https://localhost:443` |
| `yourdomain.com` | `http://localhost:80` |
| `api.yourdomain.com` | `https://localhost:443` |
| `ws.yourdomain.com` | `https://localhost:443` |
| `demos.yourdomain.com` | `https://localhost:443` |
| `search.yourdomain.com` | `https://localhost:443` |
| `console.yourdomain.com` | `https://localhost:443` |
| `inventory.yourdomain.com` | `https://localhost:443` |

::: info Tailscale users
Replace `localhost` with the node's local Tailscale IP address. These values can be updated later.
:::

## Disable TLS verification

Because 5Stack provisions its own certificates, you must disable TLS verification on each route — otherwise the tunnel cannot reach the backend.

7. Go to **Protect & Connect → Zero Trust → Networks → Tunnels & Mesh**.
8. Find your tunnel and click **⋯ → Configure**.
9. In the **Published application routes** section, click **⋯ → Edit** on each route.
10. Scroll to **Origin request and connection settings → TLS** and enable **No TLS verify**.

::: warning
This step must be completed for **every** published application route in the list.
:::

Your 5Stack installation is now accessible through Cloudflare Tunnel.

Because traffic reaches the panel through Cloudflare, set `REVERSE_PROXY=true` — see [Reverse Proxy](/install/reverse-proxy).
