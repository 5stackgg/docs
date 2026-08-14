# Matches

Whether it's a casual scrim or a tournament final, 5Stack runs the whole match
flow, from picking a server to vetoing maps to the live game, from the panel.

## Servers, your way

Pick how the match is hosted:

- **On-demand**: provision a fresh server in a chosen region automatically.
- **Dedicated**: use a server you manage in 5Stack.
- **Third-party**: point the match at an external server.

Players join with a **passwordless connect** link, and organizers can **reboot the
server** straight from the match page if something needs a reset during setup.

## Access & invites

Set who can join with a flick between four access modes:

| Access      | Who can get in                                          |
| ----------- | ------------------------------------------------------- |
| **Open**    | Anyone can find it in the public list and join          |
| **Friends** | Only friends of players already in the lobby can see it |
| **Invite**  | Joinable only via the invite link you share             |
| **Private** | Only people you let in; hidden from the list            |

Share the auto-generated **invite link** to pull players onto a roster quickly,
or send **direct invites** to specific players. Access can be changed mid-setup
without recreating the match.

## Lineups, check-in & substitutes

Build each lineup with a captain, assign roles, and add **substitutes / backup
players**. A **check-in** step makes sure everyone's actually present before the
match starts.

## Map & region veto

- **Map veto**: an interactive pick/ban flow; once a map is chosen, teams pick
  their **CT / T side**. The exact ban/pick sequence is generated deterministically
  from the pool size and best-of. See [Map Veto Format](/features/map-veto) for
  the full rules and worked examples.
- **Region veto**: teams can veto server regions so neither side is forced onto
  unfavorable latency.

## Match rules

Tune the match to the occasion: **knife round, overtime** (rounds and bomb timer),
**best-of-X**, **tactical/technical pauses**, **timeouts** per team, **coaches**,
ready-up, default player models, and more. Game-mode presets apply sensible
defaults in one click.

## Player cameras

A match can **require a webcam** from every player: they connect one from their
PC or by scanning a QR code with a phone, the server details stay hidden until
they do, and the match pauses automatically if a feed drops. Officials watch the
feeds from the panel, and the spectated player's camera can appear on the
broadcast. See [Player Cameras](/features/player-cameras).

## Watching live

While a match is live you can follow the score and action in real time, jump in
to spectate, or [broadcast it](/features/live-streaming). When it's over, the demo
is uploaded automatically and turned into [replays](/features/match-replay),
[highlights](/features/highlights), and [stats](/features/stats-and-leaderboards).
