<template>
  <div class="flex-container" v-for="item in avatarList" :key="item">
    <div class="avatar" @click="selectAvatar(item)">
      <img :src="item.src" class="img" />
    </div>
  </div>
</template>

<script>
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
export default {
  name: "AvatarList",
  data() {
    return {
      avatarList: [],
    };
  },
  mounted() {
    this.getProfileImage();
  },
  methods: {
    selectAvatar(item) {
      this.$emit("avatarSelected", item.name);
    },
    async getProfileImage() {
      const storage = getStorage();
      const listRef = ref(storage, "Avatars/");
      listAll(listRef).then((res) => {
        res.items.forEach((itemRef) => {
          getDownloadURL(itemRef)
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
              this.avatarList.push({
                name: itemRef.name,
                src: url,
              });
              //img.setAttribute("src", url);
            })
            .catch((error) => {
              console.log(error);
            });
        });
      });
    },
  },
};
</script>

<style scoped>
.flex-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  align-content: flex-start;
  overflow: auto;
  flex-direction: row;
}
.avatar {
  display: flex;
  border-radius: 8px;
  font-family: "Arial";
  font-style: normal;
  font-weight: 600;
  font-size: 36px;
  background-color: #1e232c;
  color: #ffffff;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  align-content: center;
  padding: 5px;
  width: 50px;
  height: 50px;
  margin: 5px;
}
.img {
  width: 50px;
  height: 50px;
}
</style>
