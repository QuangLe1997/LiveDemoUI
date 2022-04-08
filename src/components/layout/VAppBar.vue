<template>
  <v-app-bar id="appBar" app flat clipped-left class="primary pr-4 app-bar">
    <f-app-bar-prepend></f-app-bar-prepend>
    <v-btn
      v-if="$vuetify.breakpoint.lgAndUp"
      icon
      @click="changeDrawerMini()"
      color="white"
      class="mr-12"
    >
      <v-icon>mdi-swap-horizontal</v-icon>
    </v-btn>
    <v-spacer></v-spacer>
  </v-app-bar>
</template>
<script>
import FAppBarPrepend from "./VAppBarPrepend.vue";
import { call, sync } from "vuex-pathify";

export default {
  components: { FAppBarPrepend },
  data() {
    return {};
  },
  computed: {
    appName: sync("app/appName"),
    navDrawerWidth: sync("app/navDrawerWidth"),
  },
  methods: {
    changeDrawerMini: call("app/changeDrawerMini"),
  },
};
</script>
