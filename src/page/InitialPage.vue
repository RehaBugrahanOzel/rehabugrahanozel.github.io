<template>
  <div>
    <div class="initial" id="initial-page">
      <div class="title-section">
        <transition
          appear
          @before-enter="beforeEnterTitleSection"
          @enter="enterImg"
        >
          <img src="../assets/img/logo.svg" alt="logo" class="logo" />
        </transition>
        <transition
          appear
          @before-enter="beforeEnterTitleSection"
          @enter="enterTitle"
        >
          <div class="title">PostureFix</div>
        </transition>
      </div>
      <transition
        appear
        @before-enter="beforeEnterCart"
        @enter="enterFirstCart"
      >
        <div class="first-cart">
          <CommonButton
            text="Login"
            class="button"
            wrapper="dark"
            @click="login"
          />
        </div>
      </transition>
      <transition
        appear
        @before-enter="beforeEnterCart"
        @enter="enterSecondCart"
      >
        <div class="second-cart">
          <CommonButton
            text="Register"
            class="button"
            wrapper="light"
            @click="register"
          />
        </div>
      </transition>
    </div>
    <transition
      appear
      @before-enter="beforeEnterTab"
      @enter="enterTab"
      id="login-transition"
    >
      <LoginTab
        class="login-tab"
        v-if="isLoginActive"
        :isLoginActive="isLoginActive"
        @loginClosed="loginClosed"
        @loggedIn="loggedIn"
        @goRegister="goRegister"
      />
    </transition>
    <transition
      appear
      @before-enter="beforeEnterTab"
      @enter="enterTab"
      id="register-transition"
    >
      <RegisterTab
        class="register-tab"
        v-if="isRegisterActive"
        :isRegisterActive="isRegisterActive"
        @registerClosed="registerClosed"
        @registeredIn="registeredIn"
      />
    </transition>

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
// import { defineAsyncComponent } from "vue";
// const CommonButton = defineAsyncComponent(() =>
//   import("../components/CommonButton.vue")
// );
// const LoginTab = defineAsyncComponent(() => import("../tabs/LoginTab.vue"));
// const RegisterTab = defineAsyncComponent(() =>
//   import("../tabs/RegisterTab.vue")
// );
import CommonButton from "../components/CommonButton.vue";
import LoginTab from "../tabs/LoginTab.vue";
import RegisterTab from "../tabs/RegisterTab.vue";
import "../assets/css/style.css";
import { gsap } from "gsap";
import router from "@/router/router";
import ToastComponent from "@/components/ToastComponent.vue";
export default {
  name: "InitialPage",
  components: {
    CommonButton,
    LoginTab,
    RegisterTab,
    ToastComponent,
  },
  data() {
    return {
      isLoginActive: false,
      isRegisterActive: false,
      message: "Password Reset Email Sent! Please check your email.",
      toastActive: false,
    };
  },
  methods: {
    closeToast() {
      this.toastActive = false;
    },
    login() {
      this.isLoginActive = true;
    },
    loggedIn() {
      this.isLoginActive = false;
      router.push("/home");
    },
    registeredIn() {
      this.isLoginActive = false;
      console.log("registered");
      router.push("/home");
    },
    register() {
      this.isRegisterActive = true;
    },
    loginClosed(state) {
      gsap.to("#login-transition", {
        duration: 1,
        ease: "power4.out",
        y: window.innerHeight,
      });
      setTimeout(() => {
        this.isLoginActive = state;
      }, 1000);
    },
    registerClosed(state) {
      gsap.to("#register-transition", {
        duration: 1,
        ease: "power4.out",
        y: window.innerHeight,
      });
      setTimeout(() => {
        this.isRegisterActive = state;
      }, 1000);
    },
    beforeEnterCart(el) {
      el.style.transform = "translateY(100%)";
    },
    beforeEnterTab(el) {
      el.style.transform = "translateY(100%)";
    },
    beforeEnterTitleSection(el) {
      el.style.transform = "translateY(-340px)";
    },
    enterFirstCart(el) {
      gsap.to(el, {
        duration: 1,
        ease: "power4.out",
        y: 0,
      });
    },
    enterSecondCart(el) {
      gsap.to(el, {
        duration: 1.5,
        ease: "power4.out",
        y: 0,
      });
    },
    enterTab(el) {
      gsap.to(el, {
        duration: 1,
        ease: "power4.out",
        y: 0,
      });
    },
    enterImg(el) {
      gsap.to(el, {
        duration: 1.5,
        ease: "power4.out",
        y: 0,
      });
    },
    enterTitle(el) {
      gsap.to(el, {
        duration: 1,
        ease: "power4.out",
        y: 0,
      });
    },
    goRegister() {
      console.log("go register");
      this.isLoginActive = false;
      this.isRegisterActive = true;
    },
  },
  created() {
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = function () {
      window.history.pushState(null, "", window.location.href);
    };
  },

  mounted() {
    if (
      localStorage.getItem("isEmailSent") !== null &&
      localStorage.getItem("isEmailSent") === "true"
    ) {
      console.log("toast gosterilecek");
      this.toastActive = true;
      localStorage.setItem("isEmailSent", "false");
    }
  },
};
</script>

<style scoped>
.toast {
  position: absolute;
  top: 50vh;
  left: 50vw;
  transform: translate(-50%, -50%);
}
.login-tab {
  background-color: #ffffff;
  position: absolute;
  top: 44px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  border-radius: 32px 32px 0 0;
}
.register-tab {
  background-color: #000000;
  position: absolute;
  top: 44px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  border-radius: 32px 32px 0 0;
}

.title-section {
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  margin-top: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.logo {
  width: 157px;
  height: 182px;
  margin: 16px;
}
.title {
  font-weight: bolder;
  font-size: 48px;
  line-height: 58px;
  line-height: 100%;
  font-family: "Arial Black";
}
.first-cart {
  position: absolute;
  height: 46%;
  max-height: 406px;
  width: 100%;
  bottom: 0;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  border-radius: 32px 32px 0 0;
}
.first-cart .button {
  width: 80%;
  max-width: 330px;
  height: 56px;
  margin-top: 7%;
}
.second-cart {
  position: absolute;
  height: 30%;
  max-height: 287px;
  width: 100%;
  bottom: 0;
  background-color: #000000;
  border-radius: 32px 32px 0 0;
  display: flex;
  justify-content: center;
}
.second-cart .button {
  width: 80%;
  max-width: 330px;
  height: 56px;
  margin: 7%;
}
</style>
