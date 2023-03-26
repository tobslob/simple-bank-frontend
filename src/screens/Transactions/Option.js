import React from "react";
import bank from "src/assets/bank.svg";

const Option = ({ onTransfer }) => {
  return (
    <div className="options">
      <div className="trans-option relative">
        <div className="inset-0 bg-black opacity-80 absolute text-white font-bold flex justify-center items-center">
          Coming soon
        </div>
        <img src={bank} alt="" />
        <div className="trans-to">
          <span>To</span>
          <span>Mobile Recharge</span>
        </div>
      </div>
      <div onClick={onTransfer} className="trans-option cursor-pointer ">
        <img src={bank} alt="" />
        <div className="trans-to">
          <span>To</span>
          <span>Bank Account</span>
        </div>
      </div>

      <div className="trans-option relative">
        <div className="inset-0 bg-black opacity-80 absolute text-white font-bold flex justify-center items-center">
          Coming soon
        </div>
        <img src={bank} alt="" />
        <div className="trans-to">
          <span>To</span>
          <span>Crypto wallet</span>
        </div>
      </div>
    </div>
  );
};

export default Option;
