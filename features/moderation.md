# Moderation & Sanctions

Keeping a community playable is its own job. 5Stack gives moderators a single
place to apply restrictions that follow a player everywhere, the web app,
matches, and your servers, instead of a pile of per-server bans that drift
apart.

## Sanction types

| Sanction    | Effect                           |
| ----------- | -------------------------------- |
| **Ban**     | No participation in any activity |
| **Mute**    | Can't use voice                  |
| **Gag**     | Can't use text chat              |
| **Silence** | Muted _and_ gagged               |

Each sanction carries a **reason** and a **duration**: 15 minutes, 30 minutes, 1
hour, 1 day, 1 week, 1 month, or **permanent**.

Sanctions **sync across matches and servers**, a player gagged from the panel
is gagged in game, and a ban applies wherever they try to play.

## Applying and managing sanctions

Sanction a player from the [player directory](/features/admin/roles-and-players),
their profile, or directly from a live match's player list.

A player's sanction history shows every sanction with its type, reason, who
issued it, and when it expires. Active sanctions can be **edited**, set an end
time to lift one early, or clear the date to make it permanent, or **removed**
outright. Expired sanctions are kept as history and can't be edited; issue a new
one instead.

Country bans are handled separately, and the player directory can filter by
country-ban status.

## Abandoned matches

Players who abandon matches accumulate a record of it on their profile, visible
alongside their sanctions, so repeat offenders are obvious rather than anecdotal.
An abandoned-match record can be removed by a moderator if it was recorded
unfairly.

## Steam ban detection

5Stack checks players' Steam accounts for **VAC and game bans** and
automatically creates a sanction when it finds one, with a link through to the
ban on Steam. A **VAC badge** surfaces on the player's profile. You don't have to
watch for it manually.

See [Integrations](/features/admin/integrations) for the Steam match history
connection this shares.

## The Moderator role

**Moderator** sits between Streamer and Match Organizer in the
[role hierarchy](/features/admin/#roles-access-control). It exists so you can
hand someone the tools to police chat and servers without giving them the ability
to run matches, change settings, or touch infrastructure.

## Public and community servers

The **Public Servers** page lists every dedicated server your instance offers for
open play, including **LAN servers**, with live player counts and capacity, so
players can jump into whatever is busy.

Moderators get a **Manage** link through to the server, where **Player
Management** shows who's currently connected and lets you act on them over RCON.

::: warning Live enforcement on public servers
Kicks work today. Live **mute/gag enforcement on public servers** is still a work
in progress. It needs a new 5Stack public-server plugin, and mutes and gags will
apply automatically once it ships. Full sanction enforcement already works on
5Stack-run matches.
:::
