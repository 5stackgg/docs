# Backblaze + Cloudflare

Backblaze has a partnership with Cloudflare to provide [free data transfer](https://www.backblaze.com/blog/backblaze-and-cloudflare-partner-to-provide-free-data-transfer/).

5Stack's Cloudflare Worker sits in front of your B2 bucket and serves it through Cloudflare, so you get free B2 egress, and popular clips and demos are cached instead of fetched from B2 on every view. It serves demos, clips, news images, event media and map assets.

## 1. Point the panel at your bucket

The deploy script reads the bucket from the panel's own S3 configuration, so set it up there first: on the [setup page](/install/#storage) when you install, or later with `5stack config` as [Bring Your Own S3](/advanced/s3/#configuration) shows.

- `S3_BUCKET` and `S3_ENDPOINT` (whatever your bucket lists under "Endpoint", e.g. `s3.us-east-005.backblazeb2.com`)
- `S3_ACCESS_KEY` and `S3_SECRET`

The script checks the keys with Backblaze before deploying anything, and asks you for them if Backblaze rejects them.

## 2. Deploy

On the panel server, run:

```bash
sudo 5stack run backblaze-proxy.sh
```

Or pick **Backblaze proxy** in the [`5stack` menu](/service/command#the-menu). To give it the worker's hostname up front, add it after the script name: `sudo 5stack run backblaze-proxy.sh cf.example.com`.

It needs Node.js 22 or newer on the panel server and walks you through the rest:

1. **The hostname.** The worker needs a hostname of its own on a domain you have on Cloudflare, `cf.<your domain>` by default. Don't use one of the panel's hostnames: on your demos domain the worker would break the panel's own demo uploads.
2. **Signing in to Cloudflare.** Pick a browser on this machine, a code you enter on another device (for a server without a browser), or an API token made from the **Edit Cloudflare Workers** template. A token is only used for that run.
3. **The DNS record.** If the hostname has no record yet, it tells you what to add: an `AAAA` record pointing at `100::` with the proxy on (orange cloud). It links to your domain's DNS page and checks again once you have added it.
4. **Signed clip links.** It turns them on once the panel signs them, warning that every panel using the worker must already sign them. Once they are on, it turns them off only if you answer yes to a question that defaults to no. See [Signed clip links](#signed-clip-links).
5. **Deploying.** It shows the hostname and bucket, then deploys the worker. Links that still use an older hostname keep working.
6. **Checking it.** It reads a file through the worker to make sure it can reach your bucket.
7. **Pointing the panel at it.** It saves the hostname as the panel's `CLOUDFLARE_WORKER_DOMAIN` setting, asking first if the panel was using a different one, and applies it.
8. **Smart Tiered Cache.** It checks whether it is on for your domain. Signed in with an API token, it can turn it on for you; signed in through the browser or a device code, it links you to the setting.

Run it again at any time to update the worker, and after every panel update, rollback or change to `S3_SECRET` (see [Signed clip links](#signed-clip-links)).

## Check that it works

Go to **Settings → Application → Demos**:

- **Cloudflare delivery** shows the worker as **Online** when it answers and Backblaze accepts its keys. It shows **Offline** when the worker isn't answering or Backblaze rejects its keys, which breaks every download that isn't cached yet; run the script again with the keys the panel uses. A worker deployed before these checks shows **Needs attention** until you run the script again.
- **Storage check** writes a test file to your bucket, reads it back in your browser, and checks the worker, showing each step's result.

## Signed clip links

Once the panel signs them, the worker refuses a clip, clip thumbnail or utility lineup file without a signed, unexpired link, and only people who may see a clip get one. Share a clip's page (`/clips/<id>`), not its file link: the page always hands out a fresh link.

- **Re-run `sudo 5stack run backblaze-proxy.sh` after every panel update, every rollback, and every change to `S3_SECRET`.** Each run decides again whether the worker requires signed links; updating or rolling back the panel doesn't touch the worker.
- **One worker, several panels.** All panels on the same Cloudflare account and bucket share the `5stack` worker. Update every one of them before running the script from any of them: once the worker requires signed links, a panel that doesn't sign them loses its clips.
- **Turning it off** (answering yes when a panel doesn't sign) affects every panel on the worker: their private clips can be downloaded by anyone with the link until the script turns it back on.
- **Revocation isn't instant.** A clip or lineup made private keeps the links already handed out working until they expire, up to two years for one that was public.

## Changing the bucket keys

The worker keeps its own copy of `S3_ACCESS_KEY` and `S3_SECRET`. To change them:

1. Run `sudo 5stack config set S3_ACCESS_KEY= S3_SECRET=` and type the new keys. On a [Vault](/advanced/vault) install, change them in Vault, then run `sudo 5stack config apply`.
2. Run `sudo 5stack run backblaze-proxy.sh`, giving it the same keys.

Until the second step, the worker refuses the clip links the panel signs with the new `S3_SECRET`.

## 3. Enable Tiered Cache (recommended)

Tiered Cache means each clip is fetched from B2 once globally instead of once per Cloudflare region.

In the [Cloudflare Dashboard](https://dash.cloudflare.com/), select your zone, then go to **Caching → Tiered Cache** and enable **Smart Tiered Cache Topology**. It's free on all plans.

## Free-tier limits to watch

**Workers Free: 100,000 requests/day** across the whole account. Every clip view and every seek in a video uses a request. Monitor it under _Workers & Pages → your worker → Metrics_. The $5/mo Workers Paid plan includes 10 million requests a month, then charges per million.
