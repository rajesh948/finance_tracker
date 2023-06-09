import { RouteLocationNormalized, NavigationGuardNext } from "vue-router";

export const pageGard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  return localStorage.getItem("token") ? next() : next({ name: "login" });
};
export const loginAndRegistrationGard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  return localStorage.getItem("token")
    ? next({ name: "viewAllTransactions" })
    : next();
};
