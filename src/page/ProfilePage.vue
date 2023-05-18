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
        <h1>Profile Page</h1>
      </div>
    </div>
  </div>
</template>

<script>
import BurgerMenu from "@/components/BurgerMenu.vue";
import "../assets/css/style.css";
import router from "@/router/router";

export default {
  name: "ProfilePage",
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
/* .exercises-tab {
    background-color: ;
    position: absolute;
    top: 44px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    border-radius: 32px 32px 0 0;
  } */

.back-button {
  width: 41px;
  height: 41px;
  position: absolute;
  left: 0;
  margin: 9px 0 0 23px;
}
.initial {
  background: linear-gradient(
    0deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(223, 236, 252, 1) 33%,
    rgba(207, 226, 250, 1) 50%,
    rgba(207, 226, 250, 1) 68%
  );
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
}

.burger-button {
  margin-top: 50px;
  margin-left: 2px;
  margin-bottom: 10px;
  width: 40%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

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
  /* width: 90%;
    height: 80vh; */
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

.page {
  display: flex;
  flex-direction: column;
  align-items: center;
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
/* .burger-button.toggle > input {
    display: none;
  }
  
  .burger-button > a,
  .burger-button.toggle > label {
    border-radius: 2px;
    box-shadow: 0 6px 5px -5px rgba(0, 0, 0, 0.3);
  }
  
  .burger-button > a::after,
  .burger-button.toggle > label::after {
    content: "";
    float: right;
    margin: 15px 15px 0 0;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 10px solid #ccc;
  }
  
  .burger-button ul {
    list-style-type: none;
    display: block;
    margin: 0;
    padding: 0;
    position: absolute;
    width: 100%;
    box-shadow: 0 6px 5px -5px rgba(0, 0, 0, 0.3);
    overflow: hidden;
  }
  .burger-button a,
  .burger-button.toggle > label {
    display: block;
    padding: 0 0 0 10px;
    text-decoration: none;
    line-height: 40px;
    font-size: 13px;
    text-transform: uppercase;
    font-weight: bold;
    color: #999;
    background-color: #fff;
  }
  .burger-button li {
    height: 0;
    overflow: hidden;
    transition: all 500ms;
  } */
</style>
