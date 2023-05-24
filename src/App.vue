<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: "App",
  async beforeMount() {
    await this.$store.dispatch("fetchUser");
    await this.$store.dispatch("getUserPicture");
  },
};
</script>

<style></style>
