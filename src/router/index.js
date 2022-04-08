// Imports
import Router from "vue-router";
// import scrollBehavior from './scroll-behavior'
import Vue from "vue";
// Globals
import demo from "./modules/demo";

import BaseLayout from "@/layout/index";
import products from "./modules/products";
// Setup
Vue.use(Router);

export const constantRoutes = [
  {
    path: "",
    name: "Home",
    redirect: "/demo",
    hidden: true,
  },
];

/**
 * asyncRoutes
 * the routes that need to be dynamically base on user roles
 */
export const asyncRoutes = [
  {
    path: "",
    component: BaseLayout,
    meta: {
      icon: "",
      requiresAuth: false,
    },
    children: [demo, products],
  },
  { path: "*", redirect: "/404", hidden: true },
];

export function createRouter() {
  let router = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    // scrollBehavior: (...args) => scrollBehavior(vuetify, store, ...args),
    routes: [...constantRoutes, ...asyncRoutes],
  });
  router.beforeEach((to, from, next) => {
    document.title = `DEMO LIVESTREAM | ${to.meta.title}`;
    next();
  });
  return router;
}
