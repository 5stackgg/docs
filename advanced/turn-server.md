# TURN Relay

Optional. Most installs never need one.

[Voice chat](/features/voice-chat), [video calls](/features/voice-chat#video-calls)
and [player cameras](/features/player-cameras) all use WebRTC, which normally
connects a player straight to 5Stack's media server. When a player's network
won't allow that, a TURN relay gives them a way through — at the cost of every
one of their packets passing through your server.

## Do you need one?

Probably not. Try it without first — nothing is disabled, and you can add a
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
bad is a bandwidth or CPU problem, not a NAT one — a relay won't help.
:::

## What it costs

The relay forwards media rather than just helping peers find each other, so
**every relayed call uses your server's bandwidth in both directions**. It also
holds one UDP port per relayed session, and runs on the host network.

That is the whole reason it is opt-in: 5Stack won't deploy a relay you didn't
ask for.

## Enabling it

### 1. DNS

Add an `A` record for the node running 5Stack:

```
turn.example.com  →  <your node's public IP>
```

::: danger Must not be proxied
If you use Cloudflare, **turn the proxy off** (grey cloud, not orange) for this
record.

TURN is not HTTP, so a CDN proxy cannot carry it — and worse, coturn resolves
this name at startup to work out which address to advertise to clients. A
proxied record answers with the CDN's address, so the relay would hand out
candidates pointing at the CDN. Every one of them is unreachable, and the
lookup *succeeded*, so nothing looks wrong in the logs.

If you must keep the record proxied, set `TURN_PUBLIC_IP` (below) to the node's
real address and coturn will skip the lookup.
:::

### 2. Firewall

Open on that node:

| Port | Protocol | What for |
| --- | --- | --- |
| `3478` | UDP | TURN |
| `3478` | TCP | TURN, for networks that block UDP |
| `50000-50200` | UDP | The relay range — one port per active relayed session |

The relay range is deliberately narrow so this stays a short firewall rule. It
also caps how many calls can be relayed at once, which is a limit worth having.
Widen it in `TURN_MIN_PORT` / `TURN_MAX_PORT` if you actually run out.

### 3. Configure

Set the domain in `overlays/coturn/coturn.env`:

```bash
TURN_DOMAIN=turn.example.com
```

Then run the updater:

```bash
./update.sh
```

That's it. The shared secret is generated for you on first run, and the API
starts handing out relay credentials automatically.

## Settings

All in `overlays/coturn/coturn.env`:

| Setting | Default | What it does |
| --- | --- | --- |
| `TURN_DOMAIN` | *(blank)* | The relay's hostname. **Blank means no relay is deployed at all.** |
| `TURN_PUBLIC_IP` | *(blank)* | Resolved from `TURN_DOMAIN` when blank. Set it by hand if that record is proxied. |
| `TURN_REALM` | `TURN_DOMAIN` | What coturn calls itself when challenging a client. Rarely worth changing. |
| `TURN_MIN_PORT` | `50000` | Start of the relay range. |
| `TURN_MAX_PORT` | `50200` | End of the relay range. |

The shared secret lives separately, in
`overlays/local-secrets/coturn-secrets.env`, and is generated on first run.

## How credentials work

Nothing long-lived is ever handed to a browser. The API mints a username
carrying its own expiry and an HMAC of that username, signed with a secret the
relay verifies against. Both lapse on their own, so a leaked pair stops working
without anyone having to revoke it, and there are no TURN user accounts to
manage.

The relay and the API read the **same secret** from the same place, so there is
nothing to keep in sync.

## Turning it off

Blank out `TURN_DOMAIN` and re-run `./update.sh`. The relay stops being
deployed, and calls fall back to connecting directly.

An already-running relay pod isn't deleted for you — remove it with
`kubectl delete deployment coturn -n 5stack` if you want it gone. Left alone it
notices the blank domain and idles without binding any ports.

## What does *not* use the relay

Deliberately, and it matters:

- **Regional matchmaking latency probes.** These time a connection to each
  region to work out which one you're closest to. Routed through a relay, every
  region would report the latency of the hop to the relay instead — quietly
  breaking region selection with nothing to point at.
- **Game streams, demo playback and highlight clips.** These connect directly
  without trouble, and relaying them would push every viewer's bitrate through
  your server.

Only calls and camera feeds ever use it.

## Troubleshooting

Check what the relay decided at startup:

```bash
kubectl logs -n 5stack deployment/coturn | head
```

| Log line | Meaning |
| --- | --- |
| `TURN_DOMAIN is not set; no relay requested, idling` | The overlay is deployed but unconfigured — usually a leftover from before you blanked the domain. |
| `advertising <public> for <host>` | Working as intended behind NAT. |
| `host is publicly addressable at <ip>` | Working as intended with a public IP. |
| `<domain> did not resolve; no external-ip set` | DNS isn't there yet. Candidates will be wrong until it is. |
| `TURN_SECRET is empty; refusing to start an open relay` | The secret didn't generate. Re-run `./update.sh`. |

To confirm the API is handing out credentials, sign in and open
`https://api.example.com/voice/ice-servers`. With no relay configured you'll see
a single STUN entry; with one, a `turn:` entry alongside it carrying a `username`
and `credential`.
