# Leagues

A tournament is a weekend. A league is a season, divisions, weekly match play,
teams negotiating their own times, and promotion and relegation at the end.

5Stack runs one league per instance, made of **divisions** (the ladder) and
**seasons** (each run through it). Admins enable it from
**Settings → Application → Leagues**.

## How a season works

1. **Register** your team while signups are open, and pick the players on your
   season roster.
2. **Admins review registrations** and place teams into skill divisions.
   Returning teams keep the division they earned.
3. **Each week you get one matchup.** Either captain proposes a time inside that
   match week and the opposing captain accepts. You can renegotiate right up
   until the match goes live.
4. **If no time is agreed**, the match falls back to the league's default match
   night and time for that week.
5. **Rosters lock** partway through the season. After that only rostered players
   can play league matches, and a player can only be on one team per season.
6. **The top teams qualify for playoffs**, scheduled the same way.
7. **Final standings decide promotion and relegation** for next season.

## Divisions

Divisions are a tiered ladder, **tier 1 is the top division**, and teams are
promoted toward it and relegated away from it. Admins name them (Open, Main,
Invite, whatever fits), drag to reorder, and add or remove tiers; remaining
divisions renumber automatically.

## Creating a season

A season is configured once and mostly stays editable afterwards. Only the
**match-week count** and **games per week** lock at season start, because they
define the generated brackets.

| Setting                              | What it controls                                            |
| ------------------------------------ | ----------------------------------------------------------- |
| **Signups open / close**             | The registration window                                     |
| **Season starts**                    | When week 1 begins                                          |
| **Match weeks** / **games per week** | The length and density of the regular season                |
| **Roster lock week**                 | When rosters freeze                                         |
| **Playoff seats**                    | How many teams per division advance                         |
| **Min roster**                       | Minimum players a team needs to be approved                 |
| **Best of** / **playoff best of**    | Series length, regular season and playoffs                  |
| **Default match day & time**         | The fallback for unagreed matchups                          |
| **Promotion / relegation counts**    | Direct promote, relegation playoff up/down, direct relegate |

Each division's **format is chosen automatically from its size**, a full round
robin when it fits inside the season's rounds; otherwise a Swiss group. A
division needs at least **4 approved teams** to run; smaller ones are skipped at
season start.

A **Season readiness** panel flags problems before you start: division sizes and
any teams below the minimum roster size.

### Season phases

`Setup → Registration Open → Registration Closed → Live → Playoffs → Finished`
(with `Canceled` available throughout). Admins drive this from the season's
manage tab: open/close/reopen registration, start the season, cancel, or delete
it.

## Registration

Captains register a team and select the **season roster**, split into starters
and substitutes, with the minimum enforced up front.

Admins then work the **registrations** table:

- **Assign a division**: required before approving.
- **Approve**, **waitlist**, or **decline** (with an optional reason the team
  can see).
- Declined teams can **resubmit** while registration is still open.
- **Remove** a team; during the regular season removal forfeits its remaining
  matchups to its opponents.

## Scheduling

The schedule is the part most leagues do badly. In 5Stack, every matchup carries
its own negotiation:

- **Propose a time** inside the match week window, times outside it are
  rejected.
- The opponent can **accept**, **counter** with a different time, or **decline**.
- Past proposals stay visible as history.
- Anything unagreed **auto-schedules** to the default night and time.

Teams get both a **week-by-week schedule** and a **calendar** (month or agenda
view) showing what's agreed, what's awaiting them, what's live, and what's
already played, plus a "needs you" count so nothing quietly slips.

## Standings, playoffs, and movements

- **Standings** per division: W–L record, rounds, round differential, matches
  remaining, and a clear playoff cutoff line.
- **Playoffs** are seeded automatically when the regular season completes, and
  run as a single- or double-elimination bracket (with an optional third-place
  decider).
- **Movements** computes promotion and relegation from the final standings,
  direct promotions, relegation playoffs (up and down), and direct relegations.
  Admins can override any individual team's movement, then **approve all**.
- **Stats** are tracked per season, and **Create next season** rolls the whole
  thing forward.

## Teams

Every team page carries its **league history**, the seasons it played, its
current division, and the highest division it has ever reached.

::: tip Leagues vs. seasons
League seasons are separate from platform-wide
[competitive seasons](/features/seasons), which reset regular-match Elo. A league
season is a competition; a competitive season is a scoring window.
:::
