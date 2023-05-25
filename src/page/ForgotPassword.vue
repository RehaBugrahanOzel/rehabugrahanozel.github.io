<template>
  <div class="initial">
    <div class="page">
      <div class="header">
        <transition
          appear
          @before-enter="beforeEnterTop"
          @enter="enterTop"
          id="eod"
        >
          <img
            src="../assets/img/back-button.svg"
            alt="back-button"
            class="back-button"
            @click="goBack"
          />
        </transition>
      </div>
      <transition
        appear
        @before-enter="beforeEnterTop"
        @enter="enterTop"
        id="eod"
      >
        <div class="text-head">Forgot Password?</div>
      </transition>
      <transition
        appear
        @before-enter="beforeEnterTop"
        @enter="enterTop"
        id="eod"
      >
        <div class="sub-text">
          Don't worry! It occurs. Please enter the email address linked with
          your account.
        </div>
      </transition>
      <transition
        appear
        @before-enter="beforeEnterBot"
        @enter="enterTop"
        id="eod"
      >
        <div class="input-section">
          <CommonInput
            class="element"
            text="Enter your email"
            inputType="text"
            @inputVal="setEmail"
          />
        </div>
      </transition>

      <transition
        appear
        @before-enter="beforeEnterBot"
        @enter="enterTop"
        id="eod"
      >
        <CommonButton
          text="Send Code"
          class="button"
          wrapper="dark"
          @click="sendEmail"
        />
      </transition>
      <div class="footer">
        <transition
          appear
          @before-enter="beforeEnterBot"
          @enter="enterTop"
          id="eod"
        >
          <img
            src="../assets/img/logo-mini.svg"
            alt="logo-mini"
            class="logo-mini"
          />
        </transition>

        <transition
          appear
          @before-enter="beforeEnterBot"
          @enter="enterTop"
          id="eod"
        >
          <div class="footer-text">
            Remember Password?
            <a @click="goBack" style="color: #35c2c1">Home</a>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import CommonButton from "@/components/CommonButton.vue";
import CommonInput from "@/components/CommonInput.vue";
import router from "@/router/router";
import { gsap } from "gsap";
import { getAuth, sendPasswordResetEmail } from "@firebase/auth";

export default {
  name: "ForgotPassword",

  components: {
    CommonInput,
    CommonButton,
  },

  data() {
    return {
      email: "",
      error: null,
    };
  },
  methods: {
    sendEmail() {
      if (this.email === "") {
        this.error = "Please type in a valid email address.";
        return;
      }

      this.error = null;

      sendPasswordResetEmail(getAuth(), this.email)
        .then(() => {
          localStorage.setItem("isEmailSent", "true");
          router.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
    },

    goBack() {
      if (localStorage.getItem("isFromProfile") === "true") {
        localStorage.setItem("isFromProfile", "false");
        router.push("/profile");
      } else router.push("/");
    },
    beforeEnterTop(el) {
      el.style.transform = "translateY(-1000%)";
    },
    enterTop(el) {
      gsap.to(el, {
        duration: 1,
        ease: "power4.out",
        y: 0,
      });
    },
    beforeEnterBot(el) {
      el.style.transform = "translateY(1000%)";
    },
    enterBot(el) {
      gsap.from(el, {
        duration: 1,
        ease: "power4.out",
        y: 0,
      });
    },
    setEmail(val) {
      this.email = val;
    },
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
  left: 20px;
  margin: 9px 0 0 23px;
  top: 71px;
}

.button {
  width: 80%;
  max-width: 330px;
  height: 56px;
  margin-top: 7%;
}
</style>
