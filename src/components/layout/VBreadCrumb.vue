<template>
  <v-col cols="12" :key="titlePage" class="beard-crumb">
    <v-row no-gutters class="d-flex align-start">
      <span class="text-h5">{{ titlePage }}</span>
    </v-row>
    <v-row class="breadCrumbs" no-gutters>
      <v-breadcrumbs :items="breadCrumbs">
        <template v-slot:item="{ item }">
          <v-breadcrumbs-item
            :to="item.to"
            class="text-subtitle-2 crumb-item"
            :disabled="item.disabled"
            exact
          >
            {{ item.text }}
          </v-breadcrumbs-item>
        </template>
      </v-breadcrumbs>
    </v-row>
  </v-col>
</template>
<script>
export default {
  name: "VBreadCrumb",
  computed: {
    breadCrumbs() {
      if (typeof this.$route.meta.breadCrumb === "function") {
        return this.$route.meta.breadCrumb.call(this, this.$route);
      }
      return this.$route.meta.breadCrumb;
    },
    titlePage() {
      return this.$route.meta.title;
    },
  },
};
</script>
<style>
.breadCrumbs {
  margin-top: 2px;
}
.v-breadcrumbs {
  padding: 2px 4px !important;
}
</style>
