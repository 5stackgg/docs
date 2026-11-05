# Voice Chat

Talk to the people you're about to queue with, or the team you're playing with,
without leaving the panel. There's no Discord server or third-party service to
set up.

## Where you can talk

- **Lobby voice**: the voice row in a matchmaking lobby or party. Everyone who
  has accepted the lobby invite is in the channel.
- **Team voice**: on the match page and in a [draft lobby](/features/draft-lobbies),
  scoped to your **lineup**. A channel is one team's and never spans both sides.

You're in **one channel at a time**. Joining a second asks first, then moves you.

## Controls

Join, mute, and leave sit in the panel itself, with a status dot, a
speaking indicator, and a count of how many people are talking out of how many
are connected.

Each person in the call has their own **Player volume** fader, and **Silence
this player for you only** mutes them for you alone; nobody else's call
changes.

## The Voice app

The call lives on in the **Voice** app on the [hub dock](/features/social#the-hub)
after you leave the page you joined from, so you can browse the rest of 5Stack
while you talk. The dock icon turns green while you're in a call and shows how
many people are in it; with no call and nothing to join, it's greyed out.

- **In a call**, the app shows everyone in the channel, and lists the other
  channels you could be in under **Switch to**. Switching moves you without
  hanging up first.
- **Not in a call**, it lists **Where you can talk**: your party, and your team
  in a match you're playing, ready to join.
- While you're in a call, a bar with your status, **Mute** and **Leave call**
  sits under every other app in the hub.

If the call is running in another browser tab, the app says so, and mute and
leave still work from where you are.

## Voice settings

The **gear on every place you can join a channel** (the Party app, the match
panel, a draft room) opens the same settings each time. Pick your devices once
and they apply to whatever channel you're in next. The same settings have their
own page under **Settings → Voice & Audio**.

They also open **before** you join, so you can get your setup right while nobody
can hear you.

What's in there:

- **Input and output device** pickers, remembered across sessions. Unplug a
  remembered device and 5Stack falls back to the system default. You can change
  device mid-call without dropping out.
- **Mic Check**: hear your own microphone the way everyone else hears it,
  including being cut off when your sensitivity is too high. Use headphones for
  this one.
- **Input level meter** with your threshold drawn on it, and a **test tone** for
  the output device.
- **Input mode**: **Voice Activity** with an adjustable sensitivity, or
  **Always Transmit**.
- **Noise suppression**, which you can toggle without interrupting the call.

### Settings → Voice & Audio

The settings page adds two things the gear doesn't:

- **Player Levels**: everyone you've turned down or silenced, from every channel
  you've been in, with **Reset** for one and **Reset all**.
- **Reset to defaults** puts the microphone, output, input mode, sensitivity and
  noise suppression back. Player levels are left alone.

Voice settings are **saved on this device**, not on your 5Stack account: every
computer you play from keeps its own microphone, output, sensitivity and player
levels. The microphone on your [camera feed](/features/player-cameras) uses the
same settings.

## Video calls

Any voice channel can also carry a camera. It is always **opt-in and off by
default**: joining a channel never turns your camera on. Turning a camera on or
off doesn't interrupt anyone's audio.

- **You only see other people's cameras once yours is on.** Opening the call and
  sitting there does not show you the room.
- **Tiles show everyone in the channel**, with an avatar for anyone who has not
  turned a camera on.
- **Pop the video out** into a floating always-on-top window, and keep it in
  view while you use the rest of the panel or watch a stream. The call keeps
  running as you pop in and out. The floating window needs a Chromium-based
  browser; elsewhere the grid stays in the panel.

## Admin controls

Under **Settings → Application → Cameras & Microphones**:

- **Lobby Voice Chat**: turn voice on or off instance-wide. It's on by default.
- **Video Calls**: allow cameras in voice channels, on by default wherever
  voice is. This only decides whether the control is _offered_: players still
  turn their own camera on. Split into **party lobbies** and **matches and draft
  rooms**, so you can drop the match one if your players run tight on CPU.

Voice uses the same relay as [player cameras](/features/player-cameras) and
[live streaming](/features/live-streaming), so there's nothing extra to install.

## Requirements

**HTTPS is required.** Browsers only allow a microphone over HTTPS; on plain HTTP
the join button is disabled and says so. A blocked permission, a missing
microphone, and a microphone already in use each show their own error.

Cameras additionally need permission for the camera itself, asked for only when
you first turn one on.

**A [TURN relay](/advanced/turn-server) is optional.** Calls connect directly for
most players. Add one only if some players can never connect, usually on mobile
networks or networks that block UDP.

::: tip Discord still works
Voice chat is an alternative to hopping into a Discord call, not a replacement
for the [Discord bot](/advanced/discord-bot/): per-tournament voice channels,
match creation, and role sync are unaffected.
:::
