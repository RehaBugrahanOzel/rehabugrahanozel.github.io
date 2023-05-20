import { createRouter, createWebHistory } from "vue-router";
import NProgress from "nprogress";

const routers = [
  {
    path: "/",
    component: () => import("../page/InitialPage.vue"),
    name: "initial-page",
  },
  {
    path: "/home",
    component: () => import("../page/HomePage.vue"),
    name: "home-page",
  },
  {
    path: "/forgotPassword",
    component: () => import("@/page/ForgotPassword.vue"),
    name: "forgot-password-page",
  },
  {
    path: "/profile",
    component: () => import("../page/ProfilePage.vue"),
    name: "profile-page",
  },
  {
    path: "/settings",
    component: () => import("../page/SettingPage.vue"),
    name: "settings-page",
  },
  {
    path: "/verification",
    component: () => import("@/page/VerificationPage.vue"),
    name: "verification-page",
  },

  {
    path: "/createNewPassword",
    component: () => import("@/page/CreateNewPasswordPage.vue"),
    name: "create-new-password-page",
  },
  {
    path: "/passwordChanged",
    component: () => import("@/page/PasswordChangedPage.vue"),
    name: "password-changed-page",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routers,
});

router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
    // Start the route progress bar.
    NProgress.start();
  }
  next();
});

router.afterEach(() => {
  // Complete the animation of the route progress bar.
  NProgress.done();
});

export default router;
