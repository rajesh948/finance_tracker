import store from "@/store/index";
import {
  fetchAllRegisterUserList,
  logoutUser,
  fetchUserTransaction,
} from "@/services";

if (localStorage.getItem("token")) {
  const loginUserData = fetchAllRegisterUserList()?.find(
    (user: { active: boolean }) => user.active === true
  );
  store.dispatch("user/addLoginUserData", loginUserData);

  store.dispatch(
    "transaction/addTransactionList",
    fetchUserTransaction(loginUserData.id)
  );
} else {
  logoutUser();
}
