import { createStore } from "vuex";
import { user } from "./modules/user";
import { transaction } from "./modules/transaction";
const store = createStore({
  modules: { user: user as object, transaction: transaction as object },
});

export default store;
