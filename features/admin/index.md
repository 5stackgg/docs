# Administration Overview

Administrators get deep control over how a 5Stack instance behaves, from who can
do what, to matchmaking rules, branding, integrations, and the infrastructure
running underneath.

## Roles & access control

5Stack uses a role hierarchy. Each role includes the permissions of the ones
below it:

| Role | Typical use |
| --- | --- |
| **User** | Default for everyone who signs in |
| **Verified User** | Trusted players |
| **Streamer** | Can broadcast / spectate demos |
| **Moderator** | Can sanction players and manage public servers |
| **Match Organizer** | Can run matches and access the organizers chat |
| **Tournament Organizer** | Can run tournaments |
| **Administrator** | Full access, including all settings |

Many features are gated by a **minimum role** rather than a hard admin-only
switch, for example a minimum role to stream, to spectate, to access
matchmaking, or to add players without an invite. This lets you open features up
to trusted players without making them full admins. A few areas are strictly
**administrator-only**, such as branding, the render queue, and GPU nodes.

Roles are assigned from the [player directory](/features/admin/roles-and-players).

## What admins can configure

- **[Roles & Players](/features/admin/roles-and-players)**: roles, the player
  directory, and sanctions.
- **[Matchmaking & Ranks](/features/admin/matchmaking)**: match types, Elo
  ranks, lineups, map pools, and per–game-type server configs.
- **[Branding & Theming](/features/admin/branding)**: name, logo, login page,
  and full light/dark theming.
- **[Servers & Regions](/features/admin/servers)**: server types, automatic CS2
  updates and version pinning, match server controls, tuning, and regions.
- **[Integrations](/features/admin/integrations)**: Discord, external match
  imports (Valve/FACEIT), analytics, and chat.
- **[System & Monitoring](/features/admin/system)**: metrics, logs, database
  performance, backups, and the render queue.

The admin controls for [demo settings](/features/demos), [highlights](/features/highlights),
[streaming](/features/live-streaming), [player cameras](/features/player-cameras),
and [voice chat](/features/voice-chat) are covered on those feature pages.
