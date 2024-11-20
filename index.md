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
    details: Set up competitive matches on official or workshop maps, or join regional matchmaking
  - title: Tournaments (WIP)
    details: Organize open or private tournaments with multi-stage bracket systems
  - title: Discord Integration
    details: Seamlessly set up custom matches through our Discord bot
  - title: Feature Rich
    details: Enjoy map veto, ready system, knife rounds, tech pauses, best-of series, and more
  - title: Team Management
    details: Create and manage your teams
  - title: Comprehensive Stats
    details: Track detailed statistics for matches, players, teams, and tournaments
  - title: Demo & Backup System
    details: Store match demos and backup rounds locally or externally via S3 API
  - title: Player Sanctions
    details: Manage player behavior with ban, mute, gag, or silence
  - title: Flexible Server Management
    details: Controls game servers on-demand or create dedicated instances
  - title: RCON Access
    details: Manage your servers remotely through RCON console
  - title: Regional Servers
    details: Configure multiple regions with LAN support
  - title: Server Monitoring
    details: Monitor server performance metrics and access detailed logs

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