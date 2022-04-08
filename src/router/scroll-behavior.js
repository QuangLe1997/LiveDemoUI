// Globals
import { IN_BROWSER } from "@/util/globals";

export default async function (vuetify, store, to, from, savedPosition) {
  if (
    !IN_BROWSER ||
    // (from && to.path === from.path) ||
    store.state.app.scrolling
  ) {
    return {};
  }

  if (savedPosition) {
    return savedPosition;
  } else {
    const position = {
      y: 0,
    };

    if (to.hash) {
      position.selector = to.hash;
      position.behavior = "smooth";
      // position.offset = { y: 100 }
    }

    return new Promise((resolve) => {
      resolve(position);
    });
  }
}
