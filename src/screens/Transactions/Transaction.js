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
            {/*03 Aug 2022 | 10:00*/}
          </span>
        </div>
      </div>

      <div>
        $
        {_.compact([
          formatNumber(transaction?.amount, "0,0.00") || "0.00",
        ]).join(" ")}
      </div>
    </div>
  );
};

export default Transaction;
