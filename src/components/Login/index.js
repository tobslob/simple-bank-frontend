import React from "react";
import { Link } from "react-router-dom";
import BankApp from "../../assets/BankApp.png";
import { mainbody, image } from "../Signup/signupstyle";
import {
  inputbox,
  loginbutton,
  loginContainer,
  loginHead,
  loginInput,
  loginlink,
  loginredirect,
  logintext,
} from "./LoginStyle";

function Login() {
  return (
    <div style={mainbody}>
      <img src={BankApp} alt="logo" style={image} />
      <div style={loginContainer}>
        <p style={loginHead}>Login</p>
        <div style={loginInput}>
          <input placeholder="Email" type="text" style={inputbox} />
          <input placeholder="Password" type="password" style={inputbox} />
          <button style={loginbutton}>
            <Link to="/Dashboard" style={loginlink}>
              Login
            </Link>
          </button>
        </div>
        <p style={logintext}>
          Don't have an account?{" "}
          <Link to="/" style={loginredirect}>
            {" "}
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
