import React from "react";
import mention from "src/assets/At.svg";
import dollar from "src/assets/dollar.svg";
import account from "src/assets/accountname.svg";
import * as _ from "lodash";
import { useAuthUser } from "src/hooks";
import { formatNumber } from "src/utils";

const Account = () => {
  const { user } = useAuthUser();
  return (
    <div className="customer-account-details">
      <div className="details">
        <h4>Account Details</h4>
        <div className="acc-detail">
          <img src={mention} alt="" />
          <div>
            <p>Account Number</p>
            <span>{user?.claim?.account[0]?.accountNumber}</span>
          </div>
        </div>
        <div className="acc-detail">
          <img src={account} alt="" />
          <div>
            <p>Account Name</p>
            <span>
              {_.compact([user?.claim?.firstName, user?.claim?.lastName]).join(
                " "
              )}
            </span>
          </div>
        </div>

        <div className="acc-detail">
          <img src={dollar} alt="" />
          <div>
            <p>Account Balance</p>
            <span>
              {_.compact([
                user?.claim?.account[0]?.currency,
                formatNumber(user?.claim?.account[0]?.balance, "0,0.00") ||
                  "0.00",
              ]).join(" ")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
