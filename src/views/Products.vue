<template>
  <v-container fluid>
    <v-row>
      <v-col cols="6">
        <v-card>
          <v-card-title>
            All products
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              clearable
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            v-model="productsShow"
            :search="search"
            :headers="headers"
            :items="products"
            item-key="id"
            show-select
            hide-default-footer
            disable-pagination
          >
            <template #header.data-table-select></template>
          </v-data-table>
        </v-card>
      </v-col>
      <v-col cols="6">
        <h3>Products display ({{ productsShow.length }})</h3>
        <li v-for="(item, idx) in productsShow" :key="idx">
          <span class="pa-4 text-capitalize">
            {{ item.name }} (ID: {{ item.id }})</span
          >
          <v-btn icon @click="onRemove(idx)">
            <v-icon color="error">mdi-close</v-icon>
          </v-btn>
        </li>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { sync } from "vuex-pathify";

export default {
  name: "Products",
  data() {
    return {
      singleSelect: false,
      selected: [],
      search: "",
      headers: [
        {
          text: "ID",
          align: "start",
          sortable: false,
          value: "id",
        },
        {
          text: "Name",
          align: "start",
          sortable: false,
          value: "name",
        },
      ],
    };
  },
  watch: {
    productsShow(val) {
      localStorage.setItem("products", JSON.stringify(val));
    },
  },
  computed: {
    products: sync("demo/allProducts"),
    productsShow: sync("demo/productsShow"),
  },
  methods: {
    onRemove(idx) {
      this.productsShow.splice(idx, 1);
    },
  },
};
</script>

<style lang="scss">
@import "src/styles/player";

.video-info {
  margin-top: 2px;
  padding: 12px;
  background-color: $color-secondary;
  color: white;
  justify-items: start;
}

.message {
  padding: 3px;
}
</style>
