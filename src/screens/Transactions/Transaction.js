import React from "react";
import arrow from "src/assets/arrow-right.svg";
import * as _ from "lodash";
import { formatNumber } from "src/utils";
import moment from "moment";
const Transaction = ({ transaction }) => {
  return (
    <div className="transaction">
      <div className="left-content">
        <div className="arrow">
          {" "}
          <img src={arrow} alt="" />
        </div>
        <div className="transaction-medium">
          <span>{transaction?.description || "No Description"}</span>
          <span>
            {moment(transaction?.createdAt).format("llll ")}
          </span>
        </div>
      </div>

      <div className="space-x-1">
        {transaction.tranferType === "CREDIT" ? (
          <span className="text-green-600">+</span>
        ) : (
          <span className="text-red-600">-</span>
        )}
        <span>
          {_.compact([
            transaction?.currency,
            formatNumber(transaction?.amount, "0,0.00") || "0.00",
          ]).join(" ")}
        </span>
      </div>
    </div>
  );
};

export default Transaction;
