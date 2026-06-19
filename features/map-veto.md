# Map Veto Format

5Stack uses a deterministic, tournament-standard ban/pick algorithm to turn a map
pool into a playable series. The same rules apply to every match, so the sequence
of bans and picks is fully predictable and reproducible from two inputs alone:

- the **map pool** (how many maps are eligible), and
- the **best-of** (how many maps the series is played to).

## The rules

1. The veto runs for **`pool − 1`** steps. The single map that is never banned or
   picked becomes the **Decider**.
2. The building block is a repeating unit of **`Ban, Ban, Pick, Pick`**, with the
   two teams alternating turns.
3. As soon as the series has enough picked maps to satisfy the best-of, every
   remaining step is a **Ban** — there is no point picking maps that can't be
   played.
4. When few enough maps remain that bans would dip below what's needed, the
   remaining steps collapse to **Picks**.
5. After **every Pick**, a **Side** step is inserted so a starting side (CT / T) is
   chosen for that map.
6. The leftover map is the **Decider**. If a **knife round** is enabled, sides on
   the Decider are settled by the knife round rather than a Side pick.

## Step types

| Type      | Meaning                                                           |
| --------- | ----------------------------------------------------------------- |
| `Ban`     | The acting team removes a map from the pool.                      |
| `Pick`    | The acting team selects a map to be played in the series.         |
| `Side`    | A starting side (CT / T) is chosen for the just-picked map.       |
| `Decider` | The final unbanned, unpicked map — assigned automatically.        |

## Examples

The pool size below is the number of maps eligible for veto. The final, unlisted
map in each row is the **Decider**.

### Best of 1, 7-map pool

```
Ban → Ban → Ban → Ban → Ban → Ban → (Decider)
```

Six bans leave a single map. With a knife round enabled, sides on that map are
decided by the knife.

### Best of 3, 5-map pool

```
Ban → Ban → Pick → Side → Pick → Side → (Decider)
```

Each team bans one map, each team picks one map (and the opponent's side response
follows each pick), and the last map standing is the Decider.

### Best of 3, 7-map pool

```
Ban → Ban → Pick → Side → Pick → Side → Ban → Ban
```

Once the two picks needed for a best-of-3 are in, the remaining steps are all bans
— the Decider is whatever survives.

### Best of 5, 7-map pool

```
Ban → Ban → Pick → Side → Pick → Side → Pick → Side → Pick → Side
```

Four maps are picked (with side responses), and the seventh map is the Decider —
five maps total.
