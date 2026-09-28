# Playcast Edge Relay (Cloudflare)

With [Playcast](/features/live-streaming) on, game servers send each match's broadcast to your panel's relay domain (`RELAY_DOMAIN`, `tv.<your domain>` by default), and every viewer downloads it from there: players who watch with the `playcast` command in CS2, and the live stream. With a big audience that is a lot of traffic out of your server.

The edge relay is a small Cloudflare Worker that you put on your relay domain. Game servers' uploads pass straight through it to your panel, and viewers are served from Cloudflare's cache: each fragment leaves your server once per Cloudflare location instead of once per viewer. Only the small start of the broadcast, which a viewer fetches once when they connect, still comes from your panel every time.

- Nothing to configure in the panel: the relay domain stays the same, so once the worker is on it all Playcast traffic goes through it.
- Your relay domain has to be on Cloudflare and proxied (orange cloud). Workers only run on proxied hostnames.
- Cloudflare counts every request, including ones served from cache. A viewer makes a request every few seconds, so the free Workers plan (100,000 requests a day) covers a few dozen viewer-hours a day. The Workers Paid plan ($5/month) includes 10 million requests a month.

## Deploy it

Your relay domain is already in the panel's config (`RELAY_DOMAIN`), so from the directory you installed the panel in (`5stack-panel`), run:

```bash
./playcast-relay.sh
```

It needs Node.js 22 or newer (for `npx wrangler`, Cloudflare's deploy tool) and walks you through the rest:

1. **Signing in to Cloudflare.** Pick a browser on this machine, a code you enter on another device (for a server without a browser), or an API token made from the **Edit Cloudflare Workers** template. A token is only used for that run.
2. **Checking your relay domain.** It finds the domain in your Cloudflare account and checks that the relay domain is proxied (orange cloud) and that Cloudflare can reach your panel through it. Anything that needs changing, such as the proxy toggle or an SSL/TLS mode of Flexible, is explained with a link to the page in the Cloudflare dashboard, and it checks again once you have changed it.
3. **Deploying.** It deploys the worker and adds the route `<relay domain>/*`, set to **Fail open**: if the daily Workers limit is ever reached, requests skip the worker and go straight to your panel instead of failing.
4. **Checking it.** It waits until the worker answers on your relay domain.

Run it again at any time to update the worker.

## Check that it is active

Go to **Settings → Application → Streaming**. With **Playcast** on, the **Edge relay (Cloudflare)** section checks your relay domain: it shows **Active** as soon as the worker answers there. The worker answers `https://<relay domain>/health`; your panel's own relay does not, so an answer means Cloudflare is already sending the traffic through it.

## Removing it

Delete the route (or the worker) in the Cloudflare dashboard. Traffic goes straight to your panel again.

## How it works

- Anything that is not a read, such as game servers uploading the broadcast, is passed straight to your panel.
- `/sync` is cached for 3 seconds, like Valve's reference relay.
- Fragments are cached under the broadcast they belong to. Fragment numbers start over when a new map starts a new broadcast, so viewers are never served an earlier map's data.
- The start of a broadcast, and anything the panel does not have yet, is never cached.
