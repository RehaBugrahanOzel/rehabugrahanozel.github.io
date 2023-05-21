<template>
  <div class="outer">
    <div class="text">{{ questionText }}</div>
    <div class="buttons">
      <button class="decline" @click="decline">{{ declineText }}</button>
      <button class="confirm" @click="confirm">{{ confirmText }}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "PopUp",
  props: {
    questionText: String,
    confirmText: String,
    declineText: String,
  },
  methods: {
    decline() {
      this.$emit("decline");
    },
    confirm() {
      this.$emit("confirm");
    },
  },
};
</script>

<style scoped>
.outer {
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 8px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.text {
  color: white;
  font-family: "Arial";
}
.buttons {
  display: flex;
  flex-direction: row;
  width: fit-content;
  margin-top: 10px;
}
.decline {
  width: 100px;
  height: 30px;
  margin: 0 10px;
  border-radius: 8px;
  background-color: antiquewhite;
}
.confirm {
  width: 100px;
  height: 30px;
  margin: 0 10px;
  color: red;
  background-color: lightcoral;
  border-radius: 8px;
}
</style>
