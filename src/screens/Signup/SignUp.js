import React, { useRef, useState } from "react";
// import { FcGoogle } from "react-icons/fc";
// import { DiApple } from "react-icons/di";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import {
  buttonLink,
  input,
  inputBox,
  inputButton,
  inputTopic,
  span,
} from "src/screens/Signup/signupstyle";
import BankApp from "src/assets/BankApp.png";
import { Form, Formik } from "formik";
import authService from "src/services/auth.service";
import cogoToast from "cogo-toast";

const Signup = () => {
  // const {loading, userInfo, error, success} = useSelector((state) => state.auth);

  const [email, setEmail] = useState("example@gmail.com");
  const handleType = (e) => {
    e.preventDefault(email);
  };

  const initialValues = {
    firstName: "Ife",
    lastName: "Soderu",
    emailAddress: "adedeji@gmail.com",
    password: "Kazeem27$",
    currency: "USD",
  };
  const formRef = useRef();

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("First name is required"),
    emailAddress: Yup.string().required("First name is required"),
    password: Yup.string().required("First name is required"),
    currency: Yup.string().required("First name is required"),
  });
  return (
    <Formik
      innerRef={formRef}
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={(values) => {
        authService
          .signup(values)
          .then((res) => {
            cogoToast.success("User account created successfully! ");
          })
          .catch((e) => {
            cogoToast.error(
              e?.response?.data?.message ||
                "An error creating your account.Try again!"
            );
          });
      }}
    >
      {() => {
        return (
          <Form>
            <div
              // style={image}
              className="p-4"
            >
              <img src={BankApp} alt="logo" />
            </div>
            <div
              className="max-w-md m-auto my-5"
              // style={container}
            >
              <p
              // style={paragraph}
              >
                Sign up for a <span style={span}>BankApp</span> account
              </p>
              <div style={input}>
                <label style={inputTopic}>Email Address</label>
                <input
                  style={inputBox}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button style={inputButton} onClick={handleType}>
                  <Link to={"/sign-"} style={buttonLink}>
                    Sign up
                  </Link>
                </button>
              </div>
              {/* <div style={otherOptions}>
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
        </div> */}
              <div
              // style={footer}
              >
                <p
                // style={footerPara}
                >
                  Already have an account?
                  <Link
                    to="/login"
                    // style={login}
                  >
                    Log in
                  </Link>
                </p>
                <p
                // style={footerPara2}
                >
                  By clicking sign up with email/google/apple you indicate that
                  you’ve read and agreed to the
                  <span
                  // style={span}
                  >
                    Privacy Policy & Terms of Service Agreement.
                  </span>
                </p>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Signup;
