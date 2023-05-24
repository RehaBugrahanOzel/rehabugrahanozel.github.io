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
        <BurgerMenu></BurgerMenu>
      </div>
      <div class="page">
        <h1>Profile</h1>
      </div>

      <div class="area">
        <div class="card">
          <div class="photo-section">
            <img class="profile-img" id="profile-img" :src="profileImage" />
            <img
              class="image-selector"
              src="../assets/img/camera-icon.svg"
              @click="selectAvatar"
            />
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
    <div class="container-wrapper" v-if="isAvatarListOpen">
      <img
        class="avatar-close-img"
        src="../assets/img/avatar_close.svg"
        @click="isAvatarListOpen = false"
      />
      <AvatarList @avatarSelected="avatarSelected"></AvatarList>
    </div>
  </div>
</template>

<script>
import BurgerMenu from "@/components/BurgerMenu.vue";
import CommonButton from "@/components/CommonButton.vue";
import AvatarList from "../components/AvatarList.vue";
import "../assets/css/style.css";
import router from "@/router/router";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

export default {
  name: "ProfilePage",
  components: {
    BurgerMenu,
    CommonButton,
    AvatarList,
  },
  data() {
    return {
      tempValue: null,
      editing: false,
      selectedFile: null,
      testText: "",
      imageSourceUrl: "",
      timer: null,
      isAvatarListOpen: false,
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
    this.getProfileImage();
  },

  mounted() {
    this.$store.dispatch("getUserPicture");
    console.log("picture name", this.$store.state.user.picture);
    this.getProfileImage(this.$store.state.user.picture);
  },

  methods: {
    goBack() {
      router.push("/home");
    },

    changePassword() {
      localStorage.setItem("isFromProfile", "true");
      router.push("/forgotPassword");
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
      this.$store.dispatch("setUserName", {
        name: this.tempValue,
      });
      this.value = this.tempValue;
      this.disableEditing();
    },
    selectAvatar() {
      console.log("avatar select opened");
      this.isAvatarListOpen = true;
    },
    avatarSelected(name) {
      console.log("avatar selected: ", name);
      this.getProfileImage(name);
      this.updateUserPic(name);
      this.isAvatarListOpen = false;
    },
    updateUserPic(name) {
      this.$store.dispatch("setProfileImg", {
        pictureName: name,
      });
    },
    async getProfileImage(name) {
      console.log("get profile image: ", name);
      const storage = getStorage();
      getDownloadURL(ref(storage, "Avatars/" + name))
        .then((url) => {
          // This can be downloaded directly:
          const xhr = new XMLHttpRequest();
          xhr.responseType = "blob";
          // eslint-disable-next-line
          xhr.onload = (event) => {
            // eslint-disable-next-line
            const blob = xhr.response;
          };
          xhr.open("GET", url);
          xhr.send();

          // Or inserted into an <img> element
          //const img = document.getElementById("profile-img");
          this.imageSourceUrl = url;
          //img.setAttribute("src", url);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  computed: {
    userName() {
      return this.$store.state.user.name;
    },
    userEmail() {
      return this.$store.state.user.email;
    },
    profileImage() {
      return this.imageSourceUrl;
    },
  },
  beforeUnmount() {
    clearInterval(this.timer);
  },
};
</script>

<style scoped>
.container-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  position: absolute;
  top: 200px;
  background-color: #1e232c7a;
  margin: 0 20px;
}

.avatar-close-img {
  width: 40px;
  height: 40px;
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

.profile-img {
  border-radius: 8px;
  margin: 10px;
  overflow: hidden;
  height: 300px;
  width: 302px;
  position: relative;
  object-fit: cover;
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

.image-selector {
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
