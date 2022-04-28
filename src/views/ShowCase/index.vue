<template>
  <div class="container-fluid">
    <div class="row container-showcase align-start justify-space-between">
      <v-col
        cols="12"
        class="wow fadeInLeftBig"
        xl="2"
        lg="3"
        md="4"
        sm="12"
        xs="12"
      >
        <div
          class="topic-showcase mb-12 title"
          :class="selected === 1 ? 'selected' : ''"
          @click="filterShowcase(1)"
        >
          All Showcase
        </div>
        <div
          class="topic-showcase title"
          :class="selected === 2 ? 'selected' : ''"
          @click="filterShowcase(2)"
        >
          Click to buy
        </div>
        <div
          class="topic-showcase title"
          :class="selected === 3 ? 'selected' : ''"
          @click="filterShowcase(3)"
        >
          TVC
        </div>
        <div
          class="topic-showcase title"
          :class="selected === 4 ? 'selected' : ''"
          @click="filterShowcase(4)"
        >
          Banner
        </div>
        <div
          class="topic-showcase title"
          :class="selected === 5 ? 'selected' : ''"
          @click="filterShowcase(5)"
        >
          Live stream
        </div>
      </v-col>
      <v-col cols="12" xl="10" lg="9" md="8" sm="12" xs="12">
        <v-row class="d-flex justify-center">
          <v-col
            class="wow fadeInUp content-show"
            cols="12"
            xl="4"
            lg="5"
            md="8"
            sm="12"
            xs="12"
            v-for="(content, i) in currentShowCase"
            :key="i"
          >
            <v-img
              style="position: relative"
              lazy-src="https://picsum.photos/id/11/10/6"
              :aspect-ratio="16 / 9"
              :id="`img-${i}`"
              class="image-showcase"
              :src="content.imgUrl"
              @click="onDetailPage(content)"
            >
              <img class="play-btn" src="/images/play.svg" />
              <div>
                <h4 class="title-keyword">
                  {{ content.title }}
                </h4>
              </div>
            </v-img>
          </v-col>
        </v-row>
      </v-col>
    </div>
  </div>
</template>

<script>
// import $ from "jquery";
import _ from "lodash";
export default {
  name: "index",
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
    onDetailPage(content) {
      switch (content.type) {
        case 2:
          this.$router.push({ name: "ClickToBuy", query: { ...content } });
          break;
        case 3:
          this.$router.push({ name: "TVCAds", query: { ...content } });
          break;
        case 4:
          this.$router.push({ name: "BannerAds", query: { ...content } });
          break;
        case 5:
          this.$router.push({ name: "LiveStream", query: { ...content } });
          break;
        default:
          return;
      }
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
  // mounted() {
  //   $(".navbar-area").addClass("sticky");
  //   $(".navbar .navbar-brand img").attr("src", "images/logo-2.svg");
  //   $("#home").remove();
  // },
  // beforeDestroy() {
  //   $(".navbar-area").removeClass("sticky");
  //   $(".navbar .navbar-brand img").attr("src", "images/logo.svg");
  // },
};
</script>

<style scoped lang="scss">
.container-showcase {
  margin-top: 100px;
  padding: 30px 30px;
  margin-bottom: 200px;
}
.topic-showcase {
  padding: 12px;
  //border-color: #666666;
  border: 2px #666666 solid;
  //background-color: #666666;
  //background: linear-gradient(to right, #fe8464 0%, #fe6e9a 50%, #fe8464 100%);
  margin-bottom: 6px;
  color: black;
  text-align: center;
  cursor: pointer;
  &.selected {
    background-color: #014122;
    color: white;
    border: none;
    background-image: linear-gradient(314deg, #1e453e 0%, #182c25 74%);

    //background-color: #323232;
    //background: linear-gradient(
    //  to right,
    //  #f1491d 0%,
    //  #f13b72 50%,
    //  #be6750 100%
    //);
  }
  &:hover {
    //background-color: #014122;
    color: white;
    //border: 2px linear-gradient(314deg, #1e4520 0%, #182c25 74%) solid;
    //background-image: linear-gradient(314deg, #21451e 0%, #182c25 74%);
    background-color: #63d471;
    background-image: linear-gradient(315deg, #63d471 0%, #233329 74%);
  }
}
.image-showcase {
  border-radius: 12px;
  -webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
  filter: grayscale(100%);
  &:hover {
    -webkit-filter: grayscale(0); /* Safari 6.0 - 9.0 */
    filter: grayscale(0);
  }
}
.play-btn {
  position: absolute;
  width: 20%;
  height: 20%;
  top: 40%;
  left: 40%;
  &:hover {
    transform: scale(1.2);
    cursor: pointer;
  }
}
.title-keyword {
  font-weight: 400;
  font-size: 20px;
  color: white;
  position: absolute;
  width: 70%;
  bottom: 12px;
  left: 15%;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  pointer-events: none;
}
@media screen and (max-width: 1200px) {
  .title-keyword {
    font-size: 16px !important;
  }
}
@media only screen and (min-width: 576px) and (max-width: 768px) {
  .title-keyword {
    font-size: 20px !important;
  }
}
</style>
