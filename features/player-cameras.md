# Player Cameras

Matches can require every player to publish a **webcam** for the duration of the
game. Officials watch the feeds from the panel, and the camera of whoever is
being spectated can appear on the [broadcast](/features/live-streaming) — the
face-cam grid you see on a LAN stream, without the LAN.

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
- **Scan the QR code**: publishes from a phone instead, which is how most players
  will do it — the phone becomes the camera and the PC stays untouched.

The camera page previews before it publishes. The feed starts local-only, so a
player can pick a device, frame themselves, and only then connect — one
permission prompt, no dead air:

- **Pick a camera** when the device has more than one; phones and tablets also
  get a **flip** button for front/back.
- **Reframe** the shot: scroll or pinch to zoom, drag to re-centre. The crop is
  applied to the **published** feed, not just the local preview, and is
  remembered per camera.
- **Hide the preview** mid-match to give the resources back. The camera stays on
  and stays published.
- Permission denied, no camera, or a camera already in use each explain
  themselves in place, with a retry.

The one rule that matters: **keep the page open for the rest of the match.**
Closing it stops the feed, which is the same as unplugging the camera.

The setup panel can be dismissed to get at the rest of the match page, but the
requirement doesn't go with it: a banner stays pinned to the top of the page, and
clicking it brings the panel back. Check-in stays blocked until a camera is live.

## Who can watch

Watching is scoped on the server, not hidden in the browser — a feed a viewer
isn't entitled to is never sent to them at all.

| Viewer                                          | Sees                                                        |
| ----------------------------------------------- | ----------------------------------------------------------- |
| Organizer or admin **not** playing in the match | Both lineups                                                |
| A player in the match                           | Their own lineup, and only if **Teammates Can Watch** is on |
| The opposing team                               | Nothing, ever                                               |

A match organizer who is also playing is a competitor first: a live view of the
other side is exactly the advantage cameras exist to prevent. Site
administrators keep full access so the feature can be exercised end to end.

## Watching from the panel

- **Watch Cameras** on the match page opens the grid, and doubles as the summary
  — it carries a live count like _7 of 10 live_.
- Each tile shows the player the way the rest of the app does, with a
  **connected / stalled / not connected** state. A quiet grid means everything is
  fine; only a problem tile draws the eye.
- **Listen to a player** from any tile without starting a call.
- **Video call** a player from their tile. Their camera page shows you in a small
  picture-in-picture, so you can talk to them face to face — an actual check that
  a person is there, which no automated test of a video feed can give you.
- **Camera dots** on the lineup rows give organizers per-player state at a glance
  without opening the grid.
- On the [Stream Deck](/features/live-streaming#stream-deck), player cameras
  render **inside the observer-target slots**, so the box you read to pick a
  spectate target is the box you click. Feeds start muted.

## Enforcement

5Stack keeps checking, rather than checking once at the door:

- Feeds are polled continuously and classified **live**, **stalled**, or
  **down** from whether video is actually arriving.
- A drop gets a **30-second grace period**, long enough to ride out a WiFi blip
  or a reconnect.
- Past that, the game server is told to **pause the match** with a named reason.
  The pause blocks `.resume` until the camera is back, and the scoreboard shows
  who the match is waiting on. Players can ask the server for their own status
  with `.cam`.
- Resume is **announced, never silent**, and an admin can override.
- If the relay itself is unreachable, nothing changes — the check **fails open**,
  so an infrastructure problem never pauses a match.

## On the broadcast

While a player is being spectated, their camera can be composited onto the live
stream through the existing overlay — no extra capture, no second encoder, and
nothing for a broadcaster to set up.

## Requirements & limits

**HTTPS is required.** Browsers only grant camera access on a secure origin. A
panel served over plain HTTP cannot publish cameras at all.

**Feeds are relayed, not recorded.** 5Stack passes camera video through its own
WebRTC relay and stores none of it. A camera that appears on a broadcast is, of
course, part of whatever that broadcast records.

**Cameras are deliberately small.** A published feed is capped at 360p and 24fps
(portrait on a phone), roughly 350 kbps, so publishing from mobile data is
realistic and a full ten-player lineup costs your server a few Mbps rather than
ten HD streams.

**A camera proves a feed is flowing, not that a person is being watched.** A
virtual camera looping a video passes every automated check there is. That is
what the video-call button is for — treat cameras as a deterrent and a broadcast
feature, and use a call when you need certainty.

::: tip Cameras use the same relay as voice and live streaming
No third-party video service is involved, and there is no per-player cost. See
[Voice Chat](/features/voice-chat).
:::
