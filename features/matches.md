# Matches

Whether it's a casual scrim or a tournament final, 5Stack runs the whole match
flow, from picking a server to vetoing maps to the live game, from the panel.

## Creating a match

Match organizers and above create a match from **Schedule Match** on the
**Matches** page. It's one page:

- **Match Settings**: the match type, map pool and veto, rules, and region.
  See the sections below.
- **Teams**: for each side, pick a saved team or switch to **Individual** and
  add players one by one.
- **Kickoff Time**: **Now**, **In 30 Min**, **Tonight**, **Tomorrow** (both
  8 pm), or **Pick a Date…**. **Now** starts as soon as a server is free.

A **Match Summary** beside the form shows the format, the kickoff, and whether
each side has a team and enough players, next to the **Create Match** button
(**Schedule Match** when the kickoff is later).

Pick-up games with a draft or a lobby to fill go through
[draft lobbies](/features/draft-lobbies) instead, and matchmaking creates its
own matches. See [Play & Matchmaking](/features/quick-play).

## Servers, your way

Pick how the match is hosted:

- **On-demand**: provision a fresh server in a chosen region automatically.
- **Dedicated**: use a server you manage in 5Stack.
- **Third-party**: point the match at an external server.

Players join with a **passwordless connect** link. Organizers can change the
match server from **Assign Match Server** in the admin dock's menu, and
**reboot the server** straight from the match page if something needs a reset
during setup.

## Lineups, check-in & substitutes

Each lineup has a captain, and can have **substitutes** (**Number of
Substitutes**, 0–5 extra slots per lineup) and a coach (**Allow Coaches**).

A **check-in** step makes sure everyone's actually present before the match
starts. **Check In Settings** decides who checks in:

| Setting                              | Who checks in                                                    |
| ------------------------------------ | ---------------------------------------------------------------- |
| **All Players Required to Check In** | Each player; a lineup is ready once a full side has checked in.  |
| **Captains**                         | Only the captains; a lineup is ready when its captain checks in. |
| **Admins**                           | Only administrators; players wait for an organizer to start it.  |

The match moves on once both lineups are ready, or when an organizer starts it
from the [admin dock](#running-a-match). The rule is enforced by the
server, not just by which buttons the page shows, and anyone outside the
lineups is refused.

Check-in has a deadline. With **Match Cancellation** on (the default), the
match page counts down **Check in within**, and if everyone required hasn't
checked in before it runs out, the match is canceled automatically. The time
allowed is the instance's **Auto Cancel Duration**, 15 minutes unless an admin
changes it, and a match or tournament can override it.

## Map & region veto

- **Map veto**: an interactive pick/ban flow; once a map is chosen, teams pick
  their **CT / T side**. The exact ban/pick sequence is generated deterministically
  from the pool size and best-of. See [Map Veto](/features/map-veto) for the
  full rules and worked examples.
- **Region veto**: teams can veto server regions so neither side is forced onto
  unfavorable latency.
- **Veto board**: both vetoes run on one board that lays out the whole order of
  play, and stays up while the match server starts. See
  [The veto board](/features/map-veto#the-veto-board).
- **Veto scouting**: during a Competitive, Wingman, or Duel map veto, the board
  shows each side's record on every map and the other side's usual bans and
  picks. See [Veto scouting](/features/map-veto#veto-scouting).

A match is played on the LAN or online, never both. Turn on **LAN Match** and
the region list holds only LAN regions, with no region veto; the server refuses
a region list that mixes the two.

## Match rules

Tune the match to the occasion: **knife round, overtime** (rounds and bomb timer),
**best-of-X**, **tactical/technical timeouts** per team (`.tac` and `.pause`),
**Pause at Halftime** for broadcasts, **Ready Settings**, **coaches**, default
player models, and more.

A **Game Mode** loads a custom mode's plugins and console variables on the
server. Matches with a custom game mode never count toward ELO or the
leaderboards. See [Game Modes](/features/admin/game-modes).

::: tip Rush
**Rush** is CS2's 3v3 mode, fought room by room on its own map pool, with its
own ELO. Its rules are fixed: one map, no map veto, played to 8 round wins, with
no overtime, no knife round, and no side swap.
:::

## Player cameras

A match can **require a webcam** from every player: they connect one from their
PC or by scanning a QR code with a phone, the server details stay hidden until
they do, and the match pauses automatically if a feed drops. Officials watch the
feeds from the panel, and the spectated player's camera can appear on the
broadcast. See [Player Cameras](/features/player-cameras).

## Your turn, wherever you are

Players in a match get a toast on any page when they need to act:

| Toast              | When                                       |
| ------------------ | ------------------------------------------ |
| **Match Check-in** | Check-in opens and you haven't checked in. |
| **Region Veto**    | It's your turn to ban a region.            |
| **Map Veto**       | It's your turn in the map veto.            |

Each has one **Open Match** button that takes you to the match (or its draft
room). A toast clears itself when the turn is over and stays hidden on that
match's own page, and dismissing one doesn't silence the next turn. See
[Notifications](/features/notifications#toasts).

The match-ready popup and redirect are remembered per player across reloads
and tabs, so a reload doesn't send you back to a match you already handled,
while each new match status still gets its popup.

## The match page

- The header and highlights are one stage: a scorebug in each map's score
  colours (with the T/CT split on a single-map match) above a theater player for
  the match's highlights, with an **Up next** list of clips beside it.
- **Your team** is marked with an amber ring on its crest in the header, and
  its header in the scoreboard and stat tabs gets the same amber rail as your
  own row.
- Players who queued together are marked **Queued together**.
- After a map veto, the header keeps the veto's order of play, under **Veto**,
  for the rest of the match.
- The tabs hold the scoreboard and analysis. See
  [Match Analysis](/features/match-analysis).
- Once a match has ended, moderators and above get a **Chat Log** tab
  with its all-chat and team chat. See
  [Match chat log](/features/chat#match-chat-log).

## Running a match

Organizers run the match from the admin dock at the bottom of the match page.
It's built to show what to do next rather than every control at once.

### Match steps

The dock starts with the match's steps:

`Check-in → Veto → Warmup → Live → Finished`

Veto only appears when the match has a map or region veto. The current step is
highlighted, and Live and Finished read **Paused** and **Canceled** when that's
where the match stands. Hover a later step to see what **Unlocks here** for
you.

### One main action per step

| Step     | Main action                                                                    |
| -------- | ------------------------------------------------------------------------------ |
| Check-in | **Start Veto**, or **Skip Check In** when there's no veto to run               |
| Veto     | **Veto Override**                                                              |
| Warmup   | **Force Ready**                                                                |
| Live     | **Skip Knife** during the knife round, then **Pause Match** / **Resume Match** |
| Finished | **Set Match Winner**                                                           |

**Cancel Match** and **Delete Match** sit beside the main action, and both
ask first. Tournament bracket matches can't be deleted from the match page.

**More actions** holds the rest: **Assign Match Server**, the current
**Winner**, live streaming, **Create Player Highlights**, **Reparse Match
Demos**, and a **Coming up** list of what unlocks later.

Controls your role can never use are left out instead of shown disabled:
Force Ready, Skip Knife, and pausing need a moderator, and highlights and
reparsing need an administrator.

### Setting a winner

**Set Match Winner** shows each team's map results (**2 won · 1 lost**) before
you pick. **Set Map Winner**, on a map card, asks for confirmation and tells
you when the change also decides the match: _This also makes Team A the match
winner._, or _This also clears the match winner._

## Disconnects

- If a player in a lineup disconnects mid-match, the match pauses at the next
  freeze time.
- When they reconnect, the match resumes on its own once the whole roster is
  back, counting lineup players only, so a caster or an admin on the server
  can't stand in. A tactical or technical pause is still left to the teams.
- If they aren't back within 3 minutes, their team gets a 30-second surrender
  vote, and the leave is recorded as an
  [abandoned match](/features/moderation#abandoned-matches). One leave is
  recorded once per match, however many times the player drops or however many
  maps the series has.
- A player who reconnects onto the wrong side is moved back at the next round
  start.

## When a series is decided

Once the deciding map is won, players are free straight away: they can queue
or join another game while the last map's TV delay and demo upload finish.

### Forfeits and surrenders

A match won by a forfeit or a surrender keeps that status, **Forfeit** or
**Surrendered**, and counts as a result everywhere a finished match does: it
shows its winner, counts toward the leaderboards, and can't be canceled or
started again.

A match nobody played, such as a forfeit at check-in or a winner set by hand
before any map went live, only changes the Elo of its no-shows, the players
recorded as having [abandoned](/features/moderation#abandoned-matches) it.
Everyone who turned up, on either side, keeps their rating.

## Watching live

While a match is live you can follow the score and action in real time, jump in
to spectate, or [broadcast it](/features/live-streaming). When it's over, the demo
is uploaded automatically and turned into [replays](/features/match-replay),
[highlights](/features/highlights), and [stats](/features/stats-and-leaderboards).
