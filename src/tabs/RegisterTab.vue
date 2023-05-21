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
        src="../assets/img/logo-mini-light.svg"
        alt="logo-mini"
        class="logo-mini"
      />
    </div>
    <div class="text">Welcome to PostureFix! Register to start moving!</div>
    <div class="input-section">
      <CommonInput
        class="element"
        text="Username"
        inputType="text"
        @inputVal="setUserName"
      />
      <CommonInput
        class="element"
        text="Enter your email"
        inputType="email"
        @inputVal="setEmail"
      />
      <CommonInput
        class="element"
        text="Password"
        inputType="password"
        @inputVal="setPassword"
      />
      <CommonInput
        class="element"
        text="Confirm password"
        inputType="password"
        @inputVal="setPasswordAgain"
      />
    </div>
    <CommonButton
      text="Agree and Register"
      class="button"
      wrapper="grey"
      @click="register"
    />
    <div class="login-options-txt">Or Register With</div>
    <div class="login-options">
      <CommonIconButton :src="facebookIconSrc" class="element" />
      <CommonIconButton :src="googleIconSrc" class="element" />
      <CommonIconButton :src="appleIconSrc" class="element" />
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
import AppleIcon from "../assets/img/apple-icon-light.svg";
export default {
  name: "RegisterTab",
  props: {
    isRegisterActive: String,
  },
  components: {
    CommonInput,
    CommonButton,
    CommonIconButton,
    ToastComponent,
  },
  methods: {
    goBack() {
      this.$emit("registerClosed", false);
    },
    setUserName(val) {
      this.userName = val;
    },
    setEmail(val) {
      this.email = val;
    },
    setPassword(val) {
      this.password = val;
    },
    setPasswordAgain(val) {
      this.passwordAgain = val;
    },
    passwordCheck() {
      if (this.password === this.passwordAgain) {
        return true;
      } else {
        return false;
      }
    },
    async register() {
      if (this.passwordCheck()) {
        console.log(
          "passwords are same and parameters are: ",
          this.email,
          this.password,
          this.userName,
          this.passwordAgain
        );
        try {
          await this.$store.dispatch("register", {
            email: this.email,
            password: this.password,
            name: this.userName,
          });
          this.$emit("registeredIn");
        } catch (err) {
          switch (err.code) {
            case "auth/email-already-in-use":
              this.message = "Email already in use";
              break;
            case "auth/invalid-email":
              this.message = "Invalid email";
              break;
            case "auth/operation-not-allowed":
              this.message = "Operation not allowed";
              break;
            case "auth/weak-password":
              this.message = "Weak Password";
              break;
            default:
              this.message = "Something went wrong";
          }
          this.toastActive = true;
          console.log("Caught error", err.message);
        }
      } else {
        console.log(
          "passwords are not same and parameters are: ",
          this.email,
          this.password,
          this.userName,
          this.passwordAgain
        );
        this.message = "Password don't match!";
        this.toastActive = true;
      }
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
      userName: ref(""),
      email: ref(""),
      password: ref(""),
      passwordAgain: ref(""),
      toastActive: false,
      message: "",
    };
  },
};
</script>

<style scoped>
.register {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 7px;
  font-family: "Arial";
  overflow: auto;
  flex-direction: column;
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
  left: 0;
  margin: 9px 0 0 23px;
  transform: rotate(-0.25turn);
}

.logo-mini {
  width: 51px;
  height: 59px;
}
.text {
  color: #ffffff;
  font-weight: normal;
  font-size: 30px;
  line-height: 39px;
  line-height: 100%;
  font-family: "Arial";
  margin: 35px 74px 42px 21px;
}

.button {
  width: 80%;
  max-width: 330px;
  height: 56px;
  margin-top: 7%;
}
.login-options-txt {
  color: #ffffff;
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
  right: 110px;
}
.login-options-txt:after {
  content: " ";
  height: 1px;
  width: 95px;
  background: #e8ecf4;
  display: block;
  position: absolute;
  top: 50%;
  left: 110px;
}
.login-options {
  margin: 22px 0;
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
.toast {
  position: absolute;
  top: 50vh;
  left: 50vw;
  transform: translate(-50%, -50%);
}
</style>
