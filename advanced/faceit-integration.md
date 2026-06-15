# Faceit Integration

5Stack can pull each player's Faceit CS2 skill level and ELO (shown on their player page) and import their Faceit matches (scoreboard, replay, highlights).

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
- This **live** skill level/ELO is the player's _current_ rank. It is stored on the player and is **never** written into rank history.

## Importing Faceit matches

5Stack can import full Faceit matches (scoreboard, replay, highlights) for players who have linked their Steam match history, on the same hourly schedule as Valve matches.

Enable it under **Settings → Application → External Matches**: turn on **External Matches**, then **Import Faceit Matches**. The **Test** button on that page checks your key against both the Data API (ranks/metadata) and the Downloads API (demo download) and reports which work.

::: warning Downloading demos needs Downloads API access
Downloading the demo is the one piece that needs more than the standard key. The `demo_url` the Data API returns is a private resource URL whose host is not publicly resolvable; it must be exchanged for a signed download URL via the Faceit **Downloads API**, which requires Downloads access on your key. If the Test button reports "Downloads API not authorized", apply at [fce.gg/downloads-api-application](https://fce.gg/downloads-api-application) (~30-day approval). Until then, ranks/metadata still import, and you can always import a match by uploading its `.dem` manually.
:::

## Troubleshooting

- **No chip appears on any player.** Double-check that `FACEIT_API_KEY` is set in `INSTALL_DIR/overlays/local-secrets/faceit-secrets.env` and that the panel has been updated. The API logs `FACEIT_API_KEY not configured` on each refresh attempt when the key is missing.
- **Chip appears for some players but not others on a player page.** That's expected — only players who have linked their Steam account to Faceit will have a CS2 profile to fetch.
- **Scoreboard ranks are missing for opponents on an imported match.** Re-import the match — every player's Faceit rank is fetched at import time, so opponents who have never opened 5Stack get filled in.
- **Matches never import automatically.** Confirm `FACEIT_API_KEY` is set and that the player has linked their Steam match history; without the key, only manual demo upload works.
