import React from "react";
import { Link } from "react-router-dom";
import BankApp from "src/assets/BankApp.png";
import { Button, Input, Password } from "src/components/fields";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import authService from "src/services/auth.service";
import cogoToast from "cogo-toast";
import { saveUser } from "src/utils";
import { useNavigate } from "react-router-dom";
import routeService from "src/services/route.service";
import jwtDecode from "jwt-decode";

function Login() {
  const navigate = useNavigate();

  const initialValues = { emailAddress: "", password: "" };
  const validationSchema = Yup.object().shape({
    emailAddress: Yup.string().email().required("This field is required"),
  });
  return (
    <Formik
      onSubmit={(values) => {
        console.log("got here to submit");
        authService
          .login(values)
          .then((res) => {
            const user = jwtDecode(res?.data);
            saveUser(user, res?.data);
            navigate(routeService.dashboard);
            cogoToast.success("User Logged in successfully!");
          })
          .catch((e) => {
            console.log("e", e);
            cogoToast.error(
              e?.response?.data?.message ||
                "An Error occurred trying to log you in!!"
            );
          });
      }}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {({ values, errors, isSubmitting, isValid }) => {
        console.log("values", values, errors, isSubmitting, isValid);
        return (
          <Form>
            <div className="p-4">
              <img src={BankApp} alt="logo" />
            </div>
            <div className="max-w-xl m-auto mt-16 shadow shadow-gray-300 p-16">
              <h1 className="font-bold text-2xl">
                Welcome to your{" "}
                <strong className="text-primary ">BankApp</strong> account
              </h1>
              <div className="space-y-3">
                <Input type="email" label="Email Address" name="emailAddress" />
                <Password name="password" label="Password" />
                {/*<input placeholder="Email" type="text" style={inputbox} />*/}
                {/*<input placeholder="Password" type="password" style={inputbox} />*/}
                <Button
                  type="submit"
                  extraClasses="!rounded"
                  disabled={!(isValid || isSubmitting)}
                >
                  Login
                </Button>
              </div>
              <p className="my-3 text-center text-gray-500">
                Don't have an account?{" "}
                <Link to="/signup" className="text-primary">
                  {" "}
                  Register here
                </Link>
              </p>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export default Login;
