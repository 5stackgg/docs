# Requirements

Your server must meet the [K3s requirements](https://docs.k3s.io/installation/requirements), as well as the following.

## Server Requirements

### Minimum: `2` CPU cores, `4 GB` memory

The panel needs about **3.7 GB** of memory before anyone visits, and more as
it's used.

### Recommended

| People online at once | CPU cores | Memory |
| --------------------- | --------- | ------ |
| Up to 1,000           | 4         | 8 GB   |
| Up to 2,000           | 8         | 16 GB  |
| Up to 3,000           | 12        | 16 GB  |

These numbers come from the [load lab](/community/developer/load-testing).
Real visitors spend more time idle, so treat them as a safe upper bound.

If [game servers](/servers/game-server-nodes/requirements) run on the same
machine, add their cores and memory on top.

### Ports

Only these ports need to be open to the internet:

| Port | Protocol | What for |
| --- | --- | --- |
| `80` / `443` | TCP | The panel. If you can't use these ports, you can [change them](/install/ports). |
| `8189` | UDP | Game streams, voice chat and player cameras |
| `30000-32767` | UDP | Game servers, on each game server node. See [Port Forwarding](/servers/game-server-nodes/ports). |

If you set up a [TURN relay](/advanced/turn-server), open its ports too.

#### Ports for your LAN and your 5Stack servers

These must never be open to the internet:

| Port | Protocol | What for |
| --- | --- | --- |
| `8585` | TCP | The Game Server Node Connector, on every 5Stack server. Your other 5Stack servers reach it, and so does your LAN: [offline mode](/servers/game-server-nodes/offline-support) opens `http://<lan-ip>:8585` in a browser on the LAN. |
| `6443` | TCP | Kubernetes, on the panel |
| `10250` | TCP | Kubernetes, on every 5Stack server |

Allow `8585` only from your LAN and your other 5Stack servers, and `6443` and
`10250` only from your panel and your other 5Stack servers, for example over
[Tailscale](https://tailscale.com). Block them from anywhere else.

:::info
We recommend using a Linux-based server such as [Ubuntu](https://ubuntu.com/download/server).
:::

## Domain Requirements

The 5Stack Panel requires a domain name to be configured. You will need to be able to point multiple subdomains to the 5Stack Panel.

The following subdomains are required:

- `yourdomain.com`
- `api.yourdomain.com`
- `ws.yourdomain.com`
- `tv.yourdomain.com`
- `demos.yourdomain.com`
- `hls.yourdomain.com`, for GPU live streams. It can wait until you add a
  [GPU node](/servers/gpu-nodes/).

:::info
You can use deeply nested domains like `api.deep.yourdomain.com`
:::
