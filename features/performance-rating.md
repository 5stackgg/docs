# Performance Rating

Rating, ADR, and K/D tell you _how well_ a match went. They don't tell you _what
to work on_. The Performance Rating breaks a player down into three areas, scores
each out of 100, and points at the weakest one.

Find it on the **Breakdown** tab of any player profile.

## How it's scored

Each area is your **percentile against every other player on the instance**, so
**50 is an average player** and higher is better. That means the number is
relative to the people you actually play with, not an abstract benchmark.

| Area            | What it measures                                                                                                |
| --------------- | --------------------------------------------------------------------------------------------------------------- |
| **Aim**         | Your shooting, accuracy, headshots, and how quickly and cleanly you hit visible enemies.                        |
| **Positioning** | Where you fight, surviving rounds, dying near teammates so you get traded, and contributing every round (KAST). |
| **Utility**     | Grenade impact, flash assists, how much you blind enemies, and HE/molotov damage per nade.                      |

::: tip Utility is provisional
Utility is marked **Provisional** in the app. On current data it doesn't cleanly
separate skill the way aim and positioning do, so it's shown but flagged rather
than quietly treated as gospel.
:::

Each score is labelled **Elite** (80 and up), **Good** (60 and up), **Average**
(40 and up), or **Subpar**.

Players without enough games yet aren't rated, the breakdown unlocks once
there's a meaningful sample: a match needs at least 10 rounds to be scored, and
a player needs 30 rounds before they're ranked against the pool.

## Ranges and seasons

The Breakdown follows the profile's range:

- The three **area scores** average your per-match scores over the range: the
  last 30 matches on **L30**, or every match inside **7D**, **90D**, a season,
  or a custom range.
- The **individual metrics** and **Focus Areas** rank your whole history
  against everyone else's. When the range is a [season](/features/seasons),
  they rank that season instead, against everyone with at least 30 rounds in
  it.

## The underlying metrics

Each area is the average of several percentile-scored metrics. Hovering any one
in the app explains what it measures; several are only possible because 5Stack
parses per-tick demo data rather than just the scoreboard.

**Aim**

- **Accuracy**: bullets that hit an enemy, out of every bullet fired.
- **Spotted Accuracy**: hit rate while an enemy was actually _visible_. Spam
  through smoke or walls doesn't count.
- **Headshots**.
- **Crosshair Placement**: how close your crosshair already is to the enemy when
  they appear. A smaller angle means less to move before firing.
- **Reaction (Time to Damage)**: how fast you deal damage after first seeing an
  enemy.
- **Counter-Strafing**: how often you fully stop before firing.

Related engagement metrics also tracked from the demo include **First Bullet**
(how often the opening shot of a duel hits) and **Tracking** (how much of an
engagement your crosshair stays on the enemy).

**Positioning**

- **Survival**: surviving rounds rather than dying for free.
- **Trade Positioning**: dying near teammates so your death gets traded.
- **Round Impact (KAST)**: doing _something_ every round.

**Utility**

- **Flash Assists**: kills your flash set up.
- **Flash Effectiveness**: how much enemy blindness your flashes actually cause,
  rewarding pop-flashes over flashes thrown over heads.
- **Utility damage per nade**.

## Focus areas and coaching

The app surfaces **Focus Areas**, your weakest metrics, and each one comes with
a plain-language coaching note. For example, low counter-strafing reads _"tap the
opposite key to stop dead before firing, shots while moving are wildly
inaccurate"_, and weak trade positioning reads _"fight near teammates so when you
die it gets traded, instead of dying for free."_

It's the difference between "your rating is 0.94" and "here's the habit costing
you rounds."

## Consistency

Every match also gets a single combined score from your Aim, Positioning, and
Utility for that match. **Consistency** charts it across your recent matches,
a flatter line is better, and you're labelled **Rock Solid**, **Steady**, or
**Streaky**.

## Comparison

Pin another player and the whole breakdown renders side by side, both overall
areas and the individual metrics, so you can see exactly where you differ rather
than just who has the bigger rating.

With seasons on, you can compare against **yourself in an earlier season**
instead, and the metrics on that side are ranked within that season's pool. See
[Season compare](/features/seasons#season-compare).

## The in-app stats guide

Every metric on the platform is documented inside the app itself at
**/stats-guide**, including the ones above. If you're not sure what a column
means, that page is the reference.

## Related

- [Stats & Leaderboards](/features/stats-and-leaderboards), the headline metrics
  and how players are ranked.
- [Match Analysis](/features/match-analysis), per-match breakdowns, heatmaps,
  and team analytics.
