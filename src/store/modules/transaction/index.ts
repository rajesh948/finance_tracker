interface transactionInterface {
  id: number;
  userId: number;
  date: string;
  monthYear: string;
  type: string;
  fromAccount: string;
  toAccount: string;
  amount: number;
  receipt: string;
  notes: string;
}

export const transaction = {
  namespaced: true,
  state() {
    return {
      transactionList: null,
    };
  },
  getters: {
    getTransactionList(state: { transactionList: object | null }) {
      return state.transactionList;
    },
  },
  mutations: {
    SET_TRANSACTION_LIST(
      state: { transactionList: Array<object> | null },
      transaction: object | Array<object>
    ) {
      if (Array.isArray(transaction)) {
        state.transactionList = transaction;
      } else if (typeof transaction === "object") {
        if (!state.transactionList) {
          state.transactionList = [];
        }
        state.transactionList?.push(transaction);
      } else {
        state.transactionList = transaction;
      }
    },
    UPDATE_TRANSACTION_LIST(
      state: { transactionList: Array<transactionInterface> },
      transaction: transactionInterface
    ) {
      const index = state.transactionList?.findIndex(
        (tran) => tran.id === transaction.id
      );
      state.transactionList.splice(index, 1, transaction);
    },
    DELETE_TRANSACTION_LIST(
      state: { transactionList: Array<transactionInterface> },
      transactionId: number
    ) {
      const index = state.transactionList?.findIndex(
        (tran) => tran.id === transactionId
      );
      state.transactionList.splice(index, 1);
    },
  },
  actions: {
    addTransactionList(
      { commit }: unknown,
      transaction: object | Array<object>
    ) {
      commit("SET_TRANSACTION_LIST", transaction);
    },
    updateTransactionList({ commit }: unknown, transaction: object) {
      commit("UPDATE_TRANSACTION_LIST", transaction);
    },
    deleteTransactionList({ commit }: unknown, transactionId: number) {
      commit("DELETE_TRANSACTION_LIST", transactionId);
    },
  },
};
