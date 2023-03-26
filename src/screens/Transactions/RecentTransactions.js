import React from "react";
import Transaction from "src/screens/Transactions/Transaction";

const RecentTransactions = ({ transactions = [] }) => {
  console.log("transaction", transactions);
  return (
    <div className="recent-transactions">
      <div className="recent-trans-heading">
        <h5>Recent Transactions</h5>
        {!!transactions?.length && <button>See all</button>}
      </div>
      {(!!transactions?.length &&
        transactions.map((el) => (
          <>
            <Transaction transaction={el} />
          </>
        ))) || (
        <div className="py-6 flex w-full min-h-[300px] justify-center items-center">
          No Transactions
        </div>
      )}
    </div>
  );
};

export default RecentTransactions;
