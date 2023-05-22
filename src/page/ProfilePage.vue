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
        <h1>Profile Page</h1>
      </div>

      <div class="area">
        <div class="card">
          <div class="photo-section">
            <img class="profile-img" src="../assets/img/profile.svg" />
            <!-- <img class="image-selector" src="../assets/img/camera-icon.svg" /> -->
            <ImageInput
              class="image-selector"
              @input="handleFileChange"
            ></ImageInput>
          </div>
          <div class="container">
            <div v-if="!editing">
              <span class="username">{{ userName }}</span>
              <img
                class="edit-username"
                @click="enableEditing"
                src="../assets/img/pen-icon.svg"
              />
            </div>

            <div class="edit-save-cancel" v-if="editing">
              <input v-model="tempValue" class="input" />
              <img
                class="selection-icon"
                src="../assets/img/cancel-icon.svg"
                @click="disableEditing"
              />
              <img
                class="selection-icon"
                src="../assets/img/save-icon.svg"
                @click="saveEdit"
              />
            </div>
            <br />
            <div class="information">{{ userEmail }}</div>
          </div>
        </div>

        <CommonButton
          text="Change Password"
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
import CommonButton from "@/components/CommonButton.vue";
import ImageInput from "../components/ImageInput.vue";
import "../assets/css/style.css";
import router from "@/router/router";

export default {
  name: "ProfilePage",
  components: {
    BurgerMenu,
    CommonButton,
    ImageInput,
  },
  data() {
    return {
      tempValue: null,
      editing: false,
      selectedFile: null,
    };
  },
  async created() {
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = function () {
      window.history.pushState(null, "", window.location.href);
    };
    this.$store.dispatch("getUserName");
    this.$store.dispatch("getUserEmail");
    console.log("userdata", this.$store.state.user.data);
    console.log("username", this.$store.state.user.email);
  },

  methods: {
    goBack() {
      router.push("/home");
    },

    changePassword() {
      router.push("/verification");
    },
    enableEditing: function () {
      this.tempValue = this.userName;
      this.editing = true;
    },
    disableEditing: function () {
      this.tempValue = null;
      this.editing = false;
    },
    saveEdit: function () {
      // However we want to save it to the database
      //this.$store.dispatch("setUserName", this.tempValue);
      this.value = this.tempValue;
      this.disableEditing();
    },
    handleFileChange(e) {
      this.selectedFile = e;
      console.log("file that emitted", this.selectedFile);
      this.uploadSelectedImage(this.selectedFile);
    },
    uploadSelectedImage(file) {
      console.log("file that will be uploaded", file);
      this.$store.dispatch("uploadUserPicture", file);
    },
  },
  computed: {
    userName() {
      return this.$store.state.user.name;
    },
    userEmail() {
      return this.$store.state.user.email;
    },
  },
};
</script>

<style>
.page-image {
  max-width: 360px;
  max-height: 162px;
  margin-bottom: 49px;
}

.flex-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  align-content: flex-start;
  overflow: auto;
  flex-direction: row;
}

.container-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 80%;
  border-radius: 5px;
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin: 10px;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.profile-img {
  border-radius: 8px;
  margin: 10px;
  overflow: hidden;
  height: 300px;
  position: relative;
}

.container {
  padding: 2px 16px;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.area {
  display: flex;
  flex-direction: column;
  align-content: center;
  flex-wrap: wrap;
}

.username {
  font-size: 24px;
  font-weight: bold;
}

.edit-username {
  width: 20px;
  height: 20px;
  margin-left: 4px;
}

.photo-section {
  position: relative;
}

.photo-section > .image-selector {
  width: 30px;
  height: 30px;
  position: absolute;
  top: 280px;
  left: 280px;
}

.selection-icon {
  width: 30px;
  height: 30px;
  margin: 4px;
}

/**/

.input {
  position: relative;
  margin: auto;
  max-width: 180px;
  border-radius: 8px;
  overflow: hidden;
  border: 0;
  padding: 10px 12px 2px 12px;
  height: 20px;
  font-size: 16px;
  font-weight: 400;
  background: white;
  box-shadow: inset 0 -1px 0;
  color: black;
  transition: all 0.15s ease;
}

input:focus {
  outline: none;
  box-shadow: inset 0 -2px 0 black;
}

.edit-save-cancel {
  display: flex;
  align-items: center;
}
</style>
