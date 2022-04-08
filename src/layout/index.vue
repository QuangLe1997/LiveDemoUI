<template>
  <v-row dense>
    <v-drawer id="drawer"></v-drawer>
    <v-app-bar app></v-app-bar>
    <v-main class="grey lighten-4 pt-8">
      <v-container fluid class="pt-0">
        <v-row no-gutters class="grey lighten-4 ml-6 mb-12">
          <v-bread-crumb></v-bread-crumb>
        </v-row>
        <v-row no-gutters style="min-height: 100vh">
          <transition name="fade" mode="out-in">
            <keep-alive v-if="$route.meta.keepAlive">
              <router-view :key="$route.fullPath"></router-view>
            </keep-alive>
            <router-view v-else></router-view>
          </transition>
        </v-row>
      </v-container>
    </v-main>
    <v-footer app inset tile>
      <small>(C) 2021. Designed and implemented by AI team </small>
    </v-footer>
  </v-row>
</template>

<script>
import VAppBar from "@/components/layout/VAppBar.vue";
import VDrawer from "@/components/layout/VDrawer.vue";
import VBreadCrumb from "@/components/layout/VBreadCrumb";
import { get, sync } from "vuex-pathify";

export default {
  name: "BaseLayout",
  components: { VAppBar, VDrawer, VBreadCrumb },
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

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.btn-show-ai-tasks {
  position: absolute;
  padding: 4px !important;
  top: 10px;
  right: 0;
}

.icon-move {
  margin-right: 0;
  margin-left: 0;
  animation: btnMove 0.5s infinite !important;
}

.list-task {
  height: 100vh;
  width: 30vw;
  position: fixed;
  right: 0;
  z-index: 999;
}
</style>
