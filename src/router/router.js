import { createRouter, createWebHistory } from "vue-router";
import NProgress from "nprogress";
import { getAuth } from "firebase/auth";

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
    meta: {
      requiresAuth: true,
    },
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
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/settings",
    component: () => import("../page/SettingPage.vue"),
    name: "settings-page",
    meta: {
      requiresAuth: true,
    },
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
  mode: "history",
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

router.beforeEach((to, from, next) => {
  if (to.path === "/" && getAuth().currentUser) {
    next("/Home");
    return;
  }
  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !getAuth().currentUser
  ) {
    next("/");
    return;
  }
  next();
});
export default router;
