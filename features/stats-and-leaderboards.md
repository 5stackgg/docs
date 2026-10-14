# Stats & Leaderboards

5Stack tracks far more than kills and deaths. Every parsed match feeds detailed
per-player stats, an Elo rating, and global leaderboards, from native 5Stack
matches as well as imported [Valve and FACEIT](/advanced/faceit-integration) matches.

## Player profiles

The top of a profile carries the player's **Honors** (tournament, season, and
hand-granted awards, newest first; **All honors** groups them by Tournaments,
Seasons, and Awarded) and their **Recent Form**: the win/loss record and Elo
moved over their last 12 matches.

Below that, the stats are split into tabs:

| Tab             | What it shows                                                                            |
| --------------- | ---------------------------------------------------------------------------------------- |
| **Performance** | Win rate, ADR, K/D, KPR, DPR, recent wins and losses, and per-match trend lines for each |
| **Breakdown**   | The [Performance Rating](/features/performance-rating) and the Consistency chart         |
| **ELO**         | Every rating change, match by match                                                      |
| **Maps**        | Per-map results with CT and T side splits                                                |
| **Arsenal**     | Kills and damage by weapon                                                               |
| **Combat**      | Preferred roles, the role radar, opening duels, and clutches                             |
| **Community**   | Time, sessions, and kills on community servers                                           |

Installed [plugins](/plugins/) can add their own profile tabs. A player with no
matches yet still gets the **Community** tab and any plugin tabs.

The headline numbers, in more detail:

**Overall**

- **5Stack Elo** with peak / lowest over the selected range. When
  [seasons](/features/seasons) are on, this card instead races the current
  season against the last one; see [Season pace](/features/seasons#season-pace).
- **Win rate** and **K/D ratio**.
- An **Elo chart** that buckets to weekly/monthly for long ranges. The **ELO**
  tab keeps every match. With seasons on, both draw each season start as a
  break, so the reset doesn't read as a losing streak.

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
- **Weapon affinity**: kills and damage per weapon.

For the per-map, per-weapon, and per-duel breakdowns behind these numbers, see
[Match Analysis](/features/match-analysis).

## Filtering

The filter bar above the tabs applies to every stats tab:

- **Source**: **5Stack**, **External** (Valve / FACEIT imports), or **All**.
  Shown when match imports are enabled.
- **Provider** (External only): **All**, **Valve**, or **Faceit**.
- **Mode**: Competitive, Wingman, Duel, or Rush for 5Stack matches; Premier,
  Competitive, Wingman, or Rush for Valve imports.
- **Range**: **L30** (last 30 matches), **7D**, **90D**, a **Season** when
  seasons are on, or a **Custom Range** with a start and end date.

The **Range settings** button holds the custom range, **Exclude tournaments**,
and the comparison picker.

## Comparing

**Compare vs** overlays another player's numbers across every stats tab, so you
can see exactly where you differ rather than just who has the bigger rating.

With seasons on, **Or a season** compares a player against **themselves** in an
earlier season instead. Every tab, the **Arsenal** and the Performance Rating
included, shows that season's numbers beside the ones in range, and the **ELO**
tab lines the two seasons up match by match. The **Performance** tab notes how
many matches each side covers, and flags when either has fewer than 10: _small
samples swing a lot_.

## Match history

Each row in the profile's match list shows the player's **Rank** for that match
in the system it was played on: the 5Stack Elo tier, a Premier CS Rating, a
FACEIT level, or a Valve skill group, with the change the match made.

Expand a row to see the match without leaving the profile:

- A strip with the map or series, the score, and the rank move. For 5Stack Elo
  it also shows how far the match left the player from the next tier.
- The match page's own **Overview**, **Utility**, **Trades**, and **Aim**
  tables for **both** teams, with this player's row pinned. On narrow screens
  the player's own line comes first and **Show all N players** opens the
  lobby.
- The match's highlights, when it has any, and **Open match**.

With seasons on, the list is divided where one season ends and the next begins.
Each divider shows the season's dates, the rating reset (final → new start), and
a recap such as _Season 2 finished 5,410, best 5,620, 31W–24L_. Expanding the
match where the player hit a season peak tags it _S2 best rating_.

## Performance Rating

Beyond the raw numbers. Every player gets a **Performance Rating**, Aim,
Positioning, and Utility each scored out of 100 as a percentile against every
other player, with focus areas and coaching notes on the specific habits costing
them rounds. See [Performance Rating](/features/performance-rating).

## Leaderboards

The leaderboard ranks players across ten categories:

- **ELO** (with Elo change and win streak)
- **HLTV Rating**, **ADR**, **KPR**, **KAST**, and **UDR** (per-map stats)
- **KDR**, **Win Rate**, and **HS%**
- **Awards**: a medal table of Gold / Silver / Bronze finishes and MVPs, ranked
  MVPs first. Tournament, season, and hand-granted awards all count, each tier
  once per tournament, season, event, or league season.

Filter by time window (**All Time**, **Last 7 Days**, **Last 30 Days**), match
type (Competitive, Wingman, Duel, or Rush), and source (**Matchmaking**,
**Tournament**, or **League**). The per-map categories can also filter by role,
and **Exclude Tournaments** drops tournament matches. You can sort by any column
and jump straight to a specific player's rank.

If [competitive seasons](/features/seasons) are enabled, the time selector also
lists every season and defaults to the current one.

### FACEIT and Premier

Two more tabs rank ratings that come from outside 5Stack:

| Tab         | Ranks by                     | Shown when                                      |
| ----------- | ---------------------------- | ----------------------------------------------- |
| **Faceit**  | **Faceit ELO** and **Level** | **Import Faceit Matches** is on                 |
| **Premier** | **Premier Rank**             | **Allow CS2 match imports** is on (Valve demos) |

These boards list **your instance's own players** only: someone who has signed
in at least once and finished a 5Stack match. Importing a demo creates a record
for everyone in it, so without that rule the boards would fill with strangers.
Players who haven't placed in Premier are left off.

Both are snapshots, not stats from matches played here, so the time, type,
source, and role filters don't apply and are hidden on these tabs. FACEIT
ratings are refreshed in the background from the FACEIT Data API, looked up from
each player's Steam ID, so there is nothing to link in 5Stack.

::: tip
Both switches live under **Settings → Application → Match Imports**. See
[External Matches](/features/external-matches).
:::

## Importing external matches

Stats aren't limited to matches played on your servers. Players can import their
public Valve and FACEIT matches, or upload a demo by hand, so their full history
counts here too. See [External Matches](/features/external-matches).
