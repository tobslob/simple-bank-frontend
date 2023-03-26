import React from "react";
import Account from "src/screens/AccountDetails";
import Overview from "src/screens/Overview";
import AccountHistory from "src/screens/Transactions/AccountHistory";
import "src/screens/Dashboard/index.scss";
import TransactionsProvider from "src/contexts/TransactionsProvider";
import TransferProvider from "src/contexts/TransferProvider";

const MainContent = () => {
  return (
    <div className="main-content">
      <div className="right-section">
        <TransactionsProvider>
          <TransferProvider>
            <Overview />
            <AccountHistory />
          </TransferProvider>
        </TransactionsProvider>
      </div>
      <Account />
    </div>
  );
};

export default MainContent;
