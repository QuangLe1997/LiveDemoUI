<template>
  <div class="drawer">
    <v-navigation-drawer
      app
      v-model="drawer"
      floating
      clipped
      permanent
      :mini-variant="drawerMiniMode"
      :width="navDrawerWidth"
    >
      <div class="my-6 pb-5 px-2">
        <v-img src="@/assets/vieon.png" max-width="100" class="ma-auto"></v-img>
      </div>
      <v-list class="py-0 px-2">
        <v-list-group
          v-for="(item, index) in items"
          :key="index"
          v-model="item.active"
          :class="item.active ? 'border-active' : 'border'"
          @click="onClickNavigation(item)"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>
                <h4>{{ item.meta.title }}</h4>
              </v-list-item-title>
            </v-list-item-content>
          </template>
          <template v-slot:prependIcon>
            <v-icon dense> {{ item.meta.icon }}</v-icon>
          </template>
          <template v-slot:appendIcon>
            <v-icon v-if="item.active && item.children" x-small
              >mdi-minus</v-icon
            >
            <v-icon v-else-if="item.children" x-small>mdi-plus</v-icon>
            <v-icon v-else x-small></v-icon>
          </template>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import { asyncRoutes } from "../../router";

export default {
  data() {
    return {
      items: [],
    };
  },
  created() {
    this.items = [...asyncRoutes[0].children].filter((x) => x.hidden === false);
    for (let item of this.items) {
      if (item.children) {
        item.children = item.children.filter((x) => x.hidden === false);
        if (item.children.length === 0) {
          delete item.children;
        }
      }
    }
  },
  methods: {
    ...mapActions("app", ["changeNavDrawer", "changeDrawerMini"]),
    onClickNavigation(item) {
      if (!item.children && item.path !== this.$route.path) {
        this.$router.push(item.path);
      }
    },
  },
  computed: {
    ...mapState("app", [
      "navDrawer",
      "appName",
      "navDrawerWidth",
      "drawerMini",
    ]),
    drawer: {
      get: function () {
        return this.navDrawer;
      },
      set: function (newValue) {
        this.changeNavDrawer(newValue);
      },
    },
    drawerMiniMode: {
      get: function () {
        return this.drawerMini;
      },
      set: function (newValue) {
        this.changeDrawerMini(newValue);
      },
    },
  },
};
</script>

<style lang="scss">
.border-active {
  border-left: 3px solid;
  padding-left: 0px;
}
.v-list-item {
  padding: 2px !important;
}
.v-list-item__icon {
  margin-right: 3px !important;
  margin-left: 12px !important;
}
.border {
  padding-left: 3px;
}
</style>
