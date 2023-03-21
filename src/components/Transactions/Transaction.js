import React from "react";
import arrow from "../../assets/arrow-right.svg";
const Transaction = () => {
  return (
    <div className="transaction">
      <div className="left-content">
        <div className="arrow">
          {" "}
          <img src={arrow} alt="" />
        </div>
        <div className="transaction-medium">
          <span>Mobile Recharge</span>
          <span>03 Aug 2022 | 10:00</span>
        </div>
      </div>

      <div>$360</div>
    </div>
  );
};

export default Transaction;
