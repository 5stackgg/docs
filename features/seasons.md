# Competitive Seasons

Seasons give your instance a competitive reset. At the start of each one, Elo
returns to **5000**, so the ladder starts fresh and last season's grind doesn't
lock in the top of the leaderboard forever.

Seasons are optional, turn them on from
**Settings → Application → Seasons**.

## The season ledger

Seasons are a continuous, non-overlapping timeline. Each one has a number, an
optional description, a start date, and an end date (leave it empty for an
**ongoing** season). Dates are in UTC and begin at 00:00.

The **Seasons** page shows the **Active** season with a countdown to its end,
and lists the rest in the **Season Ledger** as **Upcoming** or **Ended**. From
there an admin can:

- **Change Start** or **Change End Date** (**Set End Date** on an ongoing
  season)
- **End Now** or **Make Ongoing**
- **Delete** a season
- **Grant Award** to a player or team for the active season

Giving the latest season an end date, or ending it with **End Now**, creates
the next season starting at that exact moment, so play is never left between
seasons.

Deleting a season removes it and reverts its matches to no season. Elo history
is kept, not destroyed, only that season's per-season stats are cleared.

## What's season-scoped

Once seasons are on, Elo and stats are attributed to whichever season a match
falls into, tournament matches included. That flows through the platform:

- **Leaderboards** list every season in their time selector and default to the
  current one.
- **Player profiles** add a season picker (**S3**, **S2**, ...) beside **L30**,
  **7D**, and **90D**, which scopes every stats tab to that season's dates.
- **Off-season** matches (outside any season range) are tracked separately.

## On player profiles

### Season pace

When a player has a rating from the previous season, the Elo card on their
profile races this season against it. **S3 vs S2** plots both seasons by
match number, so match 20 of this season sits over match 20 of the last one,
and the card reads:

- **vs S2**: how far ahead or behind the player is after the same number of
  matches, or against last season's final rating once this season has run
  longer.
- **S2 peak**: last season's best rating, and where the player finished on that
  season's leaderboard (_Finished #4 of 61_).

Switch the card to **All time** for the ordinary Elo chart. Season pace follows
the player's Competitive ladder when they have one, otherwise the one they
played last.

### Season compare

**Range settings → Compare vs → Or a season** compares a player against
**themselves** in an earlier season. Every stats tab shows that season's numbers
beside the ones in range, and the **ELO** tab lines the two seasons up match by
match. See [Comparing](/features/stats-and-leaderboards#comparing).

### Season dividers

The profile's match list is split where one season ends and the next begins.
Each divider shows the rating reset and a recap of the season that ended: final
rating, best rating, and record. The Elo charts draw each season start as a
break, so a reset doesn't read as a losing streak. See
[Match history](/features/stats-and-leaderboards#match-history).

## Season awards

Ending a season, with **End Now** or by moving its end date into the past, hands
out four built-in awards:

| Award                  | Goes to                                                        |
| ---------------------- | -------------------------------------------------------------- |
| **Season Champion**    | First on that season's Elo leaderboard                         |
| **Season Runner-Up**   | Second                                                         |
| **Season Third Place** | Third                                                          |
| **Season MVP**         | Highest average impact across the season's Competitive matches |

**Season MVP** needs at least **5 Competitive matches** in the season, so a
single good game can't take it. Only Competitive matches count: impact is
measured against a player's teammates, which means nothing in a Duel. If nobody
reaches five, no MVP is awarded.

Season awards appear under **Honors** on the player's profile and count toward
the **Awards** leaderboard. Moving the season's end back into the future takes
them away again.

## Rebuilds

Season Elo and stats are recomputed automatically as matches finish. Changing a
season's dates in a way that moves matches in or out of it, or creating a season
over dates that already have matches, flags the season **Rebuild Required**,
marks its standings out of date, and queues a rebuild on its own. The flag
clears when the rebuild finishes.

**Rebuild ELO** runs the same recompute by hand: that season's Elo and stats,
from every match in it. It runs in the background with live progress
(_Rebuilding season ELO… · 3/25 Matches_), and can be canceled while it's
running.

Rebuilds run one season at a time. Asking for another while one is running
queues it instead of dropping it, and only the season being rebuilt has its
button disabled. If a season's dates change mid-rebuild, it runs again for the
new dates.

::: tip
A rebuild is a maintenance tool, not a routine one. Normal play keeps a season
current on its own.
:::

## Related

- [Stats & Leaderboards](/features/stats-and-leaderboards), what Elo measures
  and how leaderboards are ranked.
- [Leagues](/features/leagues), league seasons are a separate concept: a
  competition with divisions and a schedule, rather than a scoring window.
