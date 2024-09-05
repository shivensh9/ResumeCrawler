import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useFormik } from "formik";
import { INITIALVALUES, VALIDATIONS } from "../../utils/validation";
import axios from "axios";
import { toast } from "react-toastify";
import { useAppContext } from "../../context/authContext";
import userGlobalConfig from "../../utils/constant/GlobalConfig";
import AuthWrapper from "../../components/pages/Auth/authWrapper";
import { ClipLoader } from "react-spinners";

const LoginScreen = () => {
  let baseUrl = process.env.REACT_APP_BASE_URL;
  const { setisAuthenticated } = useAppContext();
  const [loading, setLoading] = useState(false);

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: INITIALVALUES.loginInitialValues,
      validationSchema: VALIDATIONS.loginValidationSchema,
      onSubmit: async (values) => {
        setLoading(true);
        await axios
          .post(`${baseUrl}/login`, {
            email: values.email,
            password: values.password,
          })
          .then((res) => {
            if (res?.data?.success === true) {
              toast.success("Login successfully");
              setisAuthenticated(true);
              localStorage.setItem(userGlobalConfig.TOKEN, res?.data?.token);
              setLoading(false);
            }
          })
          .catch((err) => {
            toast.error(err?.response?.data?.message);
            setLoading(false);
          });
      },
    });
  return (
    <AuthWrapper>
      <div className="col-12 col-md-6 col-xl-5">
        <div className="card border-0 rounded-4">
          <div className="card-body p-3 p-md-4 p-xl-5">
            <div className="row">
              <div className="col-12">
                <div className="mb-4">
                  <h3>Sign in</h3>
                  <p>
                    Don't have an account?
                    <NavLink to="/register">Sign up</NavLink>
                  </p>
                </div>
              </div>
            </div>
            <form>
              <div className="row gy-3 ">
                <div className="col-12">
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      name={"email"}
                      id="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder={"Enter your email"}
                    />
                    <label htmlFor={"email"} className="form-label">
                      Email
                    </label>
                    {errors.email && touched.email && (
                      <p className="error">{errors.email}</p>
                    )}
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control"
                      name={"password"}
                      id="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder={"Enter your password"}
                    />
                    <label htmlFor={"password"} className="form-label">
                      Password
                    </label>
                    {errors.password && touched.password && (
                      <p className="error">{errors.password}</p>
                    )}
                  </div>
                </div>
                <div className="col-12">
                  <div className="d-grid">
                    <button
                      className="btn btn-bg-color btn-lg"
                      type="button"
                      disabled={loading}
                      onClick={handleSubmit}
                    >
                      {loading ? <ClipLoader size={15} /> : "Log in"}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthWrapper>
  );
};
export default LoginScreen;
