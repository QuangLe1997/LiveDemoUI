import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { createRouter } from "./router";
import "./styles/overrides.scss";
import "../public/css/bootstrap.min.css";
Vue.config.productionTip = false;
import store from "./store";
const router = createRouter();

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
