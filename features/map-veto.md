# Map Veto Format

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

## Pick timer

Each step has a time limit, set per match by **Veto Pick Timeout** (default **60
seconds**). Set it to `0` to remove the limit and let the veto wait indefinitely.

If a team runs out of time, the step is made for them:

- a **Ban** or **Pick** takes a random map from those still available
- a **Side** takes CT or T at random

Auto-taken steps are flagged, so a completed veto shows which steps a team made
and which ran out of time. The timer restarts on every step, including
auto-taken ones, so a veto always finishes.

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
