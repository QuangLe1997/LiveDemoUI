import home from "@/views/LandingPage/index";

const route = {
  path: "/home",
  name: "Home",
  component: home,
  hidden: false,
  props: (route) => Object.assign({}, route.query, route.params),
  meta: {
    title: "Demo Player",
    icon: "mdi-play-box",
    requiresAuth: false,
    keepAlive: true,
  },
};
export default route;
