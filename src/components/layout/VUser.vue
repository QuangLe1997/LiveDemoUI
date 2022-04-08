<template>
  <div>
    <v-row class="align-center user-info">
      <v-menu
        transition="slide-x-transition"
        offset-y
        absolute
        right
        :close-on-content-click="false"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-avatar size="40" v-bind="attrs" v-on="on">
            <v-img
              src="https://static2.vieon.vn/ai-storage/ai_vlz/GeneralImage/logo.png"
            ></v-img>
          </v-avatar>
        </template>
        <v-list dense max-width="260px">
          <div></div>
        </v-list>
      </v-menu>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "VUser",
  data() {
    return {
      roleMaps: new Map([
        ["1", "Add Task"],
        ["2", "Export data"],
        ["3", "Config Meta"],
        ["4", "ReadOnly"],
      ]),
      languageOptions: [
        {
          text: "English",
          value: "eng",
        },
        {
          text: "Việt Nam",
          value: "vie",
        },
      ],
      userInfo: {},
      roles: null,
    };
  },
};
</script>

<style lang="scss" scoped>
.avatar-border {
  border: 3px solid white;
}
</style>
