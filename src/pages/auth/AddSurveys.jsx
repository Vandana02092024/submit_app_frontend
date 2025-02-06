import React, { useState ,useEffect} from "react";
import { useFormik } from "formik";
import { addSurveyValidationSchema } from "../../utils/validationSchema";
import { ADDSURVEY } from "../../utils/Endpoints";
import { apiCall } from "../../utils/ApiService";

const SurveyModal = ({ showModal, handleClose }) => {
  const formikConfig = {
    initialValues: {
      surveyName:""
    },
    validationSchema:addSurveyValidationSchema,
    onSubmit: async (values, { setErrors }) => {
      try {
        const param = { survey_name: values.surveyName };
        const response = await apiCall(param, ADDSURVEY); 
        const { data } = response; 
        handleClose(); 
      } catch (error) {
        setErrors({ apiError: error.message });
      }
    },
  };

  const { values, handleChange, handleBlur, handleSubmit, errors, touched ,resetForm } =
    useFormik(formikConfig);

    useEffect(() => {
      if (showModal) {
        resetForm(); 
      }
    }, [showModal, resetForm]);

  return (
    <div
      className={`modal fade ${showModal ? "show" : ""}`}
      id="addSurveyModal"
      tabIndex="-1"
      aria-hidden="true"
      style={{ display: showModal ? "block" : "none" }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel1">
              Add Survey
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label className="form-label" htmlFor="survey-name">
                  Survey Name
                </label>
                <div className="input-group input-group-merge">
                  <input
                    type="text"
                    className="form-control"
                    id="surveyName"
                    placeholder="Enter survey name"
                    value={values.surveyName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                   {touched.surveyName && errors.surveyName && (
                      <div className="text-danger">{errors.surveyName}</div>
                    )}
                </div>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={handleClose}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onSubmit={handleSubmit}
              onClick={handleSubmit}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyModal;