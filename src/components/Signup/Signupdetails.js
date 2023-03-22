import React from "react";
import { Link } from "react-router-dom";

import {
  buttonLink,
  detailscontainer,
  detailsParagraph,
  footerPara,
  image,
  input,
  inputBox,
  inputButton,
  inputTopic,
  login,
  mainbody,
  span,
} from "./signupstyle";

import BankApp from "../../assets/BankApp.png";

const Signupdetails = () => {
  return (
    <div style={mainbody}>
      <img src={BankApp} alt="logo" style={image} />
      <div style={detailscontainer}>
        <p style={detailsParagraph}>
          Welcome to your <span style={span}>BankApp</span> account
        </p>
        <div style={input}>
          <label style={inputTopic}>What would you like us to call you *</label>
          <input placeholder="Enter your name" type="text" style={inputBox} />
          <label style={inputTopic}>
            Set a password to secure your account
          </label>
          <input
            placeholder="Enter your password"
            type="password"
            style={inputBox}
          />
          <button style={inputButton}>
            <Link to={"/Dashboard"} style={buttonLink}>
              Continue
            </Link>
          </button>
        </div>
        <p style={footerPara}>
          Already have an account?
          <Link to={"/login"} style={login}>
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signupdetails;
