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
        <div class="text-head">Please Wait!</div>
      </transition>

      <transition
        appear
        @before-enter="beforeEnterTop"
        @enter="enterTop"
        id="eod"
      >
        <div class="sub-text">You are redirected to the page.</div>
      </transition>

      <Spinner />

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
import Spinner from "../components/SpinnerComponent.vue";
import router from "@/router/router";
import { gsap } from "gsap";

export default {
  name: "VerificationPage",
  components: { Spinner },

  methods: {
    goBack() {
      router.push("/forgotPassword");
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
  },
};
</script>

<style></style>
