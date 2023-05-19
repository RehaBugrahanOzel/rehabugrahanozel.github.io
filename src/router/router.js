import HomePage from "../page/HomePage.vue";
import InitialPage from "../page/InitialPage.vue";
import ForgotPassword from "@/page/ForgotPassword.vue";
import ProfilePage from "../page/ProfilePage.vue";
import VerificationPage from "@/page/VerificationPage.vue";
import SettingPage from "../page/SettingPage.vue";
import CreateNewPasswordPage from "@/page/CreateNewPasswordPage.vue";
import PasswordChangedPage from "@/page/PasswordChangedPage.vue";

import { createRouter, createWebHistory } from "vue-router";

const routers = [
  {
    path: "/",
    component: InitialPage,
    name: "initial-page",
  },
  {
    path: "/home",
    component: HomePage,
    name: "home-page",
  },
  {
    path: "/forgotPassword",
    component: ForgotPassword,
    name: "forgot-password-page",
  },
  {
    path: "/profile",
    component: ProfilePage,
    name: "profile-page",
  },
  {
    path: "/settings",
    component: SettingPage,
    name: "settings-page",
  },
  {
    path: "/verification",
    component: VerificationPage,
    name: "verification-page",
  },

  {
    path: "/createNewPassword",
    component: CreateNewPasswordPage,
    name: "create-new-password-page",
  },
  {
    path: "/passwordChanged",
    component: PasswordChangedPage,
    name: "password-changed-page",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routers,
});

export default router;
