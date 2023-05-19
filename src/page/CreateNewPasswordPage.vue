<template>
  <div class="color">
    <div class="create-password">
      <div class="header">
        <img
          src="../assets/img/back-button.svg"
          alt="back-button"
          class="back-button"
          @click="goBack"
        />
      </div>
      <div class="text">Create new password</div>
      <div class="sub-text">
        Your new password must be unique from those previously used.
      </div>

      <div class="input-section">
        <CommonInput class="element" text="New Password" inputType="password" />
      </div>
      <div class="input-section">
        <CommonInput
          class="element"
          text="Confirm Password"
          inputType="password"
        />
      </div>

      <CommonButton
        text="Reset Password"
        class="button"
        wrapper="dark"
        @click="resetPassword"
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
import CommonInput from "@/components/CommonInput.vue";
import router from "@/router/router";
export default {
  name: "CreateNewPassword",

  components: {
    CommonInput,
    CommonButton,
  },

  methods: {
    resetPassword() {
      router.push("/passwordChanged");
    },

    goBack() {
      router.push("/verification");
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
.create-password {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 7px;
  font-family: "Arial";
}
.input-section {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-direction: column;
}
.input-section .element {
  margin-top: 15px;
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
  left: 20px;
  margin: 9px 0 0 23px;
  top: 71px;
}

.text {
  font-weight: normal;
  font-size: 30px;
  line-height: 39px;
  line-height: 100%;
  font-family: "Arial";
  font-weight: 700;
  margin: 145px 0px 10px 0px;
}

.button {
  width: 80%;
  max-width: 330px;
  height: 56px;
  margin-top: 7%;
}

.sub-text {
  font-size: 16px;
  margin-top: 30px;
  position: relative;
  max-width: 500px;
  margin-left: 20px;
  margin-bottom: 57px;
  font-weight: 500;
  color: #8391a1;
}

.footer-text {
  font-size: 14px;
  margin-top: 26px;
  bottom: 30px;
  display: flex;
  justify-content: center;
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
</style>
