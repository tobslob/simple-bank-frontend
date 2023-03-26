import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  bottom,
  buttonLink,
  footerPara2,
  image,
  inputButton,
  mailparagraph,
  mainbody,
  Otp,
  otpcontainer,
  otpHead,
  otpInput,
  otpPara,
  para,
  span,
} from "src/screens/Signup/signupstyle";
import BankApp from "src/assets/BankApp.png";

const Mail = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    //focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  return (
    <div style={mainbody}>
      <img src={BankApp} alt="logo" style={image} />
      <div style={otpcontainer}>
        <div style={otpHead}>
          <p style={mailparagraph}>You’ve got a mail.</p>
          <p style={para}>
            Check your mail and either click on the verification link sent or
            provide the code sent to your email below
          </p>
        </div>
        <p style={otpPara}>Provide the 6-digit code in your email *</p>
        <div style={Otp}>
          {otp.map((data, index) => {
            return (
              <input
                type="text"
                maxLength="1"
                style={otpInput}
                key={index}
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onFocus={(e) => e.target.select()}
              />
            );
          })}
        </div>
        <div style={bottom}>
          <button style={inputButton}>
            <Link to={"/Dashboard"} style={buttonLink}>
              Sign up
            </Link>
          </button>
          <p style={footerPara2}>
            Didn’t get the link?{" "}
            <Link to="/" style={span}>
              Resend link
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Mail;
