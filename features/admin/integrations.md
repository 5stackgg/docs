# Integrations

Settings that connect 5Stack to outside services and tune cross-cutting
behavior. Each lives under **Settings → Application**.

## Discord

**Discord Notifications** configures where staff notices are posted. (For the
Discord bot itself, see [Discord Bot](/advanced/discord-bot/).)

- **Defaults**: **Discord Invite Link**, **Default Discord Webhook** and
  **Default Role ID**. Every section below falls back to these when it has no
  webhook or role of its own.
- **Match Status Notifications**: a webhook and role ID for match status
  changes, and a toggle per status. Tournaments can turn their own Discord
  match notifications off.
- **CS2 Build Notifications**: a webhook and role ID for CS2 update, gamedata
  validation and map-asset build notices.
- **Server Notifications**: **Disk Warning Threshold (%)** and **Disk Critical
  Threshold (%)** for game server nodes. 0 disables either.

Role ID fields take several IDs separated by commas.

::: tip Only staff notices reach Discord
Discord is for the people running the instance. Besides the match status and
CS2 build notices above, only staff notifications are posted there: server, node
and RCON status, storage scans, Elo recomputes, search reindexes, utility drift
scans, name-change requests, match assistance calls and abandons. Player
notifications (invites, chat, awards, sanctions, warnings) never are.
:::

## Twitch

**Twitch** lets players link their Twitch channel, so their stream shows on
their profile, in the Players list and as a POV on the matches they play (see
[Linked accounts](/features/social#linked-accounts)). Players link by signing in
with Twitch, which proves the channel is theirs.

1. Register an application in the Twitch developer console (**Open the Twitch
   developer console**).
2. Add the **OAuth Redirect URL** shown on the page, exactly as shown, to the
   application's OAuth Redirect URLs. It is
   `https://<your web domain>/auth/twitch/callback`.
3. Enter the application's **Client ID** and **Client Secret**, and save.

Everything Twitch stays hidden until both are set. A saved secret can't be shown
again; enter a new one to replace it, or **Remove Secret** to turn Twitch off.
The keys are read on every call, so changing them needs no restart.

5Stack checks every linked channel once a minute. Only a stream in the
Counter-Strike category counts as live, and a channel Twitch hasn't confirmed as
live in the last 10 minutes stops showing as live.

## External matches

**Match Imports** brings Valve and FACEIT matches into 5Stack:

- **Allow CS2 match imports**: lets players link their Steam match-history auth
  code and upload demos. Off hides the form and blocks external imports.
- **Import Faceit Matches**: off by default. Polls linked players' FACEIT
  history (the last 30 days) using your FACEIT API key.
- **Test Faceit Integration**: checks the key works and whether it can download
  demos.

See [FACEIT Integration](/advanced/faceit-integration) for the full setup.
Players link their own Steam match history from their personal settings.

## Steam Presence

A pool of Steam bot accounts that makes match imports instant and shows
friends' live CS2 status. See [Steam Presence](/features/steam-presence#setup-admins).

## Chat

**Chat Settings** controls how long chat is kept, and what players can attach.

**Room Retention** is how long, in seconds, messages are kept in each kind of
room. 0 drops them immediately.

| Room                   | Default |
| ---------------------- | ------- |
| Match chat             | 1 hour  |
| Match team chat        | 1 hour  |
| Matchmaking lobby chat | 1 hour  |
| Draft lobby chat       | 1 hour  |
| Tournament chat        | 7 days  |
| Organizer chat         | 90 days |
| Team chat              | 30 days |

Each field spells its value out underneath as a duration, such as "90 days".
Organizer chat used to default to 24 hours; an instance still on that default
moved to 90 days, and a value you chose yourself was kept.

- **Direct Messages**: **Keep direct messages for (days)**. Default 365; 0 keeps
  them forever.
- **Attachments**: **Largest file (MB)**, default 100, and **Uploads per player
  per day (MB)**, default 1024, counted over the last 24 hours including files
  that were removed.
- **GIFs**: a **GIPHY API key** turns on GIFs in chat (**Get a key from
  GIPHY**). Searches go through the API, so the key never reaches a browser.
  **GIPHY searches per hour** is shared by every player and defaults to 90;
  GIPHY's beta keys allow 100 an hour.

See [Chat](/features/chat) for how players use these.

## Web Push

**Web Push** shows whether push notifications are working: its state, the last
confirmed delivery, how many devices and players are subscribed, and which
platforms they're on. Nothing to sign up for and no third-party provider; see
[Web Push Notifications](/advanced/web-push).

## Telemetry & analytics

**Telemetry** holds:

- **Telemetry**: anonymous usage reporting that helps 5Stack development.
- **Google Tag Manager Code**: drop in a `GTM-XXXXXXX` code for your own
  analytics. (If GTM is blocked behind Cloudflare, see
  [Google Tag Manager + Cloudflare](/install/cloudflare/google-tag-manager).)
