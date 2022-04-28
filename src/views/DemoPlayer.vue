<template>
  <v-container fluid>
    <v-row class="d-flex justify-start align-center">
      <v-col cols="12">
        <v-row class="d-flex align-start justify-start">
          <v-col cols="7">
            <div id="player" class="player-container">
              <video
                controls
                playsinline
                autoplay
                muted
                class="video-play"
                poster="https://scx2.b-cdn.net/gfx/news/2019/galaxy.jpg"
              ></video>
              <div class="ads-container">
                <span
                  v-if="video"
                  style="
                    position: absolute;
                    top: 12px;
                    left: 12px;
                    font-weight: bold;
                    font-size: 14px;
                    color: white;
                  "
                  >H:{{ video.clientHeight }} | W:{{ video.clientWidth }}</span
                >
                <span
                  style="
                    position: absolute;
                    top: 30px;
                    left: 12px;
                    font-weight: bold;
                    font-size: 14px;
                    color: white;
                  "
                  >H:{{ heightVideo }} | W:{{ widthVideo }}</span
                >
                <div v-for="(shop, idxShop) in shops" :key="idxShop">
                  <div
                    class="moving"
                    v-if="shop.buy"
                    :style="{
                      left: shop.x + 'px',
                      top: shop.y + 'px',
                      width: shop.width + 'px',
                      height: shop.height + 'px',
                      border: showRecBoxProd ? '1px solid red' : '',
                    }"
                  >
                    <div
                      @click="onBuyNow(shop.url)"
                      class="buy-now show"
                      @mouseover="onFocusMoving(shop.idStyle)"
                      @mouseleave="onLeaveFocusMoving(shop.idStyle)"
                    ></div>
                    <div
                      v-if="showLabelProd"
                      :class="
                        shop.width > shop.height
                          ? 'name-shop-vertical'
                          : 'name-shop-horizontal'
                      "
                    >
                      {{ shop.name }}
                    </div>
                  </div>
                  <div
                    v-if="showInfoProd"
                    class="info-shop"
                    style="display: none"
                    :id="shop.idStyle"
                  >
                    <div
                      class="line-t-l"
                      v-if="shop.pos === '1'"
                      :style="{
                        left:
                          shop.x -
                          (0.5 * shop.width - (shop.width - shapeLineW)) -
                          shapeLineW * 0.5 -
                          13 +
                          'px',
                        top:
                          shop.y -
                          (0.5 * shop.height - (shop.height - shapeLineH)) -
                          13 +
                          'px',
                        height: shapeLineH + 'px',
                        width: shapeLineW + 'px',
                      }"
                    >
                      <span>{{ shop.infoShow }}</span>
                    </div>
                    <!--        top right-->
                    <div
                      v-if="shop.pos === '2'"
                      class="line-t-r"
                      :style="{
                        left:
                          shop.x +
                          shop.width * 0.5 +
                          shapeLineW * 0.5 +
                          13 +
                          'px',
                        top:
                          shop.y -
                          (0.5 * shop.height - (shop.height - shapeLineH)) -
                          13 +
                          'px',
                        height: shapeLineH + 'px',
                        width: shapeLineW + 'px',
                      }"
                    >
                      <span>{{ shop.infoShow }}</span>
                    </div>
                    <!--        bottom left-->
                    <div
                      v-if="shop.pos === '3'"
                      class="line-b-l"
                      :style="{
                        left:
                          shop.x -
                          (0.5 * shop.width - (shop.width - shapeLineW)) -
                          shapeLineW * 0.5 -
                          13 +
                          'px',
                        top: shop.y + shop.height * 0.5 + +13 + 'px',
                        height: shapeLineH + 'px',
                        width: shapeLineW + 'px',
                      }"
                    >
                      <span>{{ shop.infoShow }}</span>
                    </div>
                    <!--        bottom right-->
                    <div
                      class="line-b-r"
                      v-if="shop.pos === '4'"
                      :style="{
                        left:
                          shop.x +
                          shop.width * 0.5 +
                          shapeLineW * 0.5 +
                          13 +
                          'px',
                        top: shop.y + shop.height * 0.5 + 13 + 'px',
                        height: shapeLineH + 'px',
                        width: shapeLineW + 'px',
                      }"
                    >
                      <span>{{ shop.infoShow }}</span>
                    </div>
                  </div>
                  <!--        top left-->
                </div>
              </div>
            </div>
            <div class="justify-start video-info">
              <v-row no-gutters>
                <h3>Demo Livestream click to buy</h3>
              </v-row>
              <v-row no-gutters class="d-flex justify-start px-lg-3">
                <v-col xl="3" lg="5">
                  <small>Time play : {{ Math.floor(timePlay) }} (s) </small>
                </v-col>
                <v-col xl="3" lg="5">
                  <small v-if="firstTime && timePlay"
                    >Time video :
                    {{
                      new Date(
                        firstTime.getTime() + this.timePlay * 1000
                      ).toLocaleTimeString()
                    }}
                  </small>
                  <small v-else>Time vide: Loading...</small>
                </v-col>
                <v-col xl="3" lg="5">
                  <small v-if="firstTime"
                    >First fragment :
                    {{ new Date(firstTime).toLocaleTimeString() }} (s)</small
                  >
                  <small v-else>First fragment: Loading...</small>
                </v-col>
                <v-col xl="3" lg="5">
                  <small v-if="currentSegment"
                    >Current fragment :
                    {{ new Date(currentSegment).toLocaleTimeString() }}
                    (s)</small
                  >
                </v-col>
                <v-col xl="3" lg="5">
                  <small>Time waitting : {{ this.firstPlay }} </small>
                </v-col>
                <v-col xl="3" lg="5">
                  <small>Num Fragments played : {{ countChange }} </small>
                </v-col>
                <v-col xl="3" lg="5">
                  <small v-if="messages && messages.length > 0">
                    Last boxes:
                    {{
                      new Date(
                        messages[messages.length - 1].timestamp
                      ).toLocaleTimeString()
                    }}
                    (s)</small
                  >
                </v-col>
                <v-col xl="3" lg="5">
                  <small v-if="delayHls">
                    Delay stream:
                    {{ delayHls }}
                    (s)</small
                  >
                </v-col>
              </v-row>
            </div>
          </v-col>
          <v-col class="col-lg-5 col-xl-4">
            <v-card>
              <v-card-title class="secondary">
                <v-row dense class="d-flex justify-space-between align-center">
                  <h5 class="white--text">
                    Meta data stream {{ messages.length }} |
                    {{ systemTime().toLocaleTimeString() }}
                  </h5>
                  <v-menu offset-y left :close-on-content-click="false">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn dark icon v-bind="attrs" v-on="on">
                        <v-icon> mdi-cog</v-icon>
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-text>
                        <v-col>
                          <v-text-field
                            label="Delay time"
                            v-model="delayHlsTempt"
                          />
                          <v-text-field
                            label="Pixel group boxes"
                            v-model="pixelTempt"
                          />
                        </v-col>
                      </v-card-text>
                      <v-card-actions>
                        <v-row no-gutters class="d-flex justify-end">
                          <v-btn
                            color="primary"
                            @click="onUpdateCfg"
                            small
                            shaped
                            >Save
                          </v-btn>
                        </v-row>
                      </v-card-actions>
                    </v-card>
                  </v-menu>
                </v-row>
              </v-card-title>
              <v-card-text class="overflow-y-auto overflow-x-hidden">
                <v-row class="d-flex align-center mt-3 ml-1">
                  <h4>Configs</h4>
                  <v-divider inset />
                </v-row>
                <v-row dense class="d-flex align-center px-6">
                  <v-switch
                    class="ml-3"
                    hide-details
                    dense
                    label="Rec box"
                    :true-value="true"
                    :false-value="false"
                    v-model="showRecBoxProd"
                  ></v-switch>
                  <v-switch
                    class="ml-3"
                    hide-details
                    dense
                    :true-value="true"
                    :false-value="false"
                    v-model="showLabelProd"
                    label="Label"
                  ></v-switch>
                  <v-switch
                    class="ml-3"
                    hide-details
                    dense
                    :true-value="true"
                    :false-value="false"
                    v-model="showInfoProd"
                    label="Price"
                  ></v-switch>
                </v-row>
                <v-row class="d-flex align-center mt-6 mb-4 ml-1">
                  <h4>Products show</h4>
                  <v-btn
                    dark
                    icon
                    color="primary"
                    class="ml-4"
                    @click="$router.push('/products')"
                  >
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>

                  <v-divider inset />
                </v-row>
                <v-row
                  dense
                  class="d-flex align-end justify-start py-3 mt-2 px-6"
                  v-for="(item, index) in allProducts"
                  :key="index"
                  style="
                    background-color: whitesmoke;
                    border-radius: 7px 7px;
                    position: relative;
                  "
                >
                  <v-col lg="2" xl="2">
                    <label>ID: {{ item.id }}</label>
                  </v-col>
                  <v-col lg="7" xl="7">
                    <v-text-field
                      v-model="item.name"
                      hide-details="auto"
                      dense
                      label="Name"
                    ></v-text-field>
                  </v-col>
                  <v-col lg="3" xl="3">
                    <v-text-field
                      v-model="item.price"
                      hide-details="auto"
                      dense
                      label="Price"
                    ></v-text-field>
                  </v-col>
                  <v-col lg="9" xl="9">
                    <v-text-field
                      hide-details="auto"
                      label="Url product"
                      v-model="item.url"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col lg="3" xl="2">
                    <v-switch
                      v-model="item.buy"
                      :true-value="true"
                      :false-value="false"
                      hide-details="auto"
                      dense
                      label="Show"
                    ></v-switch>
                  </v-col>
                  <v-btn
                    icon
                    @click="onRemoveProd(index)"
                    color="error"
                    style="position: absolute; top: 2px; right: 4px"
                  >
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { sync } from "vuex-pathify";
// import axios from "axios";
import Plyr from "plyr";
// import shaka from "shaka-player";
import _ from "lodash";
import Hls from "hls.js";

export default {
  name: "demo",
  data() {
    return {
      offsetTime: 0,
      shapeLineH: 120,
      shoppingHeight: 40,
      shoppingWidth: 40,
      shapeLineW: 130,
      timePlay: null,
      heightVideo: 1,
      widthVideo: 1,
      showIconShopping: true,
      showInfoProd: true,
      showLabelProd: false,
      showRecBoxProd: false,
      shops: [],
      // demo live
      currentSegment: null,
      firstTime: null,
      pixelTempt: null,
      firstClearBoxes: true,
      plyr: null,
      video: null,
      firstPlay: 0,
      delayHlsTempt: 1,
      delayHls: 1,
      countChange: 0,
      source: "http://45.117.162.203:9999/stream/ai-live/playlist.m3u8",
    };
  },
  async created() {
    const start = performance.now();
    const response = await fetch(
      "http://worldtimeapi.org/api/timezone/Asia/Ho_Chi_Minh"
    );
    // Storing response
    let timeObj = await response.json();
    const end = performance.now();
    let trueTime = new Date(timeObj.datetime);
    trueTime.setSeconds(trueTime.getSeconds() + (end - start) / 1000);
    this.offsetTime = (new Date() - trueTime) / 1000;
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    },
    allProducts: sync("demo/productsShow"),
    messages: sync("demo/messages"),
    pixelGroup: sync("demo/pixelGroup"),
  },
  watch: {
    pixelGroup(val) {
      this.pixelTempt = val;
    },
  },
  methods: {
    systemTime() {
      // return new Date();
      return new Date(
        new Date().setSeconds(new Date().getSeconds() - this.offsetTime)
      );
    },
    detectFixedPosition(shop, clientWidth, clientHeight) {
      const center = {
        x: shop.x + shop.width / 2,
        y: shop.y + shop.height / 2,
      };
      if (center.y <= clientHeight / 2 && center.x <= clientWidth / 2)
        return "4"; // top, left => return bottom- right
      if (center.y <= clientHeight / 2 && center.x >= clientWidth / 2)
        return "3"; // top, right => return bottom- left
      if (center.y >= clientHeight / 2 && center.x <= clientWidth / 2)
        return "2"; // bottom, left => return top- right
      if (center.y >= clientHeight / 2 && center.x >= clientWidth / 2)
        return "1"; // bottom, right => return top- left
    },
    getCurrentMessages() {
      // const start = performance.now();
      let currentMsg = [];
      if (this.messages.length === 0 || !this.firstTime) return null;
      let message = this.messages[this.messages.length - 1];
      const markCurr = new Date(
        this.firstTime.getTime() + this.timePlay * 1000
      );
      while (
        message &&
        new Date(message.timestamp - message.process_time) - markCurr <= 0
      ) {
        currentMsg.push(message);
        message = this.messages.pop();
      }
      if (this.firstClearBoxes === true) {
        this.firstClearBoxes = false;
        return [];
      }
      return this.groupBoxes(currentMsg, this.pixelGroup);
    },
    onFocusMoving(idStyle) {
      if (this.showInfoProd) {
        // document.getElementById(idStyle).style.display = "inline";
        console.log("onFocusMoving:", idStyle);
        const boxInfo = document.getElementById(idStyle);
        if (boxInfo) {
          boxInfo.style.removeProperty("display");
          console.log("onFocusMoving Show:", idStyle);
          setTimeout(() => {
            this._triggerTurnOff(idStyle);
          }, 100);
        }
      }
    },
    _triggerTurnOff(idStyle) {
      console.log("_trigerTurnOff:", idStyle);
      if (this.showInfoProd) {
        setTimeout(() => {
          const boxInfo = document.getElementById(idStyle);
          if (boxInfo) {
            boxInfo.remove();
            console.log("_trigerTurnOff REMOVED:", idStyle);
          } else {
            console.log("_trigerTurnOff REMOVE NOT FOUND:", idStyle);
          }
        }, 1000);
      }
    },
    onLeaveFocusMoving(idStyle) {
      console.log("onLeaveFocusMoving:", idStyle);
      if (this.showInfoProd) {
        setTimeout(() => {
          const boxInfo = document.getElementById(idStyle);
          if (boxInfo) {
            boxInfo.remove();
            console.log("onLeaveFocusMoving REMOVED:", idStyle);
          } else {
            console.log("onLeaveFocusMoving REMOVE NOT FOUND:", idStyle);
          }
        }, 1000);
      }
    },
    onBuyNow(url) {
      window.open(url, "_blank");
    },
    async onUpdateCfg() {
      this.delayHls = Number(this.delayHlsTempt);
      this.pixelGroup = Number(this.pixelTempt);
    },
    groupBoxes(allMsg, range_center) {
      // const start = performance.now();
      let allBoxes = [];
      for (const msg of allMsg) {
        allBoxes = allBoxes.concat(msg.data);
      }
      let grouped = _.mapValues(_.groupBy(allBoxes, "id"), (clist) =>
        clist.map((box) => _.omit(box, "id"))
      );
      const isSameBoxes = (box1, box2) => {
        const center1 = [box1.x + box1.w / 2, box1.y + box1.h / 2];
        const center2 = [box2.x + box2.w / 2, box2.y + box2.h / 2];
        const diff_center = Math.sqrt(
          (center2[0] - center1[0]) ** 2 + (center2[1] - center1[1]) ** 2
        );
        return (
          diff_center <= range_center * ((box1.w + box2.w) / 2) &&
          Math.abs(box1.w * box1.h - box1.w * box1.h) < 100
        );
      };
      let boxedUnique = [];
      for (const [idBx, boxData] of Object.entries(grouped)) {
        let j = 1;
        let i = 0;
        let boxGrp = [];
        while (boxData && i < boxData.length && j < boxData.length - 1) {
          try {
            if (isSameBoxes(boxData[i], boxData[j])) {
              j = j + 1;
            } else {
              boxGrp.push({
                ...boxData[i],
                id: Number(idBx),
              });
              i = j;
              j = i + 1;
            }
          } catch (e) {
            console.log("err, ", e);
          }
        }
        if (boxGrp.length === 0) {
          boxGrp.push({
            ...boxData[0],
            id: Number(idBx),
          });
        }
        boxedUnique = boxedUnique.concat(boxGrp);
      }
      return boxedUnique;
    },
    onRemoveProd(idx) {
      this.allProducts.splice(idx, 1);
    },
  },
  mounted() {
    this.pixelTempt = this.pixelGroup;
    let video = document.querySelector("video");
    video.src = this.source;
    const updateAdsPosition = () => {
      // const start = performance.now();
      const messages = this.getCurrentMessages();
      let products = [];
      if (messages && messages.length > 0) {
        let videoWidth = this.video.clientWidth;
        let videoHeight = this.video.clientHeight;
        let i = 0;
        for (let box of messages) {
          if (box.id.toString()) {
            let x = (box.x * videoWidth) / this.widthVideo;
            let y = (box.y * videoHeight) / this.heightVideo;
            let width = (box.w * videoWidth) / this.widthVideo;
            let height = (box.h * videoHeight) / this.heightVideo;
            const infoProduct = _.filter(this.allProducts, {
              id: box.id,
              buy: true,
            });
            if (infoProduct.length > 0) {
              products.push({
                x,
                y,
                width,
                height,
                id: `${i}-${box.id}`,
                showPrice: false,
                idStyle: `box-${i}-${box.id}-${x}-${y}`,
                name: infoProduct[0].name || box.id,
                infoShow: `${infoProduct[0].name} - ${infoProduct[0].price}$`,
                url: infoProduct[0].url || "#",
                buy: infoProduct[0].buy || true,
                price: infoProduct[0].price || "#$",
                pos: this.detectFixedPosition(
                  { x, y, width, height },
                  videoWidth,
                  videoHeight
                ),
              });
            }
          }
          i += 1;
        }
      }

      this.shops = products;
      // console.log("updateAdsPosition: ", performance.now() - start);
    };
    video.addEventListener("timeupdate", () => {
      if (this.firstTime !== null) {
        this.timePlay = this.video.currentTime - this.firstPlay + this.delayHls;
        updateAdsPosition();
      }
    });
    this.plyr = new Plyr(video, {
      captions: { active: true, update: true, language: "en" },
    });
    const domPlayerContainer = document.querySelector(".player-container");
    const domAdsContainer = document.querySelector(".ads-container");
    domPlayerContainer.removeChild(domAdsContainer);
    this.plyr.elements.container.appendChild(domAdsContainer);
    if (Hls.isSupported()) {
      let hls = new Hls();
      hls.attachMedia(video);
      hls.on(Hls.Events.MEDIA_ATTACHED, () => {
        hls.loadSource(this.source);
        hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
          video.play();
          const dataLever = data.levels[0];
          this.widthVideo = dataLever.width;
          this.heightVideo = dataLever.height;
          console.log("hls data", data);
        });
        hls.on(Hls.Events.FRAG_CHANGED, (event, data) => {
          if (this.countChange === 1) {
            this.firstTime = data.frag.programDateTime;
            this.firstPlay = this.video.currentTime;
          }
          this.countChange = this.countChange += 1;
          this.currentSegment = data.frag.programDateTime;
        });
      });
    }
    this.video = video;
  },
};
</script>

<style lang="scss">
@import "src/styles/player";
@import "https://cdn.plyr.io/3.4.7/plyr.css";

.video-info {
  margin-top: 2px;
  padding: 12px;
  background-color: $color-secondary;
  color: white;
  justify-items: start;
  border-radius: 5px;
}

.message {
  padding: 3px;
  width: 100%;
  display: inline;
  justify-content: center;
}

.video-player {
  --plyr-color-main: $color-primary !important;
}
.test-line {
  position: absolute;
  z-index: 999;
  background-color: yellow;
}
</style>
