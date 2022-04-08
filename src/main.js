import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import "./styles/overrides.scss";
import { createRouter } from "./router";
/*Video monitoring plug in*/
// import VueVideoPlayer from "vue-video-player";
// import "video.js/dist/video-js.css";
// import "vue-video-player/src/custom-theme.css";
// import "videojs-flash";
// import "videojs-contrib-hls";
// import "videojs-contrib-hls/dist/videojs-contrib-hls";
// Vue.use(VueVideoPlayer);
Vue.config.productionTip = false;
import store from "./store";
const router = createRouter();

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
