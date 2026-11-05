# Notifications

5Stack can reach you in five places: the **Inbox** in the hub, toasts on the
page, push notifications on your phone or desktop, a flashing browser tab, and
sounds. **Settings → Notifications** lists every kind of notification 5Stack can
send and decides where each one reaches you.

## The Inbox

The **Inbox** is the bell at the top of the [hub dock](/features/social#the-hub).
Its badge counts what is waiting on you. It's split into three sections:

| Section       | What's in it                                                                                    |
| ------------- | ----------------------------------------------------------------------------------------------- |
| **Needs you** | Anything waiting on your answer: invites, check-in, league scheduling, team reminders           |
| **Live now**  | Match alerts, and for staff, problems still going on, such as an offline node, until they clear |
| **Recent**    | Everything else, newest first                                                                   |

- **Invites** to teams, tournaments and draft rooms come with accept and
  decline.
- **Team reminders**: a team you can invite to that has fewer than five
  starters shows "{count} of 5 starters" with **Invite Player** and **Dismiss**.
  A dismissal holds until the roster shrinks further.
- **Clips of you** is a reel of your new [highlights](/features/highlights),
  with how many you haven't seen.
- Several of the same kind stack into one card, such as "Rokkan reviewed 3
  maps" or "Stats ready for 4 matches", with one button for all of them.
- **News** posts, [community polls](/features/news#community-polls) and
  [feature spotlights](#feature-spotlights).

The dot on a notification marks it read (**Mark read**), and on one already read
deletes it, with **Undo** for a moment afterwards. The header has one bulk
action at a time: **Dismiss All** while anything is unread, then **Delete
Dismissed** once everything is. The gear opens **Notification Settings**.

A notification you can switch off has a **More Actions** menu with **Turn Off
{kind}**, which stops that kind reaching the Inbox, with **Undo** in case you
didn't mean it.

Chat never lands in the Inbox; see [Chat](#chat) below.

## Toasts

Some things need an answer now, so they also pop up on the page:

- **Invites**: friend requests and lobby, team, tournament and draft invites,
  on desktop.
- **Match actions**: **Match Check-in**, **Region Veto** and **Map Veto** toasts
  for players in the match, with an **Open Match** button that takes you to the
  match or its draft room. They show on phones too, clear when the turn is over,
  and stay hidden while you're already on that match's page. Dismissing one
  doesn't silence the next turn.
- **Voice calls**: someone joining a voice channel you can join.

Toasts appear at the bottom left of the page.

## Notification settings

**Settings → Notifications** has three parts.

### Where they reach you

- **Bell**: the Inbox in the hub. Always on.
- **Push**: alerts on your phone or desktop, even when 5Stack isn't open.
  Turned on per device; see [Web Push](/advanced/web-push) for what each
  platform needs.
- **Browser tab**: flashes the tab's title and icon while it's in the
  background, for **Match found**, **Organizer calls**, **Chat messages** and
  **Notifications**. Each is on by default and saved in this browser.
- **Sounds**: one switch, a volume slider, and a preview button for each sound
  (**Chat message**, **Match found**, **Tick** and **Countdown**). Saved in this
  browser.

Your **Push** choices are saved to your account and apply on every device where
you turn push on. Sounds stay quiet while you're connected to a match server.

### What you'll get

Every kind of notification, grouped, with a **Bell** switch and a **Push**
switch. Push is switched per group; the bell can be switched per kind.

| Group                                     | Includes                                                                                                                             | Push by default                   |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------- |
| **Matches**                               | Match alerts, imported matches, stats ready, Rokkan's match reviews and scouting, clips ready                                        | On                                |
| ↳ **Match found**                         | Matchmaking found your match                                                                                                         | On, rings                         |
| ↳ **Match chat**                          | Messages in a match's room, including chat relayed from the game                                                                     | **Off**                           |
| ↳ **Admin calls**                         | An admin wants to talk to you over your match camera                                                                                 | On, rings                         |
| **Invites**                               | Team, tournament, tournament registration and draft invites                                                                          | On                                |
| **Account**                               | Your name changes, warnings, sanctions, awards, Career unlocks and rewards, supporter thanks, and the outcome of your player reports | On                                |
| **Banned teammates**                      | A player you've played with in the last 6 months was banned                                                                          | On                                |
| **Chat**                                  | New messages in a conversation, lobby or tournament room                                                                             | On                                |
| **Tournaments**                           | New tournaments, reminders and check-in                                                                                              | On                                |
| **Leagues**                               | Scheduling proposals and roster warnings                                                                                             | On                                |
| **Scrims**                                | Scrim requests, schedule changes and alerts                                                                                          | On                                |
| **Teams, events, seasons, utility, news** | Team suggestions, event reminders, season ends, practice invites, articles, community polls, comment replies                         | On                                |
| **Staff**                                 | Support requests, abandons and name-change requests; server and job status                                                           | Moderation on, infrastructure off |

A few kinds can't be switched off in the bell: your own name-change decisions,
bans and warnings are always shown ("Always shown: it's about your account").
Match found, admin calls and chat are **push only** and never appear in the
bell. The **Staff** group only shows for moderators and above.

### Quiet hours

Set a **From** and **To** time and push stays silent during that window. Pushes
that arrive in it are held and sent as one summary per conversation or thread
when the window ends. Anything that uses the bell still lands in the Inbox as
normal. **Match found** and **Admin calls** ring anyway.

## Urgent alerts

**Match found** and **Admin calls** are sent as urgent pushes. Where the device
supports it, they vibrate and stay on screen rather than sliding away like other
notifications.

They expire after 30 seconds, so a phone that was offline doesn't get a stale
"Match found" later. Accepting the match, or answering the call, on that device
takes the alert down.

## Chat

Chat messages reach you as push, a flashing tab and a sound, never as Inbox
entries. A chat push is only sent if you haven't already seen the message:

- Nothing is sent while you're looking at that conversation, or once you've read
  past the message on any device.
- The first message of a burst arrives straight away. The rest of the burst is
  collapsed into one summary.
- [Message requests](/features/chat#message-requests) and players you've blocked
  never push.
- A room you've muted, or set to **Only @tags** or **Nothing**, only pushes what
  that setting lets through (see [Muting a room](/features/chat#muting-a-room)).

A message that [tags you](/features/chat#tagging-players) is pushed as "{name}
mentioned you", with the room's name. Tags are pushed under **Chat**, so a tag
in match chat reaches you even with **Match chat** off.

**Match chat** is a separate switch and is **off by default**: in-game chat is
relayed into the match room, and you've already read it in the game.

## Banned teammates

When a player you've played with in the last 6 months is **banned**, you get a
notice showing who it was. This includes automatic bans for VAC. Only bans reach
teammates; mutes, gags and warnings don't. Turn these off with **Banned
teammates** under **Settings → Notifications**.

## Feature spotlights

Spotlights are cards in the Inbox that point you at a feature you haven't set up
yet. They count toward the Inbox badge until you dismiss them, and a dismissal
follows you to every device.

The first one, **Highlights From Every Match You Play**, asks you to link your
Steam match history (**Link Account**) so your Premier and Competitive games
import and get [auto highlights](/features/highlights). It only shows when
match imports and highlights for imported matches are both on, and clears itself
once you link.

## Installed app

On an installed app the app icon carries your unread Inbox count. A **Turn on
notifications** prompt offers push on devices that don't have it yet.

## For administrators

Push needs no setup and no third-party service; see
[Web Push Notifications](/advanced/web-push). Only staff notifications are ever
posted to Discord; see [Integrations](/features/admin/integrations#discord).

**Settings → Application → Notification Gallery** shows a sample of every
notification type, so you can see how each one looks. Nothing on it reaches
players.
