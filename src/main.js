import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/router";
import VueVideoPlayer from "@videojs-player/vue";
import "video.js/dist/video-js.css";
import "../node_modules/nprogress/nprogress.css";
const app = createApp(App);
app.use(router).use(VueVideoPlayer).mount("#app");
