<template>
  <v-app class="app">
    <router-view />
  </v-app>
</template>

<script>
import { io } from "socket.io-client";
import { sync } from "vuex-pathify";

export default {
  name: "App",
  data() {
    return {};
  },
  async created() {
    await Promise.all([this.fetch_config(), this.fetch_messages()]);
  },
  computed: {
    productsShow: sync("demo/productsShow"),
    pixelGroup: sync("demo/pixelGroup"),
    timeCfgDelay: sync("demo/timeCfgDelay"),
    messages: sync("demo/messages"),
    products: sync("demo/products"),
    hlsUrl: sync("demo/hlsUrl"),
    delayTime: sync("demo/delayTime"),
    hlsStart: sync("demo/hlsStart"),
    rtmpStart: sync("demo/rtmpStart"),
    workerStart: sync("demo/workerStart"),
  },
  methods: {
    handleMsg(data) {
      // console.log("add msg", data.coords);
      const itemMeta = {
        data: data.detections,
        process_time: data.process_time,
        timestamp: data.timestamp,
      };
      this.messages.unshift(itemMeta);
      // console.log(this.messages);
    },
    async fetch_config() {
      console.log("start fetch config");
      const response = await fetch(
        `http://${process.env.VUE_APP_API_BASE_URL}/api/live/config-data`
      );
      // Storing response
      let data = await response.json();
      console.log(data.result);
      this.hlsUrl = data.result.hls_url;
      this.delayTime = data.result.delay;
      this.hlsStart = data.result.hls_start;
      this.rtmpStart = data.result.rtmp_start;
      this.workerStart = data.result.worker_start;
      this.pixelGroup = data.result.group_pixel;
      this.timeCfgDelay = data.result.delay_buff;
      console.log("end fetch config: ", data);
    },
    async fetch_messages() {
      console.log("start fetch message");
      const response = await fetch(
        `http://${process.env.VUE_APP_API_BASE_URL}/api/live/messages`
      );
      // Storing response
      let data = await response.json();
      console.log(data.result);
      const messages = data.result.messages;
      for (const msg of messages) {
        const itemMeta = {
          data: msg.detections,
          process_time: msg.process_time,
          timestamp: msg.timestamp,
        };
        this.messages.push(itemMeta);
        // this.handleMsg(msg);
      }
      // this.messages = data.result.messages;
      console.log("end fetch message:", this.messages.length);
    },
  },
  mounted() {
    const socket = io(`ws://${process.env.VUE_APP_API_BASE_URL}`, {
      path: "/ws/socket.io/",
      transports: ["websocket", "polling"],
    });
    socket.on("message", (data) => {
      this.handleMsg(data);
    });
    socket.on("time_info", (data) => {
      console.log("time info worker start", data);
    });
    socket.on("products", (data) => {
      console.log("on products", data);
      this.products = data;
    });
    socket.on("config", (data) => {
      console.log("on config", data);
      this.pixelGroup = Number(data.group_pixel);
      this.delayTime = Number(data.delay);
      this.timeCfgDelay = Number(data.delay_buff);
    });
    if (this.productsShow.length === 0) {
      const prods = localStorage.getItem("products");
      if (prods) {
        this.productsShow = JSON.parse(prods);
      }
    }
  },
};
</script>

<style>
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: gray;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: green;
}
</style>
