import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { loginValidationSchema } from "../../utils/validationSchema";
import { LOGIN } from "../../utils/Endpoints";
import { apiCall } from "../../utils/ApiService";

export default function Login() {
  const navigate = useNavigate();

  const formikConfig = {
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema:loginValidationSchema,
    onSubmit: async (values, { setErrors }) => {
      try {
        const param = { username: values.username, password: values.password };
        const response = await apiCall(param, LOGIN); 
    
        const { data } = response; 
        localStorage.setItem("userData", JSON.stringify(data)); 
        localStorage.setItem("isAuthenticated", "true"); 
    
        navigate("/dashboard");
      } catch (error) {
        setErrors({ apiError: error.message });
      }
    },
  };

  const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
    useFormik(formikConfig);

  return (
    <div className="container-xxl">
      <div className="authentication-wrapper authentication-basic container-p-y">
        <div className="row d-flex align-items-center">
          <div className="col-md-6 d-none d-md-block">
            <div className="login-section">
              <img src="./assets/img/login-banner.png" alt="" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="authentication-inner">
              <div className="card bg-clr-transparent">
                <div className="card-body">
                  <div className="app-brand justify-content-center">
                    <Link className="app-brand-link gap-2">
                      <img src="./assets/img/submitt-logo.png" alt="" height="55px" />
                    </Link>
                  </div>
                  <h3 className="mb-2 text-center">Welcome to Submitt App 👋🏻</h3>
                  <p className="mb-4 text-center">
                    Please enter your credentials to log in and start using the application
                  </p>
                  <form id="formAuthentication" onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="username" className="form-label">
                        Email or Username
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        placeholder="Enter your email or username"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.username}
                        autoFocus
                      />
                      {touched.username && errors.username && (
                        <div className="text-danger">{errors.username}</div>
                      )}
                    </div>
                    <div className="mb-3 form-password-toggle">
                      <div className="d-flex justify-content-between">
                        <label htmlFor="password" className="form-label">
                          Password
                        </label>
                        <Link to="/forgot-password">
                          <small>Forgot Password?</small>
                        </Link>
                      </div>
                      <div className="input-group input-group-merge">
                        <input
                          type="password"
                          id="password"
                          className="form-control"
                          name="password"
                           placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                        />
                      </div>
                      {touched.password && errors.password && (
                        <div className="text-danger">{errors.password}</div>
                      )}
                    </div>
                    <div className="mb-3">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="remember-me" />
                        <label className="form-check-label" htmlFor="remember-me">
                          Remember Me
                        </label>
                      </div>
                    </div>
                    <div className="mb-3">
                      <button className="btn btn-lg btn-primary d-grid w-100" type="submit">
                        Log in
                      </button>
                    </div>
                    {errors.apiError && <div className="text-danger">{errors.apiError}</div>}
                  </form>
                  <p className="text-center">
                    <span>New on our platform?</span>
                    <Link to="/sign-up">
                      <span>Create an account</span>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}