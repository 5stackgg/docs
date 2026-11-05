<script setup>
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from "vue";

// The host serves these as immutable, so a new render gets new names: the 8 hex
// are the start of each file's sha256.
const INSTALL_VIDEO = {
  phone: "https://demo-dl.5stack.gg/landing/install-720-a8d2711f.mp4",
  full: "https://demo-dl.5stack.gg/landing/install-51dadfe6.mp4",
  poster: "https://demo-dl.5stack.gg/landing/install-177c23b5.webp",
};

const props = defineProps({
  hero: { type: Boolean, default: false },
});

const caption =
  "How 5Stack installs: one command, then a page in your browser.";
const speeds = [1, 2, 4, 8];
const SEEK_STEP_SECONDS = 5;
const GLIDE_MS = 240;
const GLIDE_EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

const player = ref(null);
const video = ref(null);
const track = ref(null);
const strip = ref(null);
const indicator = ref(null);
const speed = ref(2);
const wanted = ref(false);
const ready = ref(false);
const seen = ref(false);
const saveData = ref(false);
const current = ref(0);
const duration = ref(0);
const scrubbing = ref(false);
const theater = ref(false);
const morphing = ref(false);
const isFullscreen = ref(false);
const canFullscreen = ref(false);

const speedButtons = new Map();
let observer;
let resizer;
let isIphone = false;

const progress = computed(() =>
  duration.value > 0 ? Math.min(1, current.value / duration.value) : 0,
);

function formatTime(seconds) {
  const total = Math.max(0, Math.floor(Number.isFinite(seconds) ? seconds : 0));
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
}

const time = computed(() =>
  duration.value > 0
    ? `${formatTime(current.value)} / ${formatTime(duration.value)}`
    : formatTime(current.value),
);

function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function applySpeed() {
  const el = video.value;
  if (!el) {
    return;
  }
  el.defaultPlaybackRate = speed.value;
  el.playbackRate = speed.value;
}

function play() {
  const el = video.value;
  if (!el) {
    return;
  }
  Promise.resolve(el.play()).catch((error) => {
    if (error?.name !== "AbortError") {
      wanted.value = false;
    }
  });
}

function toggle() {
  wanted.value = !wanted.value;
  if (wanted.value) {
    play();
  } else {
    video.value?.pause();
  }
}

function onEnded() {
  wanted.value = false;
}

function sync() {
  const el = video.value;
  if (!el) {
    return;
  }
  duration.value = Number.isFinite(el.duration) ? el.duration : 0;
  if (!scrubbing.value) {
    current.value = el.currentTime;
  }
}

function seekTo(frac) {
  const el = video.value;
  if (!el || duration.value <= 0) {
    return;
  }
  el.currentTime = Math.min(frac * duration.value, duration.value - 0.05);
  current.value = el.currentTime;
}

function fracAt(e) {
  const rect = track.value?.getBoundingClientRect();
  if (!rect || rect.width === 0) {
    return null;
  }
  return Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
}

function onSeekMove(e) {
  const frac = fracAt(e);
  if (frac !== null) {
    seekTo(frac);
  }
}

function onSeekUp() {
  scrubbing.value = false;
  window.removeEventListener("pointermove", onSeekMove);
  window.removeEventListener("pointerup", onSeekUp);
  window.removeEventListener("pointercancel", onSeekUp);
  sync();
}

function onSeekDown(e) {
  if (e.button > 0 || duration.value <= 0) {
    return;
  }
  const frac = fracAt(e);
  if (frac === null) {
    return;
  }
  e.preventDefault();
  scrubbing.value = true;
  seekTo(frac);
  window.addEventListener("pointermove", onSeekMove);
  window.addEventListener("pointerup", onSeekUp);
  window.addEventListener("pointercancel", onSeekUp);
}

function onSeekKeydown(e) {
  const el = video.value;
  if (!el || duration.value <= 0) {
    return;
  }
  let target;
  if (e.key === "ArrowLeft") {
    target = el.currentTime - SEEK_STEP_SECONDS;
  } else if (e.key === "ArrowRight") {
    target = el.currentTime + SEEK_STEP_SECONDS;
  } else if (e.key === "Home") {
    target = 0;
  } else if (e.key === "End") {
    target = duration.value;
  } else {
    return;
  }
  e.preventDefault();
  seekTo(Math.min(1, Math.max(0, target / duration.value)));
}

function elementFullscreen() {
  const el = player.value;
  return (
    !isIphone &&
    !!(document.fullscreenEnabled ?? document.webkitFullscreenEnabled) &&
    !!(el?.requestFullscreen ?? el?.webkitRequestFullscreen)
  );
}

function nativeFullscreen() {
  const el = video.value;
  if (!el?.webkitEnterFullscreen) {
    return;
  }
  if (el.webkitDisplayingFullscreen) {
    el.webkitExitFullscreen?.();
    return;
  }
  const enter = () => {
    try {
      el.webkitEnterFullscreen?.();
    } catch {}
  };
  if (el.readyState >= HTMLMediaElement.HAVE_METADATA) {
    enter();
    return;
  }
  // webkitEnterFullscreen throws until the metadata is in, and with
  // preload="none" nothing loads until playback starts.
  el.addEventListener("loadedmetadata", enter, { once: true });
  wanted.value = true;
  play();
}

function toggleFullscreen() {
  if (!elementFullscreen()) {
    nativeFullscreen();
    return;
  }
  if (document.fullscreenElement ?? document.webkitFullscreenElement) {
    const exit =
      document.exitFullscreen?.bind(document) ??
      document.webkitExitFullscreen?.bind(document);
    Promise.resolve(exit?.()).catch(() => {});
    return;
  }
  const el = player.value;
  setTheater(false);
  const request =
    el.requestFullscreen?.bind(el) ?? el.webkitRequestFullscreen?.bind(el);
  Promise.resolve(request?.()).catch(() => {});
}

function onFullscreenChange() {
  isFullscreen.value =
    (document.fullscreenElement ?? document.webkitFullscreenElement) ===
    player.value;
}

function setTheater(value) {
  theater.value = value;
  const root = document.documentElement;
  if (value) {
    root.dataset.videoTheater = props.hero ? "hero" : "doc";
  } else {
    delete root.dataset.videoTheater;
  }
}

async function toggleTheater(value = !theater.value) {
  if (value === theater.value || morphing.value) {
    return;
  }
  const swap = async () => {
    setTheater(value);
    await nextTick();
    if (value) {
      player.value?.scrollIntoView({ block: "start", behavior: "instant" });
    }
  };
  if (
    typeof document.startViewTransition !== "function" ||
    document.visibilityState !== "visible" ||
    reducedMotion()
  ) {
    await swap();
    return;
  }
  morphing.value = true;
  document.documentElement.dataset.installMorph = "";
  await nextTick();
  const transition = document.startViewTransition(swap);
  transition.ready.catch(() => {});
  await transition.finished.catch(() => {});
  morphing.value = false;
  delete document.documentElement.dataset.installMorph;
}

function onKeydown(e) {
  if (e.metaKey || e.ctrlKey || e.altKey) {
    return;
  }
  const key = e.key.toLowerCase();
  if (key === "f" && canFullscreen.value) {
    e.preventDefault();
    toggleFullscreen();
  } else if (
    key === "t" &&
    !isFullscreen.value &&
    window.matchMedia("(min-width: 1024px)").matches
  ) {
    e.preventDefault();
    void toggleTheater();
  } else if (key === "escape" && theater.value) {
    e.preventDefault();
    void toggleTheater(false);
  }
}

function setSpeedButton(el, value) {
  if (el) {
    speedButtons.set(value, el);
  } else {
    speedButtons.delete(value);
  }
}

function placeIndicator(glide) {
  const el = speedButtons.get(speed.value);
  const pill = indicator.value;
  if (!el || !pill || el.offsetWidth === 0) {
    return;
  }
  const from =
    glide && pill.dataset.placed ? pill.getBoundingClientRect() : null;
  pill.getAnimations?.().forEach((a) => a.cancel());
  pill.style.left = `${el.offsetLeft}px`;
  pill.style.top = `${el.offsetTop}px`;
  pill.style.width = `${el.offsetWidth}px`;
  pill.style.height = `${el.offsetHeight}px`;
  pill.dataset.placed = "";
  if (!from || reducedMotion() || typeof pill.animate !== "function") {
    return;
  }
  const to = pill.getBoundingClientRect();
  if (to.width === 0 || to.height === 0) {
    return;
  }
  pill.animate(
    [
      {
        transform: `translate(${from.left - to.left}px, ${from.top - to.top}px) scale(${from.width / to.width}, ${from.height / to.height})`,
      },
      { transform: "none" },
    ],
    { duration: GLIDE_MS, easing: GLIDE_EASE },
  );
}

watch(speed, () => {
  applySpeed();
  nextTick(() => placeIndicator(true));
});

onMounted(() => {
  isIphone = /iPhone|iPod/.test(navigator.userAgent);
  canFullscreen.value =
    elementFullscreen() ||
    typeof video.value?.webkitEnterFullscreen === "function";
  saveData.value = navigator.connection?.saveData === true;
  wanted.value = props.hero && !reducedMotion() && !saveData.value;
  ready.value = true;
  applySpeed();
  nextTick(() => placeIndicator(false));
  if (typeof ResizeObserver !== "undefined" && strip.value) {
    resizer = new ResizeObserver(() => placeIndicator(false));
    resizer.observe(strip.value);
  }
  if (!video.value || typeof IntersectionObserver === "undefined") {
    return;
  }
  observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting) {
        video.value?.pause();
        return;
      }
      seen.value = true;
      if (wanted.value) {
        play();
      }
    },
    { threshold: 0.5 },
  );
  observer.observe(video.value);
});

onBeforeUnmount(() => {
  observer?.disconnect();
  resizer?.disconnect();
  onSeekUp();
  if (theater.value) {
    setTheater(false);
  }
  delete document.documentElement.dataset.installMorph;
});
</script>

<template>
  <figure
    ref="player"
    tabindex="-1"
    class="install-video"
    :class="{
      'is-hero': hero,
      'is-theater': theater,
      'is-fullscreen': isFullscreen,
    }"
    @keydown="onKeydown"
    @fullscreenchange="onFullscreenChange"
    @webkitfullscreenchange="onFullscreenChange"
  >
    <div
      class="iv-box"
      :style="morphing ? { viewTransitionName: 'install-video' } : undefined"
    >
      <div class="iv-screen">
        <video
          ref="video"
          :poster="INSTALL_VIDEO.poster"
          :preload="seen && !saveData ? 'metadata' : 'none'"
          muted
          :loop="hero"
          playsinline
          @click="toggle"
          @ended="onEnded"
          @loadedmetadata="sync"
          @durationchange="sync"
          @timeupdate="sync"
          @seeked="sync"
        >
          <source
            :src="INSTALL_VIDEO.phone"
            media="(max-width: 767px)"
            type="video/mp4"
          />
          <source :src="INSTALL_VIDEO.full" type="video/mp4" />
        </video>
        <span
          aria-hidden="true"
          class="iv-big"
          :class="{ 'is-on': ready && !wanted }"
        >
          <svg viewBox="0 0 24 24"><polygon points="6 3 20 12 6 21 6 3" /></svg>
        </span>
      </div>
      <div class="iv-bar">
        <button
          type="button"
          class="iv-btn"
          :aria-label="wanted ? 'Pause' : 'Play'"
          @click="toggle"
        >
          <svg v-if="wanted" viewBox="0 0 24 24" class="iv-solid">
            <rect x="14" y="4" width="4" height="16" rx="1" />
            <rect x="6" y="4" width="4" height="16" rx="1" />
          </svg>
          <svg v-else viewBox="0 0 24 24" class="iv-solid">
            <polygon points="6 3 20 12 6 21 6 3" />
          </svg>
        </button>
        <div
          ref="track"
          class="iv-seek"
          :class="{ 'is-scrubbing': scrubbing }"
          role="slider"
          tabindex="0"
          aria-label="Seek"
          aria-valuemin="0"
          :aria-valuemax="Math.round(duration)"
          :aria-valuenow="Math.round(current)"
          :aria-valuetext="formatTime(current)"
          @pointerdown="onSeekDown"
          @keydown="onSeekKeydown"
        >
          <div class="iv-rail">
            <span
              class="iv-fill"
              :style="{ width: `${(progress * 100).toFixed(2)}%` }"
            />
            <span
              class="iv-thumb"
              :style="{ left: `${(progress * 100).toFixed(2)}%` }"
            />
          </div>
        </div>
        <span class="iv-time">{{ time }}</span>
        <div class="iv-tools">
          <button
            v-if="!isFullscreen"
            type="button"
            class="iv-btn iv-theater"
            :aria-label="theater ? 'Default view' : 'Theater mode'"
            :title="`${theater ? 'Default view' : 'Theater mode'} (t)`"
            @click="toggleTheater()"
          >
            <svg viewBox="0 0 24 24" class="iv-line">
              <rect v-if="theater" x="5" y="7" width="14" height="10" rx="2" />
              <rect v-else x="2" y="6" width="20" height="12" rx="2" />
            </svg>
          </button>
          <button
            v-if="canFullscreen"
            type="button"
            class="iv-btn"
            :aria-label="isFullscreen ? 'Exit fullscreen' : 'Fullscreen'"
            :title="isFullscreen ? 'Exit fullscreen (F)' : 'Fullscreen (F)'"
            @click="toggleFullscreen"
          >
            <svg v-if="isFullscreen" viewBox="0 0 24 24" class="iv-line">
              <path d="M8 3v3a2 2 0 0 1-2 2H3" />
              <path d="M21 8h-3a2 2 0 0 1-2-2V3" />
              <path d="M3 16h3a2 2 0 0 1 2 2v3" />
              <path d="M16 21v-3a2 2 0 0 1 2-2h3" />
            </svg>
            <svg v-else viewBox="0 0 24 24" class="iv-line">
              <path d="M8 3H5a2 2 0 0 0-2 2v3" />
              <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
              <path d="M3 16v3a2 2 0 0 0 2 2h3" />
              <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div ref="strip" class="iv-speed" role="group" aria-label="Playback speed">
      <span ref="indicator" class="iv-speed-pill" aria-hidden="true" />
      <button
        v-for="s in speeds"
        :key="s"
        :ref="(el) => setSpeedButton(el, s)"
        type="button"
        :class="{ 'is-on': speed === s }"
        :aria-pressed="String(speed === s)"
        @click="speed = s"
      >
        {{ s }}×
      </button>
    </div>
    <figcaption>{{ caption }}</figcaption>
  </figure>
</template>

<style scoped>
.install-video {
  --iv-amber: hsl(var(--tac-amber));
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 10px 12px;
  margin: 24px 0;
  min-width: 0;
  scroll-margin-top: calc(var(--vp-nav-height) + 16px);
}

.install-video:focus {
  outline: none;
}

.install-video.is-hero {
  margin: 0;
}

.iv-box {
  grid-column: 1 / -1;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-alt);
}

.is-hero .iv-box {
  box-shadow: 0 30px 80px -30px rgb(0 0 0 / 0.9);
}

.iv-screen {
  position: relative;
  aspect-ratio: 16 / 9;
  background: #000;
}

.iv-screen video {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  cursor: pointer;
}

.iv-big {
  position: absolute;
  top: 50%;
  left: 50%;
  display: grid;
  place-items: center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgb(255 255 255 / 0.9);
  color: #000;
  opacity: 0;
  pointer-events: none;
  transform: translate(-50%, -50%) scale(0.9);
  transition:
    opacity 0.15s,
    transform 0.15s;
}

.iv-big.is-on {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}

.iv-big svg {
  width: 24px;
  height: 24px;
  margin-left: 2px;
  fill: currentColor;
}

.iv-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 6px;
  border-top: 1px solid var(--vp-c-divider);
}

.iv-btn {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  color: var(--vp-c-text-1);
  transition: background-color 0.15s;
}

.iv-btn:hover {
  background: var(--vp-c-default-soft);
}

.iv-btn:focus-visible {
  outline: 2px solid var(--iv-amber);
  outline-offset: -2px;
}

.iv-btn svg {
  width: 16px;
  height: 16px;
}

.iv-solid {
  fill: currentColor;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linejoin: round;
}

.iv-line {
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.iv-seek {
  display: flex;
  flex: 1;
  align-items: center;
  min-width: 0;
  height: 20px;
  border-radius: 2px;
  cursor: pointer;
  touch-action: none;
  user-select: none;
}

.iv-seek:focus-visible {
  outline: 2px solid var(--iv-amber);
  outline-offset: 2px;
}

.iv-rail {
  position: relative;
  width: 100%;
  height: 2px;
  border-radius: 999px;
  background: var(--vp-c-divider);
  transition: height 0.15s;
}

.iv-seek:hover .iv-rail,
.iv-seek.is-scrubbing .iv-rail {
  height: 5px;
}

.iv-fill {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  border-radius: 999px;
  background: var(--iv-amber);
  box-shadow: 0 0 12px hsl(var(--tac-amber) / 0.45);
  transition: width 0.3s linear;
}

.iv-seek.is-scrubbing .iv-fill {
  transition: none;
}

.iv-thumb {
  position: absolute;
  top: 50%;
  width: 12px;
  height: 12px;
  border: 1px solid rgb(0 0 0 / 0.4);
  border-radius: 50%;
  background: var(--iv-amber);
  box-shadow: 0 0 10px hsl(var(--tac-amber) / 0.6);
  opacity: 0;
  transform: translate(-50%, -50%);
  transition: opacity 0.15s;
}

.iv-seek:hover .iv-thumb,
.iv-seek.is-scrubbing .iv-thumb {
  opacity: 1;
}

.iv-time {
  flex-shrink: 0;
  min-width: 4.5rem;
  font-family: var(--vp-font-family-mono);
  font-size: 0.65rem;
  font-variant-numeric: tabular-nums;
  color: var(--vp-c-text-2);
  text-align: right;
}

.iv-tools {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  gap: 2px;
}

.iv-theater {
  display: none;
}

@media (min-width: 1024px) {
  .iv-theater {
    display: inline-flex;
  }
}

.install-video figcaption {
  grid-row: 2;
  grid-column: 1;
  font-family: var(--vp-font-family-mono);
  font-size: 0.65rem;
  line-height: 1.5;
  letter-spacing: 0.12em;
  text-align: left;
  text-transform: uppercase;
  color: var(--vp-c-text-2);
}

.iv-speed {
  grid-row: 2;
  grid-column: 2;
  position: relative;
  display: inline-flex;
  gap: 4px;
  padding: 4px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: color-mix(in srgb, var(--vp-c-bg-soft) 30%, transparent);
}

.iv-speed-pill {
  position: absolute;
  border-radius: 4px;
  background: var(--iv-amber);
  box-shadow: 0 0 12px -2px hsl(var(--tac-amber) / 0.6);
  pointer-events: none;
  transform-origin: top left;
}

.iv-speed-pill:not([data-placed]) {
  opacity: 0;
}

.iv-speed button {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 1.375rem;
  padding: 0 10px;
  border-radius: 4px;
  font-family: var(--vp-font-family-mono);
  font-size: 0.65rem;
  font-weight: 600;
  line-height: 1;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--vp-c-text-2);
  transition: color 0.2s;
}

.iv-speed button:hover {
  color: var(--vp-c-text-1);
}

.iv-speed button.is-on {
  font-weight: 700;
  color: #000;
}

.iv-speed button:focus-visible {
  outline: 2px solid var(--iv-amber);
  outline-offset: 1px;
}

@media (pointer: coarse) {
  .iv-speed button::before {
    content: "";
    position: absolute;
    inset-inline: 0;
    top: 50%;
    height: 44px;
    transform: translateY(-50%);
  }
}

@media (max-width: 559px) {
  .install-video figcaption {
    grid-column: 1 / -1;
  }

  .iv-speed {
    grid-row: 3;
    grid-column: 1 / -1;
    justify-self: start;
  }
}

.install-video.is-fullscreen {
  grid-template-rows: minmax(0, 1fr) auto;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 16px;
  background: #000;
}

.is-fullscreen .iv-box {
  display: flex;
  flex-direction: column;
  align-self: stretch;
  min-height: 0;
  box-shadow: none;
}

.is-fullscreen .iv-screen {
  flex: 1;
  min-height: 0;
  aspect-ratio: auto;
}

@media (prefers-reduced-motion: reduce) {
  .iv-big,
  .iv-btn,
  .iv-rail,
  .iv-fill,
  .iv-thumb,
  .iv-speed button {
    transition: none;
  }
}
</style>
