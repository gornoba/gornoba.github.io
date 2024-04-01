import DefaultTheme from "vitepress/theme";
import LinkToTab from "../components/LinkToTab.vue";
import Sup from "../components/Sup.vue";
import FootNote from "../components/FootNote.vue";

export default {
  ...DefaultTheme,
  enhanceApp: ({ app }) => {
    app.component("LinkNewTab", LinkToTab);
    app.component("Sup", Sup);
    app.component("FootNote", FootNote);
  },
};
