import { createRouter, createWebHistory } from "vue-router";

import addTransactionPage from "@/pages/transaction/add-transaction-page.vue";
import editTransactionPage from "@/pages/transaction/edit-transaction-page.vue";
import viewAllTransactionPage from "@/pages/transaction/view-all-transaction-page.vue";
import viewTransactionPage from "@/pages/transaction/view-transaction-page.vue";
import userLogin from "@/pages/user/user-login-page.vue";
import userRegister from "@/pages/user/user-register-page.vue";
import pageNotFound from "@/pages/page-not-found/page-not-found-page.vue";
import { pageGard, loginAndRegistrationGard } from "./routerGard/routerGard";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: { name: "viewAllTransactions" },
    },
    {
      name: "viewAllTransactions",
      path: "/transactions",
      component: viewAllTransactionPage,
      beforeEnter: pageGard,
    },
    {
      name: "viewTransaction",
      path: "/transaction/:transactionId",
      component: viewTransactionPage,
      beforeEnter: pageGard,
    },

    {
      name: "addTransaction",
      path: "/transactions/create",
      component: addTransactionPage,
      beforeEnter: pageGard,
    },
    {
      name: "editTransaction",
      path: "/transactions/edit/:transactionId",
      component: editTransactionPage,
      beforeEnter: pageGard,
    },
    {
      name: "login",
      path: "/login",
      component: userLogin,
      beforeEnter: loginAndRegistrationGard,
    },
    {
      name: "register",
      path: "/register",
      component: userRegister,
      beforeEnter: loginAndRegistrationGard,
    },

    {
      name: "pageNotFound",
      path: "/:pageNotFound(.*)*",
      redirect: { name: "404Page" },
    },
    {
      name: "404Page",
      path: "/404",
      component: pageNotFound,
    },
  ],
});

export default router;
