# Player Cameras

Matches can require every player to publish a **webcam** for the duration of the
game. Officials watch the feeds from the panel, and the camera of whoever is
being spectated can appear on the [broadcast](/features/live-streaming).

## Turning it on

Cameras are a **per-match option**, set when the match is created or edited:

- **Require Webcam**: players must connect a camera before the server details are
  shown, and the match pauses automatically if a feed drops.
- **Teammates Can Watch**: let players see the cameras of their _own_ team. The
  opposing team is never included.

Instance-wide defaults for both live under
**Settings → Application → Cameras & Microphones → Match Defaults**. They only
decide what a newly created match starts with; an organizer can still change
either one per match, and existing matches are unaffected.

## Connecting a camera

When a match requires a webcam, a panel appears on the match page and on the
check-in button in a [draft lobby](/features/draft-lobbies). A player has two
ways in:

- **Use this computer**: opens the camera page in a popup on the machine they're
  already on.
- **Scan this code with your phone**: publishes from a phone instead, so the PC
  stays untouched.

The camera page shows a preview before it publishes, so a player can pick a
device and frame themselves first:

- **Pick a camera** when the device has more than one; phones and tablets also
  get a **flip** button for front/back.
- **Reframe** the shot: scroll or pinch to zoom, drag to re-centre. The crop
  applies to the published feed, and is remembered per camera.
- **Hide preview** mid-match. The camera stays on and stays published.
- Permission denied, no camera, or a camera already in use each explain
  themselves in place, with a retry.

**Keep the page open for the rest of the match.** Closing it stops the feed,
which is the same as unplugging the camera.

The setup panel can be dismissed to get at the rest of the match page, but the
requirement doesn't go with it: a banner stays pinned to the top of the page, and
clicking it brings the panel back. Check-in stays blocked until a camera is live.

## Who can watch

| Viewer                                          | Sees                                                        |
| ----------------------------------------------- | ----------------------------------------------------------- |
| Organizer or admin **not** playing in the match | Both lineups                                                |
| A player in the match                           | Their own lineup, and only if **Teammates Can Watch** is on |
| The opposing team                               | Nothing, ever                                               |

A match organizer who is also playing is treated as a player. Site
administrators keep full access.

## Watching from the panel

- **Watch Cameras** on the match page opens the grid, and shows a live count
  such as _7 of 10 live_.
- Each tile shows the player with a **Live**, **Stalled**, or **Not connected**
  state.
- **Listen to mic** from any tile to hear a player without starting a call.
- **Video call** a player from their tile. Their camera page shows you in a small
  picture-in-picture, so you can talk to them face to face and check a person is
  really there.
- **Camera dots** on the lineup rows give organizers per-player state at a glance
  without opening the grid.
- In the [Control Room](/features/live-streaming#control-room), player cameras
  show inside the observer-target slots. Feeds start muted.

## Enforcement

5Stack keeps checking cameras for the whole match:

- A dropped feed gets a **30-second grace period**.
- Past that, the match **pauses** with a named reason. The pause blocks
  `.resume` until the camera is back, and the scoreboard shows who the match is
  waiting on. Players can check their own status with `.cam`.
- Resume is **announced, never silent**, and an admin can override.
- If the camera relay itself is unreachable, the match is not paused.

## On the broadcast

While a player is being spectated, their camera can appear on the live stream.
There is nothing for a broadcaster to set up.

## Requirements & limits

**HTTPS is required.** Browsers only grant camera access on a secure origin. A
panel served over plain HTTP cannot publish cameras at all.

**Feeds are not recorded.** 5Stack stores none of the camera video. A camera
that appears on a broadcast is part of whatever that broadcast records.

**Cameras are small.** A feed is capped at 360p and 24fps, roughly 350 kbps, so
publishing from mobile data is realistic and a full ten-player lineup costs your
server a few Mbps.

**A camera proves a feed is flowing, not that a person is there.** A virtual
camera looping a video passes every automated check. Treat cameras as a
deterrent and a broadcast feature, and use a video call when you need certainty.

::: tip Cameras use the same relay as voice and live streaming
No third-party video service is involved, and there is no per-player cost. See
[Voice Chat](/features/voice-chat).
:::
