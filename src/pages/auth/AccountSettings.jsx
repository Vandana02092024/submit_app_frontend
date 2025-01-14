import React from 'react'
import { Layout } from '../../Layout/Layout';
import { Link } from "react-router-dom";

export default function AccountSettings() {
  return (
    <Layout>
        <div className="container-xxl flex-grow-1 container-p-y">
            <div className="row">
                <div className="col-md-12">
                    <ul className="nav nav-pills flex-column flex-md-row mb-3">
                        <li className="nav-item">
                            <a className="nav-link active" href="javascript:void(0);"><i className="bx bx-user me-1"></i> Account</a>
                        </li>
                        <li className="nav-item">
                            <Link to='/changePassword'
                             className="nav-link">
                                <i className="bx bx bxs-key me-1"></i> Change Password
                            </Link>
                            {/* <a className="nav-link" href="change-password.php"><i className="bx bx bxs-key me-1"></i> Change Password</a> */}
                        </li>
                    </ul>
                    <div className="card mb-4">
                        <h5 className="card-header border-0">Profile Details</h5>
                        <div className="card-body">
                            <div className="d-flex align-items-start align-items-sm-center gap-4">
                                <img src="assets/img/avatars/1.png" alt="user-avatar" className="d-block rounded" height="100" width="100" id="uploadedAvatar" />
                                <div className="button-wrapper">
                                    <label for="upload" className="btn btn-primary me-2 mb-4" tabindex="0">
                                        <span className="d-none d-sm-block">Upload new photo</span>
                                        <i className="bx bx-upload d-block d-sm-none"></i>
                                        <input type="file" id="upload" className="account-file-input" hidden accept="image/png, image/jpeg" />
                                    </label>
                                    <button type="button" className="btn btn-outline-secondary account-image-reset mb-4">
                                        <i className="bx bx-reset d-block d-sm-none"></i>
                                        <span className="d-none d-sm-block">Reset</span>
                                    </button>

                                    <p className="text-muted mb-0">Allowed JPG, GIF or PNG. Max size of 800K</p>
                                </div>
                            </div>
                        </div>
                        <hr className="my-0" />
                        <div className="card-body">
                            <form id="formAccountSettings" method="POST" onsubmit="return false">
                                <div className="row">
                                    <div className="mb-3 col-md-6">
                                        <label for="firstName" className="form-label">First Name</label>
                                        <input className="form-control" type="text" id="firstName" name="firstName" value="Rajiv" autofocus />
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <label for="lastName" className="form-label">Last Name</label>
                                        <input className="form-control" type="text" name="lastName" id="lastName" value="Doe" />
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <label for="email" className="form-label">E-mail</label>
                                        <input className="form-control" type="text" id="email" name="email" value="Rajiv.doe@example.com" placeholder="Rajiv.doe@example.com" />
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <label className="form-label" for="phoneNumber">Phone Number</label>
                                        <div className="input-group input-group-merge">
                                            <span className="input-group-text">US (+1)</span>
                                            <input type="text" id="phoneNumber" name="phoneNumber" className="form-control" placeholder="202 555 0111" />
                                        </div>
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <label for="address" className="form-label">Address</label>
                                        <input type="text" className="form-control" id="address" name="address" placeholder="Address" />
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <label for="state" className="form-label">State</label>
                                        <input className="form-control" type="text" id="state" name="state" placeholder="California" />
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <label for="zipCode" className="form-label">Zip Code</label>
                                        <input type="text" className="form-control" id="zipCode" name="zipCode" placeholder="231465" maxlength="6" />
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <label className="form-label" for="country">Country</label>
                                        <select id="country" className="select2 form-select">
                                            <option value="">Select</option>
                                            <option value="Australia">Australia</option>
                                            <option value="Bangladesh">Bangladesh</option>
                                            <option value="Belarus">Belarus</option>
                                            <option value="Brazil">Brazil</option>
                                            <option value="Canada">Canada</option>
                                            <option value="China">China</option>
                                            <option value="France">France</option>
                                            <option value="Germany">Germany</option>
                                            <option value="India">India</option>
                                            <option value="Indonesia">Indonesia</option>
                                            <option value="Israel">Israel</option>
                                            <option value="Italy">Italy</option>
                                            <option value="Japan">Japan</option>
                                            <option value="Korea">Korea, Republic of</option>
                                            <option value="Mexico">Mexico</option>
                                            <option value="Philippines">Philippines</option>
                                            <option value="Russia">Russian Federation</option>
                                            <option value="South Africa">South Africa</option>
                                            <option value="Thailand">Thailand</option>
                                            <option value="Turkey">Turkey</option>
                                            <option value="Ukraine">Ukraine</option>
                                            <option value="United Arab Emirates">United Arab Emirates</option>
                                            <option value="United Kingdom">United Kingdom</option>
                                            <option value="United States">United States</option>
                                        </select>
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
