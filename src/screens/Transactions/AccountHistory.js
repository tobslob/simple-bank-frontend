import React, { useEffect, useState } from "react";
import Option from "src/screens/Transactions/Option";
import RecentTransactions from "src/screens/Transactions/RecentTransactions";
import "src/screens/Transactions/transactions.scss";
import { useTransactionsContext } from "src/contexts/TransactionsProvider";
import { useTransferModal } from "src/screens/Dashboard/TransferModal";

const AccountHistory = () => {
  const { transactions, getTransactions } = useTransactionsContext();
  console.log("transactions", transactions);
  const [modal, setModal] = useState(false);
  useEffect(() => {
    getTransactions();
  }, []);
  const transferModal = useTransferModal({ setModal, modal });

  return (
    <div className="account-history">
      <h1 className="text-2xl my-2">Money Withdrawn</h1>
      <Option
        onTransfer={() => {
          setModal(!modal);
        }}
      />
      {transferModal}
      <RecentTransactions transactions={transactions} />
    </div>
  );
};

export default AccountHistory;
