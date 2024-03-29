import DefaultTheme from "vitepress/theme";
import LinkToTab from "../components/LinkToTab.vue";

export default {
  ...DefaultTheme,
  enhanceApp: ({ app }) => {
    app.component("LinkNewTab", LinkToTab);
  },
};
