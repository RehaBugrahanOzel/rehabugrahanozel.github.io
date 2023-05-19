<template>
  <div class="color">
    <div class="verification">
      <div class="header">
        <img
          src="../assets/img/back-button.svg"
          alt="back-button"
          class="back-button"
          @click="goBack"
        />
      </div>
      <div class="text">OTP Verification</div>
      <div class="sub-text">
        Enter the verification code we just sent on your email address.
      </div>

      <!---->
      <div style="display: flex; flex-direction: row">
        <input
          type="text"
          class="otp-input"
          maxlength="1"
          oninput="this.value=this.value.replace(/[^0-9]/g,'');
        document.getElementById('num2').focus();"
          id="num1"
        />
        <input
          type="text"
          class="otp-input"
          maxlength="1"
          oninput="this.value=this.value.replace(/[^0-9]/g,''); document.getElementById('num3').focus();"
          id="num2"
        />
        <input
          type="text"
          class="otp-input"
          maxlength="1"
          oninput="this.value=this.value.replace(/[^0-9]/g,''); document.getElementById('num4').focus();"
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

      <!---->
      <CommonButton
        text="Verify"
        class="button"
        wrapper="dark"
        @click="verify"
      />

      <div class="footer">
        <img
          src="../assets/img/logo-mini.svg"
          alt="logo-mini"
          class="logo-mini"
        />

        <div class="footer-text">
          Didn't received code?
          <a @click="resend" style="color: #35c2c1">Resend</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CommonButton from "@/components/CommonButton.vue";
import router from "@/router/router";

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
  },
  mounted() {
    this.focusInputFirst();
    console.log(document.querySelector("num2"));
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
.verification {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 7px;
  font-family: "Arial";
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
.otp-input {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  margin: 0 5px;
  text-align: center;
  font-size: 20px;
}
</style>
