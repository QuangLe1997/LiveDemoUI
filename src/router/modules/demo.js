import demo from "@/views/DemoPlayer";

const route = {
  path: "/demo",
  name: "Demo",
  component: demo,
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
