<template>
  <div class="initial">
    <div>
      <img
        src="../assets/img/back-button.svg"
        alt="back-button"
        class="back-button"
        @click="goBack"
      />
      <div class="burger-button">
        <!--<img src="../assets/img/hamburger-icon.svg" class="element" />-->
        <BurgerMenu></BurgerMenu>
      </div>
      <div class="page">
        <h1>Settings Page</h1>
      </div>
    </div>
  </div>
</template>

<script>
import BurgerMenu from "@/components/BurgerMenu.vue";
import "../assets/css/style.css";
import router from "@/router/router";

export default {
  name: "SettingPage",
  components: {
    BurgerMenu,
  },
  data() {
    return {};
  },
  created() {
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = function () {
      window.history.pushState(null, "", window.location.href);
    };
  },

  methods: {
    goBack() {
      router.push("/home");
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
</style>
