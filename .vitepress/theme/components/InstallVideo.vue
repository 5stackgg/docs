<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from "vue";

// The host serves these as immutable, so a new render gets a new name: the 8 hex
// are the start of the mp4's sha256. Change this one line after a re-render.
const INSTALL_VIDEO = "https://demo-dl.5stack.gg/landing/install-6358931e";

const props = defineProps({
  hero: { type: Boolean, default: false },
});

const caption =
  "How 5Stack installs: one command, then a page in your browser.";
const speeds = [1, 2, 4, 8];

const video = ref(null);
const speed = ref(2);
const seen = ref(false);
const saveData = ref(false);

let wanted = false;
let leaving = false;
let observer;

function applySpeed() {
  if (!props.hero || !video.value) {
    return;
  }
  video.value.defaultPlaybackRate = speed.value;
  video.value.playbackRate = speed.value;
}

function play() {
  Promise.resolve(video.value?.play()).catch(() => {});
}

function onPlay() {
  wanted = true;
}

function onPause() {
  if (!leaving) {
    wanted = false;
  }
  leaving = false;
}

watch(speed, applySpeed);

onMounted(() => {
  if (!props.hero || !video.value) {
    return;
  }
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  saveData.value = navigator.connection?.saveData === true;
  wanted = !reduced && !saveData.value;
  applySpeed();
  if (typeof IntersectionObserver === "undefined") {
    return;
  }
  observer = new IntersectionObserver(
    ([entry]) => {
      const el = video.value;
      if (!el) {
        return;
      }
      if (!entry?.isIntersecting) {
        if (!el.paused) {
          leaving = true;
          el.pause();
        }
        return;
      }
      seen.value = true;
      if (wanted) {
        play();
      }
    },
    { threshold: 0.5 },
  );
  observer.observe(video.value);
});

onBeforeUnmount(() => {
  observer?.disconnect();
});
</script>

<template>
  <figure class="install-video" :class="{ 'is-hero': hero }">
    <video
      v-if="hero"
      ref="video"
      :src="`${INSTALL_VIDEO}.mp4`"
      :poster="`${INSTALL_VIDEO}.webp`"
      :preload="seen && !saveData ? 'metadata' : 'none'"
      controls
      muted
      loop
      playsinline
      @play="onPlay"
      @pause="onPause"
    />
    <video
      v-else
      :src="`${INSTALL_VIDEO}.mp4`"
      :poster="`${INSTALL_VIDEO}.webp`"
      preload="none"
      controls
      muted
      playsinline
    />
    <div class="install-video-foot">
      <figcaption>{{ caption }}</figcaption>
      <div
        v-if="hero"
        class="install-video-speed"
        role="group"
        aria-label="Playback speed"
      >
        <button
          v-for="s in speeds"
          :key="s"
          type="button"
          :aria-pressed="String(speed === s)"
          @click="speed = s"
        >
          {{ s }}×
        </button>
      </div>
    </div>
  </figure>
</template>

<style scoped>
.install-video {
  margin: 24px 0;
}

.install-video video {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: #000;
}

.install-video.is-hero {
  margin: 0;
}

.install-video.is-hero video {
  box-shadow: 0 30px 80px -30px rgb(0 0 0 / 0.9);
}

.install-video-foot {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 8px 16px;
  margin-top: 10px;
}

.install-video figcaption {
  font-size: 14px;
  line-height: 20px;
  color: var(--vp-c-text-2);
}

.install-video.is-hero figcaption {
  text-align: left;
}

.install-video-speed {
  display: inline-flex;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
}

.install-video-speed button {
  min-width: 40px;
  padding: 4px 10px;
  font-family: var(--vp-font-family-mono);
  font-size: 12px;
  line-height: 20px;
  color: var(--vp-c-text-2);
  transition:
    color 0.2s,
    background-color 0.2s;
}

.install-video-speed button + button {
  border-left: 1px solid var(--vp-c-divider);
}

.install-video-speed button:hover {
  color: var(--vp-c-text-1);
}

.install-video-speed button[aria-pressed="true"] {
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.install-video-speed button:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: -2px;
}

@media (prefers-reduced-motion: reduce) {
  .install-video-speed button {
    transition: none;
  }
}
</style>
