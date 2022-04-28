import _ from "lodash";
import Plyr from "plyr";
import Hls from "hls.js";
import itvPhone from "@/assets/data/itv_phone.json";
import mappingData from "@/assets/data/mapping.json";

let playerShowcase = {
  props: {
    title: String,
    contentId: String,
    imgUrl: String,
  },
  data() {
    return {
      timePlay: null,
      firstUpdate: true,
      heightVideo: 1,
      widthVideo: 1,
      shops: [],
      dataItv: [],
      mappingData: {},
      duration: 0,
      // demo live
      plyr: null,
      video: null,
      source: null,
      heightText: 30,
    };
  },
  async created() {
    await Promise.all([
      this.fetchHls(),
      this.fetchDataItvShowCase(),
      this.FetchMappingMeta(),
    ]);
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    },
  },
  methods: {
    async fetchHls() {
      this.source =
        "https://playlist-vip.vieon.vn/playlist/content/vieon/441e89f7-6f86-4399-a60a-630a6fdcb7a1/1651116450000/27ff97848702399dc9a6d877c84607e4/playlist.m3u8?user_type=1&platform=web&sn=hni-vtt-002&rid=8";
    },
    async fetchDataItvShowCase() {
      this.dataItv = itvPhone;
    },
    async FetchMappingMeta() {
      this.mappingData = mappingData;
    },
    detectFixedPosition(shop, clientWidth, clientHeight) {
      const center = {
        x: shop.x + shop.width / 2,
        y: shop.y + shop.height / 2,
      };
      if (center.y <= clientHeight / 2 && center.x <= clientWidth / 2) {
        console.log(
          `4 | x${center.x} y${center.y} CH2${clientHeight / 2} CW2${
            clientWidth / 2
          }`
        );
        return "4"; // top, left => return bottom- right
      }

      if (center.y <= clientHeight / 2 && center.x >= clientWidth / 2) {
        console.log(
          `3 | x${center.x} y${center.y} CH2${clientHeight / 2} CW2${
            clientWidth / 2
          }`
        );
        return "3"; // top, right => return bottom- left
      }

      if (center.y >= clientHeight / 2 && center.x <= clientWidth / 2) {
        console.log(
          `2 | x${center.x} y${center.y} CH2${clientHeight / 2} CW2${
            clientWidth / 2
          }`
        );
        return "2"; // bottom, left => return top- right
      }
      if (center.y >= clientHeight / 2 && center.x >= clientWidth / 2) {
        console.log(
          `1 | x${center.x} y${center.y} CH2${clientHeight / 2} CW2${
            clientWidth / 2
          }`
        );
        return "1"; // bottom, right => return top- left
      }
    },
    getCurrentMessages() {
      let res = [];
      if (this.timePlay) {
        const messages =
          _.filter(this.dataItv, (o) => {
            return o["itv"][0] <= this.timePlay && o["itv"][1] >= this.timePlay;
          }) || [];
        for (let message of messages) {
          for (const box of message.data) {
            res.push({
              ...box,
              pos: this.detectFixedPosition(
                box,
                this.widthVideo,
                this.heightVideo
              ),
            });
          }
        }
      }
      return res;
    },
    onLeaveFocusMoving(idStyle) {
      console.log("onLeaveFocusMoving:", idStyle);
      setTimeout(() => {
        const boxInfo = document.getElementById(idStyle);
        if (boxInfo) {
          boxInfo.remove();
          console.log("onLeaveFocusMoving REMOVED:", idStyle);
        } else {
          console.log("onLeaveFocusMoving REMOVE NOT FOUND:", idStyle);
        }
      }, 1000);
    },
    onBuyNow(url) {
      window.open(url, "_blank");
    },
    groupBoxes(allMsg, range_center) {
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
    calculatePosText(box) {
      const posBoxCenter = {
        x: box.x + box.width / 2,
        y: box.y + box.height / 2,
      };
      console.log(posBoxCenter);
      console.log(box);
      switch (box.pos) {
        case "4":
          return {
            x: posBoxCenter.x + 0.15 * this.video.clientWidth,
            y: posBoxCenter.y + 0.25 * this.video.clientHeight,
            height: this.heightText,
          };
        case "3":
          return {
            x: posBoxCenter.x - 0.15 * this.video.clientWidth,
            y: posBoxCenter.y + 0.25 * this.video.clientHeight,
            height: this.heightText,
          };
        case "2":
          return {
            x: posBoxCenter.x + 0.15 * this.video.clientWidth,
            y: posBoxCenter.y - 0.25 * this.video.clientHeight,
            height: this.heightText,
          };
        case "1":
          return {
            x: posBoxCenter.x - 0.15 * this.video.clientWidth,
            y: posBoxCenter.y - 0.25 * this.video.clientHeight,
            height: this.heightText,
          };
        default:
          return null;
      }
    },
    callRotate(A, C) {
      /*
      b là trung tâm button mua hàng, a là điểm đầu tiên mục show thông tin
      c= (a.x+ ab, a.y)
      "a,b ,c là tam giác cân, a là điểm đầu nối đầu tiên của mục thông tin hiển thị," +
        "b là điểm cuối của mục thông tin hiển thị, c là nút click mua hàng," +
        " hàm cần tính góc xoay từ cạnh ab để được cạnh ac"
      * */
      //    tính cạnh bc , ab=ac
      const b = Math.sqrt((A.x - C.x) ** 2 + (A.y - C.y) ** 2);
      const B = { x: A.x + b, y: A.y };
      const c = b;
      const a = Math.sqrt((B.x - C.x) ** 2 + (B.y - C.y) ** 2);
      const cosA = (b ** 2 + c ** 2 - a ** 2) / (2 * b * c);
      let aDeg = Math.abs(Math.acos(cosA) * 57.2957795);
      //  Xem A là gốc xoay nếu c nằm dưới a thì quay theo chiều kim đồng hộ, c nằm trên thì ngược lại
      if (C.y > A.y) {
        return aDeg;
      } else {
        return -aDeg;
      }
    },
    calLineAnimate(posTex, box) {
      const posBoxCenter = {
        x: box.x + box.width / 2,
        y: box.y + box.height / 2,
      };
      let distance =
        Math.sqrt(
          (posBoxCenter.x - posTex.x) ** 2 + (posBoxCenter.y - posTex.y) ** 2
        ) - 18;
      let rotate = this.callRotate(posTex, posBoxCenter);
      let x = posTex.x;
      let y = posTex.y;
      return { width: distance, rotate: rotate, x: x, y: y };
    },
  },
  mounted() {
    let video = document.querySelector("video");
    const domPlayerContainer = document.querySelector(".player-container");
    const domAdsContainer = document.querySelector(".ads-container");
    domPlayerContainer.removeChild(domAdsContainer);
    video.src = this.source;
    const updateAdsPosition = () => {
      const messages = this.getCurrentMessages();
      let index = 0;
      for (let oldShop of this.shops) {
        let updateShop = _.find(messages, { id: oldShop.id });
        if (updateShop) {
          const clientW = this.video.clientWidth;
          const clientH = this.video.clientHeight;
          oldShop.x = (updateShop.x * clientW) / this.widthVideo;
          oldShop.y = (updateShop.y * clientH) / this.heightVideo;
          oldShop.width = (updateShop.width * clientW) / this.widthVideo;
          oldShop.height = (updateShop.height * clientH) / this.heightVideo;
          // oldShop.pos = this.detectFixedPosition(oldShop, clientW, clientH);
          // if (oldShop.pos !== updateShop.pos) {
          //   oldShop.pos = updateShop.pos;
          //   oldShop.textData = this.calculatePosText(oldShop);
          // }
          oldShop.lineData = this.calLineAnimate(oldShop.textData, oldShop);
          // if (oldShop.lineData.width > 0.4 * clientW) {
          //   oldShop.textData = this.calculatePosText(oldShop);
          //   oldShop.lineData = this.calLineAnimate(oldShop.textData, oldShop);
          // }
          _.remove(messages, { id: oldShop.id });
        } else {
          this.shops.splice(index, 1);
        }
        index += 1;
      }
      for (const message of messages) {
        const infoShop =
          _.find(this.mappingData, {
            id: message.id,
          }) || {};
        const clientW = this.video.clientWidth;
        const clientH = this.video.clientHeight;
        let x = (message.x * clientW) / this.widthVideo;
        let y = (message.y * clientH) / this.heightVideo;
        let width = (message.width * clientW) / this.widthVideo;
        let height = (message.height * clientH) / this.heightVideo;
        let pos = message.pos;
        const textData = this.calculatePosText({
          x: x,
          y: y,
          width: width,
          height: height,
          pos: pos,
        });
        const newShop = {
          x: x,
          y: y,
          width: width,
          height: height,
          pos: pos,
          textData: textData,
          lineData: this.calLineAnimate(textData, { x: x, y: y, pos: pos }),
          ...infoShop,
        };
        this.shops.push(newShop);
      }
    };
    video.addEventListener("timeupdate", () => {
      this.timePlay = this.video.currentTime;
      updateAdsPosition();
      if (video.duration && !this.duration) {
        this.duration = video.duration;
        for (let i = 0; i < this.dataItv.length; i++) {
          let marker = document.createElement("div");
          marker.classList.add("marker");
          marker.style.left = `${
            (this.dataItv[i]["itv"][0] * 100) / this.duration
          }%`;
          progressBarElm.appendChild(marker);
        }
        this.firstUpdate = false;
      }
    });
    this.plyr = new Plyr(video, {
      captions: { active: true, update: true, language: "en" },
    });
    this.plyr.elements.container.appendChild(domAdsContainer);
    let progressBarElm = document.querySelector(".plyr__progress");
    if (Hls.isSupported()) {
      let hls = new Hls();
      hls.attachMedia(video);
      hls.on(Hls.Events.MEDIA_ATTACHED, () => {
        hls.loadSource(this.source);
      });
      hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
        video.play();
        const dataLever = data.levels[data.levels.length - 1];
        this.widthVideo = dataLever.width;
        this.heightVideo = dataLever.height;
      });
    }
    this.video = video;
  },
};
export { playerShowcase };
