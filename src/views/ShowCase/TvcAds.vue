<template>
  <div class="container-fluid">
    <div class="row container-showcase align-start justify-space-between">
      <v-col cols="12" class="wow fadeInLeftBig col-lg-6 col-xl-6">
        <video controls width="100%" :poster="imgUrl">
          <source
            src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <h4 class="mt-2">Demo show tvc ads {{ title }}</h4>
      </v-col>
      <v-col
        v-if="showPrPanel"
        cols="12"
        class="wow fadeInRightBig col-xl-6 col-lg-6"
        style="position: relative"
      >
        <v-card width="100%" height="100vh">
          <v-card-text style="max-height: 80vh" class="pa-6 overflow-y-auto">
            <div class="model-container col-12" v-if="allModels[0].active">
              <div
                class="py-2 pl-12 row"
                style="background-color: whitesmoke; border-radius: 12px"
              >
                <v-col cols="12">
                  <span class="title-model">Age & gender</span>
                </v-col>
                <v-col cols="6" class="content-model">
                  <span class="title" v-for="(i, idx) in ages" :key="idx"
                    ><v-chip class="ma-1" color="green" text-color="white"
                      >{{ i.id }}
                      <v-avatar right class="green darken-4">
                        {{ i.num }}
                      </v-avatar></v-chip
                    ></span
                  >
                </v-col>
                <v-col cols="6" class="content-model">
                  <span class="title" v-for="(i, idx) in genders" :key="idx"
                    ><v-chip class="ma-1" color="pink" text-color="white"
                      >{{ i.id }}
                      <v-avatar right class="pink darken-4">
                        {{ i.num }}
                      </v-avatar></v-chip
                    ></span
                  >
                </v-col>
              </div>
            </div>
            <div class="model-container col-12" v-if="allModels[1].active">
              <div
                class="py-2 pl-12 row"
                style="background-color: whitesmoke; border-radius: 12px"
              >
                <v-col cols="12">
                  <span class="title-model">Scenes</span>
                </v-col>
                <v-col cols="12" class="content-model">
                  <span class="title" v-for="(i, idx) in scenes" :key="idx">
                    <v-chip class="ma-1" color="blue" text-color="white">{{
                      i
                    }}</v-chip>
                  </span>
                </v-col>
              </div>
            </div>
            <div class="model-container col-12" v-if="allModels[2].active">
              <div
                class="py-2 pl-12 row"
                style="background-color: whitesmoke; border-radius: 12px"
              >
                <v-col cols="12">
                  <span class="title-model">Common objects</span>
                </v-col>
                <v-col cols="12" class="content-model">
                  <span class="title" v-for="(i, idx) in cmnObjs" :key="idx">
                    <v-chip class="ma-1" color="blue" text-color="white">{{
                      i
                    }}</v-chip>
                  </span>
                </v-col>
              </div>
            </div>
            <div class="model-container col-12" v-if="allModels[3].active">
              <div
                class="py-2 pl-12 row"
                style="background-color: whitesmoke; border-radius: 12px"
              >
                <v-col cols="12">
                  <span class="title-model">Celeb</span>
                </v-col>
                <v-col cols="12" class="content-model">
                  <v-row dense>
                    <div
                      v-for="(celeb, idx) in celebs"
                      :key="idx"
                      class="ma-2 row"
                    >
                      <v-col cols="auto">
                        <v-avatar size="80">
                          <v-img aspect-ratio="1" :src="celeb.avt" />
                        </v-avatar>
                      </v-col>
                      <v-col cols="auto">
                        <span
                          class="mb-1"
                          style="font-size: 15px; font-weight: bold"
                          >{{ celeb.name }}</span
                        >
                        <div>
                          <v-chip
                            small
                            v-for="(act, idxAct) in celeb.acts"
                            :key="idxAct"
                            color="teal"
                            class="ml-1 mb-1"
                            text-color="white"
                          >
                            {{ act }}
                          </v-chip>
                        </div>
                        <div>
                          <v-chip
                            small
                            v-for="(emt, idxEmt) in celeb.emts"
                            :key="idxEmt"
                            color="cyan"
                            class="ml-1"
                            text-color="white"
                          >
                            {{ emt }}
                          </v-chip>
                        </div>
                      </v-col>
                    </div>
                  </v-row>
                </v-col>
              </div>
            </div>
            <div class="model-container col-12" v-if="allModels[4].active">
              <div
                class="py-2 pl-12 row"
                style="background-color: whitesmoke; border-radius: 12px"
              >
                <v-col cols="12">
                  <span class="title-model">Emotions</span>
                </v-col>
                <v-col cols="12" class="content-model">
                  <span class="title" v-for="i in emotions" :key="i">
                    <v-chip class="ma-1" color="cyan" text-color="white">{{
                      i
                    }}</v-chip>
                  </span>
                </v-col>
              </div>
            </div>
            <div class="model-container col-12" v-if="allModels[5].active">
              <div
                class="py-2 pl-12 row"
                style="background-color: whitesmoke; border-radius: 12px"
              >
                <v-col cols="12">
                  <span class="title-model">Actions</span>
                </v-col>
                <v-col cols="12" class="content-model">
                  <span class="title" v-for="i in actions" :key="i">
                    <v-chip class="ma-1" color="teal" text-color="white">{{
                      i
                    }}</v-chip>
                  </span>
                </v-col>
              </div>
            </div>
          </v-card-text>
        </v-card>
        <div class="wow delay-1s fadeInUpBig close-panel">
          <div class="title-panel-close justify-space-between">
            <span class="mr-12">Metadata panel</span>
            <v-menu offset-y :close-on-content-click="false">
              <template v-slot:activator="{ attrs, on }">
                <v-icon v-bind="attrs" v-on="on" left color="white" class=""
                  >mdi-filter</v-icon
                >
              </template>
              <v-list>
                <v-list-item v-for="(item, idex) in allModels" :key="idex" link>
                  <v-checkbox v-model="item.active"></v-checkbox>
                  <v-list-item-title
                    @click="item.active = !item.active"
                    v-text="item.name"
                  ></v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>

            <v-icon right color="white" @click="showPrPanel = false" class=""
              >mdi-close</v-icon
            >
          </div>
          <svg
            width="300"
            height="40"
            viewBox="0 0 300 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 40C0 17.9086 17.9086 0 40 0L300 0V40H0V40Z"
              fill="#595959"
            />
          </svg>
        </div>
      </v-col>
    </div>
  </div>
</template>

<script>
export default {
  name: "TvcAds",
  props: {
    title: String,
    contentId: String,
    imgUrl: String,
  },
  data() {
    return {
      showPrPanel: true,
      allModels: [
        {
          name: "age & gender",
          active: true,
        },
        {
          name: "Scenes",
          active: true,
        },
        {
          name: "Common Objects",
          active: true,
        },
        {
          name: "Celebs",
          active: true,
        },
        {
          name: "Emotions",
          active: true,
        },
        {
          name: "Actions",
          active: true,
        },
      ],
      ages: [
        {
          id: "0",
          num: 1,
        },
        {
          id: "12 -20",
          num: 1,
        },
        {
          id: "50 -60",
          num: 3,
        },
        {
          id: "70+",
          num: 12,
        },
      ],
      genders: [
        {
          id: "Male",
          num: 2,
        },
        {
          id: "Female",
          num: 3,
        },
      ],
      scenes: ["house", "airplane cabin", "bar", "bathroom"],
      cmnObjs: ["iphone", "airplane cabin", "bar", "bathroom"],
      emotions: ["Happy", "Negativity"],
      actions: ["Run", "Sing", "Talk"],
      celebs: [
        {
          name: "Sơn Tùng MTP",
          avt: "https://static.vieon.vn/ai-storage/ai_vlz/production/meta_data_avt/Celeb/MJeKRmsciWuLyT6Ec6MdVC.jpg",
          acts: ["Run", "Sing", "Talk"],
          emts: ["Happy", "Negativity"],
        },
        {
          name: "Sơn Tùng MTP",
          avt: "https://static.vieon.vn/ai-storage/ai_vlz/production/meta_data_avt/Celeb/MJeKRmsciWuLyT6Ec6MdVC.jpg",
          acts: ["Run", "Sing", "Talk"],
          emts: ["Happy", "Negativity"],
        },
        {
          name: "Sơn Tùng MTP",
          avt: "https://static.vieon.vn/ai-storage/ai_vlz/production/meta_data_avt/Celeb/MJeKRmsciWuLyT6Ec6MdVC.jpg",
          acts: ["Run", "Sing", "Talk"],
          emts: ["Happy", "Negativity"],
        },
        {
          name: "Sơn Tùng MTP",
          avt: "https://static.vieon.vn/ai-storage/ai_vlz/production/meta_data_avt/Celeb/MJeKRmsciWuLyT6Ec6MdVC.jpg",
          acts: ["Run", "Sing", "Talk"],
          emts: ["Happy", "Negativity"],
        },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
.title-model {
  position: absolute;
  top: -7px;
  left: -47px;
  background-color: gray;
  color: white;
  max-width: 300px;
  border-radius: 0 25px 25px 0;
  padding: 8px 23px;
}
.model-container {
  position: relative;
  margin-bottom: 4px;
}
.content-model {
  margin-top: 12px;
}
</style>
