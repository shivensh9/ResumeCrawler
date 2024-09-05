import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { INITIALVALUES, VALIDATIONS } from "../../utils/validation";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import AuthWrapper from "../../components/pages/Auth/authWrapper";
import { ClipLoader } from "react-spinners";

const RegisterScreen = () => {
  let baseUrl = process.env.REACT_APP_BASE_URL;
  const nav = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: INITIALVALUES.registerInitialValues,
      validationSchema: VALIDATIONS.registerValidationSchema,
      onSubmit: async (values) => {
        setLoading(true);
        await axios
          .post(`${baseUrl}/register`, {
            name: values.name,
            email: values.email,
            password: values.password,
            companyName: values.companyName,
          })
          .then((res) => {
            if (res?.data?.success === true) {
              toast.success("Register successfully");
              nav("/login");
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
                    Already have an account?
                    <NavLink to="/login">Sign in</NavLink>
                  </p>
                </div>
              </div>
            </div>
            <form>
              <div className="row gy-3 ">
                <div className="col-12">
                  <div className="form-floating mb-3">
                    <input
                      className="form-control"
                      name={"name"}
                      id="name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder={"Enter your name"}
                    />
                    <label htmlFor={"name"} className="form-label">
                      User Name
                    </label>
                    {errors.name && touched.name && (
                      <p className="error">{errors.name}</p>
                    )}
                  </div>
                </div>
                <div className="col-12 mt-0">
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
                <div className="col-12 mt-0">
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
                <div className="col-12 mt-0">
                  <div className="form-floating mb-3">
                    <input
                      className="form-control"
                      name={"companyName"}
                      id="companyName"
                      value={values.companyName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder={"Enter your Company Name"}
                    />
                    <label htmlFor={"companyName"} className="form-label">
                      Company Name
                    </label>
                    {errors.companyName && touched.companyName && (
                      <p className="error">{errors.companyName}</p>
                    )}
                  </div>
                </div>
                <div className="col-12">
                  <div className="d-grid">
                    <button
                      className="btn btn-bg-color btn-lg"
                      disabled={loading}
                      onClick={handleSubmit}
                    >
                      {loading ? <ClipLoader size={15} /> : " Sign up"}
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

export default RegisterScreen;
