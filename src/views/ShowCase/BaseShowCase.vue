<template>
  <router-view></router-view>
</template>

<script>
import $ from "jquery";

export default {
  name: "BaseShowCase",
  mounted() {
    $(".navbar-area").addClass("sticky");
    $(".navbar .navbar-brand img").attr("src", "/images/logo-2.svg");
    $("#home").remove();
  },
  beforeDestroy() {
    $(".navbar-area").removeClass("sticky");
    $(".navbar .navbar-brand img").attr("src", "images/logo.svg");
  },
};
</script>

<style>
.container-showcase {
  margin-top: 100px;
  padding: 30px 30px;
  margin-bottom: 200px;
}
video {
  width: 100%;
  height: auto !important;
}
</style>
