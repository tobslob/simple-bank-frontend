import React, { useContext, useState } from "react";
import { transactionService } from "src/services/transaction.service";

const TransactionsContext = React.createContext();

export const TransactionsConsumer = TransactionsContext.Consumer;

const Provider = TransactionsContext.Provider;

const TransactionsProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageLimit, setPageLimit] = useState(30);

  const getTransactions = (
    params = { page: pageIndex, limit: pageLimit },
    onComplete
  ) => {
    setLoading(true);
    transactionService
      .getTransactions(params)
      .then((res) => {
        setLoading(false);
        console.log("res transactions", res);
        setTransactions(res?.data);
        onComplete && onComplete(res);
      })
      .catch((e) => {
        setLoading(false);
        console.log("e", e);
      });
  };

  const value = {
    getTransactions,
    loading,
    pageIndex,
    pageLimit,
    transactions,
    setPageIndex,
    setPageLimit,
  };
  return <Provider value={value}>{children}</Provider>;
};
export function useTransactionsContext() {
  const context = useContext(TransactionsContext);
  if (!context) {
    throw new Error("Wrap component in context ");
  }

  return context;
}

export default TransactionsProvider;
