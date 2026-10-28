# Requirements

The 5Stack Panel runs on [K3s](https://docs.k3s.io/installation/requirements), a lightweight Kubernetes distribution. Please ensure that your system meets all the requirements for K3s installation, as well as the following additional requirements specific to the 5Stack Panel.

## Server Requirements

### Minimum: `2` CPU cores, `4 GB` memory

The panel and K3s need about **3.6 GB** before anyone visits. Measured on
5stack.gg with nobody online:

| What                                                        | Memory at idle |
| ----------------------------------------------------------- | -------------- |
| Hasura                                                      | 1.2 GB         |
| API                                                         | 370 MB         |
| TimescaleDB                                                 | 250 MB         |
| Typesense, Redis, web, game server node connector, MediaMTX | 490 MB         |
| K3s, containerd and the operating system                    | 1.3 GB         |

TimescaleDB grows from there: when it is installed it sizes its cache to the
server's memory, and fills it as the panel is used. More memory means more of
the database stays in memory.

### Recommended

| People online at once | CPU cores | Memory |
| --------------------- | --------- | ------ |
| Up to 500             | 4         | 8 GB   |
| Up to 2,000           | 8         | 16 GB  |
| Up to 3,000           | 12        | 16 GB  |

At 3,000 people the panel used about 4 cores most of the time and up to 8 in
bursts, and about 8.5 GB of memory.

These numbers come from the [load lab](/community/developer/load-testing),
where every simulated person browses the whole site, signed in or as a guest,
while matches play. Real visitors spend more time idle on one page, so treat
them as a safe upper bound.

Hasura, which serves the site's live data, runs on up to 4 cores. Cores beyond
that go to the database and the API.

If [game servers](/servers/game-server-nodes/requirements) run on the same
machine, add their cores and memory on top.

### Required Ports: `80`, `443`, and `8585`

#### HTTP Ports `80` / `443`

The 5Stack Panel requires ports `80` and `443` to be open and accessible for Kubernetes routing. If it is not possible to use these ports. You can modify the [Nginx configuration](/install/nginx) to listen on different ports.

#### Game Node Connector Port `8585`

Port `8585` is required on all 5Stack servers for the Game Server Node Connector.

:::info
We recommend using a Linux-based server such as [Ubuntu](https://ubuntu.com/download/server).
:::

## Domain Requirements

The 5Stack Panel requires a domain name to be configured. You will need to be able to point multiple subdomains to the 5Stack Panel.

The following subdomains are required:

- `yourdomain.com`
- `api.yourdomain.com`
- `ws.yourdomain.com`
- `demos.yourdomain.com`
- `search.yourdomain.com`
- `console.yourdomain.com`

:::info
You can use deeply nested domains like `api.deep.yourdomain.com`
:::
