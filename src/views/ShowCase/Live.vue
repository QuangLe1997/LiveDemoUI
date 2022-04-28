<template>
  <div class="container-fluid">
    <div class="row container-showcase align-start justify-space-between">
      <v-col cols="12" class="wow fadeInLeftBig col-lg-7 col-xl-7">
        <video controls width="100%" :poster="imgUrl">
          <source
            src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <h4 class="mt-2">Demo livestream - {{ title }}</h4>
      </v-col>
      <v-col cols="12" class="wow fadeInRightBig col-xl-5 col-lg-5">
        <v-card width="100%" height="520px"></v-card>
      </v-col>
    </div>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  name: "Live",
  props: {
    title: String,
    contentId: String,
    imgUrl: String,
  },
  data() {
    return {
      selected: 1,
      contentShowcase: [
        //  show case 2
        {
          content_id: "1",
          type: 2,
          title: "Bác sĩ nha khoa",
          imgUrl:
            "https://static.vieon.vn/vieplay-image/thumbnail_v4/2022/04/08/sdkqmjff_25811e033f2d7cedbe5e94cbcf2fddf151.jpg?t=1212",
        },
        {
          content_id: "1",
          type: 2,
          title: "Võ Mỵ nương",
          imgUrl:
            "https://static.vieon.vn/vieplay-image/thumbnail_v4/2022/04/11/frrseiip_53.jpg?t=1212",
        },
        {
          content_id: "1",
          type: 2,
          title: "Show case 3",
          imgUrl:
            "https://static.vieon.vn/vieplay-image/thumbnail_v4/2021/12/31/zdycfgpv_ep16bmaster.jpg?t=1212",
        },
        {
          content_id: "1",
          type: 2,
          title: "Show case 4",
          imgUrl:
            "https://static2.vieon.vn/vieplay-image/thumbnail_v4/2021/01/05/iq1bdgtk_7-thi-the_horizontal-thumbnail-png_296_168.jpg?t=1212",
        },
        {
          content_id: "1",
          type: 2,
          title: "Show case 4",
          imgUrl:
            "https://static2.vieon.vn/vieplay-image/thumbnail_v4/2021/01/05/wu25kz3z_an-than_horizontal-thumbnail_296_168.jpg?t=1212",
        },
        {
          content_id: "1",
          type: 2,
          title: "Show case 4",
          imgUrl:
            "https://static2.vieon.vn/vieplay-image/thumbnail_v4/2021/02/09/twi2p7hp_1920x1080behavantue_296_168.jpg?t=1212",
        },
        //  show case 3
        {
          content_id: "1",
          type: 3,
          title: "Show case 4",
          imgUrl:
            "https://static2.vieon.vn/vieplay-image/thumbnail_v4/2021/02/09/5w66a97o_1920x1080chosan_296_168.jpg?t=1212",
        },
        {
          content_id: "1",
          type: 3,
          title: "Show case 4",
          imgUrl:
            "https://static2.vieon.vn/vieplay-image/thumbnail_v4/2020/12/25/b60c7rjz_1920x1080-cunconsieuquay_296_168.jpg?t=1212",
        },
        {
          content_id: "1",
          type: 3,
          title: "Show case 4",
          imgUrl:
            "https://static2.vieon.vn/vieplay-image/thumbnail_v4/2020/12/24/y1q77txs_1920x1080-diepvukep_296_168.jpg?t=1212",
        },
        {
          content_id: "1",
          type: 3,
          title: "Show case 4",
          imgUrl:
            "https://static2.vieon.vn/vieplay-image/thumbnail_v4/2021/02/09/t6ftcjpe_1920x1080nannhanhoisinh_296_168.jpg?t=1212",
        },
        {
          content_id: "1",
          type: 3,
          title: "Show case 4",
          imgUrl:
            "https://static2.vieon.vn/vieplay-image/thumbnail_v4/2021/01/05/iq1bdgtk_7-thi-the_horizontal-thumbnail-png_296_168.jpg?t=1212",
        },
        //  show case 4
        {
          content_id: "1",
          type: 4,
          title: "Show case 4",
          imgUrl:
            "https://static2.vieon.vn/vieplay-image/thumbnail_v4/2021/01/05/wu25kz3z_an-than_horizontal-thumbnail_296_168.jpg?t=1212",
        },
        {
          content_id: "1",
          type: 4,
          title: "Show case 4",
          imgUrl:
            "https://static2.vieon.vn/vieplay-image/thumbnail_v4/2021/02/09/twi2p7hp_1920x1080behavantue_296_168.jpg?t=1212",
        },
        {
          content_id: "1",
          type: 4,
          title: "Show case 4",
          imgUrl:
            "https://static2.vieon.vn/vieplay-image/thumbnail_v4/2021/02/09/5w66a97o_1920x1080chosan_296_168.jpg?t=1212",
        },
        {
          content_id: "1",
          type: 4,
          title: "Show case 4",
          imgUrl:
            "https://static2.vieon.vn/vieplay-image/thumbnail_v4/2020/12/25/b60c7rjz_1920x1080-cunconsieuquay_296_168.jpg?t=1212",
        },
        //  show case 5
        {
          content_id: "1",
          type: 5,
          title: "Show case 4",
          imgUrl:
            "https://static2.vieon.vn/vieplay-image/thumbnail_v4/2020/12/24/y1q77txs_1920x1080-diepvukep_296_168.jpg?t=1212",
        },
        {
          content_id: "1",
          type: 5,
          title: "Show case 4",
          imgUrl:
            "https://static2.vieon.vn/vieplay-image/thumbnail_v4/2021/02/09/t6ftcjpe_1920x1080nannhanhoisinh_296_168.jpg?t=1212",
        },
        {
          content_id: "1",
          type: 5,
          title: "Show case 4",
          imgUrl:
            "https://static2.vieon.vn/vieplay-image/thumbnail_v4/2020/12/25/b60c7rjz_1920x1080-cunconsieuquay_296_168.jpg?t=1212",
        },
      ],
    };
  },
  methods: {
    filterShowcase(index) {
      this.selected = index;
    },
  },
  computed: {
    currentShowCase() {
      if (this.selected === 1) {
        return this.contentShowcase;
      } else {
        return _.filter(this.contentShowcase, { type: this.selected });
      }
    },
  },
};
</script>

<style scoped lang="scss"></style>
