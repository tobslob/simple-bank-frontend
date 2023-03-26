import React from "react";
import { Link, useNavigate } from "react-router-dom";
import BankApp from "src/assets/BankApp.png";
import { Button, ComboSelect, Input, Password } from "src/components/fields";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import authService from "src/services/auth.service";
import cogoToast from "cogo-toast";
import { saveUser } from "src/utils";
import routeService from "src/services/route.service";

const Index = () => {
  const initialValues = {
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: "",
    currency: "",
  };
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Firstname is required!"),
    lastName: Yup.string().required("Firstname is required!"),
    emailAddress: Yup.string().email().required("Email Address is required!"),
    password: Yup.string().required("Password is required!"),
    currency: Yup.string().required("Currency is required!"),
  });
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        authService
          .signup(values)
          .then((res) => {
            saveUser(res?.data, res?.data?.token);
            navigate(routeService.dashboard);
            cogoToast.success("Your account has been create successfully!!");
          })
          .catch((e) => {
            cogoToast.error(
              e?.response?.data?.message || "An error occurred signing you up!"
            );
          });
      }}
    >
      {() => {
        return (
          <Form>
            <div className="p-4">
              <img
                src={BankApp}
                alt="logo"
                // style={image}
                className=""
              />
              <div
                // style={detailscontainer}
                className="max-w-lg m-auto mt-10 shadow shadow-gray-300 p-8"
              >
                <p
                  className="font-bold text-2xl"
                  // style={detailsParagraph}
                >
                  Welcome to your{" "}
                  <span
                    className="text-primary"
                    // style={span}
                  >
                    BankApp
                  </span>{" "}
                  account
                </p>
                <div
                // style={input}
                >
                  <Input
                    name="firstName"
                    label="What do you want to be called ?"
                  />
                  <Input name="lastName" label="What's your last name ?" />
                  <Input
                    name="emailAddress"
                    type="email"
                    label="Email Address"
                  />
                  <Password
                    name="password"
                    label="Set a password to secure your account"
                  />
                  <ComboSelect
                    label="Your Currency*"
                    options={[
                      { name: "USD", code: "USD" },
                      { name: "GBP", code: "GBP" },
                    ]}
                    name="currency"
                  />
                  {/*<label style={inputTopic}>What would you like us to call you *</label>*/}
                  {/*<input*/}
                  {/*  placeholder="Enter your first name"*/}
                  {/*  type="text"*/}
                  {/*  style={inputBox}*/}
                  {/*  required*/}
                  {/*/>*/}
                  {/*<input*/}
                  {/*  placeholder="Enter your last name"*/}
                  {/*  type="text"*/}
                  {/*  // style={inputBox}*/}
                  {/*  required*/}
                  {/*/>*/}

                  {/*<label style={inputTopic}>*/}
                  {/*  Set a password to secure your account*/}
                  {/*</label>*/}
                  {/*<input*/}
                  {/*  placeholder="Enter your password"*/}
                  {/*  type="password"*/}
                  {/*  style={inputBox}*/}
                  {/*  required*/}
                  {/*/>*/}
                  {/*<label style={inputTopic}>Your Currency*</label>*/}
                  {/*<select name="currency" style={inputBox} required>*/}
                  {/*  <options value="Dollars">Dollars</options>*/}
                  {/*  <options value="Pounds">GBP</options>*/}
                  {/*</select>*/}
                  <Button type="submit" extraClasses="my-4">
                    Sign up
                  </Button>
                  {/*<button*/}
                  {/*// style={inputButton}*/}
                  {/*>*/}
                  {/*  <Link to={"/Dashboard"} style={buttonLink}>*/}
                  {/*    Continue*/}
                  {/*  </Link>*/}
                  {/*</button>*/}
                </div>
                <p
                  className="text-center text-gray-500"
                  // style={footerPara}
                >
                  Already have an account?
                  <Link
                    className="text-primary ml-2"
                    to={"/login"}
                    // style={login}
                  >
                    Log in
                  </Link>
                </p>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Index;
