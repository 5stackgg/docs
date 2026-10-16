# Browser Extension

The **5Stack** extension for Chrome imports matches from FACEIT and Leetify into
your panel from the page you are looking at. The match does not have to be
yours: open anyone's FACEIT room or Leetify profile and bring their matches in.

Every import gets the full 5Stack treatment, the same as any other
[external match](/features/external-matches): scoreboard,
[replay](/features/match-replay), [match analysis](/features/match-analysis),
and [stats](/features/stats-and-leaderboards).

## Getting started

1. Install **5Stack** from the Chrome Web Store and pin it to the toolbar.
2. Click its icon. The side panel asks for your panel's address; `5stack.gg` is
   filled in. For a self-hosted panel, type its address and Chrome asks for
   access to that one site.
3. Log in to your panel in the same browser if you are not already. The
   extension uses that login, so there is no key to copy.

## Importing

Click the icon on any of these pages:

| Page | What it lists |
| --- | --- |
| FACEIT match room | That match, with every map of a series |
| FACEIT player page | Their last 20 CS2 5v5 matches |
| Leetify profile | Their recent Valve matchmaking and FACEIT matches |
| Leetify match | That match |

Each match shows whether it is **In 5Stack** (click to open it), **Queued**,
**Importing**, **Failed** with the reason, or **New**. New matches are ticked
for you; press **Import** and the panel takes it from there.

### FACEIT matches

FACEIT only gives a demo to a logged-in FACEIT user who passes its Cloudflare
check, the same as its own **Watch demo** button. So stay logged in to FACEIT:
the extension asks FACEIT for each demo in a FACEIT tab, with your FACEIT login.
The check usually passes on its own; when it wants a click, it appears at the
bottom right of the FACEIT tab.

Imported from a Leetify page, FACEIT matches use any FACEIT tab you have open,
or one the extension opens in the background.

### Valve matches

Leetify lists each matchmaking match's share code, and the extension imports it
like a share code pasted under
[Import a match by share code](/features/external-matches#import-a-match-by-share-code).
Valve keeps demos for about 30 days, so older matches fail.

## Limits

- Each player can import 30 demos an hour.
- FACEIT wingman matches are not imported.

## Admin

The extension uses settings the panel already has:

- **Allow CS2 match imports** must be on, see
  [Integrations](/features/admin/integrations#external-matches).
- FACEIT imports also need **FACEIT import** on and a FACEIT Data API key, see
  [FACEIT Integration](/advanced/faceit-integration). The FACEIT Downloads API
  approval is not needed: the demo comes from the player's own FACEIT login.
- Valve imports need the Steam game coordinator, as share codes do.

Before downloading a FACEIT demo, the panel checks the link against FACEIT's own
record of that match, so a player can only ever import that match's demo from
FACEIT's storage.

See also the extension's [privacy policy](/features/browser-extension-privacy).
