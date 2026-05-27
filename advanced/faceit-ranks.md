# Faceit Ranks

5Stack can pull each player's Faceit CS2 skill level and ELO and display it on their player page.

## Guide

1. Get a Faceit API key

   Sign in to the [Faceit Developer Portal](https://developers.faceit.com/apps) and create a new application. From the application's **API Keys** tab, generate a **Server-side** key for the **Data API**. Copy the key.

2. Add the key to your panel secrets

   Open `INSTALL_DIR/overlays/local-secrets/faceit-secrets.env` and set:

   ```env
   FACEIT_API_KEY=<your_faceit_api_key>
   ```

3. Update the panel

   See the [Update Guide](/updating) for instructions on applying the new secret.

## How it works

- When a player page is opened, the panel asks the API to refresh that player's Faceit info.
- The API uses a Redis lock to only hit the Faceit Data API at most **once per player per hour**, so high-traffic pages won't burn through your Faceit quota.

## Troubleshooting

- **No chip appears on any player.** Double-check that `FACEIT_API_KEY` is set in `INSTALL_DIR/overlays/local-secrets/faceit-secrets.env` and that the panel has been updated. The API logs `FACEIT_API_KEY not configured` on each refresh attempt when the key is missing.
- **Chip appears for some players but not others.** That's expected — only players who have linked their Steam account to Faceit will have a CS2 profile to fetch.
