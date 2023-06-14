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

        <p class="text-box">
          <!-- <i style="color: rgb(53, 194, 193)">SUCCESSFUL</i> -->
          Success Rate<br />
          {{ result }}
        </p>

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
import https from "https";

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
  async created() {
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false,
    });
    await axios
      .get("https://172.20.10.4:5000/result", { httpsAgent })
      .then((response) => {
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
  padding: 12px;
  font-size: 22px;
  border-width: 5px;
  border-color: #8391a1;
  background-color: #181c25;
  color: #ffffff;
  border-style: double;
  border-radius: 8px;
  box-shadow: #8391a1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 150px;
  line-height: 50px;
  font-weight: bold;
  flex-direction: column;
}
.button {
  width: 80%;
  max-width: 330px;
  height: 56px;
  margin-top: 7%;
}
</style>
