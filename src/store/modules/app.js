import { make } from "vuex-pathify";

const state = () => ({
  appName: "AI LIVESTREAM",
  statusServer: -1,
  navDrawer: true,
  drawerMini: false,
  navDrawerWidth: 240,
  scrolling: false,
  loading: false,
  searchParams: {},
  paramsSearchShow: {},
  pageSearch: 0,
  searchInterval: [{ data: [{ x: "1", y: [0, 0] }] }],
  aiConfigTasks: [],
  language: "eng",
});

const getters = make.getters(state);

const actions = {
  changeNavDrawer({ commit }, payload) {
    commit("setNavDrawer", payload);
  },
  changeDrawerMini({ commit }, payload) {
    commit("setDrawerMini", payload);
  },
};

const mutations = {
  ...make.mutations(state),
  setNavDrawer(state, payload) {
    if (payload != null) state.navDrawer = payload;
    else state.navDrawer = !state.navDrawer;
  },
  setDrawerMini(state, payload) {
    if (payload != null) state.drawerMini = payload;
    else state.drawerMini = !state.drawerMini;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
