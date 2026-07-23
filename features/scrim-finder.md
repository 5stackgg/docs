# Scrim Finder

Finding practice used to mean posting in a Discord and hoping. The Scrim Finder
turns it into a schedule: your team advertises when it plays and who it will
play, opponents challenge you, and 5Stack hosts the resulting match.

It lives on your team page under the **Scrim Finder** tab, and the public board
is at **/scrims**.

## Advertise your team

Flip **Open to Scrims** on and your team appears on the board. Everything else on
that tab controls who finds you and what they can ask for:

- **Regions**: where you're willing to play.
- **Maps**: pick from official, workshop, or active-duty pools. Opponents see
  your list before they challenge.
- **Accepted Elo range**: a slider over 5Stack team Elo. Teams outside the range
  don't see you as a match.
- **Notes**: free text for anything a challenger should know: server
  preferences, anti-cheat requirements, voice, language.

## Weekly availability

Instead of a vague "we play evenings". You paint a **weekly availability grid**,
drag across hour blocks in your local time to mark the times a scrim can _start_.

The grid then does the math for you:

- Each painted start is shaded forward to show **playtime** (~1 hour per map), so
  the grid reflects the real commitment rather than an optimistic range.
- 5Stack computes your **longest contiguous block** and derives which series
  lengths actually fit inside it. If BO3 doesn't fit, the grid tells you exactly
  how much more you need to paint to unlock it.
- Opponents can only propose start times inside your availability, unless you
  enable **allow requests outside these hours**, or leave the grid empty entirely
  (which means "ask any time").

## Finding opponents

The **/scrims** board lists every team that's open, with their Elo, regions,
maps, and availability. Narrow it down with:

- **Region** and **map** filters
- An **Elo range** slider
- Free-text search by team name
- Sorting by name, Elo, or **reliability**, how dependably a team actually shows
  up for the scrims it agrees to

## Requesting a scrim

Open a team and hit **Request Scrim**:

1. Pick which of **your** teams is challenging.
2. Choose the **series**, BO1, BO3, or BO5. Formats that don't fit inside the
   opponent's longest availability block are flagged.
3. Pick a **start time**, either straight from their availability grid or, if
   they allow it, any time at all. You can schedule weeks ahead.
4. Add preferred maps and send.

## Requests, counters, and acceptance

The **Requests** tab on your team page shows incoming (←) and outgoing (→)
requests, with the ones waiting on _you_ highlighted. For each request you can:

- **Accept**: the scrim is confirmed and 5Stack creates the match.
- **Decline**.
- **Counter**: propose a different time; the ball goes back to them.

Once accepted the request flips to **Matched** and links straight to the
scheduled match, which behaves like any other 5Stack match: server allocation,
veto, connect links, demos, stats, and highlights.

## Alerts

Don't want to keep refreshing the board? Create a **scrim alert** with the
regions and Elo range you care about, and 5Stack pings you when a matching team
opens up for scrims.

## Calendar subscription

**Subscribe to Scheduled Matches** gives you a calendar (ICS) URL. Drop it into
Google Calendar, Apple Calendar, or Outlook and your team's scheduled scrims show
up alongside everything else.

::: tip Admins
The Scrim Finder can be switched on or off instance-wide from
**Settings → Application → Scrim Finder**.
:::
