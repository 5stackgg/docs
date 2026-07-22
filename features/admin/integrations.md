# Integrations

Settings that connect 5Stack to outside services and tune cross-cutting behavior.

## Discord

Configure both support and match notifications. (For the Discord bot itself, see
[Discord Bot](/advanced/discord-bot/).)

- **Support** — support webhook URL, support role ID, and your Discord invite
  link.
- **Match notifications** — notifications webhook URL, the role ID to ping, and
  per-event toggles for which match events post a notification.

## External matches

Bring Valve and FACEIT matches into 5Stack:

- **Enable external matches** — master toggle.
- **Enable FACEIT import** plus the **FACEIT API key**, with a test button.

See [FACEIT Integration](/advanced/faceit-integration) for the full setup. Players
link their own Steam match history from their personal settings.

## Telemetry & analytics

- **Enable telemetry** — anonymous usage reporting that helps 5Stack development.
- **Google Tag Manager** — drop in a `GTM-XXXXXXX` code for your own analytics.
  (If GTM is blocked behind Cloudflare, see
  [Google Tag Manager + Cloudflare](/install/cloudflare/google-tag-manager).)

## Chat

Set the chat **message TTL** — how long chat messages are retained (seconds).
