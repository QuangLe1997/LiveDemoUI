import livestream from "@/views/ShowCase/Live";

const route = {
  path: "/livestream",
  name: "LiveStream",
  component: livestream,
  hidden: false,
  props: (route) => Object.assign({}, route.query, route.params),
};
export default route;
