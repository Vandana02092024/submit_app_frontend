import React ,{useState }from 'react'
import { Layout } from '../../Layout/Layout';
import { useLocation,useNavigate} from "react-router-dom";
import { useFormik, validateYupSchema } from "formik";
import { apiCall, getApiCall } from '../../utils/ApiService';
import { SAVESURVEYQUESTIONS } from '../../utils/Endpoints';
import { showErrorAlert, showSuccessAlert } from '../../utils/Sweetalert';
import { addQuestions } from '../../utils/validationSchema';

function AddQuestions() {
    const [questionType, setQuestionType] = useState("");
    const [options, setOptions] = useState([""]);
    const [isRequired, setIsRequired] = useState(false);
    const location = useLocation();
     const navigate = useNavigate();
    const dataToPass = location.state;
    const survey_code = dataToPass.survey_code;

    const handleQuestionTypeChange = (e) => {
        const selectedType = e.target.value;
        setQuestionType(selectedType); 
        setFieldValue("question_type", selectedType); 
        if (["DROPDOWN", "SINGLE_SELECTION", "MULTISELECT"].includes(selectedType)) {
          setOptions([""]);
        } else {
          setOptions([]);
        }
    };
  
    const addOption = () => {
      setOptions([...options, ""]);
    };
  
    const handleOptionChange = (index, value) => {
      const updatedOptions = [...options];
      updatedOptions[index] = value;
      setOptions(updatedOptions);
    };
  
    const removeOption = (index) => {
      const updatedOptions = options.filter((_, i) => i !== index);
      setOptions(updatedOptions);
    };

    const formik = {
        initialValues: {
            question: "",
            placeholder: "",
            question_type: "",
            scale: 0,
            min: 0,
            max: 0,
            step: 0,
            options:[],
        },
        validationSchema:addQuestions,
        onSubmit: async (values, { setErrors, resetForm }) => {
          try {
            const param = {
                survey_code:survey_code,
                question_label: values.question,
                placeholder: values.placeholder,
                is_required: isRequired ? 1 : 0,
                question_type: values.question_type,
                scale: values.question_type === "RATING" ? values.scale : '',
                min: values.question_type === "SLIDER" ? values.min : '',
                max: values.question_type === "SLIDER" ? values.max : '',
                step: values.question_type === "SLIDER" ? values.step : '',
                options:  options.map((opt) => ({ label: opt})),
            };
            const response = await apiCall(param, SAVESURVEYQUESTIONS);
            showSuccessAlert("Survey Questions added successfully:");
            navigate("/questions");
            resetForm();
            setOptions([""]);
            setIsRequired(false);
          } catch (error) {
            console.error("Failed to add survey questions:", error.message);
            showErrorAlert("Failed to add survey questions:");
          }
        },
    };

    const { values, handleChange, handleBlur, handleSubmit, errors, touched,resetForm ,setFieldValue} =
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
                                        <h5 className="mb-0">Add Question</h5>
                                        <label className="mb-3">
                                        <input
                                            type="checkbox"
                                            id="isRequired"
                                            name="isRequired"
                                            checked={isRequired}
                                            onChange={(e) => setIsRequired(e.target.checked)}
                                            onBlur={handleBlur}
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
                                            onBlur={handleBlur}
                                        />
                                         {touched.question && errors.question && (
                                            <div className="text-danger">{errors.question}</div>
                                        )}
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
                                            value={values.question_type}
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
                                        {touched.question_type && errors.question_type && (
                                            <div className="text-danger">{errors.question_type}</div>
                                        )}
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
                                            onBlur={handleBlur}
                                            />
                                            {touched.placeholder && errors.placeholder && (
                                                <div className="text-danger">{errors.placeholder}</div>
                                            )}
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
                                                    value={option.id}
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
                                                onBlur={handleBlur}
                                            />
                                            {touched.scale && errors.scale && (
                                                <div className="text-danger">{errors.scale}</div>
                                            )}
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
                                             {touched.min && errors.min && (
                                                <div className="text-danger">{errors.min}</div>
                                            )}
                                            <input
                                            type="number"
                                            name='max'
                                            className="form-control me-2"
                                            placeholder="Max"
                                            value={values.max}
                                            onChange={handleChange}
                                            />
                                             {touched.max && errors.max && (
                                                <div className="text-danger">{errors.max}</div>
                                            )}
                                            <input
                                            name='step'
                                            type="number"
                                            className="form-control"
                                            placeholder="Step"
                                            value={values.step}
                                            onChange={handleChange}
                                            />
                                             {touched.step && errors.step && (
                                                <div className="text-danger">{errors.step}</div>
                                            )}
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

export default AddQuestions
