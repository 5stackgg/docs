# Draft Lobbies

A draft lobby is a pick-up game with structure. You host a room, players join,
teams get formed the way you chose, and the match starts, no spreadsheets, no
"who's captain?", no arguing about the pick order.

Browse open lobbies and host your own from **Play → Draft Lobby**.

## Hosting a room

Creating a lobby is three steps: **Draft Mode**, **Match Settings**, then
**Lobby Rules**.

### Draft mode

Pick how teams get formed:

| Mode               | What happens                                            |
| ------------------ | ------------------------------------------------------- |
| **Auto-Split**     | No draft, teams are auto-balanced when the lobby fills. |
| **Captains Draft** | Two captains take turns picking players.                |
| **Host Assigns**   | You build both teams yourself.                          |
| **Pre-Made Teams** | Pick two saved teams to face off.                       |

**Pre-Made Teams** has an extra wrinkle: a single team is enough. Set one team
and leave the other side open for a team-against-the-world match, or turn on
**Inner Squad** to split one roster across both sides for an intra-squad scrim.
Starters fill in automatically and you can tap a player to swap them between the
lineup and the bench.

### Captain selection

For a captains draft, choose how the two captains are decided:

- **Top 2 by Rank**
- **Host & Next Highest** (only when the host is playing)
- **Random Two**
- **Manual**: you pick them in the room

### Draft order

- **Snake** (1-2-2-1)
- **Alternating** (1-2-1-2)
- **Front-Loaded** (1-2-2-1-2-1)

### Lobby rules

- **Lobby access**: Open, Friends, or Invite-only. Setting both teams up front
  locks the lineup, so the lobby stays private.
- **Require approval**: players _request_ to join and you pick who plays from a
  queue, instead of first-come-first-served.
- **Host only**: create and manage the lobby without being added as a player.
- **Keep lobby together**: everyone in your current party joins on the same team.
- **Rank gate**: an optional minimum/maximum rank for joining.

Match settings (map pool, MR, best-of, overtime, knife round, coaches, map veto,
region) are configured inline in the same flow, see
[Matches](/features/matches) for what each option does.

## The draft room

Once players are in, the room runs the draft:

- A **pick clock** shows who's on the clock, whose turn is next, and the full
  pick order.
- A **coin flip** decides first pick where it matters.
- The **draft log** records every pick as it happens.
- **Lobby chat** runs alongside the draft (players only during the draft itself).
- Drag a player to the **bench** to make them a backup, per side or unassigned.
- The lobby has an **expiry timer**, and the host can extend it for another 30
  minutes.
- **Copy Invite Link** pulls people in directly, and you can invite friends
  straight from the room.

### Substitutes and the sub queue

If the lobby is full, players can **join the waitlist**. When a slot opens they
**auto-join**, no one has to notice and re-invite them. Backups sit on each
team's bench and can be swapped into the lineup at any time.

### Join requests

With **require approval** on, the host gets a **Join Requests** queue and can
accept a player into the lineup, accept them **as a backup**, or deny them.

## Starting the match

When both teams are set, the host hits **Start Match**. Players check in, the
server is provisioned, veto runs, and from there it's an ordinary 5Stack match,
demo, [stats](/features/stats-and-leaderboards),
[replay](/features/match-replay), and [highlights](/features/highlights) all
included.

**Re-host Last** recreates your previous lobby with the same settings in one
click.

## Browsing lobbies

The lobby list shows every open room with its pool, region, player and sub
counts, and average rank. Filter by **average rank** and **has space**, search by
any player in the room, and sort by closest-to-full, newest, or rank.

You can join as yourself or **join with your party**, bringing your whole
matchmaking group into the room together.
