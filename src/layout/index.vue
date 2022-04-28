<template>
  <section>
    <header class="header-area">
      <div class="navbar-area">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <nav class="navbar navbar-expand-lg">
                <a class="navbar-brand" href="./">
                  <img src="/images/logo.svg" alt="Logo" />
                </a>
                <button
                  class="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span class="toggler-icon"></span>
                  <span class="toggler-icon"></span>
                  <span class="toggler-icon"></span>
                </button>

                <div
                  class="collapse navbar-collapse sub-menu-bar"
                  id="navbarSupportedContent"
                >
                  <ul id="nav" class="navbar-nav ml-auto">
                    <li class="nav-item active">
                      <a class="page-scroll" href="/home">Home</a>
                    </li>
                    <li class="nav-item">
                      <a class="page-scroll" href="/showcase">Showcase</a>
                    </li>
                    <li class="nav-item">
                      <a class="page-scroll" href="#tech-specs">Tech specs</a>
                    </li>
                  </ul>
                </div>
                <!-- navbar collapse -->
              </nav>
              <!-- navbar -->
            </div>
          </div>
          <!-- row -->
        </div>
        <!-- container -->
      </div>
      <!-- navbar area -->

      <div
        id="home"
        class="header-hero bg_cover"
        style="background-image: url(/images/banner-bg.svg)"
      >
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-8">
              <div class="header-hero-content text-center">
                <h3
                  class="header-sub-title wow fadeInUp"
                  data-wow-duration="1.3s"
                  data-wow-delay="0.2s"
                >
                  VieON - Showcase
                </h3>
                <p
                  class="text wow fadeInUp"
                  data-wow-duration="1.3s"
                  data-wow-delay="0.8s"
                >
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor
                </p>
              </div>
              <!-- header hero content -->
            </div>
          </div>
          <!-- row -->
          <div class="row">
            <div class="col-lg-12">
              <div
                class="header-hero-image text-center wow fadeIn"
                data-wow-duration="1.3s"
                data-wow-delay="1.4s"
              >
                <img src="/images/header-hero.png" alt="hero" />
              </div>
              <!-- header hero image -->
            </div>
          </div>
          <!-- row -->
        </div>
        <!-- container -->
        <div id="particles-1" class="particles"></div>
      </div>
      <!-- header hero -->
    </header>
    <transition name="fade" mode="out-in">
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view :key="$route.fullPath"></router-view>
      </keep-alive>
      <router-view v-else></router-view>
    </transition>
    <footer id="footer" class="footer-area pt-120">
      <div class="container">
        <!-- subscribe area -->
        <div class="footer-widget pb-50">
          <div class="row">
            <div class="col-lg-4 col-md-6 col-sm-8">
              <div
                class="footer-about mt-140 wow fadeIn"
                data-wow-duration="1s"
                data-wow-delay="0.2s"
              >
                <a class="logo" href="#">
                  <img src="/images/logo.svg" alt="logo" />
                </a>
                <p class="text">
                  Lorem ipsum dolor sit amet consetetur sadipscing elitr,
                  sederfs diam nonumy eirmod tempor invidunt ut labore et dolore
                  magna aliquyam.
                </p>
                <ul class="social">
                  <li>
                    <a href="#"><i class="lni-facebook-filled"></i></a>
                  </li>
                  <li>
                    <a href="#"><i class="lni-twitter-filled"></i></a>
                  </li>
                  <li>
                    <a href="#"><i class="lni-instagram-filled"></i></a>
                  </li>
                  <li>
                    <a href="#"><i class="lni-linkedin-original"></i></a>
                  </li>
                </ul>
              </div>
              <!-- footer about -->
            </div>
          </div>
          <!-- row -->
        </div>
        <!-- footer widget -->
      </div>
      <!-- container -->
      <div id="particles-2"></div>
    </footer>
    <!--====== BACK TOP TOP PART START ======-->
    <a href="#" class="back-to-top"><i class="lni-chevron-up"></i></a>
  </section>
</template>

<script>
// import VAppBar from "@/components/layout/VAppBar.vue";
import { get, sync } from "vuex-pathify";

export default {
  name: "BaseLayout",
  // components: { VAppBar },
  data() {
    return {
      healthCheckAlert: false,
      heightBar: 0,
      showAllTask: false,
    };
  },
  computed: {
    ...get("route", ["hash", "name"]),
    language: sync("app/language"),
    loading: get("app/loading"),
    statusServer: get("app/statusServer"),
    scrolling: sync("app/scrolling"),
    computed: {
      heightScene() {
        switch (this.$vuetify.breakpoint.name) {
          case "xs":
            return 220;
          case "sm":
            return 400;
          case "md":
            return 500;
          case "lg":
            return 600;
          case "xl":
            return 800;
        }
      },
    },
  },
  mounted() {
    this.heightBar = document.getElementById("appBar").offsetHeight;
    console.log("heightDrawer", this.heightBar);
  },
};
</script>

<style>
@import "../../public/css/bootstrap.min.css";

.container {
  width: 100% !important;
  padding-right: 15px !important;
  padding-left: 15px !important;
  margin-right: auto !important;
  margin-left: auto !important;
}

@media (min-width: 576px) {
  .container {
    max-width: 540px;
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 720px;
  }
}

@media (min-width: 992px) {
  .container {
    max-width: 960px;
  }
}

@media (min-width: 1200px) {
  .container {
    max-width: 1140px;
  }
}
</style>
