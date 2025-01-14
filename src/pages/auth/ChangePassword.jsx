import React from 'react'
import { Layout } from '../../Layout/Layout'
import { Link } from 'react-router-dom'

export default function ChangePassword() {
  return (
    <Layout>
        <div className="container-xxl flex-grow-1 container-p-y">
            <div className="row">
                <div className="col-md-12">
                    <ul className="nav nav-pills flex-column flex-md-row mb-3">
                        {/* <li className="nav-item">
                            <a className="nav-link" href="account-setting.php"><i className="bx bx-user me-1"></i> Account</a>
                        </li> */}
                        <li className="nav-item">
                            <Link to='/accountSettings' className="nav-link">
                                <i className="bx bx bxs-key me-1"></i> Account Settings
                            </Link>
                            {/* <a className="nav-link" href="change-password.php"><i className="bx bx bxs-key me-1"></i> Change Password</a> */}
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" href="javascript:void(0);"><i className="bx bx bxs-key me-1"></i> Change Password</a>
                        </li>
                    </ul>
                    <div className="card mb-4">
                        <h5 className="card-header">Change password</h5>
                        <hr className="my-0" />
                        <div className="card-body">
                            <form id="formAccountSettings" method="POST" onsubmit="return false">
                                <div className="row">
                                    <div className="mb-3 col-md-6 form-password-toggle">
                                        <div className="d-flex justify-content-between">
                                            <label className="form-label" for="password">Old Password</label>
                                        </div>
                                        <div className="input-group input-group-merge">
                                            <input type="password" id="password" className="form-control" name="password" placeholder="············" aria-describedby="password"/>
                                            <span className="input-group-text cursor-pointer"><i className="bx bx-hide"></i></span>
                                        </div>
                                    </div>

                                    <div className="mb-3 col-md-6 form-password-toggle">
                                        <div className="d-flex justify-content-between">
                                            <label className="form-label" for="password">New Password</label>
                                        </div>
                                        <div className="input-group input-group-merge">
                                            <input type="password" id="password" className="form-control" name="password" placeholder="············" aria-describedby="password"/>
                                            <span className="input-group-text cursor-pointer"><i className="bx bx-hide"></i></span>
                                        </div>
                                    </div>

                                    <div className="mb-3 form-password-toggle">
                                        <div className="d-flex justify-content-between">
                                            <label className="form-label" for="password">Re Enter New Password</label>
                                        </div>
                                        <div className="input-group input-group-merge">
                                            <input type="password" id="password" className="form-control" name="password" placeholder="············" aria-describedby="password"/>
                                            <span className="input-group-text cursor-pointer"><i className="bx bx-hide"></i></span>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <button type="submit" className="btn btn-primary me-2">Save changes</button>
                                    <button type="reset" className="btn btn-outline-secondary">Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}
