# Friends, Teams & the Hub

5Stack is built around playing with other people: friends, parties, teams, chat
and voice, all reachable from the hub without leaving the page you're on.

## The hub

On desktop the hub is a **floating dock** on the right edge of the screen. Each
icon is an app. Resting the pointer on an icon opens it beside the dock, a click
opens it straight away, and moving away puts it back. The page underneath never
changes width.

| App         | What it holds                                                                     | Badge                                                                                 |
| ----------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| **Inbox**   | Invites, reminders and every other [notification](/features/notifications)        | Red: how many are waiting on you                                                      |
| **Party**   | Your party's seats, invites, party voice, and the mode picker to queue            | Red for party invites; a dot while you're in a party; the search clock while queueing |
| **Voice**   | The [voice channel](/features/voice-chat) you're in, or the channels you can join | How many are in your call; green while you're in one                                  |
| **Friends** | Your friends, and **Others**: everyone else who is online                         | Red for friend requests, otherwise how many friends are online                        |
| **Chat**    | Every [chat](/features/chat) conversation and room you're in                      | Red for direct messages and tags of you; white for other new messages in rooms        |
| **Matches** | Your recent games: wins, losses, win rate and most-played maps                    |                                                                                       |

The pin at the bottom (**Keep the hub open**) holds it open, and a pinned hub
makes room for itself instead of floating over the page. An unpinned hub also
closes on Escape or a click elsewhere. Moving the pointer away doesn't close it
while you have a half-typed message in it. While you're in a voice call, a bar
with **Mute** and **Leave call** sits under every other app.

### Conversation shortcuts

Your most recently active conversations sit under **Chat** on the dock: up to
three people and two rooms by default, and a team's room shows the team's logo.
Right-click a shortcut to mute it or choose what it notifies you about (see
[Muting a room](/features/chat#muting-a-room)), **Pin to the dock**, **Remove
until a new message**, or **Never show on the dock**.
Right-click **Chat** to set how many people and rooms the dock shows (0 to 5
each) and to bring hidden chats back. These choices are saved per browser, since
dock space depends on the screen.

Match and party rooms aren't shortcuts: the match page and the Party app are
their homes.

### On a phone

The grid button in the top bar opens the hub. Its badge is red for
notifications, friend requests, direct messages and tags of you, and white when
only other chat is unread. The hub slides in over a dimmed page; swipe right to
close it.

## Friends

Your **Steam friends** sync in (**Sync Friends**), so the people you already
play with show up without adding them by hand. The **Friends** app lists each
friend's online state, what they're doing in 5Stack ("In a match", "In a lobby",
"In draft lobby"), and, with [Steam Presence](/features/steam-presence), what
they're doing in CS2 outside 5Stack. From a friend's row you can invite them to
your lobby or draft room, join them, message them, or remove or block them.
Players in **Others** can be sent a
[message request](/features/chat#message-requests) from their row.

When a friend comes online the dock tells you: one arrival shows their face on
the **Friends** icon ("{name} just came online"), several show the count, and
the list marks them **Just came online** until you've looked.

A player's profile has **Add as friend** (then **Requested**, which you can
cancel), **Message**, and a **⋮** menu with **Block** and any staff actions you
have.

## Teams

Create and manage teams and invite friends straight into them. A team page
carries its Elo and awards, its [league history](/features/leagues), its
[veto tendencies](/features/match-analysis#team-analytics), and its
[Scrim Finder](/features/scrim-finder) settings.

A team that is short of five starters reminds anyone who can invite to it, in
the [Inbox](/features/notifications#the-inbox).

Every team has a permanent [team chat](/features/chat#team-chat) for its roster
and owner, pinned to their chat rail and opened from **Team Chat** on the team
page. The team's owner and roster Admins moderate it, not site staff.

The owner can't leave their own team. Ownership is handed to another player on
the roster first, by the owner or by staff, and the new owner becomes a roster
Admin.

## Parties & lobbies

Group up in a party to chat, talk, and queue together. The **Party** app shows
your seats, invites and an **Invite** button for each open seat, **Join party
voice**, and the queue: the captain picks the mode and starts the search, and
everyone sees the search clock and the ready-up.

A party has a **captain** who drives ready-up and team decisions, and stays
together through matchmaking (see [Quick Play & Matchmaking](/features/quick-play)).

For structured pick-up games, with captains drafting, snake pick order and
substitute waitlists, see [Draft Lobbies](/features/draft-lobbies).

## Chat and voice

Every match, team, lobby, draft, tournament and organizer room, plus direct
messages, is in the **Chat** app, and match chat is relayed to and from the game
server. See [Chat](/features/chat) for @tags, muting a room, reactions, edits,
attachments, GIFs and message requests.

Talk to your party in a lobby, or to your team on the match page, with
[voice chat](/features/voice-chat) built into the panel.

## Blocking players

**Block** is in a player's profile **⋮** menu, the player menu anywhere their
name appears, and their row in your friends list. Blocking someone:

- removes your friendship, and cancels every pending invite between you,
- stops either of you inviting, friending or adding the other to a lobby, team,
  draft, match, tournament, league or event roster ("You can't do that with this
  player."),
- closes direct messages both ways,
- hides their messages and reactions from you in every chat room, right away
  and on every device, and stops their @tags reaching you,
- hides their [news comments](/features/news#comments), and the replies under
  them.

Staff adding players, and players joining something themselves, aren't stopped
by a block. Moderators and above still see a blocked player's lines in group
rooms other than team chat, marked **Blocked**, so blocking can't hide abuse
from them. In-game chat can't be filtered per player.

**Settings → Blocked Players** lists everyone you've blocked, with **Unblock**.
Unblocking doesn't restore the friendship. The same page holds the
[Message requests](/features/chat#message-requests) switch.

## Linked accounts

**Settings → Linked Accounts** connects your other accounts to 5Stack.

- **Discord**: **Link Discord** connects your Discord account, so the matches
  you play through the [Discord bot](/advanced/discord-bot/) track your stats
  and the bot can move you into your team's voice channel. **Unlink Discord**
  removes it. The card shows once the bot is set up, or while you're linked.
  Admins configure what the bot and the Discord notifications do; see
  [Integrations](/features/admin/integrations#discord).
- **Twitch**: **Link Twitch** signs you in with Twitch, which proves the channel
  is yours. **Unlink Twitch** removes it. The card shows once an administrator
  has [set Twitch up](/features/admin/integrations#twitch).

While you're live on a linked Twitch channel in the Counter-Strike category:

- your profile shows **Live · {count}** in its header and a card with the
  stream's preview: click it to play the stream on the profile, or **Open on
  Twitch**. Offline, the header links your channel instead,
- the Players list marks you **Live**, and can filter to **Live on Twitch**,
- the match you're playing lists your stream as **{name} POV** (see
  [Live Streaming](/features/live-streaming#players-twitch-povs)).

While you're playing or coaching a live match, nobody in it sees your Twitch,
live or not, and you don't see theirs. With **Require Sign-In to View Live
Streams** on, signed-out visitors don't see the Twitch of anyone in a live
match.

## Notifications

Invites, match turns, reminders and messages reach you in the Inbox, as toasts,
as push notifications, by flashing the browser tab, and with sounds. See
[Notifications](/features/notifications).

## Getting around

- **Back returns lists to where you left them.** Players, Matches, Teams,
  Leaderboard and Highlights come back on the page of results you left, and
  Teams keeps its search, sort and filters too. The lists inside team,
  tournament, league, event and award pages do the same.
- **Empty sections stay out of the navigation.** Tournaments, Events, News and
  Highlights only appear in the navigation once there's something in them.
  Players who can create tournaments, events or news posts still see those
  links, so they can add the first one.
