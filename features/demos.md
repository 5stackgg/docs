# Demos

Every match map produces a demo. 5Stack uploads, stores, parses, and serves it
for you, the parsed data powers [replay](/features/match-replay),
[playback](/features/demo-playback), [highlights](/features/highlights),
[match analysis](/features/match-analysis), and
[stats](/features/stats-and-leaderboards).

## How demos flow

1. The server records the demo and uploads it automatically when the map ends.
   Until it lands, the map card on the match page shows a timer (**Processing
   demo**): a countdown while the match's TV delay runs out, then how long the
   upload has been going.
2. It's stored in S3-compatible storage (local RustFS by default, or your own
   provider. See [Bring Your Own S3](/advanced/s3/)).
3. 5Stack parses it to extract rounds, kills, utility, positions, and stats, and
   builds the replay file for the [2D/3D replay](/features/match-replay) in the
   same pass. Parsing starts while the demo is still downloading.

Demos from outside your servers, Valve and FACEIT matches or a `.dem` uploaded
by an admin, go through the same parser. See
[External Matches](/features/external-matches).

## Downloading demos

From a map card on the match page you can download its demo as a `.dem` file,
or, when the map has more than one demo, all of them as one `.zip`. Downloads
are served via signed URLs from your storage provider. With the
[Cloudflare worker](/advanced/s3/backblaze) in front of your bucket, each demo
downloads on its own through Cloudflare instead.

## Reparsing

A match keeps the data its demo was parsed with. When an update teaches the
parser something new, such as the recorded smokes the
[replay](/features/match-replay) now draws, older matches pick it up once their
demo is reparsed. **Reparse All Demos** under **Settings → Application → Demos**
reparses every demo in the background, two at a time, and can be cancelled. If a
map's demo was never parsed, admins can parse it from its map card.

## Admin controls

Under **Settings → Application → Demos**:

- **Minimum Retention** (days) and **Maximum Storage** (GB): demos are kept at
  least the minimum retention; once storage passes the maximum, the oldest demos
  past their retention are deleted first.
- **Global Demo Network Limiter**: caps the upload bandwidth a game-server node
  uses to send finished demos to storage (or leave it unlimited).
- **Storage check**: writes a test file to your bucket, reads it back, and checks
  the Cloudflare worker if you use one.
- **Scan Orphaned Uploads**: finds demo, playback, and highlight files in storage
  that no database row references, and deletes them to reclaim the space.

For where demos physically live and how to use your own bucket (e.g. Backblaze +
Cloudflare). See [Bring Your Own S3](/advanced/s3/).
