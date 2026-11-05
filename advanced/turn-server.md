# TURN Relay

Optional. Most installs never need one.

[Voice chat](/features/voice-chat), [video calls](/features/voice-chat#video-calls)
and [player cameras](/features/player-cameras) normally connect a player straight
to your panel. When a player's network won't allow that, a TURN relay gives them
a way through, at the cost of every one of their packets passing through your
server.

## Do you need one?

Probably not. Try it without first: nothing is disabled, and you can add a
relay later without touching anything else.

Add one if players report that voice or video **connects for some people and
never for others**, particularly:

- **Symmetric or carrier-grade NAT.** Common on mobile networks and some ISPs.
- **Networks that block UDP outright.** Corporate and university networks.

Both are the minority. If calls work on a phone over mobile data, you almost
certainly don't need a relay.

::: tip Check before you build
The clearest signal is a player whose connection **never** establishes while
everyone else in the same channel is fine. A call that connects and then sounds
bad is a bandwidth or CPU problem, not a NAT one, and a relay won't help.
:::

## What it costs

**Every relayed call uses your server's bandwidth in both directions**, which
is why 5Stack won't deploy a relay you didn't ask for.

## Enabling it

### 1. DNS

Add an `A` record for the node running 5Stack:

```
turn.example.com  →  <your node's public IP>
```

::: danger Must not be proxied
If you use Cloudflare, **turn the proxy off** (grey cloud, not orange) for this
record.

A proxied record makes the relay hand out the CDN's address, which nobody can
reach, and nothing looks wrong in the logs.

If you must keep the record proxied, set `TURN_PUBLIC_IP` (below) to the node's
real address.
:::

### 2. Firewall

Open on that node:

| Port | Protocol | What for |
| --- | --- | --- |
| `3478` | UDP | TURN |
| `3478` | TCP | TURN, for networks that block UDP |
| `50000-50200` | UDP | The relay range, one port per active relayed session |

The relay range caps how many calls can be relayed at once. Widen it with
`TURN_MIN_PORT` / `TURN_MAX_PORT` if you run out.

### 3. Configure

On the panel server, set the domain, or pick **Config → TURN relay** in the
[`5stack` menu](/service/command#the-menu):

```bash
sudo 5stack config set TURN_DOMAIN=turn.example.com
```

It shows the change, asks, and applies the panel again. That's it.

## Settings

Each is set with `sudo 5stack config set <SETTING>=<value>`:

| Setting | Default | What it does |
| --- | --- | --- |
| `TURN_DOMAIN` | *(blank)* | The relay's hostname. **Blank means no relay is deployed at all.** |
| `TURN_PUBLIC_IP` | *(blank)* | Resolved from `TURN_DOMAIN` when blank. Set it by hand if that record is proxied. |
| `TURN_MIN_PORT` | `50000` | Start of the relay range. |
| `TURN_MAX_PORT` | `50200` | End of the relay range. |

## Turning it off

Blank out the domain with `sudo 5stack config set TURN_DOMAIN=`. The relay
stops being deployed, and calls fall back to connecting directly.

A relay that is already running isn't removed for you. Left alone it idles
without using any ports. To remove it, run
`kubectl delete deployment coturn -n 5stack`.

## What does *not* use the relay

Only calls and camera feeds ever use it. Regional matchmaking latency checks,
game streams, demo playback and highlight clips always connect directly.

## Troubleshooting

Check what the relay decided at startup:

```bash
kubectl logs -n 5stack deployment/coturn | head
```

| Log line | Meaning |
| --- | --- |
| `TURN_DOMAIN is not set; no relay requested, idling` | The relay is running but has no domain, usually a leftover from before you blanked the domain. |
| `advertising <public> for <host>` | Working as intended behind NAT. |
| `host is publicly addressable at <ip>` | Working as intended with a public IP. |
| `<domain> did not resolve; no external-ip set` | DNS isn't there yet. The relay hands out the wrong address until it is. |
| `TURN_SECRET is empty; refusing to start an open relay` | The secret didn't generate. Run `sudo 5stack config apply`. |

To confirm the API is handing out credentials, sign in and open
`https://api.example.com/voice/ice-servers`. With no relay configured you'll see
a single STUN entry; with one, a `turn:` entry alongside it carrying a `username`
and `credential`.
