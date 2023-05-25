<template>
  <div class="page">
    <div class="header">
      <img
        src="../assets/img/back-button.svg"
        alt="back-button"
        class="back-button"
        @click="goBack"
      />
    </div>

    <div class="text">{{ categoryName }} Exercises</div>

    <div class="container-wrapper">
      <div class="flex-container" v-for="item in exercisesList" :key="item">
        <ExerciseButton
          class="button"
          :text="item.txt"
          :src="item.img"
          @click="enterExercise(item.txt)"
        ></ExerciseButton>
      </div>
    </div>
  </div>
</template>

<script>
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

import "../assets/css/style.css";

import ExerciseButton from "../components/ExerciseButton.vue";
//import router from "@/router/router";
export default {
  name: "ExerciseTab",

  components: {
    ExerciseButton,
  },

  props: {
    isExerciseActive: String,
    categoryName: String,
  },
  data() {
    return {
      exercisesList: [],
    };
  },

  mounted() {
    this.getExercises(this.categoryName);
  },

  methods: {
    goBack() {
      this.$emit("exerciseClosed", false);
    },
    enterExercise(item) {
      console.log(item);
      this.$emit("exerciseChoosed", true, item);
    },
    async getExercises(category) {
      const q = query(collection(db, "categories/" + category + "/exercises"));
      const querySnapshot = await getDocs(q);
      const storage = getStorage();
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log("Exercises: ", doc.id);
        getDownloadURL(ref(storage, "exercises/" + doc.id + ".svg"))
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
            this.exercisesList.push({
              txt: doc.id,
              img: url,
            });
            //img.setAttribute("src", url);
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

.back-button {
  width: 41px;
  height: 41px;
  position: absolute;
  left: 0;
  margin: 54px 0 0 12px;
  transform: rotate(-0.25turn);
}

.text {
  font-weight: normal;
  color: white;
  font-size: 36px;
  line-height: 100%;
  font-family: "Arial Black";
  margin: 62px 0 33px 0;
}

.button {
  width: 100%;
  max-width: 660px;
  height: 150px;
  margin-top: 10px;
  font-size: 24px;
}

.flex-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  align-content: flex-start;
  overflow: auto;
  flex-direction: row;
  /* width: 90%;
  height: 80vh; */
  /* overflow: auto;
  flex-direction: row; */
}

.container-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
</style>
