import React from "react";
import { GiCancel } from "react-icons/gi";
import { RxCopy } from "react-icons/rx";
import { Link } from "react-router-dom";

import {
  account,
  accountbox,
  boxbeneficiary,
  boxBottom,
  boxhead,
  boxname,
  cancelbtn,
  code,
  iconStyle,
  modalbody,
  modalHeader,
  modalpara,
  num,
  overlay,
  p,
  span,
  wallet,
  walletBalance,
  walletbtn,
  walletchoice,
  // walletFooter,
  walletinput,
  walletLink,
  walletText,
} from "src/screens/Modal/ModalStyle";

const Modal = () => {
  return (
    <div style={modalbody}>
      <div style={overlay}>
        <p style={modalHeader}>Fund Wallet</p>
        <button style={cancelbtn}>
          <GiCancel style={iconStyle} />
        </button>

        <div style={wallet}>
          <p style={walletText}>wallet balance</p>
          <p style={walletBalance}>$24,000,000</p>
        </div>

        <div style={walletinput}>
          <input type="checkbox" />
          <label style={walletchoice}>Bank Transfer</label>
          <input type="checkbox" />
          <label style={walletchoice}>Fund by Card</label>
        </div>

        <div style={accountbox}>
          <div style={boxhead}>
            <div style={account}>
              <p style={p}>Account Number</p>
              <p style={num}>123456789</p>
            </div>

            <RxCopy />

            <div style={code}>
              <p style={p}>Sort Code</p>
              <p style={num}>12-34-56</p>
            </div>
          </div>
          <span style={span}></span>
          <div style={boxBottom}>
            <p style={boxbeneficiary}>Beneficiary Name</p>
            <p style={boxname}>John Doe</p>
          </div>
        </div>

        {/* <div style={walletFooter}> */}
          <p style={modalpara}>
            To fund wallet via a bank transfer, pleaase copy the account number
            above and send your funds to it
          </p>
          <button style={walletbtn}>
            <Link to="/" style={walletLink}>
              Done
            </Link>
          </button>
        {/* </div> */}
      </div>
    </div>
  );
};

export default Modal;
