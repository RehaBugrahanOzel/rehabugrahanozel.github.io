import { createStore } from "vuex";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import router from "./router/router";
const store = createStore({
  state: {
    user: {
      loggedIn: false,
      data: null,
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
  },
  actions: {
    async register(context, { email, password }) {
      const response = await createUserWithEmailAndPassword(
        getAuth(),
        email,
        password
      );
      if (response) {
        context.commit("SET_USER", response.user);
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
  },
});

// export the store
export default store;
