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
| **Team chat**        | One lineup in a match                               | 1 hour                      |
| **Queue chat**       | Your matchmaking lobby                              | 1 hour                      |
| **Draft lobby chat** | Everyone in a [draft room](/features/draft-lobbies) | 1 hour                      |
| **Tournament chat**  | A tournament's teams, free agents and organizers    | 7 days                      |
| **Organizers chat**  | Match Organizers and above                          | 24 hours                    |
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

## The chat rail

Every conversation you're in is a tab on the rail of the **Chat** app. Drag tabs
to reorder them (on a touch screen, long-press first), and **Remove from bar**
takes one off. **Pop out to window** opens the conversation in its own window
for a second monitor.

Unread badges count from the moment you sign in. **Match and team chat never
count toward unread**: in-game chat is relayed into those rooms line by line,
and you have already read it in the game.

The participant list links every player to their profile.

## Writing messages

- **Enter** sends, **Shift+Enter** starts a new line.
- Messages can be up to **2000 characters**. A countdown appears beside
  **Send** for the last 200.
- **Up arrow** in an empty box edits your last message.
- Typing `/gif` offers a GIPHY search (see [GIFs](#attachments-and-gifs)).

In a match, the box switches between **Everyone** ("Both teams — also shown in
game chat") and **Your team** ("Your lineup only — not shown in game chat").
**Ctrl+Enter** sends to the other one without switching. The message list
filters to **All**, **Everyone** or **Team**.

Each player can send 5 messages every 3 seconds, across every room.

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

Every edit and delete in a group room is recorded, so an abusive message can't
be edited away.

## Attachments and GIFs

The **+** in the composer attaches images and videos or sends a GIF. You can
also paste files or drag them onto the conversation.

- Up to **4 files** per message: PNG, JPEG, WebP or GIF images, and MP4, WebM
  or MOV videos.
- Works in queue, draft, tournament, organizers and direct chat. **Match and
  team chat stay text-only.**
- Uploads start straight away, and **Send** says what it's waiting for.
- Images show inline, videos open in a lightbox, and GIFs play inline.

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

Moderators and above get a moderation menu on every message in group rooms:

- **Moderate {name}** issues a warning, gag, mute, silence or ban on the author
  without leaving chat (see [Moderation & Sanctions](/features/moderation)).
- **Delete Message** removes the line for everyone, after a confirm that quotes
  it. Each delete is recorded with who deleted it.

A gagged player sees "You're gagged and can't send chat messages." in place of
the composer in group rooms. They can still take back reactions and delete their
own messages, but not add or edit. Direct messages aren't moderated: a gag
doesn't apply there, and the moderation menu doesn't appear.

A deleted message's files are hidden from the room but kept for moderators
until they would have expired.

## Match chat log

Once a match has ended, match organizers and above get a **Chat Log** tab on
the match page. It keeps every match and team chat line, from the web and the
game, for **7 days** after the match ends, well past the live rooms' own
retention.

- **All Chat** and each team's chat side by side, with local times and a **Web**
  tag on lines sent from the browser.
- Deleted lines stay, marked "deleted by" whoever removed them.
- Edited lines keep their original text and the last four versions, each with
  when it was written.
- A per-map filter, following the map picked on the match page.

If you played in the match, team chat is hidden from you and the tab says so.
A very long match's log is capped at 5000 lines, and an amber warning marks a
log that was cut short.

## Notifications

Chat never adds to the [Inbox](/features/notifications#the-inbox). New messages
can reach you as a push, a flashing browser tab and a sound, and each of those
is set under **Settings → Notifications**. See
[Notifications](/features/notifications#chat).
