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
new one instead. Removing a sanction removes that one row only. Moderators and
above still see a removed sanction on the record, marked **Removed by {name}**.

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
- Players who [reported](#reporting-a-player) them hear back (**Report
  reviewed**). Any new sanction, automatic VAC and FACEIT bans included,
  resolves the open reports against that player and tells the reporters.

## Reporting a player

**Report Player** is in a player's profile **⋮** menu, and in the **⋮** on
their row of a match scoreboard. A report has a **Reason**:

| Reason       | For                                                 |
| ------------ | --------------------------------------------------- |
| **Cheating** | Aimbot, wallhack, triggerbot or scripts             |
| **Toxicity** | Slurs, harassment or threats in chat or voice       |
| **Griefing** | Team damage, blocking, throwing rounds or going AFK |
| **Other**    | Anything else a moderator should see                |

It also names the **Match** you shared, an optional **Round**, and **Details
(optional)**, up to 500 characters.

- You can report someone you played a 5Stack match with in the last 30 days.
  Imported matches don't count, and the match must be live, finished, tied,
  forfeited or surrendered.
- Administrators can't be reported, and banned players can't report.
- One open report per player you report, and up to 10 reports a day. The menu
  then reads **Reported · Pending Review**.
- The report keeps the reported player's all-chat lines from that match, with
  the lines around them, up to 40 lines. Team chat is never included.

The reported player never learns who reported them. The reporter always hears
back with a **Report reviewed** notification: the report led to action, or a
moderator reviewed it and took none (**Reports acted on** and **Reports with no
action** in [notification settings](/features/notifications#what-you-ll-get)).

Chat messages are reported from the message itself; see
[Reporting a message](/features/chat#reporting-a-message).

## The Moderation page

**Moderation** (`/moderation`), under **Administration**, is the queue
moderators and above work reports from. Its navigation item carries a badge
while anything is waiting.

| Tab                   | What it holds                                    |
| --------------------- | ------------------------------------------------ |
| **Player Reports**    | One case per reported player                     |
| **Messages**          | Reported chat messages                           |
| **Done**              | Reports that were resolved or dismissed          |
| **Removed by Rokkan** | Chat lines Rokkan removed (5stack.gg, see below) |

A player's case lists every report against them, with each reason, reporter and
round. For each match it shows the player's **Kills on reporters**, **K–D**,
**HS** and **ADR**, the chat lines the report saved, the match's **Chat Log**,
and **Open Match**. Close a case with **Dismiss**, with an optional note, or
act on it with **Warning**, **Gag** or **Ban**. As everywhere, you can only act
on players whose role is below yours.

A reported message shows the line with **Show Context**, and can be resolved,
dismissed, sanctioned, or opened in its room (**Open Chat**).

On 5stack.gg, Rokkan also reads group chat and flags messages that break the
rules into the **Messages** queue; see
[Chat moderation](/features/chat#rokkan-chat-moderation).

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
Match organizers and above see each abandon's occurrence count, the queue
cooldown it earned, and when that cooldown lifts.

An abandoned-match record can be removed by a moderator if it was recorded
unfairly. It stays on the record, marked removed, and stops counting toward the
cooldown. One abandon is only ever counted once.

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

### FACEIT cheating bans

With a [FACEIT API key](/advanced/faceit-integration) set, 5Stack also checks
players for FACEIT bans. A player banned on FACEIT for cheating gets a **Banned
on FACEIT for cheating** badge on their profile, a **FACEIT Ban** card on their
record (**View on FACEIT**), and an automatic 5Stack ban, "Auto: FACEIT
cheating ban", that ends when the FACEIT ban does.

## Recently banned

**Bans**, in the **Community** section of the navigation, opens **Recently
banned** (`/bans`). Anyone can view it, signed in or not.

- Filter by kind: **VAC ban**, **Game ban** (CS2 Overwatch), **Staff ban**
  (issued by a moderator), or **Automatic** (for a Steam VAC or FACEIT cheating
  ban), and search by name.
- The window is the last 7, 30 or 90 days, 30 by default.
- Signed in, **Played with me** narrows it to players you shared a match with,
  either side, or only **Against me** or **On my team**, and **Only matches I
  lost** keeps the matches you lost.
- Moderators can lift a ban from its record with **End ban now**.

## The Moderator role

**Moderator** sits between Streamer and Match Organizer in the
[role hierarchy](/features/admin/#roles-access-control). It exists so you can
hand someone the tools to police chat and servers without giving them the
ability to run matches, change settings, or touch infrastructure. Moderators
can:

- issue, edit and remove sanctions on players whose role is below theirs,
- work [player reports](#reporting-a-player) and reported messages on the
  [Moderation page](#the-moderation-page),
- read a live match's **Match Chat** on its page, read-only, from check-in
  through the live map (team chats stay private),
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
