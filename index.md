---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

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
    details: Follow every round with detailed stats and Elo ratings for players, teams, servers, and tournaments, so improvement is always visible.
  - title: Social Connectivity
    details: Manage your team and grow your friends list, communicate seamlessly between in-server and web app, and use lobbies to chat, queue up, or create matches together.
  - title: Tournaments (ALPHA)
    details: Host open or private events with flexible, multi-stage brackets that plug directly into your servers and player pool.
  - title: Custom Match Options
    details: Use map veto, ready-up, knife rounds, tech pauses, best-of series, side choice, and more to run matches exactly how you want.
  - title: Player Sanctions
    details: Keep games clean with bans, mutes, gags, and silences that sync across matches and servers.
  - title: Demos and Streaming
    details: Capture every match with automatic demo uploads and watch live with the integrated viewer that supports Twitch, YouTube, and Kick streams.
  - title: Flexible Server Management
    details: Run on-demand servers, manage dedicated hardware, or plug in existing third-party machines—all from the same panel.
  - title: Regional Servers
    details: Operate multiple regions with LAN-capable setups, built-in Steam Relay, and routing designed for low ping.
  - title: Custom Map Pools
    details: Build curated map pools for 1v1, 2v2, and 5v5, and swap them per playlist, queue, or event.
  - title: Server Insights & Monitoring
    details: Watch performance, logs, CPU pinning, and low-latency kernel status in real time so issues surface before players feel them.
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