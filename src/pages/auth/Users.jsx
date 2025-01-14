import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Layout } from "../../Layout/Layout";
import PopUp from "./PopUp";
import { useFormik } from "formik";
import { ADDUSER, DELETEUSER, GETALLUSERS, UPDATEUSER } from "../../utils/Endpoints";
import { addUserValidationSchema, updateUserValidationSchema } from "../../utils/validationSchema";
import { apiCall, deleteApiCall, getApiCall, putConditionsApi } from "../../utils/ApiService";
import { showErrorAlert, showSuccessAlert, showWarningAlert } from "../../utils/Sweetalert";

export default function Users() {
    const [selectedUser, setSelectedUser] = useState(null); 
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [showEditModal, setShowEditModal] = useState(false);
    const [users, setUsers] = useState([]);
    const pageSize = 2; 

    useEffect(() => {
        fetchUsers();
    }, [searchTerm, currentPage]);

    const fetchUsers = async () => {
        try {
            const params = {
                searchTerm: searchTerm,
                page: currentPage,
                pageSize:pageSize,
            };
        const response = await getApiCall(params,GETALLUSERS); 
        const fetchedUsers = response.data.data;
        const fetchedTotalPages = response.data.data?.pagination?.totalPages || 1;
        setUsers(fetchedUsers);
        setTotalPages(fetchedTotalPages);

        } catch (error) {
        console.error("Failed to fetch users:", error);
        }
    };

    const formik = {
        initialValues: { username: "",password:"",name:"", email:"",user_type:"" },
        validationSchema: addUserValidationSchema,
        onSubmit: async (values, { setErrors, resetForm }) => {
          try {
            const param = { username: values.username, 
                email: values.email, 
                name: values.name,
                password:values.password,
                user_type:values.user_type };
                
            const response = await apiCall(param, ADDUSER);
            showSuccessAlert("User added successfully:");
            setShowModal(false);
            resetForm();
          } catch (error) {
            console.error("Failed to add user:", error.message);
            showErrorAlert("Failed to add user:");
          }
        },
    };
    
    const formikEdit = useFormik({
        initialValues: {
            password: selectedUser?.password || "",
            name: selectedUser?.name || "",
            email: selectedUser?.email || "",
            user_type: selectedUser?.user_type || "",
        },
        enableReinitialize: true,
        onSubmit: async (values, { setErrors }) => {
            try {
                const updatedFields = {};
                Object.keys(values).forEach((key) => {
                    if (values[key] !== selectedUser[key] && values[key].trim() !== "") {
                        updatedFields[key] = values[key];
                    }
                });
                updatedFields.id = selectedUser.id;
                const response = await putConditionsApi(updatedFields, UPDATEUSER);
                showSuccessAlert("User updated successfully!");
                handleClose();
            } catch (error) {
                showErrorAlert("Something went wrong while updating the user!");
            }
        },
    });

    const { values, handleChange, handleBlur, handleSubmit, errors, touched,resetForm } =
    useFormik(formik);

    const handleStatusChange = async (userId, currentStatus) => {
        const newStatus = currentStatus === "1" ? "0" : "1";
        const statusText = newStatus === "1" ? "activate" : "inactivate";
    
        const result = await showWarningAlert(`Do you want to ${statusText} this user?`, "Yes");
        if (result.isConfirmed) {
            try {
                const payload = { id: userId, status: newStatus }; 
                const response = await putConditionsApi(payload, UPDATEUSER);
    
                if (response.success) {
                    setUsers((users) => ({
                        ...users,
                        users: {
                            ...users.users,
                            rows: users.users.rows.map((user) =>
                                user.id === userId ? { ...user, status: newStatus } : user
                            ),
                        },
                    }));
                    showSuccessAlert(`The user has been successfully ${statusText}d.`);
                } else {
                    showErrorAlert("Failed to update status!");
                }
            } catch (error) {
                console.error("Error updating status:", error);
                showErrorAlert("Something went wrong while updating the status!");
            }
        }
    };

    const handleDelete = async (id, username) => {
        const result = await showWarningAlert(`Do you want to delete the user: ${username}?`,'Yes,Delete it');
        if (result.isConfirmed) {
          try {
            const params = { id: id };
            const response = await deleteApiCall(params, DELETEUSER);
      
            if (response?.data?.status === 'success') {
              showSuccessAlert(`The user "${username}" has been deleted.`,);
              setUsers(users.filter(user => user.id !== id));
            } else {
              showErrorAlert('Something went wrong while deleting the user!');
            }
          } catch (error) {
            showErrorAlert('Something went wrong while deleting the user!');
          }
        }
    };
    
    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleEdit = (user) => {
        setSelectedUser(user);
        setShowEditModal(true);
    };

    const handleClose = () => {
        setShowEditModal(false);
        setSelectedUser(null);
    };

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            paginate(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            paginate(currentPage + 1);
        }
    };

    return (
        <Layout>
            <div className="container-xxl flex-grow-1 container-p-y">
                <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center mb-3">
                        <h5 className="mb-0">Users</h5>
                        <div>
                            <button type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#uploadExcelModal">
                                <span className="tf-icons bx bx-upload"></span>&nbsp; Upload Excel
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => setShowModal(true)}
                            >
                                <span className="tf-icons bx bx-plus"></span>&nbsp; Add User
                            </button>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-12">
                            <div className="card border-0">
                                <div className="card-body">
                                    <div className="row align-items-center">
                                        <div className="col-md-6">
                                            {/* <p className="fs-15 fw-semibold mb-0">Offers</p> */}
                                        </div>
                                        <div className="col-md-3">
                                        </div>
                                        <div className="col-md-3">
                                            <label className="form-label fs-12 fw-semibold">Search</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Search surveys..."
                                                value={searchTerm}
                                                onChange={(e) => {
                                                    setSearchTerm(e.target.value);
                                                    setCurrentPage(1); 
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="table text-nowrap">
                        <div className="">
                            <table id="example" className="display table" style={{ width: "100%" }}>
                                <thead>
                                    <tr>
                                        <th>Username</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody className="table-border-bottom-0">
                                {users?.users?.res?.rows?.length > 0 ? (
                                    users.users.res.rows.map((user, index) => (
                                        <tr key={index}>
                                        <td><i className="fab fa-angular fa-lg text-danger"></i> <strong>{user.username}</strong></td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.user_type}</td>
                                        {/* <td>
                                            <div className="form-check form-switch mb-2">
                                            <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                                            </div>
                                        </td> */}
                                        <td>
                                            <input 
                                                type="button" 
                                                name="status" 
                                                value={user.status === "1" ? "Active" : "Inactive"} 
                                                className={user.status === "1" ? "active" : "inactive"} 
                                                style={{ border: 'none' }}
                                                onClick={() => handleStatusChange(user.id, user.status)}
                                            />
                                        </td>
                                        {/* <td>
                                            <div className="form-check form-switch mb-2">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="flexSwitchCheckDefault"
                                                    value={user.status === 1 ? "Active" : "Inactive"} 
                                                    // id={`flexSwitchCheckDefault-${user.id}`}
                                                    checked={user.status === 1}
                                                    onChange={() => handleStatusChange(user.id, user.status)} 
                                                />
                                            </div>
                                        </td> */}

                                        <td>
                                            <button className="icon icon-sm icon-secondary me-3" onClick={() => handleEdit(user)}>
                                            <i className="bi bi-pencil-fill" title="Edit"></i>
                                            </button>
                                            <button className="icon icon-sm icon-primary me-3"  target="_blank" onClick={() => handleDelete(user.id, user.username)}>
                                                <i className="bi bi-trash" data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" title="" data-bs-original-title="Delete" aria-label="Delete">
                                                </i>
                                            </button>
                                        </td>
                                        </tr>
                                    ))
                                    ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center">No users found</td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {users?.users?.res?.rows?.length > 0 ? 
                    <div className="d-flex justify-content-between align-items-center mt-3">
                        <nav className="pagination-nav mt-3">
                            <ul className="pagination justify-content-end">
                            <li className="page-item">
                                <button
                                onClick={handlePreviousPage}
                                className={`page-link ${
                                    currentPage === 1 ? "disabled" : ""
                                }`}
                                disabled={currentPage === 1}
                                >
                                Previous
                                </button>
                            </li>
                            <li className="page-item d-flex">
                                {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                    key={index}
                                    className={`page-link ${
                                    currentPage === index + 1 ? "active" : ""
                                    }`}
                                    onClick={() => paginate(index + 1)}
                                    disabled={currentPage === index + 1}
                                >
                                    {index + 1}
                                </button>
                                ))}
                            </li>
                            <li className="page-item">
                                <button
                                onClick={handleNextPage}
                                className={`page-link ${
                                    currentPage === totalPages ? "disabled" : ""
                                }`}
                                disabled={currentPage === totalPages}
                                >
                                Next
                                </button>
                            </li>
                            </ul>
                        </nav>
                    </div> 
                    :"No users found"
                    }

                </div>
                <PopUp
                    show={showModal}
                    onHide={handleModalClose}
                    title="Add User"
                    size='lg'
                    footerButtons={[
                        {
                            label: "Close",
                            variant: "secondary",
                            onClick: handleModalClose,
                        },
                        {
                            label: "Add",
                            variant: "primary",
                            onClick: handleSubmit,
                        },
                    ]}
                >
                    <form>
                        <div className="form-group row">
                            <div className="col-sm-6">
                                <label className="fs-12 fw-semibold">
                                    Username
                                    <span className="mandatory">
                                    </span>
                                </label>
                                <input type="text" 
                                    name="username"
                                    id="username"
                                    className="mt-0 mb-3 fs-13 form-control length_count"
                                    placeholder="Username"
                                    value={values.username}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.username && errors.username && (
                                    <div className="text-danger">{errors.username}</div>
                                )}
                            </div>
                            <div className="col-sm-6">
                                <label className="fs-12 fw-semibold">
                                    Password
                                    <span className="mandatory"></span>
                                </label>
                                <input type="password" 
                                    name="password" 
                                    id="password" 
                                    className="mt-0 mb-3 fs-13 form-control length_count"
                                    placeholder="***********"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.password && errors.password && (
                                    <div className="text-danger">{errors.password}</div>
                                )}
                            </div>
                            <div className="col-sm-6">
                                <label className="fs-12 fw-semibold">
                                    Name
                                    <span className="mandatory"></span>
                                </label>
                                <input type="text" name="name"
                                    className="mt-0 fs-13 mb-3 
                                    form-control length_count" 
                                    placeholder="Name"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                 {touched.name && errors.name && (
                                    <div className="text-danger">{errors.name}</div>
                                )}
                            </div>
                            <div className="col-sm-6">
                                <label className="fs-12 fw-semibold">
                                    Email
                                    <span className="mandatory"></span>
                                </label>
                                <input type="email" 
                                    name="email"
                                    id="email"
                                    className="mt-0 mb-3 fs-13 form-control length_count"
                                    placeholder="Email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                 {touched.email && errors.email && (
                                    <div className="text-danger">{errors.email}</div>
                                )}
                            </div>
                            <div className="col-sm-6">
                                <label className="fs-12 fw-semibold">
                                    Role
                                    <span className="mandatory"></span>
                                </label>
                                <select className="fs-13 mb-3 form-control length_count "
                                 name="user_type"
                                 value={values.user_type}
                                 onChange={handleChange}
                                 onBlur={handleBlur}
                                 >
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </select>
                                {touched.user_type && errors.user_type && (
                                    <div className="text-danger">{errors.user_type}</div>
                                )}
                            </div>
                        </div>
                    </form>
                </PopUp>

                <PopUp
                    show={showEditModal}
                    onHide={handleClose}
                    size='md'
                    title="Edit Survey Name"
                    footerButtons={[
                        {
                        label: "Close",
                        variant: "secondary",
                        onClick: handleClose,
                        },
                        {
                        label: "Save Changes",
                        variant: "primary",
                        onClick: formikEdit.handleSubmit
                        },
                    ]}
                >
                    <form>
                       <div className="form-group row">
                            <div className="col-sm-6">
                                <label className="fs-12 fw-semibold">
                                    Password
                                    <span className="mandatory"></span>
                                </label>
                                <input type="password" 
                                    name="password" 
                                    id="password" 
                                    className="mt-0 mb-3 fs-13 form-control length_count"
                                    placeholder="***********"
                                    value={formikEdit.values.password}
                                    onChange={formikEdit.handleChange}
                                    onBlur={formikEdit.handleBlur}
                                />
                                {formikEdit.touched.password && formikEdit.errors.password && (
                                    <div className="text-danger">{formikEdit.errors.password}</div>
                                )}
                            </div>
                            <div className="col-sm-6">
                                <label className="fs-12 fw-semibold">
                                    Name
                                    <span className="mandatory"></span>
                                </label>
                                <input type="text" name="name"
                                    className="mt-0 fs-13 mb-3 
                                    form-control length_count" 
                                    placeholder="Name"
                                    value={formikEdit.values.name}
                                    onChange={formikEdit.handleChange}
                                    onBlur={formikEdit.handleBlur}
                                />
                                 {formikEdit.touched.name && formikEdit.errors.name && (
                                    <div className="text-danger">{formikEdit.errors.name}</div>
                                )}
                            </div>
                            <div className="col-sm-6">
                                <label className="fs-12 fw-semibold">
                                    Email
                                    <span className="mandatory"></span>
                                </label>
                                <input type="email" 
                                    name="email"
                                    id="email"
                                    className="mt-0 mb-3 fs-13 form-control length_count"
                                    placeholder="Email"
                                    value={formikEdit.values.email}
                                    onChange={formikEdit.handleChange}
                                    onBlur={formikEdit.handleBlur}
                                />
                                 {formikEdit.touched.email && formikEdit.errors.email && (
                                    <div className="text-danger">{formikEdit.errors.email}</div>
                                )}
                            </div>
                            <div className="col-sm-6">
                                <label className="fs-12 fw-semibold">
                                    Role
                                    <span className="mandatory"></span>
                                </label>
                                <select className="fs-13 mb-3 form-control length_count "
                                 name="user_type"
                                 value={formikEdit.values.user_type}
                                 onChange={formikEdit.handleChange}
                                 onBlur={formikEdit.handleBlur}
                                 >
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </select>
                                {formikEdit.touched.user_type && formikEdit.errors.user_type && (
                                    <div className="text-danger">{formikEdit.errors.user_type}</div>
                                )}
                            </div>
                        </div>
                    
                    </form>
                </PopUp>
            </div>
        </Layout>
    )
}