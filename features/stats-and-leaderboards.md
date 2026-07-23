# Stats & Leaderboards

5Stack tracks far more than kills and deaths. Every parsed match feeds detailed
per-player stats, an Elo rating, and global leaderboards, from native 5Stack
matches as well as imported [Valve and FACEIT](/advanced/faceit-integration) matches.

## Player stats

Each player's profile shows their performance across several dimensions:

**Overall**

- **5Stack Elo** with peak / lowest and net change over the selected window.
- **Win rate** and **K/D ratio**.
- An **Elo chart** that buckets to weekly/monthly for long ranges.

**Per-round / per-match**

| Stat            | Meaning                                            |
| --------------- | -------------------------------------------------- |
| **HLTV Rating** | Standard CS2 rating (1.0 ≈ average)                |
| **ADR**         | Average damage per round                           |
| **KPR / DPR**   | Kills / deaths per round                           |
| **KAST**        | % of rounds with a Kill, Assist, Survive, or Trade |
| **UDR**         | Utility damage per round                           |
| **HS%**         | Headshot kill percentage                           |

**Combat analysis**

- **Opening duels**: first-fight wins, losses, attempts, and traded deaths.
- **Clutches**: 1vX situations won, lost, and saved.
- **Preferred roles**: Sniper, Entry, Support, or Rifler, detected from play
  patterns.
- **Weapon affinity**: most-used weapons by lifetime kills.

You can also **compare** two players side-by-side.

For the per-map, per-weapon, and per-duel breakdowns behind these numbers, see
[Match Analysis](/features/match-analysis).

## Performance Rating

Beyond the raw numbers. Every player gets a **Performance Rating**, Aim,
Positioning, and Utility each scored out of 100 as a percentile against every
other player, with focus areas and coaching notes on the specific habits costing
them rounds. See [Performance Rating](/features/performance-rating).

## Filtering

Player stats can be sliced by:

- **Source**: 5Stack only, external (Valve / FACEIT imports), or all.
- **Provider** (external), Valve, FACEIT.
- **Match type**: Competitive, Wingman, Duel, Premier.
- **Time window**: last 30 matches, 7d, 30d, 90d, 1y, or a custom range.
- **Role**, and an option to **exclude tournaments**.

## Leaderboards

The leaderboard ranks players across more than ten categories:

- **Elo** (with Elo change and win streak)
- **Best Rating**, **ADR**, **KPR**, **KAST**, and **UDR** (per-map stats)
- **Best K/D Ratio**, **Win Rate**, and **Headshot %**
- **Trophies**: Gold / Silver / Bronze finishes and MVP awards

Filter by time window (all-time, 7 days, 30 days) and match type (Competitive,
Wingman, Duel); per-map categories can also filter by role, and tournament
matches can be excluded. You can sort by any column and jump straight to a
specific player's rank.

If [competitive seasons](/features/seasons) are enabled, the leaderboard also
gets a **season selector**, so you can rank the current season or any past one
instead of all-time.

## Importing external matches

Stats aren't limited to matches played on your servers. Players can import their
public Valve and FACEIT matches, or upload a demo by hand, so their full history
counts here too. See [External Matches](/features/external-matches).
