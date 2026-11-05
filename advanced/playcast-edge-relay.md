# Playcast Edge Relay (Cloudflare)

With [Playcast](/features/live-streaming) on, game servers send each match's broadcast to your panel's relay domain (`RELAY_DOMAIN`, `tv.<your domain>` by default), and every viewer downloads it from there: players who watch with the `playcast` command in CS2, and the live stream. With a big audience that is a lot of traffic out of your server.

The edge relay is a small Cloudflare Worker that you put on your relay domain. Viewers are served from Cloudflare's cache, so the broadcast leaves your server once per Cloudflare location instead of once per viewer.

- Nothing to configure in the panel: the relay domain stays the same, so once the worker is on it all Playcast traffic goes through it.
- Your relay domain has to be on Cloudflare and proxied (orange cloud).
- Cloudflare counts every request, including ones served from cache. A viewer makes a request every few seconds, so the free Workers plan (100,000 requests a day) covers a few dozen viewer-hours a day. The Workers Paid plan ($5/month) includes 10 million requests a month.

## Deploy it

Your relay domain is already in the panel's config (`RELAY_DOMAIN`), so on the panel server, run:

```bash
sudo 5stack run playcast-relay.sh
```

Or pick **Playcast relay** in the [`5stack` menu](/service/command#the-menu).

It needs Node.js 22 or newer on the panel server and walks you through the rest:

1. **Signing in to Cloudflare.** Pick a browser on this machine, a code you enter on another device (for a server without a browser), or an API token made from the **Edit Cloudflare Workers** template. A token is only used for that run.
2. **Checking your relay domain.** It finds the domain in your Cloudflare account (the zone must be **Active**, so its nameservers must already point at Cloudflare) and checks that the relay domain is proxied (orange cloud) and that Cloudflare can reach your panel through it. Anything that needs changing, such as the proxy toggle or an SSL/TLS mode of Flexible, is explained with a link to the page in the Cloudflare dashboard; press Enter to check again once you have changed it, or type `skip` to carry on anyway.
3. **Deploying.** After you confirm, it deploys the worker and adds the route `<relay domain>/*`. If the daily Workers limit is ever reached, requests go straight to your panel instead of failing. If that route already belongs to another worker, it stops and tells you to remove it first.
4. **Checking it.** It waits for the worker to answer on your relay domain.

Run it again at any time to update the worker.

## Check that it is active

Go to **Settings → Application → Streaming**. With **Playcast** on, the **Edge relay (Cloudflare)** section checks your relay domain and shows when it last checked, with a **Check again** button:

- **Online**: "Playcast viewers are served from Cloudflare's cache."
- **Not set up**: "Playcast viewers are served by this server." A **Setup guide** link leads here.

The worker answers `https://<relay domain>/health` with its name; your panel's own relay does not, so an answer means Cloudflare is already sending the traffic through it.

## Removing it

Delete the route (or the worker) in the Cloudflare dashboard. Traffic goes straight to your panel again.
