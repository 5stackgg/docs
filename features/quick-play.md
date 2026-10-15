# Play & Matchmaking

**Play** is the one page for getting into a game. It is built around a single
mode picker and a **Find Match** button, with everything else you can join
underneath it:

| Section               | What it holds                                                                                        |
| --------------------- | ---------------------------------------------------------------------------------------------------- |
| **Matchmaking**       | The mode picker, where you'll play, your party, and **Find Match**.                                  |
| **Your Schedule**     | Your live and upcoming matches and the tournaments you're registered for.                            |
| **Draft rooms**       | Open [draft lobbies](/features/draft-lobbies) to join, and a host bar to open your own in one click. |
| **More ways to play** | An open tournament, league signups, the Scrim Finder, public servers, and a practice server.         |

A section with nothing to show is left out, so a quiet instance doesn't show a
page of empty boxes.

## Matchmaking

### Pick a mode

Every mode an admin has enabled appears as a tile. Each tile shows the format,
how many players are already searching for it, and how many seats your party
takes:

| Mode            | Format | Notes                                                               |
| --------------- | ------ | ------------------------------------------------------------------- |
| **Competitive** | 5v5    | The standard match.                                                 |
| **Wingman**     | 2v2    |                                                                     |
| **Duel**        | 1v1    |                                                                     |
| **Rush**        | 3v3    | CS2's Rush mode, room by room, on its own map pool and its own ELO. |

Nothing is picked for you unless only one mode fits your party. Pick a tile and
press **Find Match**. The tiles work as a radio group, so the arrow keys move
between the modes your party can play.

The in-queue count is people, not parties: a queued trio counts as three, and a
party searching several regions is only counted once. It refreshes after every
matchmaking pass, so players already in a ready check or a match drop off it.

::: tip Queue from anywhere
The **Play** button in the top bar queues the mode you played last in one
click. Its arrow opens **Pick a mode** with every mode and its queue count, and
**All modes and settings** takes you to the full page. While a search runs the
same button shows the mode and the time in queue, with **Cancel search** beside
it.
:::

### Party size

You can queue solo or as a party. A party can queue a mode when it fits on one
side, with matchmaking filling the other, or when it fills the whole match on
its own:

| Mode        | Party sizes that can queue |
| ----------- | -------------------------- |
| Duel        | 1 or 2                     |
| Wingman     | 1–2 or 4                   |
| Rush        | 1–3 or 6                   |
| Competitive | 1–5 or 10                  |

Only the party leader picks the mode and starts or cancels the search; for
everyone else the button reads _Waiting for_ and the leader's name. **Invite
friends** (or **Open party** once you're in one) brings up the party in the
[hub](/features/social#parties-lobbies).

### Where you'll play

Under the tiles, the region line lists the regions a search would use with
your ping to each, plus any it skips because they're over your latency limit or
unreachable. The gear beside it opens **Matchmaking settings**.

The same region list is in the **Server regions** menu (the globe in the top
bar), which shows each region's status, and with **Ping by region** your
measured latency to each:

- **Star** a region to prefer it. Matchmaking uses your starred regions; with
  none starred it uses every region under your limit.
- **Maximum Acceptable Latency** is a slider capped at the instance's own
  limit. Each region's bar is drawn on the slider's scale, so you can see which
  regions fall inside it as you drag.
- **Refresh** measures every region again. Offline regions, regions that are
  still being measured, and partially available regions are labelled.

If every region is over your limit, the button becomes **Edit regions** and the
page says so instead of letting you search for a match that can never be found.

### LAN or online

On a network with a LAN region, you play on the LAN or online, never both. The
first time you queue or host a draft room in a session you're asked **You're on
a LAN. Where do you want to play?**, and you can switch at any time from the
region line (**LAN** or **Online**). On the LAN the button reads **Find LAN
Match**.

The server enforces the same rule: a queue or a match whose regions mix LAN
and online regions is refused.

### The ready check

When a match is found, every player gets a **Match Found** ready check with 30
seconds to press **Ready**. If someone doesn't, the match is not created: any
party whose members all accepted goes straight back into the queue, and the
rest are dropped from it.

So you don't miss it:

- A **Match found** push notification is sent as
  [urgent](/features/notifications#urgent-alerts), which vibrates and stays on
  screen until it is answered or expires.
- A hidden browser tab flashes its title and icon until you look at it.
- Screen readers hear the dialog's title, what to do, and the seconds left as
  they count down.

The countdown, like your time in queue, runs on the server's clock, so a device
whose clock is wrong still shows the right time.

If everyone is ready but the match can't be created, every party goes back to
where it was in the queue, except one that can no longer queue, which is told
why and dropped. When the server refuses the match outright, every party is
told why and leaves the queue, rather than being matched into the same refusal
again.

Once everyone is ready, the Matchmaking section turns into the match: its
status, map, score, a link to the match page, and the connect details.

If you're in more than one match at once, the match-ready popup and the hub
follow the one that needs you first: a live match, then one in veto, then one
waiting for check-in, then for a server.

**Match & Draft Room Popup**, under **Matchmaking settings**, controls the popup
(and the redirect) when your match or draft room is ready. Turn it off and you
reach the match from the button in the top bar instead. It doesn't skip the
ready check.

### Who can queue

Banned players and players on a matchmaking cooldown see why, and until when,
above the mode tiles, and can't start a search. A tournament cooldown is shown
there too but doesn't block the queue. A join the server refuses always says
why, for example **Your lobby is still joining the queue, try again.**

## Your Schedule

**Your Schedule** collects what you're already committed to, live first and
then by start time:

- Matches you're in that are live, in veto, waiting for check-in or a server,
  and scheduled matches once they're within the hour.
- Tournaments you're on a roster for, until they finish.

Each row says where things stand, such as **Check-in open**, **Check-in 7/10**
with when it closes, **Map veto**, or **Live · Round 12**, and carries the one
button you need: **Check in**, **Connect**, **Open match**, or **Details**.

## Draft rooms

The **Draft rooms** section lists open
[draft lobbies](/features/draft-lobbies) and has a **Host a room** bar for
opening your own in one click. See
[Draft Lobbies](/features/draft-lobbies#hosting-from-the-play-page).

## More ways to play

- Tournaments: the next tournament open for registration that you aren't
  already in, on the same card the watch page uses, with **All tournaments**.
- League: while a [league](/features/leagues) season is taking signups, how
  many teams are in and **Register a team**.
- Scrims: how many teams are looking for a [scrim](/features/scrim-finder)
  today, with **Find a scrim** and **Post availability**.
- Public servers: the instance's online public servers with their map,
  region, ping, and player count, a **Connect** button, and the connect command
  to copy.
- Practice server: when the utility library is enabled, **Start practice** on
  your own [practice server](/features/practice-servers) on any map.

## On-demand or your own servers

Matchmaking can provision an **on-demand server** in the chosen region
automatically, or run on your dedicated or third-party servers. See
[Matches](/features/matches) for how servers are selected.

::: tip Admins
Which modes can be queued, who can queue, and the instance's latency limit are
set under **Settings → Application → Matchmaking**. See
[Matchmaking & Ranks](/features/admin/matchmaking).
:::
