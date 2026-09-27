# Playcast Edge Relay (Cloudflare)

With [Playcast](/features/live-streaming) on, game servers send each match's broadcast to your panel's relay, and every viewer downloads it from there: players who watch with the `playcast` command in CS2, and the live stream. With a big audience that is a lot of traffic out of your server.

The edge relay is a small Cloudflare Worker that sits in front of the relay for viewers. Game servers keep sending the broadcast to your panel, but viewers read it through the worker, which caches each fragment at Cloudflare's edge. Each fragment then leaves your server once per Cloudflare location instead of once per viewer. Only the small start of the broadcast, which a viewer fetches once when they connect, still comes from your panel every time.

- You need a domain on Cloudflare: the worker runs on a hostname of it, such as `playcast.example.com`. Cloudflare only caches for workers on your own domains, not on `workers.dev`.
- Nothing changes on your game servers, and no match passwords leave your panel.
- LAN servers always keep using your panel's relay, since their viewers are on the same network.
- Cloudflare counts every request, including ones served from cache. A viewer makes a request every few seconds, so the free Workers plan (100,000 requests a day) covers a few dozen viewer-hours a day. The Workers Paid plan ($5/month) includes 10 million requests a month.

## Deploy it from the panel

1. Go to **Settings → Application → Streaming** and turn on **Playcast**.
2. Create a Cloudflare API token: **My Profile → API Tokens → Create Token → Create Custom Token**, with the permissions **Account → Workers Scripts → Edit** and **Zone → Zone → Read**.
3. Under **Edge relay (Cloudflare)**, enter a new hostname on one of your Cloudflare domains, your account ID (shown in the dashboard under Workers & Pages) and the token, then press **Deploy to Cloudflare**.

The panel uploads the worker as `5stack-playcast-relay`, attaches it to the hostname (Cloudflare creates the DNS record and certificate), checks that it answers, and moves viewers onto it. The token is only used for the deploy and is never saved.

::: tip
The hostname must not already have a DNS record. Cloudflare can take a few minutes to issue the certificate: if the worker is not answering yet when the deploy finishes, the panel fills in its address under **Deploy it yourself**. Press **Use this worker** once it answers.
:::

## Deploy it yourself

The worker lives in the [api repository](https://github.com/5stackgg/api) under `cloudflare-workers/playcast-relay/`. Set the route in its `wrangler.toml` to your hostname:

```toml
routes = [{ pattern = "playcast.example.com", custom_domain = true }]
```

then, from a checkout, run:

```bash
npx wrangler deploy --config cloudflare-workers/playcast-relay/wrangler.toml \
  --var ORIGIN:https://relay.<your-domain>
```

`ORIGIN` must be your panel's relay domain, the one game servers post to (`RELAY_DOMAIN`). Then open **Deploy it yourself** in the same settings section and paste `https://playcast.example.com`. The panel checks that the worker fronts your relay before switching viewers to it.

## Switching back

Press **Serve from this server** in the same section. New viewers use your panel's relay again.

## How it works

- `/sync` is cached for 3 seconds, like Valve's reference relay.
- Fragments are cached under the broadcast they belong to. Fragment numbers start over when a new map starts a new broadcast, so viewers are never served an earlier map's data.
- The start of a broadcast, and anything the panel does not have yet, is never cached.
