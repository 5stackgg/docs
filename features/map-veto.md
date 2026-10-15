# Map Veto

5Stack uses a deterministic, tournament-standard ban/pick algorithm to turn a map
pool into a playable series. The same rules apply to every match, so the sequence
of bans and picks is fully predictable and reproducible from two inputs alone:

- the **map pool** (how many maps are eligible), and
- the **best-of** (how many maps the series is played to).

The order follows Valve's
[Major Supplemental Rulebook](https://github.com/ValveSoftware/counter-strike_rules_and_regs/blob/main/major-supplemental-rulebook.md#map-pick-ban),
generalised so it holds for any pool size and any best-of, not just the 7-map
best-of-1 and best-of-3 the rulebook spells out. Where 5Stack departs from it, it
says so below.

Players make the veto on the [veto board](#the-veto-board), which can also show
[veto scouting](#veto-scouting): each side's record on every map and the other
side's usual bans and picks.

## The rules

1. The veto runs for **`pool − 1`** steps. The single map that is never banned or
   picked becomes the **Decider**.
2. The building block is a repeating unit of **`Ban, Ban, Pick, Pick`**, with the
   two teams alternating turns. Every completed pair of picks **reverses** who
   leads, so the picks snake — see [Turn order](#turn-order).
3. As soon as the series has enough picked maps to satisfy the best-of, every
   remaining step is a **Ban**. There is no point picking maps that can't be
   played.
4. When few enough maps remain that bans would dip below what's needed, the
   remaining steps collapse to **Picks**.
5. After **every Pick**, a **Side** step is inserted so a starting side (CT / T) is
   chosen for that map.
6. The leftover map is the **Decider**, and it is **never a Side pick** — the
   knife round settles sides on it.
7. Any extra bans a larger pool requires land **after the picks and before the
   Decider**. The Decider is always the final step, whatever the pool size.

## Turn order

Teams alternate turns and **Team A** — the first lineup on the match — opens the
veto.

Every completed **pair of picks reverses** who leads. The picks snake:

```
Pick 1: A    Pick 2: B    Pick 3: B    Pick 4: A
```

Without the reverse, the team that opens the veto would take every odd pick _and_
the last ban before the Decider, and that last ban is effectively the choice of
what the Decider is. The reverse hands the second half of each phase to the other
team.

This is the rulebook's own order. Its best-of-3 process has Team A pick map 1 and
Team B pick map 2, and then — after the picks — **"Team B removes one map, Team A
removes one map"**: B leads the second ban phase, not A.

The **starting side** on a picked map is never chosen by the team that picked it —
it always falls to the opponent. The **Decider is never a side pick**: nobody
picked that map, so the knife round decides who starts where.

## Where 5Stack differs from the rulebook

Valve's
[Major Supplemental Rulebook](https://github.com/ValveSoftware/counter-strike_rules_and_regs/blob/main/major-supplemental-rulebook.md#map-pick-ban)
covers two cases only — a best-of-1 and a best-of-3, both on a 7-map pool. 5Stack
follows it on both, with these deliberate exceptions:

| Rulebook                                                                  | 5Stack                                                                          |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| The Decider's starting side is chosen by a team (Bo3 step 10, Bo1 step 5) | Nobody picks a side on the Decider — the **knife round** settles it             |
| Best-of-1 bans are split **2 / 3 / 1** between the teams                  | Bans **alternate**, so the pattern is defined for any pool size, not just seven |
| No best-of-5 format                                                       | The same rules extend to it: four picks, snaking **A, B, B, A**                 |

## When there is nothing to veto

If the map pool holds **exactly** as many maps as the best-of, every map in the
pool is going to be played and there is no decision to make. The veto is skipped
entirely and the maps are assigned straight from the pool with alternating
starting sides — a best-of-3 with a 3-map pool goes directly to the first map.

**Rush** matches never run a map veto: they are always a single map.

## Pick timer

Each step has a time limit, set per match by **Veto Pick Timer**. New matches
start with the instance default from **Settings → Application → Matchmaking**
(**60 seconds** unless an admin changes it). Set it to `0` to remove the limit
and let the veto wait indefinitely.

If a team runs out of time, the step is made for them:

- a **Ban** or **Pick** takes a random map from those still available
- a **Side** takes CT or T at random

Auto-taken steps are marked **Auto**, so a completed veto shows which steps a
team made and which ran out of time. The timer restarts on every step,
including auto-taken ones, so a veto always finishes.

When it's a player's turn and they're on another page, a **Map Veto** (or
**Region Veto**) toast tells them so, with a button straight back to the match.
See [Matches](/features/matches#your-turn-wherever-you-are).

## The veto board

Map and region vetoes run on one board, on the match page and in a
[draft room](/features/draft-lobbies). It keeps the same height from the first
step to the last, so the page doesn't jump between turns.

- A status line names whose turn it is (**Your turn** when it's yours) and the
  step, such as **Ban a map**, **Pick a map**, or **Pick your starting side on
  Mirage**, with the step count and the time left.
- Under it, the order of play lays out every step of the veto, made or still to
  come, with the team each belongs to. On a phone it becomes one row per team.
- Each map shows what happened to it: who banned it, or its number in the
  series (**Map 2**, **Decider · Map 3**) and who picked it.
- On your turn, click a map, then confirm with the button that names it, such
  as **Ban Mirage**. From the keyboard, the arrow keys browse, **Enter**
  chooses, and **Esc** clears.
- A side step splits the picked map into **Start CT** (**Defend first**) and
  **Start T** (**Attack first**).
- In a region veto, each region shows your ping to it.

When the match still needs its server started, the board stays up after the
last step, reading **Waiting for a server**, **Server booting**, then **Server
ready** with the first map and, for players, the side they start on. Then the
maps move into the match page's map cards, and the order of play moves into
the match header, under **Veto**, for the rest of the match. In a draft room
the board stays on **Match starting** until the room hands over to the match
page.

## Veto scouting

During a map veto the board can show what each side has done before, so a ban
or pick is made knowing the other side's record and habits. It's on by default
for **Competitive**, **Wingman**, and **Duel** matches, wherever they come from:
matchmaking, a draft room, a tournament, or **Schedule Match**. An admin can
switch it off per mode, see
[Veto scouting](/features/admin/matchmaking#veto-scouting). Rush has no veto, so
it has no scouting.

The history depends on who is playing:

| Side     | Map record                                           | Bans and picks                       |
| -------- | ---------------------------------------------------- | ------------------------------------ |
| A team   | The team's results in its recent vetoed matches      | The team's recent vetoes             |
| A pickup | Its players' own results on each map, added together | The captain's past vetoes as captain |

A side is a team when it plays as one of the instance's saved teams; any other
side is a pickup. The veto being made is never part of the history.

What the board adds:

- **Edge**: each open map, and each map that will be played, shows the gap in
  win rate between the sides. As a player it reads from your side: `+12` when
  your win rate there is 12 points higher than theirs, `−12` when it's lower. A
  spectator sees the stronger side's crest beside the number. Win rates within
  5 points read `+0`, and a map where either side has fewer than 3 games reads
  `—`.
- **Win rate on** _map_: on your turn, the map you point at or select opens
  with each side's wins, losses, and win rate there (**You** for your own
  side).
- **Usually bans** / **Usually picks**: a map the other side banned in at least
  half of its vetoes, or picked in at least 40% of them. Hover for the count,
  such as _Team A ban it in 6 of 9 vetoes_.
- **Likely ban** / **Likely pick**: while the other side is on the clock, the
  open map it has banned (or picked) most often, once that's at least 30% of
  its vetoes.

Players see the other side's habits, and spectators see both sides'. A habit
needs at least 3 past vetoes behind it. If the history can't be loaded, the
veto runs the same without it.

Veto scouting reads the same recorded vetoes as a team page's
[veto tendencies and veto simulator](/features/match-analysis#veto-tendencies),
but on the board itself, during the veto, and for pickups as well as teams.

## Step types

| Type      | Meaning                                                     |
| --------- | ----------------------------------------------------------- |
| `Ban`     | The acting team removes a map from the pool.                |
| `Pick`    | The acting team selects a map to be played in the series.   |
| `Side`    | A starting side (CT / T) is chosen for the just-picked map. |
| `Decider` | The final unbanned, unpicked map, assigned automatically.   |

## Examples

The pool size below is the number of maps eligible for veto. The final, unlisted
map in each row is the **Decider**. **A** and **B** are the two teams, A opening.

### Best of 1, 7-map pool

```
A Ban → B Ban → A Ban → B Ban → A Ban → B Ban → (Decider)
```

Six bans leave a single map. With a knife round enabled, sides on that map are
decided by the knife.

### Best of 3, 5-map pool

```
A Ban → B Ban → A Pick → B Side → B Pick → A Side → (Decider)
```

Each team bans one map, each team picks one map (and the opponent's side response
follows each pick), and the last map standing is the Decider.

### Best of 3, 7-map pool

```
A Ban → B Ban → A Pick → B Side → B Pick → A Side → B Ban → A Ban
```

Once the two picks needed for a best-of-3 are in, the remaining steps are all bans
the Decider is whatever survives. The pick pair reversed the lead, so B opens the
second ban phase and A has the last ban.

### Best of 5, 7-map pool

```
A Ban → B Ban → A Pick → B Side → B Pick → A Side → B Pick → A Side → A Pick → B Side
```

Four maps are picked (with side responses), and the seventh map is the Decider,
five maps total. The picks snake — A, B, B, A — so both teams pick twice and
neither gets both of the middle maps.
