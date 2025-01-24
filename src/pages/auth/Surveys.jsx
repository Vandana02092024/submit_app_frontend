import React from "react";
import { useState, useEffect } from "react";
import { Layout } from "../../Layout/Layout";
import { useFormik } from "formik";
import { ADDSURVEY, DELETESURVEY, GETALLQUESTION, UPDATESURVEY } from "../../utils/Endpoints";
import { apiCall, deleteApiCall, getApiCall, putConditionsApi } from "../../utils/ApiService";
import PopUp from "./PopUp";
import { addSurveyValidationSchema } from "../../utils/validationSchema";
import { showErrorAlert, showSuccessAlert, showWarningAlert } from "../../utils/Sweetalert";

export default function Surveys() {
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedSurvey, setSelectedSurvey] = useState(null); 
    const [surveys, setSurveys] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const pageSize = 2; 

    useEffect(() => {
        fetchSurveys();
    }, [searchTerm, currentPage]);

    const fetchSurveys = async () => {
        try {
            const params = {
                searchTerm: searchTerm,
                page: currentPage,
                pageSize:pageSize,
            };
        const response = await getApiCall(params,GETALLQUESTION); 
        const fetchedSurveys = response.data.data;
        const fetchedTotalPages = response.data.data?.pagination?.totalPages || 1;
        setSurveys(fetchedSurveys);
        setTotalPages(fetchedTotalPages);

        } catch (error) {
        console.error("Failed to fetch surveys:", error);
        }
    };

    const formik = {
        initialValues: { surveyName: "" , surveyDesc:""},
        validationSchema: addSurveyValidationSchema,
        onSubmit: async (values, { setErrors, resetForm }) => {
          try {
            const param = { survey_name: values.surveyName,surveyDesc: values.surveyDesc };
            const response = await apiCall(param, ADDSURVEY);
            showSuccessAlert("Survey added successfully:");
            setShowModal(false);
            resetForm();
          } catch (error) {
            console.error("Failed to add survey:", error.message);
            showErrorAlert("Failed to add survey:");
          }
        },
    };

    const { values, handleChange, handleBlur, handleSubmit,setFieldValue, errors, touched,resetForm } =
    useFormik(formik);
    
    
    const handleModalClose = () => {
        setShowModal(false);
        resetForm();
    };

    const handleEdit = (survey) => {
        setSelectedSurvey(survey);
        setShowEditModal(true);
    };

    const handleClose = () => {
        setShowEditModal(false);
        setSelectedSurvey(null);
    };

    const formikEdit = useFormik({
        initialValues: {
          surveyName: selectedSurvey?.survey_name || "",
          surveyDesc: selectedSurvey?.surveyDesc || "",
        },
        enableReinitialize: true,
        validationSchema: addSurveyValidationSchema,
        onSubmit: async (values, { setErrors }) => {
          try {
            const params = {
              survey_code: selectedSurvey.survey_code,
              survey_name: values.surveyName,
              surveyDesc: values.surveyDesc,
            };
            const response = await putConditionsApi(params, UPDATESURVEY);
            showSuccessAlert("Survey updated successfully:");
            handleClose();
          } catch (error) {
            showErrorAlert('Something went wrong while updating the survey!');
          }
        },
    });

    const handleDelete = async (surveyCode, surveyName) => {
        const result = await showWarningAlert(`Do you want to delete the survey: ${surveyName}?`);
        if (result.isConfirmed) {
          try {
            const params = { survey_code: surveyCode };
            const response = await deleteApiCall(params, DELETESURVEY);
      
            if (response?.data?.status === 'success') {
              showSuccessAlert(`The survey "${surveyName}" has been deleted.`);
              setSurveys(surveys.filter(survey => survey.surevy_code !== surveyCode));
            } else {
              showErrorAlert('Something went wrong while deleting the survey!');
            }
          } catch (error) {
            showErrorAlert('Something went wrong while deleting the survey!');
          }
        }
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
                <div className="">
                    <div className="card-header d-flex justify-content-between align-items-center mb-3">
                        <h5 className="mb-0">Survey</h5>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => setShowModal(true)}
                        >
                            <span className="tf-icons bx bx-plus"></span>&nbsp; Add Survey
                        </button>

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
                                                className="form-control fs-12"
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
                    <div className="container-xxl flex-grow-1 container-p-y">
                        <div className="row">
                            <div className="col-md mb-4 mb-md-0">
                                <div className="accordion" id="accordionExample">
                                    {surveys.surveys?.map((survey, index) => (
                                        <div key={survey.surevy_code} className="card accordion-item">
                                            <h2 className="accordion-header d-flex align-items-center" id={`heading${index}`}>
                                                <button type="button" className="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target={`#accordion${index}`} aria-expanded="false" aria-controls={`accordion${index}`}>
                                                {survey.survey_name}
                                                </button>
                                                <div className="d-flex">
                                                    {/* <a href="#" className="icon icon-sm icon-theme me-3" target="_blank"><i className="bi bi-eye" data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" title="" data-bs-original-title="View" aria-label="View"></i></a> */}
                                                    <button  className="icon icon-sm icon-secondary me-3"   target="_blank" onClick={() => handleEdit(survey)}>
                                                        <i className="bi bi-pencil-fill" 
                                                            data-bs-toggle="tooltip" data-popup="tooltip-custom"
                                                            data-bs-placement="top" title="" data-bs-original-title="Edit"
                                                            aria-label="Edit">
                                                        </i>
                                                    </button>
                                                    <button className="icon icon-sm icon-primary me-3"  target="_blank" onClick={() => handleDelete(survey.survey_code, survey.survey_name)}>
                                                        <i className="bi bi-trash" data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" title="" data-bs-original-title="Delete" aria-label="Delete">

                                                        </i>
                                                    </button>
                                                </div>
                                            </h2>

                                            <div id={`accordion${index}`} className="accordion-collapse collapse" data-bs-parent="#accordionExample" >
                                                <div className="accordion-body">
                                                    <div className="table-responsive text-nowrap">
                                                        <table className="table table-borderless">
                                                            <thead>
                                                                <tr>
                                                                    <th>Question</th>
                                                                    <th>Question Type</th>
                                                                    {/* <th>Status</th> */}
                                                                </tr>
                                                            </thead>
                                                            <tbody className="table-border-bottom-0">
                                                                {survey.questions?.map((question, qIndex) => (
                                                                    <tr key={qIndex}>
                                                                        <td>{question.label}</td>
                                                                        <td>
                                                                            <strong>{question.type}</strong>
                                                                        </td>
                                                                        {/* <td>
                                                                            <div className="form-check form-switch mb-2">
                                                                            <input
                                                                                className="form-check-input"
                                                                                type="checkbox"
                                                                                id={`questionStatus${index}-${qIndex}`}
                                                                                checked=""
                                                                            />
                                                                            </div>
                                                                        </td> */}
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {surveys.surveys?.length >0 ?
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
                            </div> :"No Surveys Found"
                            }
                        </div>
                    </div>
                    <PopUp
                    show={showModal}
                    onHide={handleModalClose}
                    title="Add Survey"
                    size='md'
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
                        <div className="mb-3">
                        <label className="form-label" htmlFor="surveyName">
                            Survey Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="surveyName"
                            placeholder="Enter survey name"
                            value={values.surveyName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {touched.surveyName && errors.surveyName && (
                            <div className="text-danger">{errors.surveyName}</div>
                        )}
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="survey-description">
                            Survey Description
                            </label>
                            <div className="input-group input-group-merge">
                            <textarea className="fs-13 mb-3 form-control length_count f-ht-70" 
                                id="surveyDesc" 
                                name="surveyDesc"
                                rows="4" 
                                cols="50"
                                placeholder="Enter your address" 
                                onChange={(e) => setFieldValue("surveyDesc", e.target.value)} 
                                value={values.surveyDesc} 
                                onBlur={handleBlur}
                            />
                            {touched.surveyDesc && errors.surveyDesc && (
                                <div className="text-danger">{errors.surveyDesc}</div>
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
                        <div className="mb-3">
                            <label className="form-label" htmlFor="surveyName">
                            Survey Name
                            </label>
                            <input
                            type="text"
                            className="form-control"
                            id="surveyName"
                            value={formikEdit.values.surveyName}
                            onChange={formikEdit.handleChange}
                            onBlur={formikEdit.handleBlur}
                            />
                            {formikEdit.touched.surveyName && formikEdit.errors.surveyName && (
                            <div className="text-danger">{formikEdit.errors.surveyName}</div>
                            )}
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="survey-description">
                            Survey Description
                            </label>
                            <div className="input-group input-group-merge">
                            <textarea className="fs-13 mb-3 form-control length_count f-ht-70" 
                                id="surveyDesc" 
                                name="surveyDesc"
                                rows="4" 
                                cols="50"
                                placeholder="Enter your address" 
                                onChange={(e) => setFieldValue("surveyDesc", e.target.value)} 
                                value={values.surveyDesc} 
                                onBlur={handleBlur}
                            />
                            {touched.surveyDesc && errors.surveyDesc && (
                                <div className="text-danger">{errors.surveyDesc}</div>
                            )}
                            </div>
                        </div>
                        
                        </form>
                    </PopUp>
                </div>
            </div>
        </Layout>
    )
}