<template>
  <div class="initial">
    <div>
      <div class="burger-button" v-if="!videoExerciseActive">
        <transition
          appear
          @before-enter="beforeEnterBurger"
          @enter="enterBurger"
        >
          <BurgerMenu></BurgerMenu>
        </transition>
      </div>
      <div class="page" v-if="!isPageShown">
        <div class="page-image">
          <transition
            appear
            @before-enter="beforeEnterTop"
            @enter="enterTop"
            id="eod"
          >
            <ExerciseButton
              class="exercise-button"
              :src="exerciseOfTheDayImg"
              :text="exerciseOfTheDayTxt"
            ></ExerciseButton>
          </transition>
        </div>
        <transition
          appear
          @before-enter="beforeEnterBottom"
          @enter="enterBottom"
          id="bottom-container"
        >
          <div class="container-wrapper">
            <div class="flex-container" v-for="item in categories" :key="item">
              <CategoryButton
                class="category-button"
                :text="item.txt"
                :src="item.img"
                @click="exerciseSelected(item.txt)"
              ></CategoryButton>
            </div>
          </div>
        </transition>
      </div>
    </div>
    <transition
      appear
      @before-enter="beforeEnterTab"
      @enter="enterTab"
      id="exercise-transition"
    >
      <ExerciseTab
        class="exercise-tab"
        v-if="isExerciseActive"
        :categoryName="selectedExercise"
        :isExerciseActive="isExerciseActive"
        @exerciseClosed="exerciseClosed"
        @exerciseChoosed="exerciseChoosed"
      >
      </ExerciseTab>
    </transition>
    <transition
      appear
      @before-enter="beforeEnterTab"
      @enter="enterTab"
      id="video-exercise-transition"
    >
      <VideoExerciseTab
        class="video-exercise-tab"
        v-if="videoExerciseActive"
        :videoExerciseInfo="videoExerciseInfo"
        :videoExerciseActive="videoExerciseActive"
        @videoExerciseClosed="videoExerciseClosed"
      ></VideoExerciseTab>
    </transition>
  </div>
</template>

<script>
import BurgerMenu from "@/components/BurgerMenu.vue";
import CategoryButton from "../components/CategoryButton.vue";
import ExerciseTab from "@/tabs/ExerciseTab.vue";
import VideoExerciseTab from "@/tabs/VideoExerciseTab.vue";
import ExerciseButton from "@/components/ExerciseButton.vue";
import ExerciseOfTheDay from "../assets/img/exercise-of-the-day.svg";
import "../assets/css/style.css";
import { gsap } from "gsap";
import { getAuth } from "firebase/auth";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
export default {
  name: "HomePage",
  components: {
    CategoryButton,
    ExerciseButton,
    ExerciseTab,
    BurgerMenu,
    VideoExerciseTab,
  },
  data() {
    return {
      exerciseOfTheDayImg: ExerciseOfTheDay,
      exerciseOfTheDayTxt: "Exercise of the day",
      isExerciseActive: false,
      isPageShown: false,
      selectedExercise: "",
      videoExerciseActive: false,
      videoExerciseInfo: "",
      categories: [],
    };
  },
  created() {
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = function () {
      window.history.pushState(null, "", window.location.href);
    };
    getAuth().onAuthStateChanged((user) => {
      this.$store.dispatch("fetchUser", user);
    });
    this.getCategories();
  },

  async mounted() {
    await this.$store.dispatch("getUserPicture");
  },

  computed: {
    user() {
      return this.$store.getters.user;
    },
  },

  methods: {
    exerciseSelected(item) {
      this.selectedExercise = item;
      this.isExerciseActive = true;
      gsap.to("#eod", {
        duration: 1,
        ease: "power4.out",
        y: -300,
      });
    },

    exerciseClosed(state) {
      this.isPageShown = state;
      gsap.to("#exercise-transition", {
        duration: 1,
        ease: "power4.out",
        y: window.innerHeight,
      });
      gsap.to("#eod", {
        duration: 1,
        ease: "power4.out",
        y: 0,
      });
      gsap.from("#bottom-container", {
        duration: 1,
        ease: "power4.out",
        y: window.innerHeight,
      });
      setTimeout(() => {
        this.isExerciseActive = state;
      }, 1000);
    },
    exerciseChoosed(state, item) {
      this.videoExerciseActive = state;
      this.videoExerciseInfo = item;
    },
    videoExerciseClosed(state) {
      this.isExerciseActive = true;
      gsap.to("#video-exercise-transition", {
        duration: 1,
        ease: "power4.out",
        y: window.innerHeight,
      });
      setTimeout(() => {
        this.videoExerciseActive = state;
      }, 1000);
    },
    beforeEnterTab(el) {
      el.style.transform = "translateY(100%)";
    },
    enterTab(el) {
      gsap.to(el, {
        duration: 1.1,
        ease: "power4.out",
        y: 0,
      });
    },
    beforeEnterBurger(el) {
      el.style.transform = "translateY(-200px)";
    },
    enterBurger(el) {
      gsap.to(el, {
        duration: 1,
        ease: "power4.out",
        y: 0,
      });
    },
    beforeEnterTop(el) {
      el.style.transform = "translateY(-100%)";
    },
    enterTop(el) {
      gsap.to(el, {
        duration: 0.3,
        y: 0,
      });
    },
    beforeEnterBottom(el) {
      el.style.transform = "translateY(400%)";
    },
    enterBottom(el) {
      gsap.to(el, {
        duration: 2,
        ease: "power4.out",
        y: 0,
      });
    },
    async getCategories() {
      const q = query(collection(db, "categories"));
      const querySnapshot = await getDocs(q);
      const storage = getStorage();
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log("Categories: ", doc.id);
        getDownloadURL(ref(storage, "categories/" + doc.id + ".svg"))
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
            this.categories.push({
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
.page-image {
  max-width: 360px;
  max-height: 162px;
  margin-bottom: 49px;
}

.flex-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  align-content: flex-start;
  overflow: auto;
  flex-direction: row;
}

.container-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

.category-button {
  width: 158px;
  height: 150px;
  margin: 5px;
}

.exercise-button {
  width: 300x;
  height: 162px;
}

.exercise-tab {
  background-color: #000000;
  position: fixed;
  overflow: scroll;
  top: 60px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  border-radius: 32px 32px 0 0;
  height: -webkit-fill-available;
}
.video-exercise-tab {
  background-color: #ffffff;
  position: absolute;
  top: 44px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  border-radius: 32px 32px 0 0;
}
</style>
