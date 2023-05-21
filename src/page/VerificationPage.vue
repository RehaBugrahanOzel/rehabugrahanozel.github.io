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
        <div class="text-head">OTP Verification</div>
      </transition>
      <transition
        appear
        @before-enter="beforeEnterTop"
        @enter="enterTop"
        id="eod"
      >
        <div class="sub-text">
          Enter the verification code we just sent on your email address.
        </div>
      </transition>

      <!---->
      <transition
        appear
        @before-enter="beforeEnterBot"
        @enter="enterTop"
        id="eod"
      >
        <div style="display: flex; flex-direction: row">
          <input
            type="text"
            class="otp-input"
            maxlength="1"
            oninput="this.value=this.value.replace(/[^0-9]/g,''); if(this.value=this.value.replace(/[^0-9]/g,'')){document.getElementById('num2').focus()}"
            id="num1"
          />
          <input
            type="text"
            class="otp-input"
            maxlength="1"
            oninput="this.value=this.value.replace(/[^0-9]/g,''); if(this.value=this.value.replace(/[^0-9]/g,'')){document.getElementById('num3').focus()}"
            id="num2"
          />
          <input
            type="text"
            class="otp-input"
            maxlength="1"
            oninput="this.value=this.value.replace(/[^0-9]/g,'');  if(this.value=this.value.replace(/[^0-9]/g,'')){document.getElementById('num4').focus()}"
            id="num3"
          />
          <input
            type="text"
            class="otp-input"
            maxlength="1"
            oninput="this.value=this.value.replace(/[^0-9]/g,'');"
            id="num4"
          />
        </div>
      </transition>

      <!---->
      <transition
        appear
        @before-enter="beforeEnterBot"
        @enter="enterTop"
        id="eod"
      >
        <CommonButton
          text="Verify"
          class="button"
          wrapper="dark"
          @click="verify"
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
            Didn't received code?
            <a @click="resend" style="color: #35c2c1">Resend</a>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import CommonButton from "@/components/CommonButton.vue";
import router from "@/router/router";
import { gsap } from "gsap";

export default {
  name: "VerificationPage",

  components: {
    CommonButton,
  },

  data() {
    return {};
  },

  methods: {
    goBack() {
      router.push("/forgotPassword");
    },
    verify() {
      var num1 = document.getElementById("num1").value;
      var num2 = document.getElementById("num2").value;
      var num3 = document.getElementById("num3").value;
      var num4 = document.getElementById("num4").value;
      var otpCode = num1 + num2 + num3 + num4;
      console.log("otp code is: ", otpCode);
      router.push("/createNewPassword");
    },
    resend() {},
    focusInputFirst() {
      document.getElementById("num1").focus();
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
  mounted() {
    this.focusInputFirst();
    console.log(document.querySelector("num2"));
  },
};
</script>

<style scoped>
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

.otp-input {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  margin: 0 5px;
  text-align: center;
  font-size: 20px;
}
</style>
