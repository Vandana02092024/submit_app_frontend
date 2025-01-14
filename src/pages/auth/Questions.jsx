import React, {useState,useEffect} from 'react'
import { Layout } from '../../Layout/Layout';
import { useNavigate } from "react-router-dom";
import { getApiCall, getConditionsApi, putConditionsApi } from '../../utils/ApiService';
import { GETALLSURVEYQUESTIONS, GETALLSURVEYS, UPDATEQUESTIONSTATUS } from '../../utils/Endpoints';
import PopUp from './PopUp';
import { showWarningAlert } from '../../utils/Sweetalert';

export default function Questions() {
    const [surveys, setSurveys] = useState([]);
    const [selectedSurvey, setSelectedSurvey] = useState('');
     const[surveysData, setSurveysData] = useState([]);
    const [showViewModal, setShowViewModal] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState(null); 
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const pageSize = 1; 

    const navigate = useNavigate();
    useEffect(() => {
        fetchSurveys();
    }, []);

    const fetchSurveys = async () => {
        try {
        const response = await getConditionsApi(GETALLSURVEYS); 
        const formattedSurveys = response.data.map(survey => ({
            survey_name: survey.survey_name,
            survey_code: survey.survey_code     
        }));
        setSurveys(formattedSurveys);

        if (formattedSurveys.length > 0) {
            setSelectedSurvey(formattedSurveys[0].survey_code);
        }
    } catch (error) {
        console.error('Error fetching active surveys:', error);
    }
    };

    const selectedSurveyName = surveys.find(s => s.survey_code === selectedSurvey)?.survey_name;
    const dataToPass ={survey_name:selectedSurveyName, survey_code:selectedSurvey};
    const handleClick = () => {
        navigate("/addQuestions",{ state: dataToPass });
    };

    useEffect(() => {
        if (selectedSurvey) {
            const fetchSurveysQuestions = async () => {
                try {
                    const params = {
                        searchTerm: searchTerm,
                        page: currentPage,
                        pageSize:pageSize,
                        survey_code: selectedSurvey
                    };
                    const response = await getApiCall(params,GETALLSURVEYQUESTIONS); 
                    const fetchedTotalPages = response.data.data?.pagination?.totalPages || 1;
                    setSurveysData(response.data.data);
                    setTotalPages(fetchedTotalPages);
                } catch (error) {
                    console.error("Failed to fetch survey questions:", error);
                }
            };
            fetchSurveysQuestions();
        }
    }, [selectedSurvey,searchTerm, currentPage]);

    const handleEdit = (surveyId) => {
        navigate('/editQuestions', { state: { surveyId, dataToPass } });
    };

    const handleView = (survey) => {
        setSelectedQuestion(survey);
        setShowViewModal(true);
    };

    const handleClose = () => {
        setShowViewModal(false);
        setSelectedQuestion(null);
    };

    const handleUpdateStatus = async(question_id) =>{
        if (question_id) {
            const result = await showWarningAlert(`Do you want to delete this option`, "Yes");
            if (!result.isConfirmed) {
                return; 
            }
            try {
                const payload = { question_id: question_id};
                const response = await putConditionsApi(payload, UPDATEQUESTIONSTATUS);
            }
            catch (error) {
                console.error("Error deleting option:", error);
            }
        }
    }

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
                <div className="row mb-3">
                    <div className="col-md-12">
                        <div className="card border-0">
                            <div className="card-body">
                                <div className="row align-items-center">
                                    <div className="col-md-6">
                                        {/* <p className="fs-15 fw-semibold mb-0">Offers</p> */}
                                    </div>
                                    <div className="col-md-3">
                                        <label className="form-label fs-12 fw-semibold">Search</label>
                                        <div className="d-flex">
                                            <input
                                                type="text"
                                                className=" form-control fs-12"
                                                placeholder="Search questions..."
                                                value={searchTerm}
                                                onChange={(e) => {
                                                    setSearchTerm(e.target.value);
                                                    setCurrentPage(1); 
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <label className="form-label fs-12 fw-semibold">Survey</label>
                                        <select
                                            className="form-select fs-12"
                                            aria-label="Select Survey"
                                            placeholder ="Open this select menu"
                                            value={selectedSurvey} 
                                            onChange={(e) => setSelectedSurvey(e.target.value)} 
                                        >
                                            <option value="" disabled selected>Open this select menu</option>
                                            {surveys.map((survey) => (
                                                <option key={survey.survey_code} value={survey.survey_code}>
                                                    {survey.survey_name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Questions</h5>
                    <button onClick={handleClick} type="button" className="btn btn-primary">
                        <span className="tf-icons bx bx-plus"></span>&nbsp; Add Questions
                    </button>
                </div>
                <div className="container-xxl flex-grow-1 container-p-y">
                    <div className="row">
                        <div className="col-md mb-4 mb-md-0">
                            <div className="accordion" id="accordionExample">
                            {surveysData?.surveys?.map((survey, index) => (
                                <div key={survey.id} className="card accordion-item">
                                    <h2 className="accordion-header d-flex align-items-center" id={`heading${index}`}>
                                    <button
                                        type="button"
                                        className="accordion-button collapsed"
                                        data-bs-toggle="collapse"
                                        data-bs-target={`#accordion${index}`}
                                        aria-expanded="false"
                                        aria-controls={`accordion${index}`}
                                    >
                                        {survey.label}
                                    </button>
                                    <div className="d-flex">
                                        <button
                                        className="icon icon-sm icon-theme me-3"
                                        onClick={() => handleView(survey)}
                                        >
                                        <i
                                            className="bi bi-eye"
                                            data-bs-toggle="tooltip"
                                            data-popup="tooltip-custom"
                                            data-bs-placement="top"
                                            title="View"
                                            aria-label="View"
                                        ></i>
                                        </button>
                                        <button
                                        className="icon icon-sm icon-secondary me-3"
                                        onClick={() => handleEdit(survey.id)}
                                        >
                                        <i
                                            className="bi bi-pencil-fill"
                                            data-bs-toggle="tooltip"
                                            data-popup="tooltip-custom"
                                            data-bs-placement="top"
                                            title="Edit"
                                            aria-label="Edit"
                                        ></i>
                                        </button>
                                        <button
                                        className="icon icon-sm icon-primary me-3"
                                        onClick={() => handleUpdateStatus(survey.id)}
                                        >
                                        <i
                                            className="bi bi-trash"
                                            data-bs-toggle="tooltip"
                                            data-popup="tooltip-custom"
                                            data-bs-placement="top"
                                            title="Delete"
                                            aria-label="Delete"
                                        ></i>
                                        </button>
                                    </div>
                                    </h2>

                                     <div
                                        id={`accordion${index}`}
                                        className="accordion-collapse collapse"
                                        data-bs-parent="#accordionExample"
                                        >
                                        <div className="accordion-body">
                                            <div className="table-responsive text-nowrap">
                                                <table className="table table-borderless">
                                                    <thead>
                                                    <tr>
                                                        <th>Question Type</th>
                                                        <th>Question</th>
                                                        <th>Values</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody className="table-border-bottom-0">
                                                        <tr>
                                                            <td>
                                                            {survey.type}
                                                            </td>
                                                            <td><strong>{survey.label}</strong></td>
                                                            <td>
                                                                {survey.options?.length > 0 ? (
                                                                    <ul>
                                                                    {survey.options.map((option, optIndex) => (
                                                                        <li key={optIndex}>{option.text}</li>
                                                                    ))}
                                                                    </ul>
                                                                ) : survey.type === 'SLIDER' ? (
                                                                    <ul>
                                                                    <li>Min: {survey.min}</li>
                                                                    <li>Max: {survey.max}</li>
                                                                    <li>Step: {survey.step}</li>
                                                                    </ul>
                                                                ) : survey.type === 'INPUT' ? (
                                                                    <p>Placeholder: {survey.placeholder}</p>
                                                                ) : survey.type === 'RATING' ? (
                                                                    <p>Scale: {survey.scale}</p>
                                                                ) : (
                                                                    <p>No additional details</p>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            </div>
                        </div>
                    </div>
                </div>
                {surveysData?.surveys?.length>0?
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
                    </div> :"No Question found"
                 } 
            </div>
            <PopUp
                show={showViewModal}
                onHide={handleClose}
                size='md'
                title="Questions Details"
                footerButtons={[
                    {
                    label: "Close",
                    variant: "secondary",
                    onClick: handleClose,
                    },
                ]}
            >
        <form>
            <div>
                {selectedQuestion ? (
                    <>
                    <p><strong>Label:</strong> {selectedQuestion.label}</p>
                    <p><strong>Required:</strong> {selectedQuestion.is_required ? "Yes" : "No"}</p>

                    {["DROPDOWN", "SINGLE_SELECTION", "MULTISELECT"].includes(selectedQuestion.type) ? (
                        <>
                        <p><strong>Options:</strong></p>
                        <ul>
                            {selectedQuestion.options?.map((option, index) => (
                            <li key={index}>{option.text}</li>
                            ))}
                        </ul>
                        </>
                    ) : selectedQuestion.type === "RATING" ? (
                        <p><strong>Scale:</strong> {selectedQuestion.scale}</p>
                    ) : selectedQuestion.type === "INPUT" ? (
                        <p><strong>Placeholder:</strong> {selectedQuestion.placeholder || "N/A"}</p>
                    ) : selectedQuestion.type === "SLIDER" ? (
                        <>
                        <p><strong>Min:</strong> {selectedQuestion.min}</p>
                        <p><strong>Max:</strong> {selectedQuestion.max}</p>
                        <p><strong>Step:</strong> {selectedQuestion.step}</p>
                        </>
                    ) : (
                        <p>Unknown question type.</p>
                    )}
                    </>
                ) : (
                    <p>Loading question details...</p>
                )}
            </div>

        </form>
            </PopUp>
        </div>
    </Layout>
  )
}
