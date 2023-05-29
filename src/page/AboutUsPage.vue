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
        <h1>About Us</h1>

        <section>
          <div class="card column">
            <figure>
              <img src="../assets/img/profile.svg" />
            </figure>

            <div class="card-info">
              <h2>Reha Buğrahan Özel</h2>
              <p>Front-End & Android Developer</p>
              <div>
                <a
                  href="https://www.linkedin.com/in/rehabugrahanozel/"
                  target="_blank"
                  ><img class="logo" src="../assets/img/linkedin.svg"
                /></a>

                <a href="https://github.com/RehaBugrahanOzel" target="_blank"
                  ><img class="logo" src="../assets/img/github.svg"
                /></a>
              </div>
            </div>
          </div>

          <div class="card column">
            <figure>
              <img src="../assets/img/profile.svg" />
            </figure>

            <div class="card-info">
              <h2>Ezgi Korkmaz</h2>
              <p>Front-End Developer</p>
              <div>
                <a
                  href="https://www.linkedin.com/in/ezgikorkmazz/"
                  target="_blank"
                  ><img class="logo" src="../assets/img/linkedin.svg"
                /></a>

                <a href="https://github.com/ezgikorkmazz" target="_blank"
                  ><img class="logo" src="../assets/img/github.svg"
                /></a>
              </div>
            </div>
          </div>

          <div class="card column">
            <figure>
              <img src="../assets/img/profile.svg" />
            </figure>

            <div class="card-info">
              <h2>Batuhan Metin</h2>
              <p>Back-End & Android Developer</p>
              <div>
                <a
                  href="https://www.linkedin.com/in/batuhan-metin/"
                  target="_blank"
                  ><img class="logo" src="../assets/img/linkedin.svg"
                /></a>

                <a href="https://github.com/SysOverLord" target="_blank"
                  ><img class="logo" src="../assets/img/github.svg"
                /></a>
              </div>
            </div>
          </div>

          <div class="card column">
            <figure>
              <img src="../assets/img/profile.svg" />
            </figure>

            <div class="card-info">
              <h2>Kemal Berk Barut</h2>
              <p>Back-End Developer</p>
              <div>
                <a
                  href="https://www.linkedin.com/in/kemal-berk-barut/"
                  target="_blank"
                  ><img class="logo" src="../assets/img/linkedin.svg"
                /></a>

                <a href="https://github.com/Berkbarut"
                  ><img class="logo" src="../assets/img/github.svg"
                /></a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import BurgerMenu from "@/components/BurgerMenu.vue";
import "../assets/css/style.css";
import router from "@/router/router";

export default {
  name: "AboutUsPage",
  components: {
    BurgerMenu,
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
section {
  display: flex;
  flex-flow: row wrap;
}

p {
  overflow: hidden;
}

figure {
  margin: 0px;
}

figure img {
  width: 100%;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.column {
  box-sizing: border-box;
  margin: 20px;
}
.card {
  border-radius: 8px;
  transition: all 0.25s linear;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.4);
}

.card-info {
  padding: 10px;
}

.logo {
  height: 30px;
  width: 30px;
  margin: 4px;
}
@media (min-width: 300px) {
  .column {
    flex: 0 0 calc(100% / 2 - 40px);
  }
}

@media (min-width: 500px) {
  .column {
    flex: 0 0 calc(100% / 4 - 40px);
  }
}
</style>
