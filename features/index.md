# Features

5Stack is a comprehensive Counter-Strike management system — servers,
matchmaking, tournaments, stats, and everything you do with a match after it
ends. This is the full picture of what the platform offers.

Pages linked below go deeper on the bigger features.

## Play

- **[Quick Play & Matchmaking](/features/quick-play)** — jump into 1v1, 2v2, or
  5v5, spin up instant scrims, or queue into latency-aware regional matchmaking
  with a party.
- **[Matches](/features/matches)** — server selection (on-demand, dedicated, or
  third-party), access modes and invites, map/region veto, check-in, and full
  match rules (knife, overtime, pauses, best-of, coaches, and more).
- **[Tournaments & Brackets](/features/tournaments)** — host open or private
  tournaments with multi-stage Single Elimination, Double Elimination, Round
  Robin, or Swiss formats, group stages, seeding, byes, check-in, trophies, and a
  live, embeddable bracket.
- **Custom Map Pools** — curated pools for every format (1v1, 2v2, 5v5).

## Match review & media

- **[Match Replay (2D & 3D)](/features/match-replay)** — re-watch any map as a
  top-down radar replay or a full 3D fly-through, right in the browser.
- **[In-Browser Demo Playback](/features/demo-playback)** — GOTV-style demo
  viewer with player POV switching, X-ray, and round-by-round navigation.
- **[Highlights](/features/highlights)** — automatic highlight
  reels of multikills and clutches, plus an in-app clip builder.
- **[Live Streaming](/features/live-streaming)** — broadcast matches from the
  panel with the Stream Deck, a public watch hub, and a scoreboard overlay.
- **[Demos](/features/demos)** — automatic upload, storage, retention, and
  download.

## Stats & community

- **[Stats & Leaderboards](/features/stats-and-leaderboards)** — HLTV-style
  ratings, KAST/ADR, opening duels, clutches, roles, Elo, and global
  leaderboards, including imported Valve/FACEIT matches.
- **[External Matches](/features/external-matches)** — import your Valve and
  FACEIT matches (or upload a demo) to get full stats, replay, and highlights.
- **[Teams, Lobbies & Chat](/features/social)** — teams, friends, parties, and
  smart, context-aware chat that bridges the web app and in-server.
- **Discord Integration** — create matches, manage lobbies, and sync roles from
  Discord with the 5Stack bot.

## Servers & infrastructure

- **Flexible Server Management** — on-demand servers, dedicated hardware, or
  third-party machines, all from one panel.
- **Automatic CS2 updates** — servers stay on the latest CS2 build (and 5Stack
  plugin) automatically, with optional version pinning when you need stability.
- **Regional Servers** — multi-region and LAN-capable, with built-in Steam Relay
  to hide your real server IPs.
- **Server Insights** — live CPU / memory / disk, logs, CPU pinning, and
  low-latency kernel status.
- **[GPU Nodes](/servers/gpu-nodes)** — power highlights, demo playback, and live
  streaming rendering.

## Platform

- **Installable app (PWA)** — add 5Stack to your home screen or desktop for an
  app-like experience, with offline-aware caching.
- **[15+ languages](/features/languages)** — the interface is fully localized,
  with automatic detection of your browser language.
- **Embeds & popouts** — drop a live, auto-cycling tournament bracket onto a
  stream or site, and pop replays and broadcasts out into their own windows for a
  second monitor.
- **[API & personal keys](/features/api-keys)** — generate personal API keys for
  programmatic access to your data.

## For administrators

5Stack gives admins deep control over how the platform behaves:

- **[Administration Overview](/features/admin/)** — roles and access control.
- **[Roles & Players](/features/admin/roles-and-players)** — manage roles,
  the player directory, and sanctions.
- **[Matchmaking & Ranks](/features/admin/matchmaking)** — match types, Elo
  ranks, lineups, map pools, and per–game-type configs.
- **[Branding & Theming](/features/admin/branding)** — name, logo, login page,
  and full light/dark theming.
- **[Servers & Regions](/features/admin/servers)** — server types, automatic CS2
  updates and version pinning, match server controls, tuning, and regions.
- **[Integrations](/features/admin/integrations)** — Discord, external match
  imports, analytics, and chat.
- **[System & Monitoring](/features/admin/system)** — metrics, logs, database
  performance, backups, and the render queue.

::: tip Rendering features need a GPU
Highlights, in-browser demo playback, and live streaming are all rendered on a
**GPU node**. See [GPU Nodes](/servers/gpu-nodes).
:::
