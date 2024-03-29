import DefaultTheme from "vitepress/theme";
import LinkToTap from "../components/LinkToTap.vue";

export default {
  ...DefaultTheme,
  enhanceApp: ({ app }) => {
    app.component("LinkNewTab", LinkToTap);
  },
};
