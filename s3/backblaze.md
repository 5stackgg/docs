# Backblaze + Cloudflare

Backblaze has a partnership with Cloudflare to provide [free data transfer](https://www.backblaze.com/blog/backblaze-and-cloudflare-partner-to-provide-free-data-transfer/).

To set this up, clone down our [web project](https://github.com/5stackgg/web), then using the following commands to deploy to your cloudfalre instance.

`yarn wrangler secret put S3_SECRET`
`yarn wrangler secret put S3_ACCESS_KEY`
`yarn wrangler secret put S3_ENDPOINT`
`yarn wrangler deploy`

After setting up the Cloudflare Worker, navigate to your panel's application configuration and update the Cloudflare Worker Demo URL.

:::info
You can find your URL in the [Cloudflare Dashboard](https://dash.cloudflare.com/) under "Workers & Pages" → your worker's settings → "Domains & Routes".
:::
