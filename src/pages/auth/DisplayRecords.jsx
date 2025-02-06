import { Layout } from '../../Layout/Layout';
import React ,{useEffect, useState }from 'react';
import { useLocation} from "react-router-dom";
import { getApiCall } from '../../utils/ApiService';
import { GETALLCOUNTBYRESPONSES } from '../../utils/Endpoints';
import { Table } from "react-bootstrap";
import { showErrorAlert } from '../../utils/Sweetalert';

export default function DisplayRecords() {
     const location = useLocation();
    const dataToPass = location.state;
    const survey_code = dataToPass.dataToPass.survey_code;
    const survey_name = dataToPass.dataToPass.survey_name;
    const [records, SetRecords] = useState([]);

     useEffect(() => {
        fetchRecords();
    }, []);

    const fetchRecords = async () => {
        try {
            const params = {
                survey_code: survey_code
            };
            const response = await getApiCall(params,GETALLCOUNTBYRESPONSES); 
            SetRecords(response.data.data);
        } catch (error) {
            showErrorAlert("Failed to fetch survey questions:");
        }
    };

  return (
    <Layout>
        <div className="container-xxl flex-grow-1 container-p-y">
            <div className="">
                <div className="container-xxl flex-grow-1 container-p-y">
                    <div class="card-header d-flex justify-content-between align-items-center mb-3">
                        <h3 class="mb-0">{survey_name}</h3>
                    </div>
                    <div className="row">
                        <div className="col-md mb-4 mb-md-0">
                            <div>
                                {records.map((record, index) => (
                                    <div key={index} className="mb-4">
                                    <div className="d-flex" style={{ justifyContent: "space-between" }}>
                                        <h4>Question: {record.question_label}</h4>
                                    </div>

                                    <table id="example" className="display table" style={{ width: "100%" }}>
                                        <thead>
                                        <tr>
                                            <th>Option</th>
                                            <th>Response Count</th>
                                        </tr>
                                        </thead>
                                        <tbody className="table-border-bottom-0">
                                        {record.options && record.options.length > 0 ? (
                                            record.options.map((option) => {
                                            const response = record.responses.find(
                                                (res) => parseInt(res.response) === option.id
                                            );
                                            return (
                                                <tr key={option.id}>
                                                <td>{option.text}</td>
                                                <td>{response ? response.userCount : 0}</td>
                                                </tr>
                                            );
                                            })
                                        ) : (
                                            record.responses.map((res, idx) => (
                                            <tr key={idx}>
                                                <td>
                                                {res.response.startsWith("assets/images/")
                                                    ? res.response.endsWith(".mp4")
                                                    ? "Video Upload"
                                                    : "Image Upload"
                                                    : "Response"}
                                                </td>
                                                <td>{res.userCount}</td>
                                            </tr>
                                            ))
                                        )}

                                        {(!record.options || record.options.length === 0) &&
                                            (!record.responses || record.responses.length === 0) && (
                                            <tr>
                                                <td colSpan="2" className="text-center">
                                                No data available.
                                                </td>
                                            </tr>
                                            )}
                                        </tbody>
                                    </table>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Layout>    
  )
}
