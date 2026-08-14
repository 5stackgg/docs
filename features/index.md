# Features

5Stack is a comprehensive Counter-Strike management system, servers,
matchmaking, tournaments, leagues, stats, and everything you do with a match
after it ends. This is the full picture of what the platform offers.

Pages linked below go deeper on the bigger features.

## Play

- **[Quick Play & Matchmaking](/features/quick-play)**: jump into 1v1, 2v2, or
  5v5, spin up instant scrims, or queue into latency-aware regional matchmaking
  with a party.
- **[Draft Lobbies](/features/draft-lobbies)**: host a pick-up game with real
  structure: auto-split, captains draft, host-assigned, or pre-made teams, with
  a pick clock, benches, and a substitute waitlist.
- **[Matches](/features/matches)**: server selection (on-demand, dedicated, or
  third-party), access modes and invites, map/region veto, check-in, and full
  match rules (knife, overtime, pauses, best-of, coaches, and more).
- **[Scrim Finder](/features/scrim-finder)**: advertise when your team plays,
  set who you'll play, and negotiate scrims without a Discord thread.
- **[Player Cameras](/features/player-cameras)**: require a webcam from every
  player, watch the feeds from the panel, auto-pause when one drops, and put the
  spectated player's camera on the broadcast.
- **Custom Map Pools**: curated pools for every format (1v1, 2v2, 5v5),
  including workshop maps.

## Compete

- **[Tournaments & Brackets](/features/tournaments)**: open or private
  tournaments with multi-stage Single Elimination, Double Elimination, Round
  Robin, or Swiss formats, group stages, seeding, byes, prizes, awards, and a
  live, embeddable bracket.
- **[Leagues](/features/leagues)**: seasonal divisions, weekly match play,
  captain-negotiated scheduling, playoffs, and promotion/relegation.
- **[Events](/features/events)**: wrap a LAN or a cup weekend into one page with
  its own medal table, leaderboard, and media gallery.
- **[Competitive Seasons](/features/seasons)**: periodic Elo resets with
  season-scoped stats and leaderboards.

## Match review & media

- **[Match Analysis](/features/match-analysis)**: scoreboard lenses, economy and
  buy-type breakdowns, clutches, head-to-head, detected roles, heatmaps and
  movement paths, plus team veto tendencies and a veto simulator.
- **[Match Replay (2D & 3D)](/features/match-replay)**: re-watch any map as a
  top-down radar replay or a full 3D fly-through, right in the browser.
- **[In-Browser Demo Playback](/features/demo-playback)**: GOTV-style demo
  viewer with player POV switching, X-ray, and round-by-round navigation.
- **[Highlights](/features/highlights)**: automatic highlight
  reels of multikills and clutches, plus an in-app clip builder.
- **[Live Streaming](/features/live-streaming)**: broadcast matches from the
  panel with the Stream Deck, a public watch hub, a scoreboard overlay, and
  picture-in-picture.
- **[Demos](/features/demos)**: automatic upload, storage, retention, and
  download.

## Stats

- **[Stats & Leaderboards](/features/stats-and-leaderboards)**: HLTV-style
  ratings, KAST/ADR, opening duels, clutches, roles, Elo, and global
  leaderboards, including imported Valve/FACEIT matches.
- **[Performance Rating](/features/performance-rating)**: Aim, Positioning, and
  Utility scored out of 100 against every other player, with focus areas and
  coaching notes.
- **[External Matches](/features/external-matches)**: import your Valve and
  FACEIT matches (or upload a demo) to get full stats, replay, and highlights.

## Community

- **[Teams, Lobbies & Chat](/features/social)**: teams, friends, parties, direct
  messages, and smart, context-aware chat that bridges the web app and in-server.
- **[Voice Chat](/features/voice-chat)**: party and team voice on 5Stack's own
  relay, with device pickers, a mic check, and voice-activity transmission.
- **[Steam Presence](/features/steam-presence)**: see what friends are playing,
  in 5Stack and outside it.
- **[Moderation & Sanctions](/features/moderation)**: bans, mutes, gags, and
  silences that follow a player everywhere, plus automatic VAC ban detection.
- **[News](/features/news)**: first-party announcements written and published
  from inside the panel.
- **Discord Integration**: create matches, manage lobbies, run map veto, and
  sync roles from Discord with the 5Stack bot.

## Servers & infrastructure

- **Flexible Server Management**: on-demand servers, dedicated hardware, or
  third-party machines, all from one panel.
- **Automatic CS2 updates**: servers stay on the latest CS2 build (and 5Stack
  plugin) automatically, with optional version pinning when you need stability.
- **Regional Servers**: multi-region and LAN-capable, with built-in Steam Relay
  to hide your real server IPs.
- **Server Insights**: live CPU / memory / disk, logs, CPU pinning, and
  low-latency kernel status.
- **[GPU Nodes](/servers/gpu-nodes)**: power highlights, demo playback, and live
  streaming rendering.

## Platform

- **Installable app (PWA)**: add 5Stack to your home screen or desktop for an
  app-like experience, with offline-aware caching.
- **[Push notifications](/advanced/web-push)**: per-category, per-device alerts
  that reach players when the app isn't open, with no third-party push service to
  sign up for.
- **[17 languages](/features/languages)**: the interface *and* the in-game
  plugin are fully localized, with automatic detection of your browser language.
- **Embeds & popouts**: drop a live, auto-cycling tournament bracket onto a
  stream or site, and pop replays and broadcasts out into their own windows for a
  second monitor.
- **Search**: fast player and entity search from anywhere in the app.
- **[API & personal keys](/features/api-keys)**: generate personal API keys for
  programmatic access to your data.
- **[5Stack Plugins](/plugins/)**: embed your own web applications as native
  panel pages, sharing the panel's session and design system. (For CS2
  server-side plugins, see
  [Game Plugins](/servers/game-server-nodes/plugin-runtimes).)

## For administrators

5Stack gives admins deep control over how the platform behaves:

- **[Administration Overview](/features/admin/)**: roles and access control.
- **[Roles & Players](/features/admin/roles-and-players)**: manage roles,
  the player directory, and sanctions.
- **[Matchmaking & Ranks](/features/admin/matchmaking)**: match types, Elo
  ranks, lineups, map pools, and per–game-type configs.
- **[Branding & Theming](/features/admin/branding)**: name, logo, login page,
  and full light/dark theming.
- **[Servers & Regions](/features/admin/servers)**: server types, automatic CS2
  updates and version pinning, match server controls, tuning, and regions.
- **[Integrations](/features/admin/integrations)**: Discord, external match
  imports, analytics, and chat.
- **[System & Monitoring](/features/admin/system)**: metrics, logs, database
  performance, backups, and the render queue.

Several features are optional and can be switched on or off instance-wide from
**Settings → Application**: matchmaking, leagues, seasons, events, news, the
Scrim Finder, voice chat, plugins, and linked accounts.

::: tip Rendering features need a GPU
Highlights, in-browser demo playback, and live streaming are all rendered on a
**GPU node**. See [GPU Nodes](/servers/gpu-nodes).
:::
