<template>
  <div class="container-fluid">
    <div class="row container-showcase align-start justify-space-between">
      <v-col
        cols="12"
        class="wow fadeInLeftBig col-lg-7 col-xl-7"
        style="position: relative"
      >
        <div id="player" class="player-container">
          <video
            controls
            playsinline
            autoplay
            muted
            class="video-play"
            :poster="imgUrl"
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
              >HCV:{{ video.clientHeight }} | WCV:{{ video.clientWidth }}</span
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
              >HV:{{ heightVideo }} | WV:{{ widthVideo }}</span
            >
            <div v-for="(shop, idxShop) in shops" :key="idxShop">
              <div
                class="movingElement"
                :style="{
                  left: shop.x + 'px',
                  top: shop.y + 'px',
                  width: shop.width + 'px',
                  height: shop.height + 'px',
                  border: showRecBoxProd ? '1px solid red' : '',
                }"
                @mouseover="showShopping(`btn-${shop.id}`)"
                @mouseleave="hideShopping(`btn-${shop.id}`)"
              >
                <div @click="onBuyNow(shop.url)" class="buy-now show"></div>
              </div>
              <div v-show="showInfoProd" :id="shop.idStyle">
                <!--                text info-->
                <div
                  class="fixedElement"
                  style="
                    position: absolute;
                    color: white;
                    pointer-events: all;
                    display: block;
                  "
                  :style="{
                    left: shop.textData.x + 'px',
                    top: shop.textData.y + 'px',
                    height: heightText + 'px',
                  }"
                >
                  <div id="wrapperDiv" class="wow wrapper">
                    <div
                      class="box-line"
                      style="
                        border-color: rgb(250, 250, 250);
                        visibility: inherit;
                        opacity: 1;
                        transform: matrix(1, 0, 0, 1, 0, 0);
                        transform-origin: left 50% 0;
                      "
                    ></div>
                    <div
                      class="mainTag"
                      style="
                        color: rgb(34, 34, 34);
                        visibility: inherit;
                        opacity: 1;
                      "
                    >
                      <div class="mainInfo">
                        <h2 style="color: white">{{ shop.name }}</h2>
                      </div>
                    </div>
                  </div>
                </div>
                <!--                lineAnimate-->
                <div
                  class="lineElement"
                  :style="{
                    left: shop.lineData.x + 'px',
                    top: shop.lineData.y + 'px',
                    height: '1px',
                    width: shop.lineData.width + 'px',
                    transform: 'rotate(' + shop.lineData.rotate + 'deg)',
                  }"
                >
                  <div class="animate-line"></div>
                </div>
              </div>
              <!--        top left-->
            </div>
          </div>
        </div>
        <h4 class="mt-2">Demo Click to buy - {{ title }}</h4>
        <div
          v-if="!showPrPanel"
          class="wow show-panel fadeInLeft"
          @click="showPrPanel = true"
        >
          <span class="icon-show">Product panel</span>
          <svg
            width="40"
            height="150"
            viewBox="0 0 40 150"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 150C22.0914 150 40 132.091 40 110L40 0H0L0 150V150Z"
              fill="#595959"
            />
          </svg>
        </div>
      </v-col>
      <transition name="slide-fade">
        <v-col
          v-if="showPrPanel"
          cols="12"
          class="wow fadeInRight col-xl-5 col-lg-5 mt-lg-0 mt-md-12 mt-sm-12 mt-xs-12"
          style="position: relative"
        >
          <v-card width="100%" height="520px" style="z-index: 2">
            <v-card-text>
              <div
                v-if="shops.length > 0"
                class="pa-xl-6 pa-lg-4"
                style="max-height: 500px; overflow-y: auto"
              >
                <div
                  class="wow fadeInUp row mb-2"
                  v-for="(shop, idx) in shops"
                  :key="idx"
                  :id="`btn-${shop.id}`"
                >
                  <div class="col-4" style="z-index: 4">
                    <v-img :src="shop.image"></v-img>
                  </div>
                  <div class="col-8">
                    <span class="title"
                      >{{ shop.name }} | {{ shop.description }}</span
                    >
                    <br />
                    <span class="price-new mr-2">{{ shop.priceNew }}</span>
                    <span class="price-old">{{ shop.priceOld }}</span>
                    <span>{{ shop.discount }}</span>
                    <br />
                    <v-btn
                      class="wow delay-1s fadeInLeftBig mt-3 button-buy"
                      color="#323232"
                      >Mua hàng</v-btn
                    >
                  </div>
                </div>
              </div>
              <div v-else style="text-align: center; justify-content: center">
                <span>No product in video</span>
              </div>
            </v-card-text>
          </v-card>
          <div class="wow delay-1s fadeInUpBig close-panel">
            <div class="title-panel-close justify-space-between">
              <span class="mr-4">Product panel</span>
              <v-icon right color="white" @click="showPrPanel = false" class=""
                >mdi-close</v-icon
              >
            </div>
            <svg
              width="200"
              height="40"
              viewBox="0 0 200 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 40C0 17.9086 17.9086 0 40 0L200 0V40H0V40Z"
                fill="#595959"
              />
            </svg>
          </div>
        </v-col>
      </transition>
    </div>
  </div>
</template>

<script>
import { playerShowcase } from "../../minxin/player-showcase";

export default {
  name: "ClickToBuy",
  mixins: [playerShowcase],
  data() {
    return {
      showIconShopping: true,
      showInfoProd: true,
      showLabelProd: false,
      showRecBoxProd: false,
      showPrPanel: true,
    };
  },
  methods: {
    showShopping(id) {
      this.showInfoProd = true;
      const btnBuy = document.getElementById(id);
      if (btnBuy) {
        this.$nextTick(() => {
          btnBuy.classList.add("focusProduct");
        });
      }
      setTimeout(() => {
        if (btnBuy) {
          btnBuy.classList.remove("focusProduct");
        }
      }, 4000);
    },
    hideShopping(id) {
      const btnBuy = document.getElementById(id);
      if (btnBuy) {
        this.$nextTick(() => {
          btnBuy.classList.remove("focusProduct");
        });
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "https://cdn.plyr.io/3.6.7/plyr.css";
@import "../../styles/player.scss";
@import "../../styles/new_tag.scss";

.text-info-meta {
  position: absolute;
  padding: 1px 8px;
  background-color: white;
  color: black;
  max-width: 250px;
  align-content: center;
  text-align: center;
  justify-content: center;
  opacity: 0.8;
}
.lineElement {
  position: absolute;
  height: 1px;
  transform-origin: 0 50%;
}
.animate-line {
  height: 100%;
  width: 100%;
  position: absolute;
  right: 0;
  background-color: #fff;
  transition-delay: 0.5s;
  animation: lineExpand 0.5s ease-in-out;
  -webkit-animation: lineExpand 0.5s ease-in-out;
  box-shadow: 0 0 2px #000;
}
.price-new {
  font-weight: bold;
  color: #d0021c;
  font-size: 17px;
}
.price-old {
  color: #666;
  font-size: 16px;
  text-decoration-line: line-through;
}
@keyframes fixedFadeIn {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes widthStretch {
  from {
    width: 0;
    background: 0 0;
  }
  to {
    width: 100%;
    background: #fff;
  }
}

@keyframes shimmer {
  0% {
    background-position: top left;
  }
  15% {
    background-position: top right;
  }
  30% {
    background-position: top left;
  }
  100% {
    background-position: top left;
  }
}

.button-buy {
  color: white;
  text-transform: none;
  z-index: 3;
  &:hover {
    background-color: white !important;
    color: black;
    border: 1px black solid;
  }
}
.focusProduct {
  border: 1px black solid;
}
</style>
