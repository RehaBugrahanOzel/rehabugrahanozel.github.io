<template>
  <div class="initial">
    <div class="page">
      <img class="image" src="../assets/img/password-changed.svg" />

      <div class="text-header">Password Changed!</div>
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
.text-header {
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

.image {
  margin-top: 150px;
}
</style>
