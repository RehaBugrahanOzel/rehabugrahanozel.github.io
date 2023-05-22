<template>
  <label class="file-select">
    <div class="select-button">
      <img class="image-selector" src="../assets/img/camera-icon.svg" />
    </div>
    <input type="file" @change="handleFileChange" accept="image/*" />
  </label>
</template>

<script>
export default {
  props: {
    value: File,
  },

  methods: {
    handleFileChange(e) {
      this.$emit("input", e.target.files[0]);
    },
  },
};
</script>

<style scoped>
.file-select > .select-button {
  width: 30px;
  height: 30px;

  color: white;

  border-radius: 0.3rem;

  text-align: center;
  font-weight: bold;
}
.image-selector {
  width: 30px;
  height: 30px;
}

.file-select > input[type="file"] {
  display: none;
}
</style>
