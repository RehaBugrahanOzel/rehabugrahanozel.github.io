<template>
  <div class="initial">
    <div>
      <!-- <img
        src="../assets/img/back-button.svg"
        alt="back-button"
        class="back-button"
        @click="goBack"
      /> -->
      <div class="burger-button">
        <!--<img src="../assets/img/hamburger-icon.svg" class="element" />-->
        <BurgerMenu></BurgerMenu>
      </div>

      <div class="page">
        <h1>Results</h1>

        <p class="text-box">{{ result }}</p>

        <CommonButton
          text="Menu"
          class="button"
          wrapper="dark"
          @click="goBack"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BurgerMenu from "@/components/BurgerMenu.vue";
import "../assets/css/style.css";
import router from "@/router/router";
import CommonButton from "@/components/CommonButton.vue";
import axios from "axios";

export default {
  name: "ResultPage",
  components: {
    BurgerMenu,
    CommonButton,
  },
  data() {
    return {
      result: "",
    };
  },
  created() {
    axios.get("http://192.168.1.12:5000/result").then((response) => {
      const json = JSON.parse(response.data);
      const jsonResult = json.Result;
      this.result = jsonResult;
      console.log("response", response);
      console.log("response parsed", json);
      console.log("(response parsed).Result", jsonResult);
    });
  },
  methods: {
    goBack() {
      router.push("/home");
    },
  },
};
</script>

<style scoped>
.text-box {
  width: 60%;
  padding: 6px;
  font-size: 16px;
  border-width: 5px;
  border-color: #8391a1;
  background-color: #181c25;
  color: #ffffff;
  border-style: double;
  border-radius: 8px;
  box-shadow: #8391a1;
}
.button {
  width: 80%;
  max-width: 330px;
  height: 56px;
  margin-top: 7%;
}
</style>
