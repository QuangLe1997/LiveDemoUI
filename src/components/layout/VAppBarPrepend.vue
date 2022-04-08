<template>
  <v-toolbar
    class="primary mx-6"
    flat
    dense
    v-bind="[
      $vuetify.breakpoint.mdAndDown
        ? { maxWidth: navDrawerWidth * 0.7 }
        : { maxWidth: navDrawerWidth },
    ]"
  >
    <v-icon
      v-if="$vuetify.breakpoint.mdAndDown"
      color="white"
      left
      @click="changeDrawerMini()"
    >
      mdi-menu
    </v-icon>
    <router-link
      v-if="$vuetify.breakpoint.lgAndUp"
      to="/"
      class="app-bar-brand white--text"
    >
      <span class="text-center">{{ appName }}</span>
    </router-link>
  </v-toolbar>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState("app", ["appName", "navDrawerWidth"]),
  },
  methods: {
    ...mapActions("app", ["changeNavDrawer", "changeDrawerMini"]),
  },
};
</script>
<style lang="scss">
.app-bar-brand {
  font-size: 15px;
  font-weight: 550;
  text-decoration: none;
}
</style>
