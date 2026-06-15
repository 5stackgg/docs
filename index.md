---
# https://vitepress.dev/reference/default-theme-home-page
layout: home
title: 5Stack — The System Behind the Game—Yours
titleTemplate: false

hero:
  name: "5Stack"
  text: Counter-Strike Management System
  image:
    src: 5stack-logo.png
    alt: 5Stack Logo
  tagline: A Comprehensive Panel for Managing Servers, Matches, and Tournaments
  actions:
    - theme: brand
      text: Getting Started
      link: /getting-started

features:
  - title: Quick Play
    details: Jump straight into 1v1, 2v2, or 5v5 on official or workshop maps, spin up instant scrims, or queue into regional matchmaking with friends.
  - title: Comprehensive Stats & Elo Rating
    details: Follow every round with HLTV-style ratings, KAST, ADR, opening duels, clutches, roles, and Elo for players, teams, and tournaments—plus global leaderboards and imported Valve/FACEIT matches.
  - title: Social Connectivity
    details: Manage your team and grow your friends list, player lobbies, communicate seamlessly between in-server and web app, and use lobbies to chat, queue up, or create matches together.
  - title: Tournaments
    details: Host open or private tournaments with flexible, multi-stage brackets, including Single Elimination, Double Elimination, Round Robin, or Swiss formats.
  - title: Custom Match Options
    details: Set up map veto, ready-up, knife rounds, tactical/technical pauses, best-of series, enforce default player models, add substitutes, configure check-in settings, and more.
  - title: Player Sanctions
    details: Keep games clean with bans, mutes, gags, and silences that sync across matches and servers.
  - title: Match Replay (2D & 3D)
    details: Re-watch any map as a top-down radar replay or a full 3D fly-through right in your browser—kill feed, utility trajectories, bomb events, and per-player loadouts, no CS2 install needed.
  - title: In-Browser Demo Playback
    details: GOTV-style demo viewer rendered on a GPU node—switch player POVs, toggle X-ray, and scrub round-to-round with full keyboard controls, all without downloading the demo.
  - title: Demos & Playcast
    details: Capture every match with automatic demo uploads, download individual or bulk demos, and watch live with GOTV / Playcast or the integrated stream viewer (Twitch, YouTube, Kick).
  - title: Live Streaming
    details: Broadcast matches directly from 5Stack with the Stream Deck, a public watch hub, scoreboard overlays, and observer integration—no third-party tooling required.
  - title: Automatic Match Highlights
    details: Every match is automatically processed into a highlight reel of clutches, multi-kills, and key rounds, ready to share or rewatch right after the game ends.
  - title: In-App Clip Builder
    details: Stitch together rounds, plays, and player POVs into custom clips straight from the panel—one-click presets or a manual editor, no external tools for frag movies or coaching clips.
  - title: Flexible Server Management
    details: Run on-demand servers, manage dedicated hardware, or plug in existing third-party machines—all from the same panel.
  - title: Regional Servers
    details: Operate in multiple regions with LAN-capable setups and built-in Steam Relay, which hides your real server IP addresses.
  - title: Custom Map Pools
    details: Build curated map pools for 1v1, 2v2, and 5v5 matches.
  - title: Server Insights & Monitoring
    details: Watch CPU / Memory / Disk, logs, CPU pinning, and low-latency kernel status in real time.
  - title: Discord Integration
    details: Let players spin up matches, manage lobbies, and sync roles directly from your Discord server with the 5Stack bot.
---

<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const members = [
  {
    avatar: 'https://avatars.githubusercontent.com/u/2066668?s=160&v=4',
    name: 'LukePOLO',
    sponsor: 'https://github.com/sponsors/lukepolo',
    links: [
      { icon: 'github', link: 'https://github.com/lukepolo' },
    ]
  }
]
</script>

<div style="text-align: center; margin-top: 2rem;">
  <div>
    5Stack is being developed by a solo developer, for fun!
  </div>

  <VPTeamMembers :members="members" />
</div>
