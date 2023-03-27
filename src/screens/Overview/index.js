import React, { useState } from "react";
import spent from "src/assets/spent.svg";
import balance from "src/assets/Balance.svg";
import "src/screens/Overview/overview.scss";
import { useAccountModal } from "src/screens/Dashboard/AccountModal";
import { Button } from "src/components/fields";
import { useAuthUser } from "src/hooks";
import * as _ from "lodash";
import { formatNumber } from "src/utils";

const Overview = () => {
  const [modal, setModal] = useState(false);
  const accountModal = useAccountModal({ modal, setModal });
  const handleToggleModal = () => {
    setModal(!modal);
  };

  const { user } = useAuthUser();

  return (
    <div className="overview">
      <div className="overview-text justify-between">
        <h2>Overview</h2>
        <div>
          <Button type="button" onClick={handleToggleModal}>
            Fund wallet
          </Button>
        </div>

        {accountModal}
      </div>

      <div className="account-balance">
        <div className="account-info">
          <div style={{ marginBottom: "10px" }}>
            <span>Account balance</span>
            <img src={balance} alt="" />
          </div>
          <strong>
            {_.compact([
              user?.account?.[0]?.currency,
              formatNumber(user?.account?.[0]?.balance, "0,0.00") || "0.00",
            ]).join(" ")}
          </strong>
        </div>

        <div className="account-info">
          <div style={{ marginBottom: "10px" }}>
            <span>Amount spent so far</span>
            <img src={spent} alt="" />
          </div>
          <strong>
            {_.compact([
              user?.account?.[0]?.currency,
              formatNumber(user?.account?.[0]?.totalSpent, "0,0.00") || "0.00",
            ]).join(" ")}
          </strong>
        </div>
      </div>
    </div>
  );
};

export default Overview;
