import React, { useState } from "react";
import man from "../../assets/man.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleUp,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import "./index.scss";
import Account from "./Account";
import card from "../../assets/card.svg";

const UserAccount = () => {
  const [showAccount, setShowAccount] = useState(true);
  return (
    <div className="account-information">
      <div className="customer-info">
        <div className="customer">
          <img src={man} alt="" />
          <div>
            <p>John Doe</p>
            <span>johndoe@gmail.com</span>
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
