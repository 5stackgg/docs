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
| **Moderator** | Can sanction players, moderate chat, review a finished match's chat log, use RCON, and manage players on community servers |
| **Match Organizer** | Can run matches and access the organizers chat |
| **Tournament Organizer** | Can run tournaments |
| **Administrator** | Full access, including all settings |

Many features are gated by a **minimum role** rather than a hard admin-only
switch, for example a minimum role to stream, to spectate, to create matches or
tournaments, or to connect to password-protected dedicated servers. This lets
you open features up to trusted players without making them full admins. A few
areas are strictly **administrator-only**, such as branding, site-wide alerts,
the render queue, and GPU nodes.

Roles are assigned from a player's profile; see
[Roles & Players](/features/admin/roles-and-players).

## What admins can configure

- **[Roles & Players](/features/admin/roles-and-players)**: roles, the player
  directory, name approvals, and player maintenance jobs.
- **[Moderation & Sanctions](/features/moderation)**: sanctions, warnings, and
  the automatic sanctions for abandons, VAC bans and tournament no-shows.
- **[Matchmaking & Ranks](/features/admin/matchmaking)**: match types, Elo
  ranks, lineups, map pools, and per–game-type server configs.
- **[Branding & Theming](/features/admin/branding)**: name, logo, login page,
  and the color theme.
- **[Servers & Regions](/features/admin/servers)**: server types, automatic CS2
  updates and version pinning, match server controls, tuning, and regions.
- **[Game Modes](/features/admin/game-modes)**: the plugins, cvars and launch
  parameters that make a match play differently, and which modes are ranked.
- **[Integrations](/features/admin/integrations)**: Discord notifications,
  match imports (Valve/FACEIT), Steam Presence, chat retention, attachments and
  GIFs, web push, and analytics.
- **[System & Monitoring](/features/admin/system)**: metrics, logs, database
  performance, backups, and the render queue.

The admin controls for [demo settings](/features/demos), [highlights](/features/highlights),
[streaming](/features/live-streaming), [player cameras](/features/player-cameras),
[voice chat](/features/voice-chat), and the
[utility library and practice servers](/features/utility-library) are covered on
those feature pages.

## Site-wide alerts

**Alerts** in the Administration menu posts temporary banners at the top of
every page for every visitor, for outages, maintenance and other notices. Each
alert has a **Severity** (**Info**, **Warning** or **Critical**), an optional
title and expiry, and can be made **Dismissible** or not. Messages can carry
links: write `[label](https://example.com)` or paste a bare URL. Links to your
own site open inside the app; other sites open in a new tab.

::: tip Empty sections stay out of the navigation
On a fresh instance, **Tournaments**, **Events**, **News** and **Highlights**
don't appear in the navigation until there is something in them. Players who
can create tournaments, events or news posts still see those links, so the
first one can be added.
:::
