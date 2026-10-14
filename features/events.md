# Events

An event is the wrapper around everything that happened at one occasion, a LAN,
a charity cup, a community weekend. It gathers tournaments, teams, and players
under a single page with its own standings, leaderboard, and media gallery.

Events are optional, admins enable them from
**Settings → Application → Events**, which also sets the **Minimum role to
create events**.

## Finding events

The **Events** page opens on the next scheduled event, **Up next**, followed by
**Live** events (the first one featured), **Upcoming** events, and **Past
events**. Any event can be opened in a **Quick look** sheet without
leaving the list.

Search by name and narrow the list by **Status** (All, Live, Upcoming, Past).
**Filters** holds **Only events I organize**, which replaces the old event
management page.

## Creating an event

An event needs a **name** and a **start date** (matches are only gathered from
that date onward), plus optionally an end date, a description, and a **banner**.
The banner is shown full width at the top of the event page, best at 1920 × 640
(3:1), and can be an image or an MP4 video.

**Visibility** decides who can see it:

| Visibility  | Who can view                      |
| ----------- | --------------------------------- |
| **Private** | Only people attached to the event |
| **Friends** | Friends of people in the event    |
| **Public**  | Anyone                            |

## Membership

An event is assembled from things that already exist on your instance:

- **Tournaments**: attach any tournament you organize.
- **Teams** and **Players**, attach directly, or **Import from Tournaments** to
  pull every rostered player from the attached tournaments in one go.
- **Organizers**: co-organizers who can manage the event. Each can be shown or
  hidden in the "organized by" credit on the event page.

## The event page

The header carries the banner, the event's phase (**Upcoming**, **Live** with
_Day N of M_, or **Finished**), its dates, the organizers, and counts of
players, teams, and matches. Its main button follows the phase: **Register**
before the event while an attached tournament is taking sign-ups, **Watch
live** during a live match, and **Share** once it's over. Players allowed to
grant awards also get **Grant Award**.

| Tab             | What it shows                                                                          |
| --------------- | -------------------------------------------------------------------------------------- |
| **Overview**    | A summary that changes with the event's phase, below                                   |
| **Matches**     | Every match as a full row, as **All matches** or just **Mine**                         |
| **Players**     | The teams and players, the **Standings** medal table, and the **Leaderboard**          |
| **Media**       | The gallery, split into **Uploads** and **Highlights** once the event has highlights   |
| **Tournaments** | The attached tournaments                                                               |
| **Manage**      | Organizers only: banner, details, schedule, access, membership, and deleting the event |

The **Overview** tells the story of the event as it happens:

- **Before** it starts: how many days to go, tournaments open for sign-up,
  **Who's going**, and media **From the organizers**.
- **During** it: what's **Live now**, the brackets in play, the **Leaderboard
  so far**, **Your day**, **Results so far**, **Highlights**, and the **Latest
  uploads**.
- **After** it: the **Champions**, the **Top of the leaderboard**, **Your
  event**, **Results**, **Highlights**, and **Moments** from the gallery.

**Your day** and **Your event** show your own line: your rank among the event's
players and your numbers. Open it, or any leaderboard row, for that player's
event profile, and **Compare with...** another player.

### Standings and leaderboard

- **Standings**: a **Medal Table** across the event's tournaments, with each
  player's **Gold**, **Silver**, **Bronze**, and **MVP** awards.
- **Leaderboard**: event-wide player rankings by **Rating, ADR, K/D Ratio,
  Kills, or Wins**, with match counts.

## Media gallery

Events carry a media gallery for photos, clips, and audio. **Add media** takes
either a file or a link:

- **Upload a file**: images (PNG, JPEG, WebP, GIF, up to 10 MB), MP4 video (up
  to 512 MB), or MP3 audio (up to 50 MB). You can also drag files straight onto
  the gallery; each one gets its own row in the upload queue.
- **Add a link**: paste a YouTube or Twitch URL to embed it, or any other link
  to add it as a card that opens in a new tab.

Click a photo or video to open it in the lightbox. The left and right arrow
keys, or the buttons at the edges, step through the gallery in order, and
videos play right there. Audio plays in its own card.

Organizers and whoever uploaded an item can open its **Details** to give it a
title, tag the players in it, or delete it. **Filter by player...** then shows
everything a player is tagged in.

**Media Uploads** access is set per event:

- **Organizers only**
- **Anyone in the event**: attached players and teams can contribute their own
  photos and clips

When matches linked to the event produce [highlights](/features/highlights),
they appear under **Highlights** on the Media tab and on the overview.

## Deleting an event

Deleting an event permanently removes it, including its media and leaderboard.
The matches and tournaments linked to it are **not** deleted. They go back to
standing on their own. Only the event's creator, or a **Tournament Organizer**
or higher role, can delete it; co-organizers can't.
