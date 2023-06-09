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

export const fetchAllTransaction = () => {
  const transactionList = localStorage.getItem("transactionList");
  if (transactionList) return JSON.parse(transactionList);
};

export const fetchUserTransaction = (userId: number) => {
  return fetchAllTransaction()?.filter(
    (transaction: transactionInterface) => transaction.userId === userId
  );
};

export const addTransaction = (transaction: transactionInterface) => {
  const transactionList = fetchAllTransaction() || [];
  transactionList.push(transaction);
  localStorage.setItem("transactionList", JSON.stringify(transactionList));
};

export const editTransaction = (transaction: transactionInterface) => {
  const transactionList = fetchAllTransaction() || [];
  const index = transactionList.findIndex(
    (tran: transactionInterface) => tran.id === transaction.id
  );
  transactionList.splice(index, 1, transaction);
  localStorage.setItem("transactionList", JSON.stringify(transactionList));
};
export const deleteTransaction = (transactionId: number) => {
  const transactionList = fetchAllTransaction() || [];
  const index = transactionList.findIndex(
    (tran: transactionInterface) => tran.id === transactionId
  );
  transactionList.splice(index, 1);
  localStorage.setItem("transactionList", JSON.stringify(transactionList));
};
