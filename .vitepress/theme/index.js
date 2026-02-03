import DefaultTheme from "vitepress/theme";
import "./custom.css";

import { Gallery } from "./gallery";

export default {
  extends: DefaultTheme,
  enhanceApp(ctx) {
    ctx.app.component("Gallery", Gallery);
  },
};
