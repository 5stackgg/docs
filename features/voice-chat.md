# Voice Chat

Talk to the people you're about to queue with, or the team you're playing with,
without leaving the panel. Voice runs on 5Stack's own relay — no Discord server,
no third-party service, no per-user cost.

## Where you can talk

- **Lobby voice**: the voice row in a matchmaking lobby or party. Everyone who
  has accepted the lobby invite is in the channel.
- **Team voice**: on the match page and in a [draft lobby](/features/draft-lobbies),
  scoped to your **lineup**. A channel is one team's — it can never span both
  sides, and membership is enforced on the server rather than in the browser.

You're in **one channel at a time**. Joining a second asks first, then moves you.

## Controls

Join, mute, and leave sit in the panel itself, with a status dot, a
speaking indicator, and a count of how many people are talking out of how many
are connected. Muting keeps your connection up and simply stops sending audio,
so nobody sees you drop and rejoin.

## Voice settings

The **gear sits on every place you can join a channel** — the party hub, the
match panel, a draft room — and opens the same settings each time. There's one
set of audio settings, not one per surface: pick your devices once and they
apply to whatever channel you're in next, remembered across sessions.

They also open **before** you join, so you can get your setup right while nobody
can hear you. Your microphone is only opened while the dialog is up, and
released again when you close it unless a call is actually running.

What's in there:

- **Input and output device** pickers, remembered across sessions. Unplug a
  remembered device and 5Stack falls back to the system default instead of
  leaving you silent. Changing device mid-call swaps it in place — nobody's
  audio drops.
- **Mic Check**: hear your own microphone played back, _after_ the gate, so you
  hear exactly what everyone else hears — including being cut off when your
  sensitivity is too high. Use headphones for this one.
- **Input level meter** with your threshold drawn on it, and a **test tone** for
  the output device.
- **Input mode**: **Voice Activity** with an adjustable sensitivity, or
  **Always Transmit**.
- **Noise suppression**, applied to the live track, so toggling it doesn't
  interrupt the call.

## Admin controls

Under **Settings → Application → Cameras & Microphones**:

- **Lobby Voice Chat**: turn voice on or off instance-wide. It's on by default.

Voice shares the same WebRTC relay as [player cameras](/features/player-cameras)
and [live streaming](/features/live-streaming), so there's nothing extra to
install or pay for.

## Requirements

**HTTPS is required.** Browsers only expose a microphone on a secure origin — on
plain HTTP the join button is disabled and says so, rather than failing when
clicked. Blocked permission, a missing microphone, and a microphone already in
use each report themselves by name instead of as a generic failure.

::: tip Discord still works
Voice chat is an alternative to hopping into a Discord call, not a replacement
for the [Discord bot](/advanced/discord-bot/) — per-tournament voice channels,
match creation, and role sync are unaffected.
:::
