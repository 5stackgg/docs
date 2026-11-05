# Map Veto

5Stack turns a map pool into a series with a fixed ban and pick order. The same
rules apply to every match, and the order depends on only two things:

- the **map pool** (how many maps are eligible), and
- the **best-of** (how many maps the series is played to).

The order follows Valve's
[Major Supplemental Rulebook](https://github.com/ValveSoftware/counter-strike_rules_and_regs/blob/main/major-supplemental-rulebook.md#map-pick-ban),
extended to any pool size and any best-of. Where 5Stack departs from it, it says
so below.

Players make the veto on the [veto board](#the-veto-board), which can also show
[veto scouting](#veto-scouting): each side's record on every map and the other
side's usual bans and picks.

## The rules

1. Steps come in rounds of **Ban, Ban, Pick, Pick**, with the two teams taking
   turns. Every completed pair of picks hands the lead to the other team, so the
   picks snake; see [Turn order](#turn-order).
2. As soon as enough maps are picked for the best-of, every remaining step is a
   **Ban**.
3. When too few maps remain for more bans, the remaining steps are **Picks**.
4. After **every Pick**, the other team chooses the starting side (CT / T) on
   that map.
5. The one map never banned or picked is the **Decider**. It is always the last
   map, and it is **never a Side pick**: the knife round settles sides on it.

## Turn order

Teams alternate turns and **Team A**, the first lineup on the match, opens the
veto.

Every completed **pair of picks reverses** who leads. The picks snake:

```
Pick 1: A    Pick 2: B    Pick 3: B    Pick 4: A
```

The **starting side** on a picked map is never chosen by the team that picked
it; it always falls to the opponent. The **Decider is never a side pick**:
nobody picked that map, so the knife round decides who starts where.

## Where 5Stack differs from the rulebook

Valve's
[Major Supplemental Rulebook](https://github.com/ValveSoftware/counter-strike_rules_and_regs/blob/main/major-supplemental-rulebook.md#map-pick-ban)
covers only a best-of-1 and a best-of-3, both on a 7-map pool. 5Stack follows it
on both, with these exceptions:

| Rulebook                                                                  | 5Stack                                                                          |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| The Decider's starting side is chosen by a team (Bo3 step 10, Bo1 step 5) | Nobody picks a side on the Decider; the **knife round** settles it              |
| Best-of-1 bans are split **2 / 3 / 1** between the teams                  | Bans **alternate**, so the pattern is defined for any pool size, not just seven |
| No best-of-5 format                                                       | The same rules extend to it: four picks, snaking **A, B, B, A**                 |

## When there is nothing to veto

If the map pool holds **exactly** as many maps as the best-of, every map in the
pool is played. The veto is skipped and the maps are assigned straight from the
pool with alternating starting sides.

**Rush** matches never run a map veto: they are always a single map.

## Pick timer

Each step has a time limit, set per match by **Veto Pick Timer**. New matches
start with the instance default from **Settings → Application → Matchmaking**
(**60 seconds** unless an admin changes it). Set it to `0` to remove the limit
and let the veto wait indefinitely.

If a team runs out of time, the step is made for them:

- a **Ban** or **Pick** takes a random map from those still available
- a **Side** takes CT or T at random

Auto-taken steps are marked **Auto**.

When it's a player's turn and they're on another page, a **Map Veto** (or
**Region Veto**) toast tells them so, with a button straight back to the match.
See [Matches](/features/matches#your-turn-wherever-you-are).

## The veto board

Map and region vetoes run on one board, on the match page and in a
[draft room](/features/draft-lobbies).

- A status line names whose turn it is (**Your turn** when it's yours) and the
  step, such as **Ban a map**, **Pick a map**, or **Pick your starting side on
  Mirage**, with the step count and the time left.
- Under it, the order of play lays out every step of the veto, made or still to
  come, with the team each belongs to.
- Each map shows what happened to it: who banned it, or its number in the
  series (**Map 2**, **Decider · Map 3**) and who picked it.
- On your turn, click a map, then confirm with the button that names it, such
  as **Ban Mirage**. From the keyboard, the arrow keys browse, **Enter**
  chooses, and **Esc** clears.
- A side step splits the picked map into **Start CT** (**Defend first**) and
  **Start T** (**Attack first**).
- In a region veto, each region shows your ping to it.

After the last step, the board shows the server starting up until it's ready,
with the first map and, for players, the side they start on. Then the order of
play moves into the match header, under **Veto**, for the rest of the match.

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
side is a pickup.

What the board adds:

- **Edge**: each open map, and each map that will be played, shows the gap in
  win rate between the sides. As a player it reads from your side: `+12` when
  your win rate there is 12 points higher than theirs, `−12` when it's lower. A
  spectator sees the stronger side's crest beside the number. A map where either
  side has fewer than 3 games reads `—`.
- **Win rate on** _map_: on your turn, the map you point at or select opens
  with each side's wins, losses, and win rate there (**You** for your own
  side).
- **Usually bans** / **Usually picks**: a map the other side often bans or
  picks. Hover for the count, such as _Team A ban it in 6 of 9 vetoes_.
- **Likely ban** / **Likely pick**: while the other side is on the clock, the
  open map it has banned (or picked) most often.

Players see the other side's habits, and spectators see both sides'. If the
history can't be loaded, the veto runs the same without it.

A team page's
[veto tendencies and veto simulator](/features/match-analysis#veto-tendencies)
show the same history outside a veto.

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

Each team bans one map, each team picks one map (and the opponent picks the side
on it), and the last map standing is the Decider.

### Best of 3, 7-map pool

```
A Ban → B Ban → A Pick → B Side → B Pick → A Side → B Ban → A Ban
```

Once the two picks needed for a best-of-3 are in, the remaining steps are all
bans, and the Decider is whatever survives. The pick pair reversed the lead, so
B opens the second ban phase and A has the last ban.

### Best of 5, 7-map pool

```
A Ban → B Ban → A Pick → B Side → B Pick → A Side → B Pick → A Side → A Pick → B Side
```

Four maps are picked (with side responses), and the seventh map is the Decider,
five maps total. The picks snake (A, B, B, A), so both teams pick twice and
neither gets both of the middle maps.
