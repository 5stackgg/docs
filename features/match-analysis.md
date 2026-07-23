# Match Analysis

Every finished match is parsed down to the tick, which means the match page is a
lot more than a scoreboard. This is what's in there, and where to find it.

## The match page

Across the top: the scoreline with both lineups, a **round-by-round strip**
showing survivors and the win reason for each round, and an **auto-playing
highlight queue** ("Up Next") ranked by multikill for that match.

Below that, an analysis tab for each way of looking at the game. Use the **map
filter** to look at one map or the whole series.

### Scoreboard

The scoreboard has five lenses, switchable without leaving the tab:

| Lens              | What it shows                                                               |
| ----------------- | --------------------------------------------------------------------------- |
| **General**       | Rating, K/D/A, ADR, KAST, HS%, and the usual headline columns               |
| **Aim**           | Accuracy, spotted accuracy, crosshair placement, reaction, counter-strafing |
| **Trades**        | Trade kills, traded deaths, and how often deaths were traded                |
| **Utility**       | Flash assists, enemies blinded, utility damage, nade counts                 |
| **Opening Duels** | First-fight wins, losses, attempts, and traded deaths                       |

Filter the whole scoreboard by **side (T / CT / All)**, and configure which
columns you care about, your column set is remembered.

### Economy

A **round economy** timeline of each team's start-of-round money across the map,
annotated with who won each round, so eco calls, force-buys, and broken
economies are visible at a glance.

Alongside it, the **Buy Type Breakdown** classifies every round into pistol /
eco / force / full and reports win rate across six matchups:

`Pistol v Pistol` · `Full v Full` · `Full v Eco` · `Full v Force` ·
`Eco v Full` · `Force v Full`

### Clutches

Every 1vX situation in the match, won, lost, and saved, broken out by how many
opponents were left, with total kills in clutch rounds.

### Head to Head

A **matrix** of who killed whom, and how often. Open any pairing to see the
damage traded, which weapons each player used against the other, and flashes
thrown on each other.

### Roles

Roles are **auto-detected per match** from AWP usage, opening-duel involvement,
and utility output: **Sniper, Entry, Support, Lurker, Rifler**, with the signals
behind each detection shown.

### Map Analysis

Positional analysis rendered over the map radar, in two modes:

**Heatmap**, plot **kills, deaths, utility, or utility damage**, rendered as a
true heat intensity or as individual dots. Filter by side, player, round window,
and utility type (HE / Molotov / Smoke / Flash / Decoy), and draw grenade
**trajectories** rather than just detonation points.

**Paths**, aggregated movement paths for the opening seconds of rounds, filtered
by side, team, and player, so you can see setups and default positions rather
than guessing at them.

From either mode you can jump straight into
[2D playback or the 3D replay](/features/match-replay).

### Team stats

A per-team KPI panel with **round win %, pistol win %, opening win %, trade %,
5v5 and 4v5 win rates, UDR, and flash assists per round**, split by **CT and T
side**, plus the team's **buy mix** and rounds won from each buy type.

## Player profiles

A player profile is the same depth, aggregated over time. Six tabs:

- **Performance**: the [Performance Rating](/features/performance-rating)
  breakdown, focus areas, and consistency.
- **Breakdown**: headline metric cards with sparklines and recent-form trend.
- **ELO**: a dated Elo progression chart with per-match deltas, plus current,
  peak, and lowest.
- **Maps**: career performance per map with **T and CT side splits**, win rate,
  rating, ADR, K/D, and UDR.
- **Arsenal**: per-weapon kills, ADR, KPR, rating, and an **economy rating**
  that adjusts for buy cost, so frags with cheap weapons rate higher.
- **Combat**: career opening duels (win %, attempts, opening K/D, how often you
  were traded when opened) and clutches, broken down by map.

Plugins can contribute additional profile tabs, see
[5Stack Plugin Development](/plugins/).

Everything on the profile respects the same filters: **source** (5Stack vs.
imported), **provider** (Valve / FACEIT), **game mode**, **time window**
(L30 / 7D / 30D / 90D / 1Y / All / season or a custom range), **role**, and an
**exclude tournaments** toggle. A percentile rank badge and recent win/loss strip
sit up top, and you can **pin another player** to compare.

## Team analytics

Team pages carry two things you won't find in most panels.

### Veto tendencies

**Map Preference & Veto Tendencies**, how a team actually approaches the veto,
built from its recorded map vetos: most banned, most picked, its comfort map, and
per-map counts for **played, win %, banned, picked, first ban, first pick, and
decider**.

### Veto simulator

Pick an opponent and **Veto Simulation** estimates the likely veto outcome from
both teams' histories: per-map **ban likelihood, pick likelihood, play
likelihood, and predicted win %**, with the number of veto records behind each
side shown so you know how much to trust it.

It's an estimate derived from historical tendencies, not a guarantee, the app
says so too, but for prep it beats a whiteboard.

## Where the data comes from

All of this is computed from the parsed demo, which means it works the same for
matches played on your servers and for
[imported Valve, FACEIT, or manually uploaded demos](/features/external-matches).
