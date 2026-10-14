# Steam Presence

Steam Presence adds a 5Stack **bot account** that players add as a Steam friend.
Once connected, the bot watches their live Steam status and:

- **Imports their matches the moment they finish**: Competitive & Premier games
  land automatically, without waiting for the periodic
  [match-history](/features/external-matches) scan.
- **Shows their live CS2 status** in the in-app friends list, "Playing
  Counter-Strike 2 · In menu", "Deathmatch - Dust II", "Premier - Mirage 5:3",
  etc., exactly as Steam shows it.

It builds on [External Matches](/features/external-matches): reading match data
still uses your Steam auth code, and the bot friendship is what makes imports
_instant_ and powers the live status.

## Connecting (players)

On your account under **Settings → Linked Accounts**, once you've linked your
Steam match history you'll see the **5stack Steam bot** card. Click **Add bot as
friend**, then **Open the bot on Steam** and send it a friend request. It
auto-accepts within about a minute and the card flips to "Connected — imports
are instant." From then on your matches import as soon as they end, and your
friends see your live CS2 status. The card previews that status **As your
friends see you**.

Your friends see it in the **Friends** app on the
[hub dock](/features/social#the-hub).

Nothing is exposed publicly: rich presence is friends-only, and your status is
only visible to your 5Stack friends.

## Setup (admins)

Under **Settings → Application → Steam Presence**:

1. **Add Bot** with a dedicated Steam account that has **Steam Guard**
   enabled (don't reuse the account used for demo recording / game streaming).
   If Steam Guard prompts, enter the code from email or the Steam mobile app;
   after the first login it stays signed in.
2. The bot logs in automatically and **auto-accepts** incoming friend requests
   (it never sends invites, Steam rate-limits those).
3. Add more bot accounts to grow capacity. Each account holds
   `250 + 5 × Steam level` friends (max 2000), auto-detected on login, and
   players are sharded across the pool.

The page shows the pool's totals, **Online** bots, players **Watching**,
**Pending** (assigned a bot but not yet friends with it) and **Capacity**, and
lists each bot under **Bots** with its live status. Presence is **on by
default**; **Enable Presence** is a kill-switch.

## How detection works

The bot reads each friend's Steam rich presence, which is what distinguishes the
main menu from an active Deathmatch, Competitive, Premier or Wingman game (and
the map and score). Only Competitive/Premier/Wingman trigger an import; every
game state is shown as live status.
