<template>
  <div class="initial">
    <div>
      <img
        src="../assets/img/back-button.svg"
        alt="back-button"
        class="back-button"
        @click="goBack"
      />
      <div class="burger-button">
        <!--<img src="../assets/img/hamburger-icon.svg" class="element" />-->
        <BurgerMenu></BurgerMenu>
      </div>

      <div class="page">
        <h1>Results</h1>

        <p class="text-box">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. A, id harum
          dolores minima beatae excepturi laboriosam maiores placeat perferendis
          dolorem fuga dolore deleniti architecto saepe corporis non tenetur
          culpa error numquam itaque quidem cupiditate. Velit ex nesciunt,
          necessitatibus odio neque minima enim qui unde quasi excepturi. Quia
          obcaecati corrupti exercitationem?
        </p>

        <CommonButton
          text="Menu"
          class="button"
          wrapper="dark"
          @click="changePassword"
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

export default {
  name: "ResultPage",
  components: {
    BurgerMenu,
    CommonButton,
  },
  data() {
    return {};
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
</style>
