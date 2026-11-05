import { h, watch, nextTick } from "vue";
import { useRoute } from "vitepress";
import DefaultTheme, { VPImage } from "vitepress/theme";
import HomeIntro from "./HomeIntro.vue";
import ArchitectureDiagram from "./components/ArchitectureDiagram.vue";
import InstallVideo from "./components/InstallVideo.vue";
import "./custom.css";

const canAnimate = () =>
  typeof window !== "undefined" &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default {
  extends: DefaultTheme,

  enhanceApp({ app }) {
    app.component("ArchitectureDiagram", ArchitectureDiagram);
    app.component("InstallVideo", InstallVideo);
  },

  setup() {
    if (typeof document === "undefined") {
      return;
    }

    const route = useRoute();

    watch(
      () => route.path,
      (path) => {
        // Tag the root on the home page so the nav bar can drop its redundant
        // logo/title and let search breathe (see custom.css).
        const isHome = path === "/" || path === "/index.html";
        document.documentElement.classList.toggle("is-home-page", isHome);

        nextTick(() => {
          // Re-trigger the content entrance animation on each navigation. The
          // class is removed, a reflow forced, then re-added so the CSS
          // animation restarts even though .VPContent itself persists.
          const content = document.querySelector(".VPContent");
          if (content && canAnimate()) {
            content.classList.remove("route-enter");
            void content.offsetWidth;
            content.classList.add("route-enter");
          }

          // The sidebar keeps its scroll position across navigations, so a jump
          // into a different section can leave the active item off-screen.
          // Bring the deepest active item into view.
          const actives = document.querySelectorAll(".VPSidebar .is-active");
          actives[actives.length - 1]?.scrollIntoView({ block: "nearest" });
        });
      },
      { immediate: true },
    );
  },

  // The home layout renders `features:` straight after the hero, and markdown
  // content only after that, so the "what is this / is it for me" section has
  // to come in through a slot to sit above the cards.
  Layout() {
    return h(DefaultTheme.Layout, null, {
      "home-hero-info-before": () =>
        h(VPImage, {
          class: "hero-logo",
          image: {
            light: "/brand/wordmark-light.svg",
            dark: "/brand/wordmark-dark.svg",
            alt: "5Stack",
          },
        }),
      "home-hero-image": () => h(InstallVideo, { hero: true }),
      "home-features-before": () => h(HomeIntro),
    });
  },
};
