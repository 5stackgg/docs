import { h, watch } from "vue";
import { useRoute } from "vitepress";
import DefaultTheme from "vitepress/theme";
import HomeIntro from "./HomeIntro.vue";
import "./custom.css";

export default {
  extends: DefaultTheme,
  // Tag the root element on the home page so CSS can treat the nav bar
  // differently there (drop the redundant logo/title, widen search) without
  // affecting any other page.
  setup() {
    if (typeof document === "undefined") {
      return;
    }
    const route = useRoute();
    watch(
      () => route.path,
      (path) => {
        const isHome = path === "/" || path === "/index.html";
        document.documentElement.classList.toggle("is-home-page", isHome);
      },
      { immediate: true },
    );
  },
  // The home layout renders `features:` straight after the hero, and markdown
  // content only after that, so the "what is this / is it for me" section has
  // to come in through a slot to sit above the cards.
  Layout() {
    return h(DefaultTheme.Layout, null, {
      "home-features-before": () => h(HomeIntro),
    });
  },
};
