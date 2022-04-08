<template>
  <v-container fluid>
    <div class="my-loading">
      <v-row class="align-center my-icon-loading">
        <ul class="ul">
          <li class="li li-1"></li>
          <li class="li li-2"></li>
          <li class="li li-3"></li>
          <li class="li li-4"></li>
          <li class="li li-5"></li>
          <li class="li li-6"></li>
        </ul>
        <img src="@/assets/vieon.png" height="50px" class="ml-4" />
      </v-row>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "VLoading",
};
</script>

<style scoped lang="scss">
.my-icon-loading {
  position: fixed;
  top: 50%;
  left: 45%;
  z-index: 1000;
}
.my-loading {
  width: 100%;
  height: 100%;
  background-color: white;
  opacity: 1;
  position: absolute;
  z-index: 999;
  img {
    @media screen and (max-width: 1440px) {
      height: 45px !important;
      width: 80px !important;
    }
  }
}
.ul {
  display: flex;
  .li {
    list-style: none;
    width: 10px;
    height: 60px;
    background: #0ad418;
    margin: 0 5px;
    border-radius: 5px;
    @media screen and (max-width: 1440px) {
      width: 8px;
      height: 35px;
    }
  }
  @for $i from 1 through 6 {
    .li-#{$i} {
      animation: move 0.95s ease-in-out $i * 0.1s infinite;
    }
  }
}
@keyframes move {
  0% {
    // height:30px;
    transform: scaleY(1.2);
  }
  75% {
    transform: scaleY(0.7);
  }
  100% {
    transform: scaleY(1);
  }
}
</style>
