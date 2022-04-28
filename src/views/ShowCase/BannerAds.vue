<template>
  <div class="container-fluid">
    <div class="row container-showcase align-start justify-space-between">
      <v-col cols="12" class="wow fadeInLeftBig col-lg-7 col-xl-7">
        <div class="video-container">
          <video controls width="100%" :poster="imgUrl">
            <source
              src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          <div class="area-btn">
            <v-btn
              style="
                position: absolute;
                background-color: red;
                top: 2px;
                right: 2px;
                z-index: 99;
              "
            >
              Ads
            </v-btn>
          </div>
        </div>
        <h4 class="mt-2">Demo show banner ads - {{ title }}</h4>
      </v-col>
      <v-col cols="12" class="wow fadeInRightBig col-xl-5 col-lg-5">
        <v-card width="100%" height="520px"></v-card>
      </v-col>
    </div>
  </div>
</template>

<script>
export default {
  name: "BannerAds",
  props: {
    title: String,
    contentId: String,
    imgUrl: String,
  },
};
</script>

<style scoped>
.video-container {
  position: relative;
}
</style>
