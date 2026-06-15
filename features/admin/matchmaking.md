# Matchmaking & Ranks

These settings control Quick Play / matchmaking, the Elo rank system, lineups,
and the map pools and server configs that matches run with.

## Matchmaking

- **Enable matchmaking** — master toggle.
- **Match types** — enable Competitive, Wingman, and/or Duel.
- **Minimum role to access matchmaking** — from User up to Administrator.
- **Max acceptable latency** — the latency ceiling for matchmaking (ms).
- **Auto-cancel queue timeout** — how long a queue waits before cancelling
  (minutes; default 15).
- **Live match timeout** — how long a live match can run before it's force-ended
  (minutes; default 180).

## 5Stack Ranks

When matchmaking is enabled you can turn on the Elo rank system:

- **Enable ranks for matches**
- **Enable ranks for tournaments**

::: warning
Ranked play has implications around Valve's rules — review the in-app warning
before enabling.
:::

## Lineups & player models

- **Minimum role to add players without an invite** — from User up to Match Organizer.
- **Enforce default player models** — force standard models in matches.

## Map pools

- **Auto-update map pools** — keep pools in sync with the official map list.
- **Create / edit pools** per format (1v1, 2v2, 5v5). Assign pools per playlist,
  queue, or event.

## Game type configs

Edit the server config file applied for each game type — **LAN, Competitive,
Wingman, Duel** — with defaults you can load and restore.
