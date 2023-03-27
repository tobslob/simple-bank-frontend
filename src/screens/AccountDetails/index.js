import React, { useState } from "react";
import man from "src/assets/man.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleUp,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import "src/screens/AccountDetails/index.scss";
import Account from "src/screens/AccountDetails/Account";
import card from "src/assets/card.svg";
import { useAuthUser } from "src/hooks";
import * as _ from "lodash";

const UserAccount = () => {
  const { user } = useAuthUser();
  const [showAccount, setShowAccount] = useState(true);
  return (
    <div className="account-information">
      <div className="customer-info">
        <div className="customer">
          <img src={man} alt="" />
          <div>
            <p>{_.compact([user?.firstName, user?.lastName]).join(" ")}</p>
            <span>{user?.email}</span>
          </div>
        </div>
        <div className="carret-icon">
          <FontAwesomeIcon
            icon={showAccount ? faAngleDown : faAngleUp}
            onClick={() => setShowAccount(!showAccount)}
            style={{
              width: "30px",
              height: "25px",
              color: "grey",
              cursor: "pointer",
            }}
          />
        </div>
      </div>
      {showAccount ? <Account /> : null}
      <div className="my-cards">
        <h2>My cards</h2>
        <div className="carret-icon" style={{ padding: "5px 15px" }}>
          <FontAwesomeIcon
            icon={faPlus}
            style={{
              width: "30px",
              height: "25px",
              color: "grey",
              cursor: "pointer",
            }}
          />
        </div>
      </div>
      <div className="card">
        <img src={card} alt="" />
      </div>
    </div>
  );
};

export default UserAccount;
