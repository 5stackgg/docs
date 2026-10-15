# Matchmaking & Ranks

These settings control matchmaking, veto scouting, the Elo rank system, draft
lobbies, and the map pools and server configs that matches run with. For what
players see, see [Play & Matchmaking](/features/quick-play).

## Matchmaking

Under **Settings → Application → Matchmaking**:

- **Matchmaking**: the master switch. The rest of this section appears once
  it's on.
- **Match types**: turn matchmaking on or off for **Competitive**, **Wingman**,
  **Duel**, and **Rush** individually. Only enabled types appear on the Play
  page.
- **Minimum Role Allowed to Join Matchmaking**: from User up to Administrator.
- **Maximum Acceptable Latency**: players above this ping to a server are
  filtered out when picking the best server for a match. It is also the top of
  each player's own latency slider.
- **Auto Cancel Duration**: cancels a match that hasn't gone live (still picking
  players, in veto, or waiting for check-in or a server) after this many
  minutes. Default 15. Matches and tournaments can override it.
- **Live Match Timeout**: a safety net that cancels a live match after this many
  minutes if it never finishes. Default 180. Matches and tournaments can
  override it.
- **Veto Pick Timer**: the default seconds each team gets per
  [veto](/features/map-veto#pick-timer) step on newly created matches. Default
  60; `0` turns the timer off by default.

Matchmaking never mixes LAN and online regions: on a LAN, players choose one or
the other, and the server refuses a queue or match whose regions mix them.

## Veto scouting

**Veto scouting**, on the same page, has a switch each for **Competitive**,
**Wingman**, and **Duel**. While it's on, a map veto in a match of that type
shows each side's record on every map, the other side's usual bans and picks,
and their likely next move. See
[Veto scouting](/features/map-veto#veto-scouting).

- Every mode is on until you switch it off.
- A switch covers every match of that type, not just matchmaking: draft rooms,
  tournaments, and scheduled matches too. It doesn't depend on the
  **Matchmaking** switch.
- Rush has no veto, so it has no switch.

## 5stack Ranks

When matchmaking is enabled you can send each player's 5Stack Elo to the server
so the plugin can display ranks in-game:

- **Show ranks in regular matches**
- **Show ranks in tournament matches**

::: warning
Showing ranks in-game means the server boots with `FollowCS2ServerGuidelines`
off, and Valve's position is that this can ban every GSLT on the server owner's
Steam account. Review the in-app warning before enabling.

The same switch exists per plugin for
[game plugins that cannot work with the guidelines on](/servers/game-server-nodes/game-plugins).
:::

## Draft lobbies & player models

- **Draft Lobby Invites**: **Minimum Role to Add Players to Lineup Without
  Invite** decides who can put a player straight into a
  [draft lobby](/features/draft-lobbies) lineup. Below that role, the player
  gets an invite they must accept.
- **Player Models**: force the default player models for every player in a
  match.

## Map pools

**Settings → Application → Map Pools** has one pool per match type
(**Competitive**, **Wingman**, **Duel**, and **Rush**). Edit a pool to choose
its maps.

- **Available Maps** lists every map with whether it is **Active Duty**, which
  modes it is available in, and its workshop ID. **Add New Map** adds an
  official or workshop map.
- **Automatic Update Map Pools** keeps the pools in step with Valve's active
  duty list as maps are added or removed.
- Deleted maps move to **Deleted Maps**: they're hidden from every pool and
  picker, but matches already played on them keep their history. **Restore**
  brings one back as it was.

Matches and tournaments can still pick a custom pool of their own.

## Game Type Configs

Edit the server config applied for each game type, **Competitive**, **Wingman**,
**Duel**, and **Rush**, plus the **LAN** and **Global** layers exec'd on top of
whichever one a match uses, with defaults you can load and restore. See
[Game Modes](/features/admin/game-modes#global-configuration) for the exec order.
