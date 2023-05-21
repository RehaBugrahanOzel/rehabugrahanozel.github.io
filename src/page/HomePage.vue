<template>
  <div class="initial">
    <div>
      <div class="burger-button" v-if="!videoExerciseActive">
        <!--<img src="../assets/img/hamburger-icon.svg" class="element" />-->
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
            <div
              class="flex-container"
              v-for="item in exercisesList"
              :key="item"
            >
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
      id="reha-transition"
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
// import { defineAsyncComponent } from "vue";
// const BurgerMenu = defineAsyncComponent(() =>
//   import("@/components/BurgerMenu.vue")
// );
// const CategoryButton = defineAsyncComponent(() =>
//   import("../components/CategoryButton.vue")
// );
// const ExerciseTab = defineAsyncComponent(() =>
//   import("@/tabs/ExerciseTab.vue")
// );
// const VideoExerciseTab = defineAsyncComponent(() =>
//   import("@/tabs/VideoExerciseTab.vue")
// );
// const ExerciseButton = defineAsyncComponent(() =>
//   import("@/components/ExerciseButton.vue")
// );
import BurgerMenu from "@/components/BurgerMenu.vue";
import CategoryButton from "../components/CategoryButton.vue";
import ExerciseTab from "@/tabs/ExerciseTab.vue";
import VideoExerciseTab from "@/tabs/VideoExerciseTab.vue";
import ExerciseButton from "@/components/ExerciseButton.vue";
import ExerciseOfTheDay from "../assets/img/exercise-of-the-day.svg";
import Core from "../assets/img/body-parts/core.svg";
import Arm from "../assets/img/body-parts/arm.svg";
import Back from "../assets/img/body-parts/back.svg";
import Chest from "../assets/img/body-parts/chest.svg";
import FullBody from "../assets/img/body-parts/full-body.svg";
import Leg from "../assets/img/body-parts/leg.svg";
import "../assets/css/style.css";
import { gsap } from "gsap";

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
      exercisesList: [
        { txt: "Core", img: Core },
        { txt: "Arm", img: Arm },
        { txt: "Back", img: Back },
        { txt: "Chest", img: Chest },
        { txt: "Full Body", img: FullBody },
        { txt: "Leg", img: Leg },
      ],

      isExerciseActive: false,
      isPageShown: false,
      selectedExercise: "",
      videoExerciseActive: false,
      videoExerciseInfo: {},
    };
  },
  created() {
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = function () {
      window.history.pushState(null, "", window.location.href);
    };
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
      gsap.to(".exercise", {
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
      // setTimeout(() => {
      //   this.isExerciseActive = false;
      // }, 1000);
    },
    videoExerciseClosed(state) {
      this.isExerciseActive = true;
      gsap.to("#reha-transition", {
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
  },
};
</script>

<style>
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
