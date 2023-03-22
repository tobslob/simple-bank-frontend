import React from "react";
import { FcGoogle } from "react-icons/fc";
import { DiApple } from "react-icons/di";
import { Link } from "react-router-dom";

import {
  appleButton,
  appleIcon,
  buttonLink,
  container,
  footer,
  footerPara,
  footerPara2,
  googleButton,
  googleIcon,
  image,
  input,
  inputBox,
  inputButton,
  inputTopic,
  login,
  mainbody,
  otherOptions,
  paragraph,
  signupLink,
  span,
  Text,
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
        <div style={otherOptions}>
          <p style={Text}>or signup using</p>
          <button style={googleButton}>
            <FcGoogle style={googleIcon} />
            <a href="/" style={signupLink}>
              Sign up with google
            </a>
          </button>
          <button style={appleButton}>
            <DiApple style={appleIcon} />
            <a href="/" style={signupLink}>
              Sign up with google
            </a>
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
            By clicking sign up with email/google/apple you indicate that you’ve
            read and agreed to the
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
