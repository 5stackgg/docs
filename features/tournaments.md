# Tournaments & Brackets

5Stack runs full tournaments end to end, registration, check-in, free agents,
multi-stage brackets, scheduling, stats, and awards, with a live bracket you can
embed anywhere.

## Finding tournaments

The **Tournaments** page leads with what is happening now:

- **Next LAN**: the soonest upcoming tournament in the **LAN** category, as a
  strip (or the full card when nothing is live).
- **Live**: running tournaments, the first one featured.
- **Upcoming**: an agenda of everything still to come, grouped by month.
- **Recent results**: finished tournaments, with **See all**.

Any tournament can be opened in a **Quick look** sheet without leaving the
list: registration rules, check-in window, map pool, and final standings, with
the buttons to register or join as a free agent.

Search by name and narrow the list by **Status** (All, Live, Open, Upcoming,
Finished). **Filters** adds a **Date** range, **Category**, and **Only
tournaments I organize**.

Tournament cards show when you are already in: **Registered**, **Joined as a
free agent**, or **Free agent · waitlisted**. Tournaments that are open for
registration also appear on the [Play page](/features/quick-play).

## The tournament page

The header carries the banner, logo, status, match type, categories, start
time, location, format, a **Homepage** link, and the organizers. Its buttons
are **Join Tournament** while registration is open, **Chat Room**, and, for
organizers, **Manage** with the **Tournament status** menu beside it.

Below it, five tabs:

| Tab          | What it shows                                                                                                                           |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| **Overview** | Prize pool, teams, format, start, and location at a glance; the podium, MVP, and stage standings; prizes; **About**; **Match Settings** |
| **Bracket**  | Every stage's bracket (shown once stages exist, or to organizers)                                                                       |
| **Matches**  | Every match in the tournament as a full row, filtered **Live**, **Upcoming**, **Results**, or **All**                                   |
| **Teams**    | Every entered team as a card, your own first, and the **Free Agents** pool (see [The Teams tab](#the-teams-tab))                        |
| **Stats**    | The tournament's **Player leaderboard**                                                                                                 |

**Matches** and **Stats** appear once the tournament is live. Above the tabs,
the page shows whatever needs your attention first: an invite to accept, the
entry requirements you do or don't meet, and the check-in panel.

An owner with several teams entered switches between them with **Viewing**.
Its menu, **Teams you registered**, lists each with **You play** or **Owner**,
its player count and its check-in state, and the check-in panel and your team's
card follow the one picked. Only the team they play on is theirs to check in
(see [Check-in](#check-in)).

### The Teams tab

The **Teams** tab lays the field out as a grid of cards, with your own team full
width and its roster open. **Expand all** and **Collapse all** open or fold
every roster, **Search teams or players** finds anyone in the field, and the
filters are **All**, **Ready**, **Checked in**, **Not Checked In**, **Missed**
and **Needs Players**. A permanent team's card is tagged **Team** and carries
its country flag; a team made for this tournament is tagged **Tournament
only**.

### Tournament chat

Entrants and organizers share a **Chat Room** for the tournament, from setup
through the last match. It stays open for **7 days after the tournament
finishes**, marked _Ended · closes in_ the time left, so teams can wrap up.

## Running a tournament

Creating a tournament is a wizard: **Information**, **Location**,
**Registration**, **Match Options**, and **Prizes**. It then drops you into
**Stages**, which decide the format and the bracket.

After that, everything lives in the **Manage** console on the tournament page:

| Section                | What you set                                                                    |
| ---------------------- | ------------------------------------------------------------------------------- |
| **Details & branding** | Logo, banner, name, homepage, description, start date, categories, and location |
| **Registration**       | Who can register, entry requirements, invite only, and check-in                 |
| **Teams & invites**    | **Add Team**, direct **Invites**, and invite **Links**; the check-in review     |
| **Stages**             | The stages that make up the bracket                                             |
| **Match rules**        | Match type, map pool, veto, region, TV delay, scheduling, and substitutes       |
| **Prizes & awards**    | Prize places, the award for each placement, and manual awards                   |
| **Organizers**         | Co-organizers and organizer teams                                               |
| **Discord**            | Notifications and voice channels                                                |

The **Tournament status** menu takes it through its lifecycle: **Open
Registration**, **Close Registration**, **Start Tournament**, **Pause
Tournament**, **Resume Tournament**, **Reset to Setup**, **Cancel Tournament**,
and **Delete Tournament**. An action that can't run yet says why, for example
that the start time has passed, the bracket is full, or there is no stage.
Canceling or deleting a tournament that has played matches lists the matches it
would delete, and each has to be ticked before it goes ahead.

A tournament without check-in that is still open for registration at its start
time starts on its own then, as long as it has enough teams: registration
closes, free agents are drafted, and the bracket is seeded. One left open more
than 15 minutes past its start waits for an organizer to start it.

**Match rules** also holds:

- **Auto Start**: schedule tournament matches automatically, or leave each one
  for an organizer to schedule.
- **Negotiated Scheduling**: teams agree their own match times instead, see
  [Negotiated match times](#negotiated-match-times).
- **Allow Substitutes**: let teams roster and field substitutes beyond the
  starting lineup, up to the site's
  [substitute limit](/features/admin/roles-and-players#teams). It can't be turned off once registration has closed.
- **Map pool** and **match options**: veto, region (single region or region
  veto), and a TV delay (0–120s) for broadcasts. A change here, such as moving
  the tournament to another region, reaches every stage and every match that
  hasn't started yet, unless a stage or match was given its own value.

Teams can self-register while registration is open, or organizers can add them
with **Add Team**, as many as they need. Organizations can enter their own
teams, and co-organizers can be added as **organizer teams** rather than one
person at a time. A team owner can enter several of their teams in the same
tournament, but a player can be on only one roster in it.

Once a bracket is seeded, a **roster lock** kicks in: a team's roster can't drop
below the minimum lineup size. Swapping a player out means bringing a substitute
in.

### Banner and logo

The logo and banner uploads open a crop editor with a **Where it shows**
preview of each place the image appears. A dashed **Safe zone** marks where text
and logos survive every crop. The editor warns when an image is too small, and
logos can use **Remove background**. Banners are saved at 2400 × 800 (3:1).

### Presenting the event

- **Prize pool** with per-placement distribution (drag to reorder; labels can
  be overridden).
- **Location**: the venue or city, found by address search.
- **Categories**: **LAN**, **Location Event**, **Online Event**, or **League**.

Tournaments can also be grouped under an [Event](/features/events) alongside
other tournaments, teams, and players, with a shared medal table and media
gallery.

## Registration and join rules

**Who can register?** decides how the field is built:

| Option                  | How teams form                                                                      |
| ----------------------- | ----------------------------------------------------------------------------------- |
| **Teams only**          | Captains register an existing team. The default.                                    |
| **Free Agents**         | Players sign up alone and are drafted into balanced teams when registration closes. |
| **Teams + Free Agents** | Both. Leftover free agents are drafted into extra teams alongside registered ones.  |

Entry requirements are checked against **every player being added**, not just
whoever clicks, so a captain can't roster an ineligible teammate:

- **Minimum role**: the lowest role a player needs.
- **Rank range**: a **Min ELO** and/or **Max ELO**. The rating used matches the
  format: Wingman for 2-player lineups, Rush for 3, Competitive otherwise, and
  the current season's rating when [seasons](/features/seasons) are on. A player
  with no rating yet counts as 5000.
- **Invite only**: registration is closed to the public. Organizers send
  **Invites** to a team or a player, or generate invite **Links** that expire
  after a set time (30 minutes up to 7 days, or never), cap their uses (1 to
  100, or no limit), and can be revoked. Each link lists **Who used it**.

Players see the requirements on the tournament page as **Entry requirements**,
each marked met or not met, and someone arriving from an invite link gets a
**You have an invite** prompt to **Accept invite** first.

### Joining as a team

**Join Tournament → As a team** enters one of your teams, or **Create New Team**
makes one for the tournament. A new team is for this tournament only unless you
turn on **Keep as a Permanent Team** (off by default), which also adds it to
your teams with its own page and stats.

Adding a player from outside a permanent team's roster to its entry sends one of
two invites, and the player sees which before accepting:

| Invite                   | When                                    | What the player joins                                                          |
| ------------------------ | --------------------------------------- | ------------------------------------------------------------------------------ |
| **Team + lineup invite** | The team doesn't have a full lineup yet | The team and this tournament's lineup                                          |
| **Stand-in invite**      | The team already has a full lineup      | Only this tournament's lineup: "Stand in for {team}, without joining the team" |

The team's owner, its roster Admins and players with the Invite role, and site
administrators can send them.

::: tip No-shows can be sanctioned
A player with an active tournament sanction can't enter new tournaments. By
default, missing three required check-ins within 30 days bars a player from
tournaments for 7 days. Admins tune this under **Tournament No-Show** in
**Settings → Application → Sanctions**. The check runs on the way in only, so a
player already in a running bracket keeps their place.
:::

## Check-in

Turn on **Require check-in** and teams must confirm they're attending before the
bracket is seeded.

- **Who checks in?**: **Captains** (the captain, or a team admin who plays on
  the team, confirms for the whole team), **Every player** (the team is in once
  a full starting lineup confirms; substitutes don't have to), or **Organizer
  only** (players can't check themselves in; organizers **Mark present**).
- **Window opens**: 15–240 minutes before start (default 60).
- **Window closes**: 5–60 minutes before start (default 15). The window always
  stays open at least 5 minutes.

A timeline previews the window against the start time. Once the window opens,
the start time and both offsets lock.

A team is checked in by someone who plays on it, never by an owner managing it
from outside. Everyone else, including an owner who doesn't play on the team,
sees _Waiting for Alex to check in_. A team's captain is always
someone on its tournament roster: if the team's own captain isn't on it, the
captaincy goes to the owner when they play, otherwise a team admin, otherwise a
starter. Organizers can mark any team present.

A team that registers during the window is checked in automatically when
whoever registers it could check it in (its captain or a team admin who plays
on it), or when an organizer adds it.

Teams that still need to check in get a notification when the window opens
and a reminder 5 minutes before it closes, and a countdown sits at the top of
the tournament page.

When the window closes:

- If every team checked in, registration closes and the bracket is seeded.
- If any team missed it, the tournament is **held**. Organizers see _N teams
  missed check-in_ with three choices: **Re-admit** a team, **Continue without
  them**, or **Extend check-in** by 5, 10, 15, or 30 minutes, which re-notifies
  the missing teams.

A held tournament never stalls: if nobody acts, it continues on its own at its
start time with whoever checked in. No-shows are never deleted: a team that
missed check-in keeps its roster and can be re-admitted any time before the
tournament goes live.

Free agents check in too. One who hasn't confirmed by the cutoff is moved to the
waitlist and isn't drafted.

## Free agents

A player without a team signs up alone with **Sign up** (or **As a free agent**
when the tournament takes both). The **Free Agents** pool on the Teams tab lists
everyone still waiting with their 5Stack, Premier, and FACEIT ranks.

When registration closes, the pool is drafted into teams of the tournament's
lineup size:

- **Who plays is sign-up order.** Everyone past the last full team is
  waitlisted.
- **Which team is ELO.** Players are spread by Elo so teams come out balanced.
- Drafted teams are numbered (_Team 5_, _Team 6_, …) after the teams already
  entered, and the highest-rated player stands in as owner and captain. If
  they leave, both roles pass to the next highest-rated teammate.

Players who sign up after the draft join the waitlist and are placed straight
into any drafted team that is short, and a seat that opens on a drafted team is
refilled from the waitlist the same way.

**A player is on a team or in the pool, never both.** Registering or joining a
team takes you out of the pool. You can leave with **Leave pool**, but once
you've been drafted onto a team, only while registration is still open.

### Recruiting free agents

While registration is open and their roster has an open seat, a team's owner,
captain, or roster admins can **Invite** anyone in the pool. The free agent
joins only if they accept. Free agents are also tagged **Free agent** in the
roster's player search.

### Managing the pool

Organizers can **Add Free Agent** and **Remove** players while registration is
open or during check-in review, and see a forecast of the draft. **Draft
teams** runs the draft early; it runs once, so drafting again does nothing
until the drafted teams are removed.

## Stages & formats

A tournament is made of one or more **stages** run in sequence, each with its own
format:

- **Single Elimination**: knockout, with an optional third-place match between
  the two semifinal losers.
- **Double Elimination**: winners and losers brackets, with an optional **final
  map advantage**: a map-point head start the winner-bracket team carries into
  the grand final.
- **Round Robin**: everyone plays everyone, or cap it with **max rounds** so
  each team plays a set number of distinct opponents.
- **Swiss**: in two flavours. By default it's **Valve Swiss**: advance at 3
  wins, out at 3 losses. Turn on **Swiss group (no elimination)** for the
  **ESEA-style** variant, where teams pair by record for a fixed number of rounds
  and are ranked in one table without anyone being eliminated.

Each stage can be configured with:

- **Groups**: split a stage into parallel groups for a group stage.
- **Min / max teams** for the stage.
- **Best-of**: a default (BO1/BO3/BO5) for the stage, with optional per-round
  overrides.
- **Seeding**: automatic or custom, with automatic **bye** handling.

Every stage plays the tournament's map pool, and a best-of can't be longer than
the pool has maps.

Teams advance between stages automatically.

### What locks when

The bracket is drawn from the stages when registration closes (or earlier, as
soon as a team or match lands in a bracket). From then on:

- A stage's **type, teams, and groups** are locked. **Best-of** can still
  change.
- A stage's **match settings** are locked.
- The tournament's **match type and map pool** are locked.

To change any of these, reset the tournament to setup.

## Brackets

The bracket updates live as matches finish. You can zoom and fit it to the
screen, switch between split and page-scroll views, hide finished rounds, go
fullscreen, and **Follow a team** to dim every match it isn't in. Organizers can
schedule matches straight from the bracket.

Organizers can open a scheduled bracket match, or one in check-in, and edit its
**Match Settings**. They're marked **Rules locked**: every match in a stage
plays the same format, maps, rounds, overtime, timeouts and substitutes, while
its region, TV delay, check-in and timers can still change. An empty bracket
slot can be set up the same way before its teams are known, or left on **Use
stage settings**.

If a match went wrong, organizers can **Reset winner**. The reset shows a
**preview** of exactly what it will undo, including any downstream matches that
already advanced, before you commit.

Tournament matches can't be deleted from the match page. A bracket slot whose
match was deleted earlier shows **Recreate Match**, which gives the two teams a
new match and takes the team that advanced back out of the next round until
it's played. It isn't offered once the next round has started.

There's also a **public, embeddable bracket** you can drop into a stream or
website via an iframe, from **Share** or **Popout**. It updates in real time,
and can follow the **Current stage**, stay on a **Specific stage**, or **Cycle
all stages** on a timer.

## Negotiated match times

With **Negotiated Scheduling** on, teams agree their own match times on the
bracket instead of matches starting automatically. Each bracket card with two
teams gets a **Schedule** control:

- A team's owner, captains, and roster admins can **Propose time**.
- The other side can **Accept**, **Counter** with a different time, or
  **Decline**. Past proposals stay under **History**.
- A time must fall inside the round's scheduling window when the stage has one,
  otherwise within the next two weeks.
- A match can be renegotiated until it goes live.

[League](/features/leagues) matches are scheduled the same way from the league's
own schedule.

## Results, MVP, and stats

Once the tournament is live, the **Overview** shows each stage's standings,
marked **LIVE · PROVISIONAL** until it finishes. When it finishes, the podium
and the MVP join them.

The podium is 1st, 2nd, and 3rd from the last stage, with the players who
played for each team. It shows even when the tournament doesn't hand out
awards, headed **Standings** instead of **Awards**. A single-elimination final
without a third-place match puts both semifinal losers on 3rd, and a last stage
played in several groups has no podium.

Hover the MVP label for **How the MVP is chosen**: the player on the winning
team with the highest average impact across every match of the tournament.
The card shows the MVP's average impact, matches played, and the next best
player. An MVP the organizers picked reads **Picked by the organizers**, and its
card shows their note and who the automatic pick was. Any other awards granted
in the tournament are listed under the MVP.

The **Stats** tab ranks every player in the tournament in a **Player
leaderboard**: **Rating**, **ADR**, kills, deaths, assists, **K/D**, and
**HS%**, with totals for matches, rounds, players, and the top rating. It fills
in as matches finish.

### Picking the MVP

The MVP is picked automatically when the tournament finishes, and organizers
can change it under **Manage → Prizes & awards → Tournament MVP**. **Change
MVP** (or **Pick MVP** when there is none) lists the winning team's players who
played, best average impact first, with the automatic pick marked
**Suggested**. Add an optional note of up to 140 characters and **Confirm
MVP**: the new MVP gets the award and its notification, and the player it
replaces loses the MVP award but keeps their 1st place medal.

- **I'll pick the MVP myself** stops the automatic pick for this tournament:
  it has no MVP until an organizer picks one. Turned on after the finish, it
  keeps the MVP already given.
- Organizers can't pick themselves; an administrator can.
- **History** lists every MVP the tournament has had, and who picked each.
- There is only an MVP once the tournament has finished and when awards are
  on, and it is picked here rather than granted under **Manual Awards**.

## Discord

Per-tournament Discord settings drive notifications for tournament events, and
**voice channels** can be created automatically for tournament matches, players
are moved into their team's channel when a match begins. See
[Discord Bot](/advanced/discord-bot/).

## Awards

Tournaments hand out an award for each of the top placements and an MVP, which
count toward the [leaderboard](/features/stats-and-leaderboards).

Placement medals go to the placing team's players who actually played in the
tournament, not to everyone on its roster. When both semifinal losers share
3rd, no Third Place award is handed out automatically; an organizer can grant
one by hand.

### Prize Board

Under **Prizes & awards**, the **Prize Board** sets everything each placement
wins (1st, 2nd, 3rd and MVP): [Career](/features/career#prizes) Locker items
and Stacks for every player on the team. Players see it on the tournament page
as **What you can win**. With awards off, each place still wins the Stacks and
items on its board.

### Award catalog

Each placement resolves to an award from the site-wide catalog. Leave it on the
default and the tournament uses the built-in Champion / Runner-Up / Third Place
/ MVP awards; pick one of your own and winners receive that instead. Either way
you can still override the name, silhouette, or artwork for this tournament
only.

Administrators author the catalog on the **Awards** page under
**Administration**, where awards can also be granted to a player or team by
hand, with no tournament required. A hand-granted 1st, 2nd, or 3rd place award
for a tournament takes that placement on its podium. Two role settings in
**Settings → Application → Awards**, **Manage Awards Role** and **Grant Awards
Role**, control who can author awards and who can grant them; tournament
organizers can always grant awards inside their own tournament under **Manual
Awards**.
