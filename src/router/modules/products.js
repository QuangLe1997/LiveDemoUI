import prod from "@/views/Products";

const route = {
  path: "/products",
  name: "Products",
  component: prod,
  hidden: false,
  props: (route) => Object.assign({}, route.query, route.params),
  meta: {
    title: "Products",
    icon: "mdi-table-large",
    requiresAuth: false,
    keepAlive: true,
  },
};
export default route;
