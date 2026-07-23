# Backblaze + Cloudflare

Backblaze has a partnership with Cloudflare to provide [free data transfer](https://www.backblaze.com/blog/backblaze-and-cloudflare-partner-to-provide-free-data-transfer/).

The Cloudflare Worker in our [web project](https://github.com/5stackgg/web) (`cloudflare-workers/backblaze-proxy/`) signs S3 v4 requests in front of your B2 bucket and serves them through Cloudflare's edge, giving you free B2 → Cloudflare egress _and_ edge caching so popular clips/demos don't re-hit B2 on every view.

## 1. Edit `wrangler.toml`

Open `cloudflare-workers/backblaze-proxy/wrangler.toml` and update the `[vars]` block to match your bucket:

```toml
[vars]
BUCKET_NAME = "your-bucket-name"
S3_ENDPOINT = "s3.us-east-005.backblazeb2.com"  # whatever your bucket lists under "Endpoint"
```

Both values are non-secret and live in `wrangler.toml`, **not** in `wrangler secret put`.

## 2. Set the S3 secrets

```bash
yarn wrangler secret put S3_ACCESS_KEY
yarn wrangler secret put S3_SECRET
```

Each command prompts for the value and encrypts it in Cloudflare. Use `yarn wrangler secret list` to confirm.

## 3. Configure routes

Uncomment the `routes` block in `wrangler.toml` and replace the pattern + zone with your own domain:

```toml
routes = [
  { pattern = "demo-dl.<your-domain>/demo*",  zone_name = "<your-domain>" },
  { pattern = "demo-dl.<your-domain>/clips*", zone_name = "<your-domain>" },
]
```

Without these the worker deploys but no traffic reaches it.

## 4. Deploy

```bash
yarn wrangler deploy
```

## 5. Update the panel

Navigate to your panel's application configuration and set the **Cloudflare Worker URL** to your routed hostname (e.g. `https://demo-dl.<your-domain>`).

:::info
You can find your worker's URL in the [Cloudflare Dashboard](https://dash.cloudflare.com/) under **Workers & Pages → your worker → Domains & Routes**.
:::

## Caching

Edge caching is enabled in the worker by default, `cf.cacheEverything` plus a `Cache-Control: public, max-age=2592000, immutable` response header. Clip/demo objects are UUID-keyed so they're safe to cache for the full 30-day window Cloudflare allows on the Free tier. The first request to a clip warms the edge cache; subsequent viewers (including `<video>` Range seeks) are served from Cloudflare without touching B2.

## 6. Enable Tiered Cache (recommended)

Cloudflare's edge cache is per-datacenter. Without Tiered Cache, a clip viewed first from London is still a cold miss in Tokyo and re-fetches from B2. Tiered Cache lets edges pull from each other before going to origin, so each clip is fetched from B2 once globally instead of once per region.

In the [Cloudflare Dashboard](https://dash.cloudflare.com/), select your zone, then go to **Caching → Tiered Cache** and enable **Smart Tiered Cache Topology**. It's free on all plans and is the single biggest reduction in B2 cold-miss traffic you can make.

## Free-tier limits to watch

- **Workers Free: 100,000 requests/day** across the whole account. Every clip view + every video Range seek consumes a request. Monitor under _Workers & Pages → your worker → Metrics_. The $5/mo Workers Paid plan lifts this to 10M/day.
- **Per-file cache cap on Free: 512 MB.** Files larger than this bypass the edge cache (egress is still free via the Bandwidth Alliance, but they re-fetch from B2 each time). Most clips and demos are well under this.
