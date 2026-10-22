# Live Streaming

5Stack can broadcast a live match straight from the panel, rendered on a
[GPU node](/servers/gpu-nodes/), with observer control, broadcast HUDs, and a
public watch page. No OBS or third-party capture required.

## The Watch page

**Watch** is where viewers find the action. While matches are on, its nav item
carries a red count of matches that are live, in veto, or waiting for check-in
or a server. From the top:

1. **Match ticker**: every match as a strip of cells, filtered by **Show
   matches** (**All**, **Live**, **Upcoming**, **Results**). Live cells show the
   round and map; a match that's checking in, vetoing, or waiting for its server
   shows **About to go live** with its step and a progress bar; finished matches
   show the final score. A **You** badge marks your own matches. Click a cell
   with a stream to put it on the stage, or any other cell to open the match.
2. **Live streams**: a stage with one main screen and up to two **Other live
   streams** beside it, covering up to six live matches. A match that just ended
   keeps playing until its TV delay runs out. Under the screen: the match,
   **+N streams** to cycle through its other streams, **Watch** to keep it
   playing in the floating player, and **Open match**. The stage has
   **Full screen** and, for the game stream and Twitch, a volume slider.
3. **Highlights**: the top [plays](/features/highlights) of the day, week, or all
   time.
4. **Events**: a featured [event](/features/events) and up to two more, when
   events are enabled.
5. **Tournaments**: live, upcoming, and recently finished
   [tournaments](/features/tournaments), with registration right on the card.

Matches you're playing in or coaching never appear on the stage.

## Match streams

Each match can surface multiple streams. Besides 5Stack's own game stream, which
always comes first, organizers can add **Twitch**, **YouTube**, or **Kick**
channels, or any embeddable page, in the order they choose, from the match's
**Match Live Streams** tab.

On the match page, the stream sits beside the match while it's being played and
for ten minutes after. Hover it for:

- **Pin as floating overlay**: detach the stream into a floating, resizable
  player that follows you through the app, so a match keeps playing while you
  dig into stats, check another match, or sit on the Watch page.
- **Open in new window**: pop the match out into its own chromeless window to
  drag onto a second monitor (not on touch devices).
- **Stop stream**: stop watching. The player folds into a **Stream stopped** bar
  with a **Watch** button to start it again. This only affects you; the
  broadcast keeps running for everyone else.
- Volume, and full screen (`F`; `M` mutes).

### Players' Twitch POVs

When [Twitch is set up](/features/admin/integrations#twitch), players can link
their channel (see [Linked accounts](/features/social#linked-accounts)). While a
match is live and its server is online, any of its players streaming on a
linked channel in the Counter-Strike category show up in the match's stream
picker as **{name} POV**, after the organizer's streams, with their avatar and a
red dot. A POV plays in the match's player like any other Twitch stream, can be
pinned as the floating overlay, and drops out when the player stops streaming.

POVs keep the same rule as the game stream: nobody playing or coaching a live
match sees anyone's POV from it, and with **Require Sign-In to View Live
Streams** on, signed-out visitors see none. Practice sessions never show POVs.

### Match caption

When there's no picture yet, or the stream has ended, the player shows the match
instead of a black box: the tournament or match type, both teams and their
scores, and where the match is, the current map and round, **Map veto**,
**Waiting for check-in**, when it starts, or the final result. Under it, a
status line says what the player is doing: **Connecting to the stream**,
**Waiting for the stream**, **Reconnecting**, **Stream ended**, or **The stream
can't be reached** with **Try again**.

Players and coaches of the match see **Stream unavailable** instead: players
can't watch a match they're in.

### Scoreboard overlay

A scoreboard overlay shows the current map score plus per-player K/D/A, HS%,
damage, and ADR, and the results of every map in the series. It's always there
in the floating player and the pop-out window, and on the match page in full
screen. It has a compact mode for small windows.

### Face cams

If a match [requires player cameras](/features/player-cameras), the camera of the
player currently being spectated is composited onto the stream through the
built-in JTs Hud, no second capture, no extra encoder, and nothing for the
broadcaster to wire up.

## Stream Deck

The Stream Deck is the broadcaster's control panel, for the **Streamer** role and
above:

- See all live, in-veto, and waiting matches.
- **Start broadcasting** a match two ways: **Live** starts a stream with no
  delay, **TV** starts a delayed TV stream.
- **Stop** asks you to **Confirm**, so a stray click can't kill a live broadcast.
  **Reconnect** re-issues the connect to the game server, and **Switch** points
  the same GPU at another live match.
- **Spectator grid**: CT/T player slots fed by live game state; click a slot to
  spectate that player.
- **Auto-director** toggle for automatic spectator camera work, plus X-ray.
- **HUD**: pick the [broadcast HUD](#broadcast-huds) for this stream, hide or
  show it, **Swap sides (manual override)**, or **Refresh HUD (reload player
  images)**.
- **Player webcams inside the spectator slots**, when the match requires them, so
  the box you read to pick a target is the box you click. See
  [Player Cameras](/features/player-cameras).
- **Capacity**: free GPUs and active streams, so you know what you can start.

## Broadcast HUDs

Live streams, [demo playback](/features/demo-playback), and
[highlights](/features/highlights) draw the same broadcast HUD, picked from a
library under **Settings → Application → Broadcast HUDs**. 5Stack ships the JTs
Hud in a horizontal and a vertical layout, and admins can add more:

- **Import HUD**: drop in a `.zip` (up to 64 MB) of a JTs Hud Manager or
  Lexogrine HUD, with `hud.json` at its root or in one top-level folder. Signed
  bundles are marked as such.
- **Set HUD page**: link the HUD's page, for example on cshuds.com, and its
  preview image becomes the HUD's preview.
- **Make default** picks the HUD every new stream, playback, and highlight
  starts with. Streamers can still switch per stream from the Stream Deck.

If an imported HUD fails to load, the stream falls back to the built-in one.

## How streams reach viewers

Streams play over **WebRTC (WHEP)** for ultra-low latency. The browser sends its
connection details as it finds them (trickle ICE) instead of waiting to gather
them all first, so the picture arrives sooner. If WebRTC can't connect after
three tries, the player falls back to HLS, at a few seconds more latency. Once a
stream has played over WebRTC it never drops to HLS.

WebRTC sessions go straight to MediaMTX inside your install, so there's no
third-party streaming service and no per-viewer vendor cost (browsers use a
public STUN server to find their route).

## Admin controls

Under **Settings → Application → Streaming**:

- **Minimum Role Allowed to Connect to TV (Delayed)**: GOTV broadcast viewers
  connect to the delayed TV port, so broadcast delay applies. Safe for casters
  and audiences.
- **Minimum Role Allowed to Spectate (No Delay)**: real-time spectating connects
  directly to the game server with no delay. Restrict this to trusted roles to
  prevent ghosting.
- **Require Sign-In to View Live Streams** (on by default): hide live game
  streams from signed-out visitors, so every viewer is an identifiable account.
  With it on, the stream server itself also refuses players and coaches of a
  live match, which closes the most obvious ghosting route.
- **Live Stream Codec**: **H.264 (recommended)**, the broadest compatibility and
  the lowest-latency WebRTC path everywhere, or **H.265 / HEVC**, ~30% smaller at
  matched quality, but HEVC-over-WebRTC is Safari 17+ only; other browsers fall
  back to HLS, and H.265 falls back to H.264 if the GPU lacks NVENC HEVC.
- **Playcast**: use CS2's GOTV broadcast (Playcast) format so spectators connect
  to relay infrastructure instead of the game server, increasing viewer capacity
  while reducing load on the match server. With Playcast on, an **Edge relay
  (Cloudflare)** status shows whether viewers are served from Cloudflare's
  cache. See [Playcast Edge Relay](/advanced/playcast-edge-relay).

Live streaming renders on a [GPU node](/servers/gpu-nodes/); make sure at least one
node has streaming enabled and a Steam account available in the pool. To add
one, see [Adding a GPU node](/servers/gpu-nodes/#adding-a-gpu-node). For the
playback domain and ports, see [Game Streaming](/advanced/game-streaming/).
