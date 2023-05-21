<template>
  <router-view></router-view>
  <!--<InitialPage />-->
</template>

<script>
// import InitialPage from "./page/InitialPage.vue";
// import HomePage from "./page/HomePage.vue";
export default {
  name: "App",
  async beforeMount() {
    await this.$store.dispatch("fetchUser");
  },
  // components: {
  //   InitialPage,
  //   HomePage,
  // },
};
</script>

<style></style>
