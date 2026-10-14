# External Matches

5Stack isn't limited to matches played on your servers. You can pull in matches
from elsewhere, your public CS2 (Valve) matches, FACEIT matches, or any demo you
have, and get the full 5Stack treatment: scoreboard, [replay](/features/match-replay),
[match analysis](/features/match-analysis), and
[stats](/features/stats-and-leaderboards), all alongside your native matches.

Linking and share-code imports live under **Settings → Linked Accounts**, and
everything here only appears when an admin has turned on **Allow CS2 match
imports**.

## Link your Steam match history

Connect your Steam match history with two codes from Valve:

- **Auth code**: your **Steam Game Authentication Code**, created once per Steam
  account from Steam's help page.
- **Share code**: a recent **Match Share Code**, copied from **Watch → Your
  Matches** in CS2. Any match from the last 30 days works as a starting point.

Press **Link match history**, and 5Stack scans Valve for your recent matches
straight away. After that it keeps checking: every hour for players who have
signed in during the last week, and on demand with **Poll now**. Competitive,
Premier, Wingman, and Rush matches are imported. You can **Unlink** at any time.

With the [5Stack Steam bot](/features/steam-presence) as a friend, 5Stack looks a
match up a minute after it ends instead of waiting for the next hourly check. If
Valve hasn't published the match yet, it tries once more a few minutes later.

## Import a match by share code

The match history Valve hands out can miss matches. To bring one in by hand,
paste its share code, or the share link CS2 copies from **Watch → Your
Matches**, into **Import a match by share code** and press **Import**. This works
whether or not your match history is linked.

## FACEIT matches

When external imports and FACEIT are enabled, your FACEIT matches import
automatically too. See [FACEIT Integration](/advanced/faceit-integration) for the
details, including how per-match FACEIT ranks are captured.

## Upload a demo

Administrators can upload a CS2 `.dem` by hand from **Upload a demo** above the
match list on their own profile, handy for one-off matches or when no automatic
source applies. A demo can be up to 2 GB; it uploads straight to storage in
64 MB parts.

## Duplicates

Before importing, 5Stack checks whether it already has the match. A match
brought in a second way, by share code and by upload, under a renamed file, or by
another player, is recognised by its map, its round-by-round winners, and most of
its players. A demo recorded on one of your own 5Stack servers is never imported,
since that match is already in 5Stack.

## Tracking imports

Imports are processed in the background, two at a time. While you have imports
in flight, a **Pending imports** list shows each one with its map, start time,
and status (**Queued** or **Parsing**), filterable by status, and you can
**Clear** an entry.

An import that fails drops off the list. Most failures are demos older than 30
days, which Valve no longer hosts. A sweep every 15 minutes fails any import
whose job stalled or was lost, so nothing sits in the list forever.

::: tip
Imported matches only get [automatic highlights](/features/highlights) when an
admin turns on **Include imported matches**, so imports don't flood the render
queue.
:::

## Admin

External match importing is enabled (and FACEIT configured) by admins, see
[Integrations](/features/admin/integrations#external-matches).
