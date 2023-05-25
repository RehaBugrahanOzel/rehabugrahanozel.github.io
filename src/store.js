import { createStore } from "vuex";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { setDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { db } from "./firebaseConfig";
import router from "./router/router";
const store = createStore({
  state: {
    user: {
      loggedIn: false,
      data: null,
      email: null,
      name: null,
      picture: null,
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
    SET_USER_PICTURE(state, value) {
      state.user.picture = value;
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
        await setDoc(doc(db, "profiles", response.user.uid), {
          name: name,
          email: email,
          pictureName: "avatar-4.svg",
        });
        context.commit("SET_USER", response.user);
        context.commit("SET_USER_EMAIL", email);
        context.commit("SET_USER_PICTURE", "avatar-4.svg");
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

    async googleLogIn(context) {
      const provider = new GoogleAuthProvider();

      const auth = getAuth();
      await signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          //const credential = GoogleAuthProvider.credentialFromResult(result);
          //const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          context.commit("SET_USER", user);
          // IdP data available using getAdditionalUserInfo(result)
          // ...

          return true;
        })
        .catch((error) => {
          console.log(error);
        });
      return false;
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
      var data = (await getDoc(doc(db, "profiles", currentUser.uid))).data();
      context.commit("SET_USER_NAME", data.name);
    },
    async getUserEmail(context) {
      var currentUser = getAuth().currentUser;
      var data = (await getDoc(doc(db, "profiles", currentUser.uid))).data();
      context.commit("SET_USER_EMAIL", data.email);
    },
    async getUserPicture(context) {
      var currentUser = getAuth().currentUser;
      var data = (await getDoc(doc(db, "profiles", currentUser.uid))).data();
      context.commit("SET_USER_PICTURE", data.pictureName);
    },
    async setUserName(context, { name }) {
      var currentUser = getAuth().currentUser;
      await updateDoc(doc(db, "profiles", currentUser.uid), {
        name: name,
      });
      context.commit("SET_USER_NAME", name);
    },
    async setProfileImg(context, { pictureName }) {
      const userId = getAuth().currentUser.uid;
      const ref = doc(db, "profiles", userId);
      await updateDoc(ref, {
        pictureName: pictureName,
      });
      context.commit("SET_USER_PICTURE", pictureName);
    },
    async uploadUserPicture(file) {
      var storage = getStorage();
      var imageRef = ref(storage, "images/" + file.name);
      uploadBytesResumable(imageRef, file)
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

export default store;
