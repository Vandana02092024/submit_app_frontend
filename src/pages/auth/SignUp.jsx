import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { signUpValidationSchema } from "../../utils/validationSchema";
import { SIGNUP } from "../../utils/Endpoints";
import { apiCall } from "../../utils/ApiService";

export default function SignUp() {
    const formikConfig = {
        initialValues: {
          username: "",
          password: "",
        },
        validationSchema:signUpValidationSchema,
        onSubmit: async (values, { setErrors }) => {
            try {
                const param = { username: values.username,email:values.email, password :values.password}
                const data = await apiCall(param, SIGNUP);
                alert("you have successfully signup ");
              } catch (error) {
                console.log("signup failed:", error.message);
                setErrors({ apiError: error.message });
              }
        },
    };

    const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
    useFormik(formikConfig);
  
  return (
    // <!-- Content -->
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
                        {/* <!-- Register Card --> */}
                        <div className="card bg-clr-transparent">
                            <div className="card-body">
                                {/* <!-- Logo --> */}
                                <div className="app-brand justify-content-center">
                                    <Link className="app-brand-link gap-2">
                                        <img src="./assets/img/submitt-logo.png" alt="" height="55px" />
                                    </Link>
                                </div>
                                {/* <!-- /Logo --> */}
                                <h4 className="mb-2 text-center">Adventure starts here 🚀</h4>
                                <p className="mb-4 text-center">Make your app management easy and fun!</p>

                                <form id="formAuthentication" className="mb-3" action="dashboard.php" onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label for="username" 
                                            className="form-label">
                                            Username
                                        </label>
                                        <input 
                                          type="text"
                                          className="form-control"
                                          id="username" 
                                          name="username" 
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={values.username}
                                          placeholder="Enter your username" autofocus
                                           />
                                        {touched.username && errors.username && (
                                            <div className="text-danger">{errors.username}</div>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <label for="email" 
                                            className="form-label">
                                            Email
                                        </label>
                                        <input type="text" className="form-control" id="email"
                                          name="email" 
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={values.email}
                                          placeholder="Enter your email" 
                                          />
                                        {touched.email && errors.email && (
                                            <div className="text-danger">{errors.email}</div>
                                        )}
                                    </div>
                                    <div className="mb-3 form-password-toggle">
                                        <label className="form-label" for="password">Password</label>
                                        <div className="input-group input-group-merge">
                                            <input type="password" 
                                            id="password" 
                                            className="form-control"
                                            name="password" 
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.password}
                                            placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;" 
                                            aria-describedby="password" 
                                            />
                                            <span className="input-group-text cursor-pointer"><i className="bx bx-hide"></i></span>
                                        </div>
                                        {touched.password && errors.password && (
                                            <div className="text-danger">{errors.password}</div>
                                        )}
                                    </div>

                                    <div className="mb-3">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="terms-conditions" name="terms" />
                                            <label className="form-check-label" for="terms-conditions">
                                                I agree to
                                                <Link>privacy policy & terms</Link>
                                            </label>
                                        </div>
                                    </div>
                                    <button className="btn btn-lg btn-primary d-grid w-100" type="submit">Sign up</button>
                                    {errors.apiError && <div className="text-danger">{errors.apiError}</div>}
                                </form>

                                <p className="text-center">
                                    <span>Already have an account?</span>
                                    <Link to="/">
                                        <span>Sign in instead</span>
                                    </Link>
                                </p>
                            </div>
                        </div>
                        {/* <!-- Register Card --> */}
                    </div>
                </div>
            </div>
        </div>
    </div>
    // <!-- / Content -->
  )
}
