import BaseShowCase from "@/views/ShowCase/BaseShowCase";
import showcase from "@/views/ShowCase/index";
import live from "@/views/ShowCase/Live";
import click2buy from "@/views/ShowCase/ClickToBuy";
import bannerAds from "@/views/ShowCase/BannerAds";
import tvcAds from "@/views/ShowCase/TvcAds";

const route = {
  path: "/showcase",
  name: "BaseShowCase",
  redirect: "/showcase/all",
  component: BaseShowCase,
  props: (route) => Object.assign({}, route.query, route.params),
  children: [
    {
      path: "/showcase/all",
      name: "ShowCase",
      component: showcase,
      props: (route) => Object.assign({}, route.query, route.params),
    },
    {
      path: "/showcase/livestream",
      name: "LiveStream",
      component: live,
      props: (route) => Object.assign({}, route.query, route.params),
    },
    {
      path: "/showcase/click-to-buy",
      name: "ClickToBuy",
      component: click2buy,
      props: (route) => Object.assign({}, route.query, route.params),
    },
    {
      path: "/showcase/banner-ads",
      name: "BannerAds",
      component: bannerAds,
      props: (route) => Object.assign({}, route.query, route.params),
    },
    {
      path: "/showcase/tvc-ads",
      name: "TVCAds",
      component: tvcAds,
      props: (route) => Object.assign({}, route.query, route.params),
    },
  ],
};
export default route;
