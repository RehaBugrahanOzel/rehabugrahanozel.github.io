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
    <div class="text">Welcome back! Glad to see you, Again!</div>
    <div class="input-section">
      <CommonInput
        class="element"
        text="Enter your email"
        inputType="text"
        @inputVal="setEmail"
      />
      <CommonInput
        class="element"
        text="Enter your password"
        inputType="password"
        @inputVal="setPassword"
      />
      <div class="forgot-password">
        <div @click="forgotPassword">Forgot Password?</div>
      </div>
    </div>
    <CommonButton text="Login" class="button" wrapper="dark" @click="login" />
    <div class="login-options-txt">Or Login with</div>
    <div class="login-options">
      <CommonIconButton :src="facebookIconSrc" class="element" />
      <CommonIconButton :src="googleIconSrc" class="element" />
      <CommonIconButton :src="appleIconSrc" class="element" />
    </div>
    <div class="register-now">
      Don't have an account?
      <a @click="goToRegister" style="color: #35c2c1">Register</a>
    </div>
    <ToastComponent
      class="toast"
      :contentText="message"
      :confirmText="'Close'"
      @confirm="closeToast"
      v-if="toastActive"
    ></ToastComponent>
  </div>
</template>

<script>
import CommonInput from "@/components/CommonInput.vue";
import CommonButton from "../components/CommonButton.vue";
import CommonIconButton from "../components/CommonIconButton.vue";
import ToastComponent from "@/components/ToastComponent.vue";
import { ref } from "vue";
import FacebookIcon from "../assets/img/facebook-icon.svg";
import GoogleIcon from "../assets/img/google-icon-light.svg";
import AppleIcon from "../assets/img/apple-icon.svg";
import router from "@/router/router";
export default {
  name: "LoginTab",
  props: {
    isLoginActive: String,
  },
  components: {
    CommonInput,
    CommonButton,
    CommonIconButton,
    ToastComponent,
  },
  methods: {
    goBack() {
      this.$emit("loginClosed", false);
    },
    async login() {
      console.log("login pressed");
      try {
        await this.$store.dispatch("logIn", {
          email: this.email,
          password: this.password,
        });
        this.$emit("loggedIn");
      } catch (err) {
        switch (err.code) {
          case "auth/invalid-email":
            this.message = "Invalid Email Address";
            break;
          case "auth/wrong-password":
            this.message = "Wrong password";
            break;
          case "auth/user-no-found":
            this.message = "User not found";
            break;
          default:
            this.message = "Something went wrong";
        }
        this.toastActive = true;
        console.log("Caught error", err.message);
      }
    },
    setEmail(val) {
      this.email = val;
    },
    setPassword(val) {
      this.password = val;
    },
    forgotPassword() {
      router.push("/forgotPassword");
    },
    goToRegister() {
      console.log("emitted");
      this.$emit("goRegister");
    },
    closeToast() {
      this.toastActive = false;
    },
  },
  data() {
    return {
      facebookIconSrc: FacebookIcon,
      googleIconSrc: GoogleIcon,
      appleIconSrc: AppleIcon,
      email: ref(""),
      password: ref(""),
      toastActive: false,
      message: "",
    };
  },
};
</script>

<style scoped>
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
  margin: 35px 74px 42px 21px;
}
.forgot-password {
  margin-top: 5px;
  font-size: 14px;
  font-family: "Arial";
}
.button {
  width: 80%;
  max-width: 330px;
  height: 56px;
  margin-top: 7%;
}
.login-options-txt {
  font-size: 14px;
  margin-top: 30px;
  position: relative;
  max-width: 500px;
}
.login-options-txt:before {
  content: " ";
  display: block;
  height: 1px;
  width: 95px;
  position: absolute;
  top: 50%;
  background: #e8ecf4;
  right: 90px;
}
.login-options-txt:after {
  content: " ";
  height: 1px;
  width: 95px;
  background: #e8ecf4;
  display: block;
  position: absolute;
  top: 50%;
  left: 90px;
}
.login-options {
  margin-top: 22px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
}
.login-options .element {
  padding: 15px 40px;
  border-width: 1px;
  border-color: #cccccc;
  border-style: solid;
  width: 26px;
  height: 26px;
  border-radius: 8px;
  margin: 0 4px;
}
.register-now {
  font-size: 14px;
  margin-top: 83px;
  line-height: 40px;
}
.toast {
  position: absolute;
  top: 50vh;
  left: 50vw;
  transform: translate(-50%, -50%);
}
</style>
