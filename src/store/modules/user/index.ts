export const user = {
  namespaced: true,
  state() {
    return {
      loginUserData: null,
    };
  },
  getters: {
    getLoginUserData(state: { loginUserData: object | null }) {
      return state.loginUserData;
    },
  },
  mutations: {
    SET_LOGIN_USER_DATA(
      state: { loginUserData: object | null },
      userData: object | null
    ) {
      state.loginUserData = userData;
    },
  },
  actions: {
    addLoginUserData({ commit }: unknown, userData: object | null) {
      commit("SET_LOGIN_USER_DATA", userData);
    },
  },
};
