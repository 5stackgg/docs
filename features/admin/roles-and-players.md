# Roles & Players

The player directory is where staff find players, and a player's profile is
where their role and record are managed. For how roles map to permissions, see
the [role hierarchy](/features/admin/#roles-access-control).

## Player directory

**Players** lists every player with their wins, losses, KDR and Elo. Search by
name and narrow the list with the filters:

- **Elo Range**: slider.
- **Filter by Country**.
- **Played Matches**, **Online** and **Registered**.
- **Live on Twitch**, once [Twitch](/features/admin/integrations#twitch) is set
  up. Players who are live carry a **Live** tag in the list.

Match organizers and above also get:

- **Filter by Privilege**: one or more roles.
- **Minimum Sanctions**, and **Banned**, **Gagged** and **Muted** toggles.
- The **Privilege** and **Last Sign In At** columns.

Sort by name, Elo, last sign-in, or **Privilege**, which sorts by rank in the
role hierarchy rather than alphabetically. Back returns you to the page of
results you left.

## Managing roles

A player's role is changed inline on their profile. Match organizers and above
can change the role of players at or below their own role, to any role up to
their own: **User**, **Verified User**, **Streamer**, **Moderator**, **Match
Organizer**, **Tournament Organizer**, or **Administrator**. Most features are
gated by a **minimum role**, so promoting a player unlocks every feature at or
below their new role.

## Role permissions

**Settings → Application → Players** sets:

- **Minimum Role Allowed to Create Matches**
- **Minimum Role Allowed to Create Tournaments**
- **Minimum Role to Connect to Dedicated Password-Protected Servers**
- **Force Player Name Registration**: new players must submit a name to use on
  the platform.

### Leaderboards

**Leaderboards → Minimum matches** (default 3): players appear on a
[leaderboard](/features/stats-and-leaderboards#leaderboards) only once they
have played this many matches in the season or time range being viewed. The
Awards, FACEIT and Premier boards ignore it.

### Who's online

**Most players online to list** (default 200) caps the **Others** tab of the
[friends list](/features/social#friends). Above it the list switches off until
10% fewer are online, and players find each other through search. 0 never
lists everyone.

## Teams

**Settings → Application → Teams → Roster & substitutes** sets the roster rules
used across [leagues](/features/leagues) and
[tournaments](/features/tournaments):

| Setting                 | Default | Range                          |
| ----------------------- | ------- | ------------------------------ |
| **Minimum roster size** | 5       | 1–15                           |
| **Maximum roster size** | 7       | up to 20, at least the minimum |
| **Substitutes**         | 2       | 0–10                           |

Teams need at least the minimum to be approved and can't go over the maximum.
Substitutes back up the five starters.

## Name changes

When names need approval, a player's new name only shows once an admin approves
it. The name field tells them so, and asks for a reason (**Why the new name?**,
up to 300 characters). A player has one open request at a time. Staff get a
**Name change requests** notification, which can also be posted to Discord.

Administrators approve or deny a request with an optional **Comment for the
player**, which is sent back with the decision. The player is notified either
way.

## Sanctions

Moderators and above can **warn**, **ban**, **mute**, **gag** and **silence**
players whose role is below their own, from their profile, from chat, or from a
community server's player list.
Sanctions sync across matches and servers, VAC bans on Steam create bans
automatically, and abandons and tournament no-shows escalate on their own.

See [Moderation & Sanctions](/features/moderation) for sanction types, durations,
warnings, and the automatic sanctions policy.

## Maintenance

The **Danger Zone** on **Settings → Application → Players** runs jobs across
every player in the background. The reindex and the recompute show live
progress and can be cancelled.

- **Reindex Search**: re-syncs every player's name, Elo, stats and sanctions
  into the search index, for when a player looks out of date in search but their
  profile is correct.
- **Recompute ELO**: wipes and rebuilds every player's Elo by replaying all
  finished matches in order, and each season's Elo when seasons are on.
- **Scan Steam Bans**: re-checks every player who has been on a lineup for
  Steam VAC and game bans.

These run automatically when needed; only trigger them by hand if you have to.

## Organizers chat

**Match Organizers** and above get an **Organizers chat** room for coordinating
events out of public view. It keeps 90 days of history by default, and goes by
the role a player holds now: someone demoted below Match Organizer stops
receiving it straight away. See [Chat](/features/chat).
