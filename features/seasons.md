# Competitive Seasons

Seasons give your instance a competitive reset. At the start of each one,
regular-match Elo returns to **5000**, so the ladder starts fresh and last
season's grind doesn't lock in the top of the leaderboard forever.

Seasons are optional, turn them on from
**Settings → Application → Seasons**.

## The season ledger

Seasons are a continuous, non-overlapping timeline. Each one has a number, an
optional description, a start date, and an end date (leave it empty for an
**ongoing** season). Dates are in UTC and begin at 00:00.

The ledger groups seasons into **Active**, **Upcoming**, and **Past**, shows a
countdown for the current one, and lets you:

- **Change start** or **change end date**
- **End now** or **make ongoing**
- **Delete** a season

Deleting a season removes it and reverts its matches to no season. Elo history
is kept, not destroyed, only that season's per-season stats are cleared.

## What's season-scoped

Once seasons are on, Elo and stats are attributed to whichever season a match
falls into. That flows through the platform:

- **Leaderboards** get a season selector, so you can rank the current season or
  any past one.
- **Player profiles** can be filtered to a season window alongside the usual
  L30 / 7d / 90d ranges.
- **Off-season** matches (outside any season range) are tracked separately.

## Rebuilds

Season Elo and stats are recomputed automatically as matches finish. If
something looks wrong, usually after changing a season's dates, the season is
flagged with **Rebuild Required** and its standings are marked out of date.

**Rebuild Elo** recomputes that season's Elo and stats from every match in it. It
runs in the background with live progress (`rebuilt X of Y matches`), and can be
canceled while it's running.

::: tip
A rebuild is a maintenance tool, not a routine one. Normal play keeps a season
current on its own.
:::

## Related

- [Stats & Leaderboards](/features/stats-and-leaderboards), what Elo measures
  and how leaderboards are ranked.
- [Leagues](/features/leagues), league seasons are a separate concept: a
  competition with divisions and a schedule, rather than a scoring window.
