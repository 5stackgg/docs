<script setup>
const goodFit = [
  {
    title: "Communities & Discord servers",
    body: "Running pugs, scrims, and the occasional cup, and tired of stitching together a bot, a bracket site, and a spreadsheet.",
  },
  {
    title: "League & tournament operators",
    body: "Multi-stage brackets, seasonal divisions, negotiated scheduling, prize pools, and a bracket you can put on a stream.",
  },
  {
    title: "Server hosts",
    body: "Turn a rented box into a competitive platform. Multi-region orchestration, automatic CS2 updates, and white-label branding.",
  },
  {
    title: "Orgs, schools & LANs",
    body: "A branded platform with real analytics, offline-capable LAN servers, and venue-ready bracket displays.",
  },
];

const notFor = [
  "You want a hosted service with no infrastructure to run. 5Stack is self-hosted by design.",
  "You can't provide a Linux host and a domain to run it on.",
];
</script>

<template>
  <section class="home-intro">
    <div class="home-intro-container">
      <p class="home-intro-eyebrow">
        <span aria-hidden="true" class="home-intro-marker">◢</span>
        Overview
      </p>
      <div class="home-intro-overview">
        <p class="home-intro-lede">
          5Stack is a self-hosted competition platform for Counter-Strike 2. One
          install runs the entire lifecycle of competitive play: it provisions
          the servers, matchmakes the players, runs the map veto, controls the
          live match, holds the tournament structure, captures and parses the
          demos, computes the statistics, renders 2D and 3D replays, streams the
          broadcast, cuts the highlight reel, and moderates the community.
        </p>
        <aside class="home-intro-punch">
          <span class="home-intro-punch-setup"
            >Every one of those is normally a separate tool.</span
          >
          <strong class="home-intro-punch-payoff"
            >5Stack is
            <span class="home-intro-punch-accent">the join</span>.</strong
          >
          <a
            class="home-intro-punch-cta"
            href="https://5stack.gg"
            target="_blank"
            rel="noreferrer"
          >
            See it running live at 5stack.gg
            <span aria-hidden="true">→</span>
          </a>
        </aside>
      </div>

      <p class="home-intro-eyebrow home-intro-eyebrow-spaced">
        <span aria-hidden="true" class="home-intro-marker">◢</span>
        Is it for you?
      </p>

      <div class="home-intro-fit">
        <div v-for="item in goodFit" :key="item.title" class="home-intro-card">
          <p class="home-intro-card-title">{{ item.title }}</p>
          <p class="home-intro-card-body">{{ item.body }}</p>
        </div>
      </div>

      <div class="home-intro-not">
        <p class="home-intro-not-title">Probably not for you if…</p>
        <ul>
          <li v-for="item in notFor" :key="item">{{ item }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Mirrors VPFeatures' own padding/width so this section lines up exactly with
   the feature cards rendered directly beneath it. */
.home-intro {
  position: relative;
  padding: 0 24px;
}

.home-intro-container {
  max-width: 1152px;
  margin: 0 auto;
  padding-bottom: 56px;
}

/* Section eyebrow, lifted from the panel's TacticalPageHeader: an amber ◢
   followed by a wide-tracked uppercase label. */
.home-intro-eyebrow {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 14px;
  font-family: var(--vp-font-family-display);
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--vp-c-text-2);
}

.home-intro-eyebrow::after {
  content: "";
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, var(--vp-c-divider) 0%, transparent 100%);
}

.home-intro-eyebrow-spaced {
  margin-top: 52px;
}

.home-intro-marker {
  font-size: 10px;
  line-height: 1;
  color: hsl(var(--tac-amber));
}

/* Overview spans the full width: the paragraph and the pull-quote sit
   side by side so the top of the page isn't a half-empty left column. */
.home-intro-overview {
  display: grid;
  grid-template-columns: minmax(0, 1.8fr) minmax(0, 1fr);
  gap: 28px;
  align-items: start;
}

.home-intro-lede {
  margin: 0;
  font-size: 16px;
  line-height: 1.75;
  color: var(--vp-c-text-2);
}

/* The pull-quote is the page's thesis, so it gets weight: an amber-edged card
   whose content is vertically centered, a quiet set-up line above the payoff. */
.home-intro-punch {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 0;
  padding: 22px 26px;
  border: 1px solid var(--vp-c-divider);
  border-left: 3px solid hsl(var(--tac-amber));
  border-radius: 0 12px 12px 0;
  background: linear-gradient(
    120deg,
    hsl(var(--tac-amber) / 0.06),
    var(--vp-c-bg-soft) 60%
  );
}

.home-intro-punch-setup {
  font-size: 14px;
  line-height: 1.5;
  color: var(--vp-c-text-3);
}

.home-intro-punch-payoff {
  font-family: var(--vp-font-family-display);
  font-size: 24px;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.01em;
  color: var(--vp-c-text-1);
}

.home-intro-punch-accent {
  color: hsl(var(--tac-amber));
}

/* The live-site link is the page's most important outbound action: a filled
   amber button anchored to the bottom of the thesis card. */
.home-intro-punch-cta {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  align-self: flex-start;
  margin-top: 6px;
  padding: 9px 16px;
  border-radius: 8px;
  background-color: hsl(var(--tac-amber));
  color: hsl(0 0% 10%);
  font-family: var(--vp-font-family-display);
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  transition:
    background-color 0.2s,
    transform 0.2s;
}

.home-intro-punch-cta:hover {
  background-color: hsl(33 94% 63%);
  transform: translateY(-1px);
}

@media (max-width: 767px) {
  .home-intro-overview {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}

.home-intro-fit {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}

.home-intro-card {
  padding: 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
}

.home-intro-card-title {
  margin: 0;
  font-family: var(--vp-font-family-display);
  font-size: 15px;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.home-intro-card-body {
  margin: 8px 0 0;
  font-size: 14px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}

.home-intro-not {
  margin-top: 16px;
  padding: 20px 24px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
}

.home-intro-not-title {
  margin: 0 0 8px;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--vp-c-text-3);
}

/* VitePress's reset strips list markers outside `.vp-doc`. */
.home-intro-not ul {
  margin: 0;
  padding-left: 20px;
  list-style: disc;
}

.home-intro-not li {
  margin: 6px 0;
  font-size: 14px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}

@media (min-width: 640px) {
  .home-intro {
    padding: 0 48px;
  }
}

@media (min-width: 960px) {
  .home-intro {
    padding: 0 64px;
  }
}
</style>
