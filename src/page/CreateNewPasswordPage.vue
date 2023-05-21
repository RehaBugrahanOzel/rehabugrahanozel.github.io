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
        <div class="text-head">Create new password</div>
      </transition>
      <transition
        appear
        @before-enter="beforeEnterTop"
        @enter="enterTop"
        id="eod"
      >
        <div class="sub-text">
          Your new password must be unique from those previously used.
        </div>
      </transition>

      <div class="input-section">
        <transition
          appear
          @before-enter="beforeEnterBot"
          @enter="enterTop"
          id="eod"
        >
          <CommonInput
            class="element"
            text="New Password"
            inputType="password"
          />
        </transition>
      </div>
      <div class="input-section">
        <transition
          appear
          @before-enter="beforeEnterBot"
          @enter="enterTop"
          id="eod"
        >
          <CommonInput
            class="element"
            text="Confirm Password"
            inputType="password"
          />
        </transition>
      </div>

      <transition
        appear
        @before-enter="beforeEnterBot"
        @enter="enterTop"
        id="eod"
      >
        <CommonButton
          text="Reset Password"
          class="button"
          wrapper="dark"
          @click="resetPassword"
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
      </div>
    </div>
  </div>
</template>

<script>
import CommonButton from "@/components/CommonButton.vue";
import CommonInput from "@/components/CommonInput.vue";
import router from "@/router/router";
import { gsap } from "gsap";
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
