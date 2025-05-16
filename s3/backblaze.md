# Backblaze + Cloudflare

Backblaze has a partnership with Cloudflare to provide [free data transfer](https://www.backblaze.com/blog/backblaze-and-cloudflare-partner-to-provide-free-data-transfer/).

To set this up, clone down our [web project](https://github.com/5stackgg/web), then using the following commands to deploy to your cloudfalre instance.

1. Set S3 Secret

   `yarn wrangler secret put S3_SECRET`

2. Set S3 Access Key

   `yarn wrangler secret put S3_ACCESS_KEY`

3. Set S3 Endpoint

   `yarn wrangler secret put S3_ENDPOINT`

4. Deploy to Cloudflare

   `yarn wrangler deploy`

After setting up the Cloudflare Worker, navigate to your panel's application configuration and update the Cloudflare Worker Demo URL.

:::info
You can find your URL in the [Cloudflare Dashboard](https://dash.cloudflare.com/) under "Workers & Pages" → your worker's settings → "Domains & Routes".
:::
