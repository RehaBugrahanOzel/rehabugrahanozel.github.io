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

      <div class="area">
        <div class="card">
          <div class="foto-section">
            <img class="profile-img" src="../assets/img/profile.jpeg" />
            <div class="image-selector"></div>
          </div>
          <div class="container">
            <div class="name">
              <div class="username">username</div>
              <div class="edit-username"></div>
            </div>

            <div class="information">username@username.com</div>
          </div>
        </div>

        <CommonButton
          text="Change Password"
          class="button"
          wrapper="dark"
          @click="changePassword"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BurgerMenu from "@/components/BurgerMenu.vue";
import CommonButton from "@/components/CommonButton.vue";
import "../assets/css/style.css";
import router from "@/router/router";

export default {
  name: "ProfilePage",
  components: {
    BurgerMenu,
    CommonButton,
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

    changePassword() {
      router.push("/verification");
    },
  },
};
</script>

<style>
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

.page {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 80%;
  border-radius: 5px;
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin: 10px;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.profile-img {
  border-radius: 8px;
  margin: 10px;
  overflow: hidden;
  height: 300px;
}

.container {
  padding: 2px 16px;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.area {
  display: flex;
  flex-direction: column;
  align-content: center;
  flex-wrap: wrap;
}

.username {
  font-size: 24px;
  font-weight: bold;
}
</style>
