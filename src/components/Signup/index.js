import React from "react";
import { Link } from "react-router-dom";

import {
  buttonLink,
  container,
  footer,
  footerPara,
  footerPara2,
  image,
  input,
  inputBox,
  inputButton,
  inputTopic,
  login,
  mainbody,
  paragraph,
  span,
} from "./signupstyle";
import BankApp from "../../assets/BankApp.png";

const Signup = () => {
  return (
    <div style={mainbody}>
      <div style={image}>
        <img src={BankApp} alt="logo" />
      </div>
      <div style={container}>
        <p style={paragraph}>
          Sign up for a <span style={span}>BankApp</span> account
        </p>
        <div style={input}>
          <label style={inputTopic}>Email Address</label>
          <input style={inputBox} isRequired />
          <button style={inputButton}>
            <Link to={"./Signupdetails"} style={buttonLink}>
              Sign up
            </Link>
          </button>
        </div>
        <div style={footer}>
          <p style={footerPara}>
            Already have an account?
            <Link to="/login" style={login}>
              Log in
            </Link>
          </p>
          <p style={footerPara2}>
            By clicking sign up you indicate that you’ve read and agreed to the
            <span style={span}>
              Privacy Policy & Terms of Service Agreement.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
