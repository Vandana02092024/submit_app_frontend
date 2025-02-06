import React ,{useEffect, useState} from 'react'
import { Layout } from '../../Layout/Layout'
import { useLocation,useNavigate} from "react-router-dom";
import { getApiCall, putConditionsApi } from '../../utils/ApiService';
import { useFormik } from "formik";
import { GETQUESTIONBYID, UPDATEOPTIONSTATUS, UPDATESURVEYQUESTIONSDATA } from '../../utils/Endpoints';
import { showErrorAlert, showSuccessAlert, showWarningAlert } from '../../utils/Sweetalert';

function EditQuestions() {
    const [questionType, setQuestionType] = useState("");
    const [options, setOptions] = useState([""]);
    const [response,setResponse] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const data = location.state;
    const question_id = data.surveyId;
    const survey_name = data.dataToPass.survey_name;
    const survey_code = data.dataToPass.survey_code;

   useEffect(() => {
        fetchQuestionsById();
    }, []);

    const fetchQuestionsById = async () => {
        try {
        const param = { question_id:question_id };
        const response = await getApiCall(param, GETQUESTIONBYID); 
        const fetchedQuestionsData = response.data.data;
        setResponse(fetchedQuestionsData);
        setQuestionType(fetchedQuestionsData.type || "");
        setOptions(
          ["DROPDOWN", "SINGLE_SELECTION", "MULTISELECT"].includes(fetchedQuestionsData.type)
            // ? fetchedQuestionsData.options.map((option) => option.text || "")
            ?  fetchedQuestionsData.options.map((option) => ({
                id: option.id || "",
                text: option.text || "",
              }))
      
            : []
        );
        } catch (error) {
            showErrorAlert('Error fetching active surveys:');
        }
    };

    const handleQuestionTypeChange = (e) => {
        const selectedType = e.target.value;
        setQuestionType(selectedType); 
        setFieldValue("questionType", selectedType);

        if (["DROPDOWN", "SINGLE_SELECTION", "MULTISELECT"].includes(selectedType)) {
            const resetOptions = [{ text: "" }];
        //   const resetOptions = [""];
          setOptions(resetOptions);
          setFieldValue("options", resetOptions);
        } else {
          setOptions([]);
          setFieldValue("options", []);
        }
    };

    const formik = {
        enableReinitialize: true, 
        initialValues: {
        question: response?.label || "",
        questionType: response?.type || "",
        isRequired: response?.is_required === 1,
        placeholder: response?.placeholder || "",
        scale: response?.scale || 0,
        min: response?.min || 0,
        max: response?.max || 0,
        step: response?.step || 0,
        options: options || [""],
        },
        onSubmit: async (values,{resetForm}) => {
        try {
            const payload = {
            id: question_id,
            question: values.question,
            question_type: questionType,
            placeholder: values.placeholder,
            scale: values.scale,
            min: values.min,
            max: values.max,
            step: values.step,
            isRequired: values.isRequired ? 1 : 0,
            options: values.options,
            survey_code: survey_code,
            };
            const response = await putConditionsApi(payload, UPDATESURVEYQUESTIONSDATA);
            showSuccessAlert('Survey question updated successfully!');
            navigate("/questions");
            resetForm();
            setOptions([""]);
        } catch (error) {
            showErrorAlert('Something went wrong while updating the survey question!');
        }
        },
    };

    const addOption = () => {
        const newOptions = [...options, { id: "", text: "" }];
        setOptions(newOptions);
        setFieldValue("options", newOptions);
    };

    const removeOption = async (index) => {
        const optionToDelete = options[index];
        if (optionToDelete.id) {
            const result = await showWarningAlert(`Do you want to delete this option`, "Yes");
            if (!result.isConfirmed) {
                return; 
            }
            try {
                const payload = { id: optionToDelete.id};
                const response = await putConditionsApi(payload, UPDATEOPTIONSTATUS);
            }
            catch (error) {
                showErrorAlert("Error deleting option:");
            }
        }
        const updatedOptions = options.filter((_, i) => i !== index);
        setOptions(updatedOptions);
        // setFieldValue("options", updatedOptions)
    };

    const handleOptionChange = (index, value) => {
        const updatedOptions = [...options];
        if (updatedOptions[index]) {
          updatedOptions[index].text = value;
        } else {
          updatedOptions[index] = { text: value };
        }
        setOptions(updatedOptions);
        setFieldValue("options", updatedOptions);
    };
  
    const { values, handleChange, handleSubmit ,setFieldValue} =
    useFormik(formik);

  return (
    <Layout>
        <div className="container-xxl flex-grow-1 container-p-y">
            <div className="">
                <div className="container-xxl flex-grow-1 container-p-y">
                    <div className="row">
                        <div className="col-md mb-4 mb-md-0">
                            <form onSubmit={handleSubmit}>
                                {/* Question Section */}
                                <div className="d-flex justify-content-between align-items-center">
                                    <h5 className="mb-0">Edit Question</h5>
                                    <label className="mb-3">
                                    <input
                                        type="checkbox"
                                        id="isRequired"
                                        name="isRequired"
                                        checked={values.isRequired}
                                        onChange={handleChange}
                                    />
                                    Required
                                    </label>
                                </div>
                                <div className="form-group row mb-2">
                                    <label className="col-md-2 fs-12 fw-semibold">Question</label>
                                    <div className="col-md-10">
                                    <textarea
                                        name="question"
                                        className="form-control fs-13"
                                        placeholder="Question"
                                        rows="3"
                                        value={values.question}
                                        onChange={handleChange}
                                    >
                                   
                                    </textarea>
                                    </div>
                                </div>

                                {/* Question Type Dropdown */}
                                <div className="form-group row mb-2">
                                    <label className="col-md-2 fs-12 fw-semibold">Question Type</label>
                                    <div className="col-md-10">
                                    <select
                                        className="form-control fs-13"
                                        name="question_type"
                                        onChange={handleQuestionTypeChange}
                                        value={questionType}
                                    >
                                        <option value="">Select Question Type</option>
                                        <option value="DROPDOWN">DROPDOWN</option>
                                        <option value="INPUT">INPUT</option>
                                        <option value="SINGLE_SELECTION">SINGLE_SELECTION</option>
                                        <option value="MULTISELECT">MULTISELECT</option>
                                        <option value="RATING">RATING</option>
                                        <option value="SLIDER">SLIDER</option>
                                        <option value="IMAGE_INPUT">IMAGE_INPUT</option>
                                        <option value="AUDIO_INPUT">AUDIO_INPUT</option>
                                        <option value="VIDEO_INPUT">VIDEO_INPUT</option>
                                        <option value="SIGNATURE_INPUT">SIGNATURE_INPUT</option>
                                        <option value="TRUE_FALSE">TRUE_FALSE</option>
                                        <option value="WHOLE_NUMBER">WHOLE_NUMBER</option>
                                        <option value="DECIMAL">DECIMAL</option>
                                    </select>
                                  
                                    </div>
                                </div>

                                {/* Placeholder Section */}
                                {questionType === "INPUT" && (
                                    <div className="form-group row mb-2">
                                    <label className="col-md-2 fs-12 fw-semibold">Placeholder</label>
                                    <div className="col-md-6">
                                        <input
                                        type="text"
                                        name="placeholder"
                                        className="form-control fs-13"
                                        placeholder="Placeholder"  
                                        value={values.placeholder}
                                        onChange={handleChange}
                                        />
                                    </div>
                                    </div>
                                )}

                                {/* Options Section */}
                                {["DROPDOWN", "SINGLE_SELECTION", "MULTISELECT"].includes(questionType) && (
                                    <div className="form-group row mb-2">
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <h5 className="mb-0">
                                                
                                            </h5>
                                            <button type="button" className="btn btn-primary" onClick={addOption}>
                                                <span className="tf-icons bx bx-plus"></span>&nbsp;
                                                    Add Option
                                            </button>
                                        </div>
                                        <label className="col-md-2 fs-12 fw-semibold">Options</label>
                                        <div className="col-md-4">
                                            {options.map((option, index) => (
                                            <div key={index} className="d-flex mb-2">
                                                <input
                                                type="text"
                                                className="form-control me-2"
                                                value={option.text}
                                                // value={option}
                                                onChange={(e) => handleOptionChange(index, e.target.value)}
                                                placeholder={`Option ${index + 1}`}
                                                />
                                                <button
                                                type="button"
                                                className="btn btn-danger"
                                                onClick={() => removeOption(index)}
                                                >
                                                Delete
                                                </button>
                                            </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {questionType === "RATING" && (
                                    <div className="form-group row mb-2">
                                        <label className="col-md-2 fs-12 fw-semibold">Scale</label>
                                        <div className="col-md-6">
                                        <input
                                            type="number"
                                            name="scale"
                                            className="form-control fs-13"
                                            placeholder="Scale"  
                                            value={values.scale}
                                            onChange={handleChange}   
                                        />
                                        </div>
                                    </div>
                                )}

                                {/* Slider Settings */}
                                {questionType === "SLIDER" && (
                                    <div className="form-group row mb-2">
                                    <label className="col-md-2 fs-12 fw-semibold">Slider Settings</label>
                                    <div className="col-md-10 d-flex">
                                        <input
                                        type="number"
                                        name='min'
                                        className="form-control me-2"
                                        placeholder="Min" 
                                        value={values.min}
                                        onChange={handleChange}  
                                        />
                                        <input
                                        type="number"
                                        name='max'
                                        className="form-control me-2"
                                        placeholder="Max"
                                        value={values.max}
                                        onChange={handleChange} 
                                        />
                                        <input
                                        name='step'
                                        type="number"
                                        className="form-control"
                                        placeholder="Step"
                                        value={values.step}
                                        onChange={handleChange}            
                                        />
                                    </div>
                                    </div>
                                )}

                                <div className="d-flex justify-content-between align-items-center mt-4">
                                    <h5 className='mb-0'>

                                    </h5>
                                    <button type="submit" className="btn btn-primary">
                                    Submit
                                    </button>
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

export default EditQuestions
