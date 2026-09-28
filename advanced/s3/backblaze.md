# Backblaze + Cloudflare

Backblaze has a partnership with Cloudflare to provide [free data transfer](https://www.backblaze.com/blog/backblaze-and-cloudflare-partner-to-provide-free-data-transfer/).

The Cloudflare Worker in [5stack-panel](https://github.com/5stackgg/5stack-panel) (`cloudflare-workers/backblaze-proxy/`) signs S3 v4 requests in front of your B2 bucket and serves them through Cloudflare's edge, giving you free B2 → Cloudflare egress _and_ edge caching so popular clips/demos don't re-hit B2 on every view. It serves demos, clips, news images, event media and map assets.

## 1. Point the panel at your bucket

The deploy script reads the bucket from the panel's own S3 configuration, so set it up there first:

- `overlays/config/s3-config.env`: `S3_BUCKET` and `S3_ENDPOINT` (whatever your bucket lists under "Endpoint", e.g. `s3.us-east-005.backblazeb2.com`)
- `overlays/local-secrets/s3-secrets.env`: `S3_ACCESS_KEY` and `S3_SECRET`

If your secrets live in Vault, the script reads the keys from your cluster instead. Either way it checks them with Backblaze before deploying anything, and asks you for them if Backblaze rejects them.

## 2. Deploy

From the directory you installed the panel in (`5stack-panel`), run:

```bash
./backblaze-proxy.sh
```

It needs Node.js 22 or newer (for `npx wrangler`, Cloudflare's deploy tool) and walks you through the rest:

1. **The hostname.** The worker gets a hostname of its own on a domain you have on Cloudflare, `cf.<your domain>` by default. It can't share one of the panel's hostnames: the worker takes over `/demo*`, `/clips*`, `/news*`, `/maps*` and `/events*` on it, and on your demos domain that would break the panel's own demo uploads.
2. **Signing in to Cloudflare.** Pick a browser on this machine, a code you enter on another device (for a server without a browser), or an API token made from the **Edit Cloudflare Workers** template. A token is only used for that run.
3. **The DNS record.** If the hostname has no record yet, it tells you what to add: an `AAAA` record pointing at `100::` with the proxy on (orange cloud). The address is only a placeholder, because the worker answers every request itself. It links to your domain's DNS page and checks again once you have added it.
4. **Deploying.** It shows the hostname and bucket, then deploys the worker, stores the bucket keys as worker secrets and adds its routes. Routes the worker already has on other hostnames are kept, so links that still use an older hostname keep working.
5. **Checking it.** It reads a file through the worker to make sure it can reach your bucket.
6. **Pointing the panel at it.** It saves the hostname as `CLOUDFLARE_WORKER_DOMAIN` in `overlays/config/api-config.env`, asking first if the panel was using a different one, and applies it straight away, or offers to run `./update.sh` when it can't. Every demo, clip and media download link is built from it.
7. **Smart Tiered Cache.** It checks whether it is on for your domain. Signed in with an API token, it can turn it on for you; signed in through the browser or a device code, it links you to the setting, because that sign-in can't change cache settings.

Run it again at any time to update the worker. **Settings → Application → Demo settings** shows the URL the panel is using.

## Caching

Edge caching is enabled in the worker by default, `cf.cacheEverything` plus a `Cache-Control: public, max-age=2592000, immutable` response header. Clip/demo objects are UUID-keyed so they're safe to cache for the full 30-day window Cloudflare allows on the Free tier. The first request to a clip warms the edge cache; subsequent viewers (including `<video>` Range seeks) are served from Cloudflare without touching B2.

## 3. Enable Tiered Cache (recommended)

Cloudflare's edge cache is per-datacenter. Without Tiered Cache, a clip viewed first from London is still a cold miss in Tokyo and re-fetches from B2. Tiered Cache lets edges pull from each other before going to origin, so each clip is fetched from B2 once globally instead of once per region.

In the [Cloudflare Dashboard](https://dash.cloudflare.com/), select your zone, then go to **Caching → Tiered Cache** and enable **Smart Tiered Cache Topology**. It's free on all plans and is the single biggest reduction in B2 cold-miss traffic you can make.

## Free-tier limits to watch

- **Workers Free: 100,000 requests/day** across the whole account. Every clip view + every video Range seek consumes a request. Monitor under _Workers & Pages → your worker → Metrics_. The $5/mo Workers Paid plan includes 10 million requests a month, then charges per million.
- **Per-file cache cap on Free: 512 MB.** Files larger than this bypass the edge cache (egress is still free via the Bandwidth Alliance, but they re-fetch from B2 each time). Most clips and demos are well under this.
