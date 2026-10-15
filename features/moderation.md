# Moderation & Sanctions

Keeping a community playable is its own job. 5Stack gives moderators a single
place to apply restrictions that follow a player everywhere, the web app,
matches, and your servers, instead of a pile of per-server bans that drift
apart.

## Sanction types

| Sanction    | Effect                                                                              |
| ----------- | ----------------------------------------------------------------------------------- |
| **Ban**     | No participation in any activity                                                    |
| **Mute**    | Can't use voice chat in game                                                        |
| **Gag**     | Can't use text chat in game, in group chat rooms on the website, or comment on news |
| **Silence** | Muted _and_ gagged                                                                  |
| **Warning** | A note on the player's record. Never enforced, never expires                        |

Each sanction carries a **reason** and a **duration**: 15 minutes, 30 minutes, 1
hour, 1 day, 1 week, 1 month, or **permanent**.

Sanctions **sync across matches and servers**: a player gagged from the panel is
gagged in game, and a ban applies wherever they try to play. Match servers
enforce them through the match plugin, and community servers through the
[Player Management plugin](/servers/dedicated-servers/player-management).

A gag also covers website chat: in match, team, lobby, draft, tournament and
organizer rooms a gagged player gets a read-only composer. Direct messages
aren't affected. Gagged and banned players can't comment on
[news posts](/features/news#comments) either.

::: tip Valve's report mute doesn't follow players into matches
CS2 can mute a player for everyone based on reports from games elsewhere. 5Stack
match servers clear that mute, so the only mute that applies in a match is one a
5Stack moderator issued.
:::

### Warnings

A **warning** puts a note on a player's record without restricting anything. It
needs a reason, has no duration, and never counts as an active sanction. The
player is notified ("You received a warning"), and only they and moderators can
see it; other players and signed-out visitors can't. Warnings never reach
Discord or the player's teammates. On the record they show an amber
**On record** marker.

## Applying and managing sanctions

Moderators and above can sanction a player from:

- their **profile**: **⋮ → Sanctions** opens their record with
  **Sanction Player**,
- a **chat message**: **Moderate {name}** in the message menu, mildest first
  (see [Chat](/features/chat#moderation)),
- a community server's **Players** tab and recent players list.

A player's record shows every sanction with its type, reason, who issued it,
and when it expires, plus any [Steam bans](#steam-ban-detection) and abandoned
matches. Active sanctions can be **edited** (**End Sanction**: set when it
lifts, set a past time to end it now, or clear the date to make it permanent) or
**removed**. Expired sanctions are kept as history and can't be edited; issue a
new one instead. Removing a sanction removes that one row only.

In the [player directory](/features/admin/roles-and-players), match organizers
and above can filter by **Banned**, **Gagged** and **Muted**, and by a
**Minimum Sanctions** count.

### Who can act on whom

Sanctioning a player, editing or removing one of their sanctions, and kicking
them from a community server all need a role strictly above theirs. Nobody acts
on an equal, administrators included, so nobody can lift their own sanction
either. On a profile or a server's player list the buttons stay but are
disabled, and say why on hover or tap ("Only someone with a role above this
player's can do this."). In chat, **Moderate {name}** only appears on messages
from players below you. 5Stack's own automatic sanctions, such as VAC bans and
abandon penalties, aren't held to this, but lifting one by hand is.

## Who gets told

- A **banned** player who has signed in before is notified, with the reason.
- A **warned** player is notified.
- Players who shared a completed match with a banned player in the last 6
  months are told about **bans only**, under **Banned teammates**, which they
  can turn off (see [Notifications](/features/notifications#banned-teammates)).
- Administrators get a **Player Banned** notice when a banned player has ever
  played on a lineup.

## Automatic sanctions

**Settings → Application → Sanctions** decides how 5Stack punishes what it can
detect on its own. Each source counts occurrences inside a window and applies
the matching step of an escalation ladder.

| Source                 | What counts                                                        | Shipped default                                                                                    |
| ---------------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- |
| **Match Abandon**      | A player left or never connected to a match they were rostered for | Every abandon counts for 7 days: 10 min, 1 h, 2 h, 4 h, 8 h, 16 h, then 32 h. **Bars matchmaking** |
| **VAC / Game Ban**     | Steam reports a VAC ban on the account                             | A permanent platform ban                                                                           |
| **Tournament No-Show** | A team missed a required tournament check-in                       | The third inside 30 days, and each after it: 7 days. **Bars tournaments**                          |

For each source you set:

- **Sanction after**: how many occurrences are free before the first sanction.
- **Counting window (days)**: how far back occurrences count. 0 never decays.
- **Escalation ladder**: one duration per occurrence. The last step repeats
  forever, and a step of 0 is permanent.
- **What it bars**: **Bars matchmaking** (queueing and draft lobbies), **Bars
  tournaments** (joining a tournament roster or the free agent pool), or **Bars
  both**.

The defaults reproduce what 5Stack did before the page existed, and reading the
page changes nothing; only an edit does. A tournament no-show is only checked on
the way in, so a player already in a running bracket keeps their place.

## Abandoned matches

Players who abandon matches accumulate a record of it on their profile, visible
alongside their sanctions, so repeat offenders are obvious rather than anecdotal.
An abandoned-match record can be removed by a moderator if it was recorded
unfairly. One abandon is only ever counted once.

## Steam ban detection

5Stack checks players' Steam accounts for **VAC and game bans**: on sign-in,
when a player is first seen, after every match they finish, and on an hourly
sweep that re-checks everyone who played in the last 6 months at most once a
day. A **VAC ban** creates a platform ban automatically, with a link through to
the ban on Steam. Game bans are recorded and shown, but don't ban anyone on
their own. A badge on the player's profile shows either kind (red for VAC,
orange for a game ban), and the profile's record lists the counts.

Administrators are never auto-banned. If you remove an automatic ban (for
example, a VAC ban from a game other than CS2), 5Stack won't put it back for the
same Steam ban.

**Scan Steam Bans** under **Settings → Application → Players** re-checks every
player who has been on a lineup. Whether a VAC ban bans the whole platform or
only part of it is the **VAC / Game Ban** source above.

## The Moderator role

**Moderator** sits between Streamer and Match Organizer in the
[role hierarchy](/features/admin/#roles-access-control). It exists so you can
hand someone the tools to police chat and servers without giving them the
ability to run matches, change settings, or touch infrastructure. Moderators
can:

- issue, edit and remove sanctions on players whose role is below theirs,
- delete messages in group chat rooms, and still see blocked players' lines
  there (see [Blocking](/features/social#blocking-players)). A team's own chat
  is moderated by the team, not by staff,
- hide, restore and delete [news comments](/features/news#moderating-comments),
- use the **RCON** console on match and community servers. A player who
  organizes a match without the Moderator role sees "RCON is for moderators"
  in its place, and keeps the server reboot and veto override,
- manage the players on community servers, with kick and sanction actions,
- review a finished match's [chat log](/features/chat#match-chat-log).

## Public and community servers

The **Public Servers** page lists every dedicated server your instance offers for
open play, with live player counts and capacity, so players can jump into
whatever is busy.

Moderators manage each server from its page: who is connected, sanctions and
kicks, and who is allowed in. Bans, mutes and gags are enforced live by the
[Player Management plugin](/servers/dedicated-servers/player-management); see
[Community Servers](/servers/dedicated-servers/community-servers) and
[Restricted Servers](/servers/dedicated-servers/access).
