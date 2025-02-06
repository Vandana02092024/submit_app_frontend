import React from 'react'
import { Link } from 'react-router-dom'
import { useFormik } from "formik";
import { FORGOTPASSWORD } from '../../utils/Endpoints';
import { apiCall } from "../../utils/ApiService";
import { forgotPasswordValidationSchema } from '../../utils/validationSchema';

export default function ForgotPassword() {
    const formikConfig = {
        initialValues: {
          email: "",
        },
        validationSchema:forgotPasswordValidationSchema,
        onSubmit: async (values, { setErrors }) => {
            try {
                const param = {email:values.email}
                const data = await apiCall(param, FORGOTPASSWORD);
              } catch (error) {
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
                        <div className="authentication-inner py-4">
                            {/* <!-- Forgot Password --> */}
                            <div className="card bg-clr-transparent">
                                <div className="card-body">
                                    {/* <!-- Logo --> */}
                                    <div className="app-brand justify-content-center">
                                        <Link className="app-brand-link gap-2">
                                            <img src="./assets/img/submitt-logo.png" alt="" height="55px" />
                                        </Link>
                                    </div>
                                    {/* <!-- /Logo --> */}
                                    <h4 className="mb-2 text-center">Forgot Password? 🔒</h4>
                                    <p className="mb-4 text-center">Enter your email and we'll send you instructions to reset your password</p>
                                    <form id="formAuthentication" className="mb-3" action="dashboard.php"  onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label for="email" className="form-label">Email</label>
                                            <input type="text"
                                            className="form-control" 
                                            id="email"
                                            name="email"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.email}
                                            placeholder="Enter your email"
                                            autofocus />
                                         {touched.email && errors.email && (
                                            <div className="text-danger">{errors.email}</div>
                                        )}
                                        </div>
                                        <button className="btn btn-lg btn-primary d-grid w-100" type="submit">Send Reset Link</button>
                                        {errors.apiError && <div className="text-danger">{errors.apiError}</div>}
                                    </form>
                                    <div className="text-center">
                                        <Link to="/" className="d-flex align-items-center justify-content-center">
                                            <i className="bx bx-chevron-left scaleX-n1-rtl bx-sm"></i>
                                            Back to login
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- /Forgot Password --> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>

       // {/* <!-- / Content --> */}
  )
}
