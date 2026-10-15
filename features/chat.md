# Chat

Chat in 5Stack covers direct messages and every room you're part of: matches,
teams, lobbies, draft rooms, tournaments and organizers. It all lives in the
**Chat** app on the [hub dock](/features/social#the-hub), match and draft rooms
also sit on their own pages, and match chat is relayed both ways between the
browser and the game server.

## Rooms

| Room                 | Who's in it                                         | Messages kept for (default) |
| -------------------- | --------------------------------------------------- | --------------------------- |
| **Match chat**       | Both teams in a match                               | 1 hour                      |
| **Match team chat**  | One lineup in a match                               | 1 hour                      |
| **Team chat**        | A team's roster and its owner                       | 30 days                     |
| **Queue chat**       | Your matchmaking lobby                              | 1 hour                      |
| **Draft lobby chat** | Everyone in a [draft room](/features/draft-lobbies) | 1 hour                      |
| **Tournament chat**  | A tournament's teams, free agents and organizers    | 7 days                      |
| **Organizers chat**  | Match Organizers and above                          | 90 days                     |
| **Direct messages**  | Two players                                         | 365 days                    |

Retention is set per kind of room by an administrator under
**Settings → Application → Chat Settings** (see
[Integrations](/features/admin/integrations#chat)). Direct messages are stored
in the database rather than expiring with room chat.

When a draft room becomes a match, its chat carries on in the match room.

A tournament's chat stays open for **7 days after the tournament finishes**, so
nobody is cut off mid-conversation. The chat header shows an amber
**Ended · closes in …** stamp counting down to when the room closes. The
tournament page has a **Chat Room** button beside its tabs, with the room's
unread count.

The organizers' room goes by the role you hold now: a player who drops below
Match Organizer stops receiving its messages straight away.

## Team chat

Every team has a permanent chat room. It's pinned to your chat rail for each
team you're on, and the team's page has a **Team Chat** button with its unread
count.

- Only the team's roster, benched players included, and its owner can read it.
  An invited player joins once they accept. Site staff who aren't on the team
  can't open it.
- The owner and the roster's Admins can delete anyone's message there. Site
  moderation doesn't reach the room: there's no **Moderate {name}**, and its
  edits and deletes aren't kept for moderators.
- Leave the team and the room closes. It says "You're no longer on {team}" and
  leaves your rail when you switch to another room.
- The header counts who's here out of the whole team
  (**{here} of {total} here**).

## The chat rail

Every conversation you're in is a tab on the rail of the **Chat** app. Drag tabs
to reorder them (on a touch screen, long-press first), and **Remove from bar**
takes one off. **Pop out to window** opens the conversation in its own window
for a second monitor.

Right-click a room on the rail to mute it or choose what it notifies you about
(see [Muting a room](#muting-a-room)). Resting on a room shows its name, how
many messages in it tag you, and whether it's muted.

Unread badges count from the moment you sign in. **Match and match team chat
never count toward unread**: in-game chat is relayed into those rooms line by
line, and you have already read it in the game. A message there that tags you
still counts.

Opening a room shows its latest 200 messages. Scroll to the top to load the ones
before them, back to the oldest the room still keeps; the top of the list then
says **No older messages**.

The participant list links every player to their profile.

## Writing messages

- **Enter** sends, **Shift+Enter** starts a new line.
- Messages can be up to **2000 characters**. A countdown appears beside
  **Send** for the last 200.
- **Up arrow** in an empty box edits your last message.
- Typing `/gif` offers a GIPHY search (see [GIFs](#attachments-and-gifs)).
- Typing `@` tags a player (see [Tagging players](#tagging-players)).

In a match, the box switches between **Everyone** ("Both teams — also shown in
game chat") and **Your team** ("Your lineup only — not shown in game chat").
**Ctrl+Enter** sends to the other one without switching. The message list
filters to **All**, **Everyone** or **Team**.

Each player can send 5 messages every 3 seconds, across every room.

## Tagging players

In any room except a direct message, type `@` to tag someone. A
**Players to tag** list offers the room's members with their avatar and team,
and marks organizers **Organizer**. Keep typing to narrow it, use the arrow keys
to move through it, **Enter** or **Tab** to pick, and **Esc** to close it.
Writing out a member's full name after an `@` tags them too.

- Only members of the room can be tagged, and a message can tag up to **10
  players**.
- Tags show in amber. A message that tags you is lit with an amber bar until
  you've seen it in the room; after that, only your name stays highlighted.
- A room where you're tagged shows a red badge with an **@** on the rail, on its
  dock shortcut and on the **Chat** icon.
- Being tagged sends you a push, even from match chat (see
  [Notifications](/features/notifications#chat)).
- Editing a message keeps the tags whose names are still in it and never adds
  new ones, so nobody is notified twice.
- A player you've blocked can't tag you: the tag is dropped for you, and nothing
  is pushed.

## Muting a room

Right-click a room on the chat rail or a chat shortcut on the dock, or open the
**⋯** menu in a room's header (the bell, in a popped-out window):

- **Mute room** (**Mute conversation** for a direct message): **For 15
  minutes**, **For 1 hour**, **For 8 hours**, **For 24 hours**, or **Until I
  turn it back on**. While it's muted the menu offers **Unmute room** instead,
  with when the mute ends.
- **Notify me about**: **All messages** (the default), **Only @tags**, or
  **Nothing**. Direct messages don't have this, since there's nobody to tag.

A muted room sends no push, sound or tab flash for its messages. Its unread
count turns grey and drops out of the **Chat** icon's count, and the room
carries a crossed-out bell on the rail and on its dock shortcut. A tag of you
still gets through, in red, unless the room is set to **Nothing**, which
silences tags too and counts them as ordinary messages. **Only @tags** keeps the
room's unread count but only alerts you for tags.

These choices are saved to your account, so a room muted on one device is quiet
on every other, and a timed mute ends by the server's clock rather than your
device's. Nobody else can see what you've muted.

## Reactions

React to any message with one of **24 reactions**. Hovering a message shows a
toolbar with three quick reactions and **Add Reaction**, which opens the full
picker. Reactions show as pills under the message with a count and a tooltip
of who reacted; click your own pill again to take it back. On a touch screen
the reactions are in the message's menu.

Reactions send no notifications and are not relayed into the game.

## Editing and deleting

You can **edit** or **delete** your own messages for **10 minutes** after
sending them, direct messages included. Both are in the message's menu
(**Edit Message**, **Delete Message**). In the editor, Enter saves and Esc
cancels. An edited message shows **(edited)**, with the edit time on hover.

Only messages sent from the website can be edited or deleted this way. Lines
that came from the game can't.

Every edit and delete in a group room other than team chat is recorded, so an
abusive message can't be edited away.

## Attachments and GIFs

The **+** in the composer attaches images and videos or sends a GIF. You can
also paste files or drag them onto the conversation.

- Up to **4 files** per message: PNG, JPEG, WebP or GIF images, and MP4, WebM
  or MOV videos.
- Works in queue, draft, tournament, organizers, team and direct chat. **Match
  and match team chat stay text-only.**
- Uploads start straight away, and **Send** says what it's waiting for.
- Images show inline, videos open in a lightbox, and GIFs play inline. They run
  the full width of the message, under the sender's avatar.

Administrators set the largest file size and each player's daily upload
allowance. Files are only served to people who can open the room. They are
deleted when the room's messages expire, when a direct message is pruned or
deleted, or after 24 hours if they were never sent.

**GIFs** need a GIPHY API key, set by an administrator. Without one, the **+**
only attaches files. With one, it opens a picker with search, **Trending**, and
"Powered by GIPHY". Searches go through the 5Stack API, so the key never reaches
a browser.

## Direct messages

Message a player from the **Message** button on their profile, or start a new
conversation from the Chat app. A direct message opens as its own tab, showing
the person's avatar.

### Message requests

You don't have to be friends to message someone. A first message from a
non-friend lands as a **message request**:

- It waits under **Message requests** on the recipient's chat rail. It doesn't
  open a tab, count toward unread badges, flash the tab, or send a push.
- Opening it shows the conversation with a banner. **Replying accepts** the
  request; **Deny** hides it without telling the sender.
- The sender can't send a second message until they get a reply. Their
  composer is locked with "Waiting for {name} to reply to your message
  request."

Players who only want messages from friends turn off **Message requests** under
**Settings → Blocked Players**. Their profile then shows no **Message** button
to non-friends.

Friends can always message each other, and a block closes direct messages both
ways (see [Blocking](/features/social#blocking-players)).

## In-game chat

Match chat is relayed in both directions between the web and the match server:

- **All chat** in game appears in the match room on the web.
- **Team chat** in game (`say_team`) appears in your team's private room on the
  web. A team line never reaches the room the other team reads.
- **Everyone** messages from the web appear in game chat. Lines from Match
  Organizers and above carry a red `[organizer]` tag, which a player can't fake
  through their name or message.
- **Your team** messages from the web stay on the web.

A relayed line is flattened to one line and cut to 240 characters in game, with
formatting codes stripped. A gagged player's chat is blocked in game and isn't
relayed.

## Moderation

Moderators and above get a moderation menu on every message in group rooms
other than team chat:

- **Moderate {name}** issues a warning, gag, mute, silence or ban on the author
  without leaving chat (see [Moderation & Sanctions](/features/moderation)). It
  only appears on messages from players whose role is below yours.
- **Delete Message** removes the line for everyone, after a confirm that quotes
  it. Each delete is recorded with who deleted it.

A gagged player sees "You're gagged and can't send chat messages." in place of
the composer in group rooms. They can still take back reactions and delete their
own messages, but not add or edit. Direct messages aren't moderated: a gag
doesn't apply there, and the moderation menu doesn't appear.

A deleted message's files are hidden from the room but kept for moderators
until they would have expired. In team chat they're deleted straight away.

## Match chat log

Once a match has ended, moderators and above get a **Chat Log** tab on the
match page. It keeps every match and team chat line, from the web and the
game, for **7 days** after the match ends, well past the live rooms' own
retention.

- **All Chat** and each team's chat side by side, with local times and a **Web**
  tag on lines sent from the browser.
- Deleted lines stay, marked "deleted by" whoever removed them.
- Edited lines keep their original text and the last four versions, each with
  when it was written.
- A per-map filter, following the map picked on the match page.

If you played in the match, team chat is hidden from you and the tab says so.
The same goes for a moderator on either team's roster, or on any team in the
same tournament.
A very long match's log is capped at 5000 lines, and an amber warning marks a
log that was cut short.

## Notifications

Chat never adds to the [Inbox](/features/notifications#the-inbox). New messages
can reach you as a push, a flashing browser tab and a sound, and each of those
is set under **Settings → Notifications**. A room's own mute and **Notify me
about** level apply on top (see [Muting a room](#muting-a-room)). See
[Notifications](/features/notifications#chat).
