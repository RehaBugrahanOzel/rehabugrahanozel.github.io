// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC4NGUMKb5Jd089gHUJR2a53IbrsZw3tkY",
  authDomain: "posturefix-1f17b.firebaseapp.com",
  projectId: "posturefix-1f17b",
  storageBucket: "posturefix-1f17b.appspot.com",
  messagingSenderId: "172248556699",
  appId: "1:172248556699:web:3a65c5afc34380f073123e",
  measurementId: "G-3NCRVFHLTW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//initialize firebase auth
const auth = getAuth();

export { app, auth };
