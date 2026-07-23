# Tournaments & Brackets

5Stack runs full tournaments end to end, registration, multi-stage brackets,
scheduling, and trophies, with a live bracket you can embed anywhere.

## Running a tournament

An organizer can create a tournament with a name, description, and start time,
then take it through its lifecycle: open registration, close registration, start,
pause/resume, reset to setup, or cancel.

Along the way you can configure:

- **Auto-start** at the scheduled time.
- **Map pool**: use the default for the tournament type or a custom selection.
- **Match options**: veto, region (single region or region veto), and a TV delay
  (0–120s) for broadcasts.
- **Registration**: open/private signups, with team eligibility and a minimum
  number of players per team.
- **Discord notifications** for tournament events.
- **Organizers**: add co-organizers to help run the event.

Teams can self-register while registration is open, or organizers can add them
manually. Organizations can also enter their own teams, and co-organizers can be
added as **organizer teams** rather than one person at a time.

Once a bracket is seeded, a **roster lock** kicks in: a team's roster can't drop
below the minimum lineup size, so a withdrawal can't silently break a live
bracket. Swapping a player out means bringing a substitute in.

## Presenting the event

A tournament page is built to be shown off, not just administered:

- **Banner image**, description, and an external **homepage** link.
- **Prize pool** with per-placement distribution (drag to reorder; places
  renumber automatically, and labels can be overridden).
- **Location**: a physical venue with a map link, and a **LAN** designation for
  in-person events.
- **Categories** for classifying the event.
- Tabs for Overview, Teams, Information, Prizes, Match Options, Location,
  Organizers, Trophies, and Discord.

Tournaments can also be grouped under an [Event](/features/events) alongside
other tournaments, teams, and players, with a shared medal table and media
gallery.

## Discord

Per-tournament Discord settings drive notifications for tournament events, and
**voice channels** can be created automatically for tournament matches, players
are moved into their team's channel when a match begins. See
[Discord Bot](/advanced/discord-bot/).

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
  and are ranked in one table without anyone being eliminated. The bracket
  renders by record pool (2-0, 1-1, 0-2) with live **ADVANCED** and
  **ELIMINATED** states.

Each stage can be configured with:

- **Groups**: split a stage into parallel groups for a group stage.
- **Min / max teams** for the stage.
- **Best-of**: a default (BO1/BO3/BO5) for the stage, with optional per-round
  overrides.
- **Seeding**: automatic or custom, with automatic **bye** handling.

Teams advance between stages automatically. A real configuration might run
Round Robin (BO1, 32 teams) → Swiss (BO1, 16 teams) → Single Elimination (BO5,
4 teams), with each stage feeding the next.

## Brackets

The bracket updates live as matches finish. Organizers can schedule matches
straight from the bracket, zoom and fit it to the screen, switch between split and
scrolling views, hide finished rounds, and go fullscreen.

Scheduling can be applied as a default across the bracket rather than match by
match, and 5Stack estimates when each round is likely to be reachable so
schedules stay realistic.

If a match went wrong, organizers can **reset** it. The reset shows a **preview**
of exactly what it will undo, including any downstream matches that already
advanced, before you commit.

There's also a **public, embeddable bracket** you can drop into a stream or
website via an iframe. It updates in real time and shows the tournament name,
stage, teams, and seeds. It can **auto-cycle** through stages and groups on a
timer and highlight live matches, making it a ready-made overlay for broadcasts
and venue signage.

## Trophies

Tournaments can award customizable trophies for the top placements and an MVP,
which count toward the [leaderboard](/features/stats-and-leaderboards).
