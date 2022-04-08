import Vue from "vue";
import Vuex from "vuex";
import app from "./modules/app";
import demo from "./modules/demo";
import pathify from "vuex-pathify";

// store definition
const store = {
  modules: {
    app,
    demo,
  },
};
Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [pathify.plugin],
  ...store,
});
