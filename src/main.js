import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/router";
import VueVideoPlayer from "@videojs-player/vue";
import "video.js/dist/video-js.css";
import "../node_modules/nprogress/nprogress.css";
import store from "./store";
// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4NGUMKb5Jd089gHUJR2a53IbrsZw3tkY",
  authDomain: "posturefix-1f17b.firebaseapp.com",
  databaseURL:
    "https://posturefix-1f17b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "posturefix-1f17b",
  storageBucket: "posturefix-1f17b.appspot.com",
  messagingSenderId: "172248556699",
  appId: "1:172248556699:web:3a65c5afc34380f073123e",
  measurementId: "G-3NCRVFHLTW",
};
const firebase = initializeApp(firebaseConfig);
const db = getFirestore(firebase);
//initialize firebase auth
const auth = getAuth();
const app = createApp(App);
app.use(router).use(VueVideoPlayer).use(store).mount("#app");

export { auth, db };
