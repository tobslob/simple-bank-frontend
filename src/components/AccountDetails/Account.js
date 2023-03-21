import React from "react";
import mention from "../../assets/At.svg";
import dollar from "../../assets/dollar.svg";
import account from "../../assets/accountname.svg";
const Account = () => {
  return (
    <div className="customer-account-details">
      <div className="details">
        <h4>Account Details</h4>
        <div className="acc-detail">
          <img src={mention} alt="" />
          <div>
            <p>Account Number</p>
            <span>0039383993</span>
          </div>
        </div>
        <div className="acc-detail">
          <img src={account} alt="" />
          <div>
            <p>Account Name</p>
            <span>John Doe</span>
          </div>
        </div>

        <div className="acc-detail">
          <img src={dollar} alt="" />
          <div>
            <p>Account Balance</p>
            <span>$20,000</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
