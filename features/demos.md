# Demos

Every match map produces a demo. 5Stack uploads, stores, and parses it for you,
and the parsed data powers [replay](/features/match-replay),
[playback](/features/demo-playback), [highlights](/features/highlights),
[match analysis](/features/match-analysis), and
[stats](/features/stats-and-leaderboards).

## How demos flow

The server uploads the demo automatically when the map ends. Until it's ready,
the map card on the match page shows **Processing demo** with a timer. 5Stack
then parses it for rounds, kills, utility, positions, and stats.

Demos from outside your servers, Valve and FACEIT matches or a `.dem` uploaded
by an admin, are parsed the same way. See
[External Matches](/features/external-matches).

## Downloading demos

From a map card on the match page you can download its demo as a `.dem` file,
or, when the map has more than one demo, all of them as one `.zip`. With the
[Cloudflare worker](/advanced/s3/backblaze) in front of your bucket, each demo
downloads on its own instead.

## Reparsing

When an update adds something new to parsed demos, such as the recorded smokes
the [replay](/features/match-replay) now draws, older matches only get it once
their demo is reparsed. **Reparse All Demos** under **Settings → Application →
Demos** reparses every demo in the background, and can be cancelled. If a map's
demo was never parsed, admins can parse it from its map card.

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
  that nothing in 5Stack uses any more, and deletes them to reclaim the space.
- **Who can watch demos** (default Verified User): the minimum role for
  [in-browser demo playback](/features/demo-playback). Match organizers can
  always watch their own matches.
- **Who can upload demos** (default User): the minimum role for
  [uploading a `.dem`](/features/external-matches#upload-a-demo) from a match
  played elsewhere. External match imports must be turned on too.

Demos are stored locally by default. To use your own bucket (e.g. Backblaze +
Cloudflare), see [Bring Your Own S3](/advanced/s3/).
