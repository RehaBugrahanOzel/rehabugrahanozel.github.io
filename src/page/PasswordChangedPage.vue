<template>
  <div class="color">
    <div class="page">
      <img class="image" src="../assets/img/password-changed.svg" />

      <div class="text">Password Changed!</div>
      <div class="sub-text">Your password has been changed successfully.</div>

      <CommonButton
        text="Back to Login"
        class="button"
        wrapper="dark"
        @click="goLogin"
      />

      <div class="footer">
        <img
          src="../assets/img/logo-mini.svg"
          alt="logo-mini"
          class="logo-mini"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CommonButton from "@/components/CommonButton.vue";
import router from "@/router/router";
export default {
  name: "PasswordChanged",

  components: {
    CommonButton,
  },

  methods: {
    goLogin() {
      router.push("/");
    },
  },
};
</script>

<style scoped>
.color {
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

.page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 7px;
  font-family: "Arial";
}
.text {
  font-weight: normal;
  font-size: 30px;
  line-height: 39px;
  line-height: 100%;
  font-family: "Arial";
  font-weight: 700;
  margin: 40px 0px 10px 0px;
}

.button {
  width: 80%;
  max-width: 330px;
  height: 56px;
  margin-top: 7%;
}

.sub-text {
  font-size: 16px;
  margin-top: 20px;
  position: relative;
  max-width: 500px;
  margin-left: 20px;
  margin-bottom: 57px;
  font-weight: 500;
  color: #8391a1;
}

.logo-mini {
  width: 51px;
  height: 59px;
}

.footer {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translate(-50%, 0);
}

.image {
  margin-top: 150px;
}
</style>
