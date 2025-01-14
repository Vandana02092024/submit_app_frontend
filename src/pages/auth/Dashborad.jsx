import React, {useState,useEffect} from 'react'
import { Layout } from "../../Layout/Layout";
import { getApiCall, getConditionsApi } from '../../utils/ApiService';
import { GETALLSURVEY, GETSURVEYDASHBOARD } from '../../utils/Endpoints';
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const [selectedSurvey, setSelectedSurvey] = useState('');
    const [surveys, setSurveys] = useState([]);
    const [surveyDashboard ,SetSurveyDashboard] = useState([]);
    
    const navigate = useNavigate();

    useEffect(() => {
        fetchSurveys();
    }, []);
    
    const fetchSurveys = async () => {
        try {
        const response = await getConditionsApi(GETALLSURVEY); 
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

    useEffect(() => {
        if (selectedSurvey) {
            const fetchSurveysDataDashboard = async () => {
                try {
                    const params = {
                        survey_code: selectedSurvey
                    };
                    const response = await getApiCall(params,GETSURVEYDASHBOARD); 
                    SetSurveyDashboard(response.data.data);
                } catch (error) {
                    console.error("Failed to fetch survey questions:", error);
                }
            };
            fetchSurveysDataDashboard();
        }
    }, [selectedSurvey]);
    const selectedSurveyName = surveys.find(s => s.survey_code === selectedSurvey)?.survey_name;
    const dataToPass ={survey_name:selectedSurveyName, survey_code:selectedSurvey};

    const handleClick = () => {
        navigate('/displayRecords', { state: {dataToPass } });
    };

  
  return (
        <Layout>
            <div className="container-xxl flex-grow-1 container-p-y">
                <div className="row">
                <div className="row mb-3">
                    <div className="col-md-12">
                        <div className="card border-0">
                            <div className="card-body">
                                <div className="row align-items-center">
                                    <div className="col-md-6">
                                        <p className="fs-15 fw-semibold mb-0">Surveys Dashboard</p>
                                    </div>
                                    <div className="col-md-3">
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
                    <div className="col-lg-12 col-md-12 order-1">
                        <div className="row">
                            {surveyDashboard ? (
                                <>
                                    <div className="col-lg-3 col-md-4 col-12 mb-4">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="ss_dash">
                                                    <div className="ms-2">
                                                        <div className="rj-align">
                                                            <span className="fw-semibold fs_11" style={{ color: "#b4b4b4" }}>
                                                            Connected Surveys
                                                            </span>
                                                            <div className="dash-icon">
                                                                <i className="tf-icons bi bi-people"></i>
                                                            </div>
                                                        </div>
                                                        <h2 className="mb-0 ft-dark" style={{ color: "#545454" }}>
                                                            {surveyDashboard.connectedSurveyCount?.code
                                                            ? surveyDashboard.connectedSurveyCount.res
                                                            :0}
                                                        </h2>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-4 col-12 mb-4">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="ss_dash">
                                                    <div className="ms-2">
                                                        <div className="rj-align">
                                                            <span className="fw-semibold fs_11" style={{ color: "#b4b4b4" }}>
                                                            Questions Count
                                                            </span>
                                                            <div className="dash-icon">
                                                                <i className="tf-icons bi bi-question-circle"></i>
                                                            </div>
                                                        </div>
                                                        <h2 className="mb-0 ft-dark" style={{ color: "#545454" }}>
                                                            {surveyDashboard.questionCount?.code
                                                            ? surveyDashboard.questionCount.res
                                                            :0}
                                                        </h2>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-4 col-12 mb-4"     onClick={() => handleClick()}>
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="ss_dash">
                                                    <div className="ms-2">
                                                        <div className="rj-align">
                                                            <span className="fw-semibold fs_11" style={{ color: "#b4b4b4" }}>
                                                            Responses count (Total users responded)
                                                            </span>
                                                            <div className="dash-icon">
                                                                <i className="tf-icons bi bi-person-check"></i>
                                                            </div>
                                                        </div>
                                                        <h2 className="mb-0 ft-dark" style={{ color: "#545454" }}>
                                                            {surveyDashboard.uniqueUserCount?.code
                                                            ? surveyDashboard.uniqueUserCount.res
                                                            :0}
                                                        </h2>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                                ) : (
                                <div className="col-12">
                                    <p>No survey data available</p>
                                </div>
                                )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
  )
}
