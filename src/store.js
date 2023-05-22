import { createStore } from "vuex";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { db } from "./firebaseConfig";
import router from "./router/router";
import { metadata } from "core-js/actual/reflect";
const store = createStore({
  state: {
    user: {
      loggedIn: false,
      data: null,
      email: null,
      name: null,
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_USER(state, data) {
      state.user.data = data;
    },
    SET_USER_NAME(state, value) {
      state.user.name = value;
    },
    SET_USER_EMAIL(state, value) {
      state.user.email = value;
    },
  },
  actions: {
    async register(context, { email, password, name }) {
      const response = await createUserWithEmailAndPassword(
        getAuth(),
        email,
        password
      );
      if (response) {
        console.log(this.user);
        console.log(response.user.uid);
        console.log(name);
        await setDoc(doc(db, "profiles", response.user.uid), {
          name: name,
          email: email,
        });
        context.commit("SET_USER", response.user);
        context.commit("SET_USER_EMAIL", email);
      } else {
        throw new Error("Unable to register user");
      }
    },

    async logIn(context, { email, password }) {
      const response = await signInWithEmailAndPassword(
        getAuth(),
        email,
        password
      );
      if (response) {
        context.commit("SET_USER", response.user);
      } else {
        throw new Error("login failed");
      }
    },

    async logOut(context) {
      await signOut(getAuth());
      context.commit("SET_USER", null);
    },

    async fetchUser(context) {
      getAuth().onAuthStateChanged(async (user) => {
        if (user == null) {
          context.commit("SET_USER", null);
        } else {
          context.commit("SET_USER", user);
          if (router.isReady() && router.currentRoute.value.path === "/") {
            router.push("/Home");
          }
        }
      });
    },
    async getUserName(context) {
      var currentUser = getAuth().currentUser;
      console.log("current user", currentUser);
      var data = (await getDoc(doc(db, "profiles", currentUser.uid))).data();
      console.log("data", data);
      context.commit("SET_USER_NAME", data.name);
    },
    async getUserEmail(context) {
      var currentUser = getAuth().currentUser;
      console.log("current user", currentUser);
      var data = (await getDoc(doc(db, "profiles", currentUser.uid))).data();
      console.log("data", data);
      context.commit("SET_USER_EMAIL", data.email);
    },
    async setUserName(context, { userName }) {
      var currentUser = getAuth().currentUser;
      await setDoc(doc(db, "profiles", currentUser.uid), {
        name: userName,
      });
      context.commit("SET_USER_NAME", name);
    },
    async uploadUserPicture(file) {
      var currentUser = getAuth().currentUser;
      var storage = getStorage();
      var imageRef = ref(storage, "images/" + currentUser.uid + ".jpeg");
      uploadBytesResumable(imageRef, file, metadata)
        .then((snapshot) => {
          console.log("Uploaded", snapshot.totalBytes, "bytes.");
          console.log("File metadata:", snapshot.metadata);
          getDownloadURL(snapshot.ref).then((url) => {
            console.log("File available at", url);
          });
        })
        .catch((error) => {
          console.error("Upload failed", error);
        });
    },
  },
});

// export the store
export default store;
