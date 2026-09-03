# Demos

Every match map produces a demo. 5Stack uploads, stores, parses, and serves it
for you, the parsed data powers [replay](/features/match-replay),
[playback](/features/demo-playback), [highlights](/features/highlights),
and [stats](/features/stats-and-leaderboards).

## How demos flow

1. The server records the demo and uploads it automatically when the map ends.
2. It's stored in S3-compatible storage (local RustFS by default, or your own
   provider. See [Bring Your Own S3](/advanced/s3/)).
3. 5Stack parses it to extract rounds, kills, utility, positions, and stats.

You can also **import** a demo manually, upload a `.dem` to attach a match that
wasn't played on your servers (for example a Valve or FACEIT match).

## Downloading demos

From a match you can download a **single demo** as a `.dem` file, or **all demos**
for a map as one archive. Downloads are served via signed URLs from your storage
provider.

## Admin controls

- **Retention**: how long demos are kept.
- **Max storage**: a cap on total demo storage.
- **Network limiter**: throttle upload/download bandwidth (or leave unlimited).

For where demos physically live and how to use your own bucket (e.g. Backblaze +
Cloudflare). See [Bring Your Own S3](/advanced/s3/).
