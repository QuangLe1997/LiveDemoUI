<template>
  <v-container fluid>
    <v-row class="d-flex align-center pt-2">
      <v-col offset-md="2" class="justify-center">
        <v-pagination
          v-model="currentPage"
          :length="totalPages"
          :total-visible="totalVisible"
          color="secondary"
        ></v-pagination>
      </v-col>
      <v-col cols="12" md="3">
        <div class="text-right font-weight-bold" v-html="pageTitle"></div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    modePage: {
      type: Boolean,
      default: false,
    },
    page: {
      type: Number,
      default: 1,
    },
    actionChangePage: {
      type: String,
      default: "",
    },
    pageSize: {
      type: Number,
      default: 30,
    },
    totalItems: {
      type: Number,
      default: 0,
    },
    params: {
      type: Object,
      default: function () {
        return {};
      },
    },
    totalVisible: {
      type: Number,
      default: 7,
    },
  },
  computed: {
    pageTitle() {
      let start = (this.page - 1) * this.pageSize;
      let end = this.page * this.pageSize;

      if (start === 0) start = 1;
      if (end > this.totalItems) end = this.totalItems;
      return ` <span class='secondary--text'>${start}-${end}</span> / ${this.totalItems}`;
    },
    currentPage: {
      get() {
        return this.page;
      },
      set(val) {
        this.$emit("changePage", (val - 1) * this.pageSize);
        let payload = {
          limit: this.pageSize,
          offset: (val - 1) * this.pageSize,
          ...this.params,
        };
        if (this.modePage) {
          payload.page = val - 1;
          delete payload.offset;
        }
        this.$store.dispatch(this.actionChangePage, payload);
      },
    },
    totalPages() {
      return Math.ceil(this.totalItems / this.pageSize);
    },
  },
};
</script>
