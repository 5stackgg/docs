---
# https://vitepress.dev/reference/default-theme-home-page
layout: home
title: 5Stack | The System Behind the Game. Yours.
titleTemplate: false

hero:
  name: "5Stack"
  text: The competition layer for Counter-Strike 2
  image:
    src: 5stack-logo.png
    alt: 5Stack Logo
  tagline: "The software between a game server and a league. One self-hosted install runs the whole stack: matchmaking, tournaments, stats, replays, and broadcast."
  actions:
    - theme: brand
      text: See it Live
      link: https://5stack.gg
    - theme: alt
      text: Getting Started
      link: /getting-started
    - theme: alt
      text: Browse Features
      link: /features/

features:
  - icon: |
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="6 3 20 12 6 21 6 3"/></svg>
    title: Get People Into Games
    details: Latency-aware matchmaking, party queueing, and draft lobbies with captains, a pick clock, and a substitute waitlist that auto-fills open slots.
    link: /features/quick-play
    linkText: Quick Play & Matchmaking
  - icon: |
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
    title: Tournaments & Leagues
    details: Multi-stage brackets (Single Elim, Double Elim, Round Robin, Swiss) plus seasonal league divisions with promotion, relegation, and negotiated scheduling.
    link: /features/tournaments
    linkText: Run a tournament
  - icon: |
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="m19 9-5 5-4-4-3 3"/></svg>
    title: Stats That Tell You What To Fix
    details: Aim, Positioning, and Utility scored against every other player, with focus areas and plain-language coaching notes. Not just another rating number.
    link: /features/performance-rating
    linkText: Performance Rating
  - icon: |
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"/><line x1="13" x2="19" y1="19" y2="13"/><line x1="16" x2="20" y1="16" y2="20"/><line x1="19" x2="21" y1="21" y2="19"/><polyline points="14.5 6.5 18 3 21 3 21 6 17.5 9.5"/><line x1="5" x2="9" y1="14" y2="18"/><line x1="7" x2="4" y1="17" y2="20"/><line x1="3" x2="5" y1="19" y2="21"/></svg>
    title: Every Match, Fully Dissected
    details: Economy timelines, buy-type win rates, clutches, head-to-head damage matrices, auto-detected roles, heatmaps, and aggregated movement paths.
    link: /features/match-analysis
    linkText: Match Analysis
  - icon: |
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 3v18"/><path d="M3 7.5h4"/><path d="M3 12h18"/><path d="M3 16.5h4"/><path d="M17 3v18"/><path d="M17 7.5h4"/><path d="M17 16.5h4"/></svg>
    title: Rewatch It In Your Browser
    details: 2D radar replay and a full 3D fly-through in the browser, or a real GOTV-style demo render<span class="gpu-mark">*</span> streamed from a GPU node. No CS2 install, no demo download.
    link: /features/match-replay
    linkText: Match Replay
  - icon: |
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"/><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"/><circle cx="12" cy="12" r="2"/><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"/><path d="M19.1 4.9C23 8.8 23 15.1 19.1 19"/></svg>
    title: Broadcast Without OBS <span class="gpu-mark">*</span>
    details: Stream matches straight from the panel over WebRTC, with a Stream Deck, scoreboard overlays, a public watch hub, and picture-in-picture.
    link: /features/live-streaming
    linkText: Live Streaming
  - icon: |
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 12H3"/><path d="M16 6H3"/><path d="M12 18H3"/><path d="m16 12 5 3-5 3v-6Z"/></svg>
    title: Highlights, Automatically <span class="gpu-mark">*</span>
    details: Multikills, clutches, and knife rounds are detected and rendered into clips the moment a match ends. Includes an in-app editor for cutting your own.
    link: /features/highlights
    linkText: Highlights & Clips
  - icon: |
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/></svg>
    title: Servers, Your Way
    details: Spin them up on demand, manage dedicated hardware, or point at a third-party host. Automatic CS2 updates, regions, Steam Relay, and LAN support.
    link: /servers/
    linkText: Server setup
  - icon: |
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
    title: Lives Inside Discord
    details: Create matches, manage lobbies, run map veto as a Discord interaction, sync roles, and auto-create per-tournament voice channels.
    link: /advanced/discord-bot/
    linkText: Discord Bot
---

<div class="home-section">

## Everything else in the box

<div class="home-grid">
<div>

**Competition**

- [Scrim Finder](/features/scrim-finder) availability grids, Elo gates, counter-offers
- [Events](/features/events) medal tables and media galleries for a LAN weekend
- [Competitive Seasons](/features/seasons) Elo resets and season-scoped leaderboards
- [Map Veto](/features/map-veto) deterministic pick/ban for any pool and best-of
- [Custom Map Pools](/features/admin/matchmaking) per format, workshop maps included
- [Player Cameras](/features/player-cameras) required webcams, watched live, on the stream

</div>
<div>

**Match data**

- [Stats & Leaderboards](/features/stats-and-leaderboards) HLTV rating, KAST, ADR, Elo
- [External Matches](/features/external-matches) import Valve, FACEIT, or any demo
- [Demos](/features/demos) auto-upload, retention, bulk download, Playcast
- [API & Keys](/features/api-keys) GraphQL access to your own data

</div>
<div>

**Community & operations**

- [Teams, Lobbies & Chat](/features/social) chat that bridges web and in-server
- [Voice Chat](/features/voice-chat) party and team voice, on your own relay
- [Moderation & Sanctions](/features/moderation) bans, mutes, gags, VAC detection
- [News](/features/news) first-party announcements from inside the panel
- [Monitoring](/features/admin/system) CPU, memory, logs, and database health
- [17 Languages](/features/languages) web app *and* the in-game plugin

</div>
</div>

</div>

<div class="home-section">

## Make it yours

5Stack is self-hosted and built to be adapted, not just configured.

<div class="home-grid">
<div>

**Brand it**

Your name, your logo, your login page, and full light/dark theming, so it reads
as your organization's platform, not someone else's.

[Branding & Theming →](/features/admin/branding)

</div>
<div>

**Extend the panel**

Embed your own web apps as native 5Stack pages. Plugins inherit the panel
session and design system, no fork, no rebuild.

[5Stack Plugin Development →](/plugins/)

</div>
<div>

**Extend the game**

Run your own CS2 server-side plugins alongside 5Stack's, on either
CounterStrikeSharp or SwiftlyS2.

[Game Plugins →](/servers/game-server-nodes/plugin-runtimes)

</div>
</div>

</div>

<div class="home-section home-cta">

## Ready to run it?

One command gets you a full install, Kubernetes, database, storage, and panel.

<a class="home-button" href="/install/">Install 5Stack</a>
<a class="home-button home-button-alt" href="/install/what-is-installed">What gets installed?</a>

</div>

<a class="home-discord" href="https://5stack.gg/discord-invite" target="_blank" rel="noreferrer">
  <span class="home-discord-icon">
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.369a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.211.375-.444.865-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.6 12.6 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.009c.12.099.246.198.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.891.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.055c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028ZM8.02 15.331c-1.183 0-2.157-1.086-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.211 0 2.176 1.096 2.157 2.42 0 1.332-.955 2.418-2.157 2.418Zm7.975 0c-1.183 0-2.157-1.086-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.211 0 2.176 1.096 2.157 2.42 0 1.332-.946 2.418-2.157 2.418Z"/></svg>
  </span>
  <span class="home-discord-body">
    <span class="home-discord-title">Join the crowd</span>
    <span class="home-discord-sub">Questions, help, and the people running 5Stack are all in Discord.</span>
  </span>
  <span class="home-discord-cta">Open Discord <span class="home-discord-arrow" aria-hidden="true">→</span></span>
</a>

<div class="home-section">
<div class="home-maintainer">
  <img
    class="home-maintainer-avatar"
    src="https://avatars.githubusercontent.com/u/2066668?s=160&v=4"
    alt="LukePOLO"
    width="88"
    height="88"
    loading="lazy"
  />
  <div class="home-maintainer-body">
    <p class="home-maintainer-eyebrow">Built and maintained by one developer, for fun</p>
    <p class="home-maintainer-name">LukePOLO</p>
    <p class="home-maintainer-copy">
      5Stack is free, open source, and self-hosted. Sponsoring keeps the GPU
      rendering, the CS2 plugin updates, and the roadmap moving.
    </p>
    <div class="home-maintainer-actions">
      <a class="home-button" href="https://github.com/sponsors/lukepolo" target="_blank" rel="noreferrer">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
        Sponsor
      </a>
      <a class="home-button home-button-alt" href="https://github.com/lukepolo" target="_blank" rel="noreferrer">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
        GitHub
      </a>
    </div>
  </div>
</div>
</div>

<p class="home-footnote">
  <span class="home-footnote-mark">*</span>
  Rendered on a GPU node. In-browser demo playback, highlight rendering, and live
  streaming require an <strong>NVIDIA</strong> GPU
  (<a href="/servers/gpu-nodes">GPU Nodes</a>).
</p>
