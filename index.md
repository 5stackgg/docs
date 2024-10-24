---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "5Stack"
  text: Counter-Strike Panel
  image:
    src: 5stack-logo.png
    alt: 5Stack Logo
  tagline: A System for Managing Servers, Matches, and Tournaments
  actions:
    - theme: brand
      text: Getting Started
      link: /getting-started

features:
  - title: Just Play
    details: Set up competitive matches on active duty or workshop maps, or join regional matchmaking
  - title: Tournaments (WIP)
    details: Manage open or private tournaments with a multi-stage bracket system
  - title: Discord Bot
    details: Fully integrated Discord bot for setting up custom matches
  - title: Feature Rich
    details: Includes map veto, ready system, knife round, tech pauses, best-of series, and more
  - title: Comprehensive Stats
    details: View detailed statistics for matches, players, teams, and tournaments
  - title: Flexible Server Options
    details: Manage game node servers or create dedicated servers on demand
  - title: Server Regions
    details: Create regions for matchmaking, including LAN support
  - title: Storage Solutions
    details: Store demos and backup rounds locally or externally


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
    The development of 5Stack is being built by a Solo developer, for fun!
  </div>

  <VPTeamMembers :members="members" />
</div>