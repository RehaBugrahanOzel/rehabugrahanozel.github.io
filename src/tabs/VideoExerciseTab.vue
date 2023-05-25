<template>
  <div class="page">
    <div class="header">
      <img
        src="../assets/img/back-button.svg"
        alt="back-button"
        class="back-button"
        @click="goBack"
      />
      <img
        src="../assets/img/logo-mini.svg"
        alt="logo-mini"
        class="logo-mini"
      />
    </div>
    <div class="text">{{ videoExerciseInfo }}</div>
    <video-player
      class="video-player"
      :src="videoSource"
      controls
      :loop="true"
      :volume="0.6"
      :autoplay="true"
    />
    <div class="info">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis .
    </div>
    <CommonButton text="Start" class="button" wrapper="dark" @click="start" />
  </div>
</template>

<script>
import CommonButton from "../components/CommonButton.vue";
import { VideoPlayer } from "@videojs-player/vue";
import "video.js/dist/video-js.css";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
export default {
  name: "VideoExerciseTab",
  props: {
    videoExerciseInfo: String,
    videoExerciseActive: Boolean,
  },
  components: {
    CommonButton,
    VideoPlayer,
  },
  data() {
    return {
      videoSource: "",
    };
  },
  mounted() {
    this.getExerciseVideo(this.videoExerciseInfo);
  },
  methods: {
    goBack() {
      this.$emit("videoExerciseClosed", false);
    },
    start() {
      androidApp.startCamera("Openning...");
    },
    async getExerciseVideo(name) {
      console.log("get exercise video image: ", name);
      const storage = getStorage();
      getDownloadURL(ref(storage, "exerciseVideos/" + name + ".mp4"))
        .then((url) => {
          // This can be downloaded directly:
          const xhr = new XMLHttpRequest();
          xhr.responseType = "blob";
          // eslint-disable-next-line
          xhr.onload = (event) => {
            // eslint-disable-next-line
            const blob = xhr.response;
          };
          xhr.open("GET", url);
          xhr.send();

          // Or inserted into an <img> element
          //const img = document.getElementById("profile-img");
          this.videoSource = url;
          //img.setAttribute("src", url);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.info {
  width: 80%;
  max-width: 330px;
  height: 200px;
  margin-top: 7%;
  font-size: 15px;
  font-family: "Arial";
  border: hidden;
  border-radius: 8px;
  background-color: #cdcdcd;
  padding: 27px;
}
.video-player {
  width: 90%;
  border: hidden;
  border-radius: 8px;
}
.header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.back-button {
  width: 41px;
  height: 41px;
  position: absolute;
  left: 0;
  margin: 9px 0 0 23px;
  transform: rotate(-0.25turn);
}

.logo-mini {
  width: 51px;
  height: 59px;
}
.text {
  font-weight: normal;
  font-size: 30px;
  line-height: 39px;
  line-height: 100%;
  font-family: "Arial";
  margin: 35px 42px;
}

.button {
  width: 80%;
  max-width: 330px;
  height: 56px;
  margin: 7%;
}
</style>
