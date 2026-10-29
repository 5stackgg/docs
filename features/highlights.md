# Highlights

5Stack turns finished matches into shareable video automatically, and gives you
an in-app editor to cut your own clips. Both render on a [GPU node](/servers/gpu-nodes/).

## Automatic highlights

When an admin turns on **Auto-generate match highlights**, every map's demo gets
one highlight per player the first time it's parsed: that player's **best
round**, the round with the most kills, trimmed down to the action. Admins can
raise the bar with a minimum kill count, and append up to three knife kills from
other rounds.

- Only players who have signed in to 5Stack at least once get a highlight.
- [Imported matches](/features/external-matches) only get highlights when
  **Include imported matches** is also on.
- A clip stops at the end of the match's final round, so it never runs on into
  the victory screen.

## Where highlights show up

- **Highlights** page: every public clip on the platform (admins see private
  ones too), filterable and sortable. See below.
- **Watch** page: the top plays, filtered by **Show plays** (All / Aces / 4Ks)
  and **Time range** (Today / This week / All time). If this week has no plays
  yet, it opens on All time. The lead clip is tagged **Play of the day**, **Top
  play this week**, or **Top play**.
- **Match page**: the match header and its highlights are one stage. The
  featured clip plays inline and moves on to the next by itself, with an **Up
  next** list beside it. Each player row has a film button with their clip
  count.
- **Player profile**: a **Highlights** section with the player's clips, newest
  first.
- **Team page**: a **Highlights** tab with the current roster's clips.
- **[Events](/features/events)**: the event's top plays, and a **Highlights**
  view next to **Uploads** in its media.

**Top plays** puts the most kills first, then the shortest clip, then the most
views, so a fast 4K beats a slow one.

A clip counts a view once a viewer has loaded half of it. Bots, downloads, and
the next clip being loaded ahead of time don't count, and the same viewer counts
at most once every 6 hours.

## The Highlights page

Filter by **Player** and **Kills** (Any kills / 2+ / 3+ / 4+ / 5 kills), and from
the filters menu by **Date** (All time, or the last 24 hours, 7, 30, or 90 days)
and **Sort** (**Most recent**, **Top plays**, **Most viewed**). Admins also get a
**Visibility** filter (All / Public / Private).

**Match Clips** groups clips by match; **Singular Clips** lists each one.
Filtering, or sorting by anything but **Most recent**, switches to Singular
Clips.

Links to a clip open it on the Highlights page, and unfurl in Discord, Slack,
and other apps with the video playable inline.

## The clip player

A clip opens in a player with its title, the player, the round and map, who
clipped it, and when. Beside the video:

- **Kill feed**: the player's kills in that round, with weapon, headshot, victim,
  and where it happened.
- **Scorecard**: the match it came from, with both teams' scores and a **View
  match** link.
- **Up next**: the next clips, which play on automatically. The next one loads
  ahead of time, so it starts instantly.

**Theater mode** (press `T`) fills the window with the video and puts the details
over it; the player remembers your choice. It needs a window at least 640px wide.

| Key            | Action                         |
| -------------- | ------------------------------ |
| `T`            | Theater mode / default view    |
| `←` / `→`      | Previous / next clip           |
| `Space` or `K` | Play / pause                   |
| `F`            | Full screen                    |
| `M`            | Mute                           |
| `Esc`          | Leave theater mode, then close |

The person who made a clip can rename it, and make it public or private from its
tile (admins can do this for any clip). **Share** has **Copy link** and
**Download** (with the file size); admins also get a **Public** switch and
**Delete clip** there.

## Making your own clips

Players with the **Streamer** role and above can cut clips during
[demo playback](/features/demo-playback), two ways:

- **Auto clip from preset**: pick a player and a preset, and 5Stack builds the
  clip from the parsed kills.

  | Preset          | What it clips                                    |
  | --------------- | ------------------------------------------------ |
  | **Multi-kills** | Every round with 2+ kills, trimmed to the action |
  | **Best round**  | The single round with the most kills             |
  | **Knife kills** | Each knife kill, with a 5s lead-in               |
  | **Match recap** | Every round the player got at least one kill     |

- **Clip Editor**: drag on the timeline to add a segment, then trim, split, or
  delete segments and preview the cut. Each segment can follow a set player or
  stay on whoever is being spectated. Up to 20 segments.

The clip renders right away in your own playback session, with progress shown
inline, then **Open clip** or **Download**. You also get a notification when it's
ready. Clips you make start out public. Resolution and frame rate are set by
your admin, not per clip.

Admins can also queue a highlight without opening playback: **Render highlight…**
on a player's row in the match page, or **Create Player Highlights** in the match
actions, which runs the automatic highlights for that match even when
auto-generation is off.

## Render queue

Automatic and queued highlights render in batches. The **Queue** button on the
Highlights page (admins, streamers, match organizers, and tournament organizers)
opens the **Render Queue** with every active and recent batch and why a batch is
waiting, for example for a free GPU or for a live match to end.

## Admin controls

Under **Settings → Application → Highlights**:

| Setting                                                 | Default             |
| ------------------------------------------------------- | ------------------- |
| **Auto-generate match highlights**                      | Off                 |
| **Include imported matches**                            | Off                 |
| **Pause Highlight Renders During Active Match**         | Off                 |
| **Bake player chip + outro into highlights**            | On                  |
| **Minimum kills to generate a highlight**               | Any kill (everyone) |
| **Always include knife kills**                          | Off                 |
| **Minimum Retention** (days) / **Maximum Storage** (GB) | 1 / 10              |

**Highlight Codec** (H.264 or H.265 / HEVC, default H.264), **Highlight FPS**
(30 or 60, default 60) and **Highlight Resolution** (720p or 1080p, default
1080p) are under **Settings → Application → Video Encoding**.

- **Minimum kills** ranges from any kill up to **Aces only (5K)**.
- **Default visibility for auto-generated highlights** makes them Public or
  Private. Clips players make by hand start out public.
- **Pause Highlight Renders During Active Match** holds renders while a match is
  live on a server backed by a GPU node, and resumes them when it ends.
- FPS and resolution apply to every render, automatic and hand-made.
- Highlights are kept at least the minimum retention; once storage passes the
  maximum, the oldest highlights past their retention are deleted first.

When auto-generation covers imported matches, players who haven't linked their
Steam match history get a **Feature Spotlight** card in their notifications
panel, **Highlights From Every Match You Play**, with a **Link Account** button.
Dismissing it hides it on every device.

::: tip
Highlights, clips, and demo playback all share your [GPU nodes](/servers/gpu-nodes/).
If renders are slow or queued, check the GPU pool and the **Pause Highlight
Renders During Active Match** setting.
:::
