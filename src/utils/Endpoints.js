
const auth = '/authenticate';

const survey = '/survey';

const users = '/users';

// export const LOGIN = `${auth}/login`;

export const LOGIN = auth + "/loginWeb";

export const SIGNUP = auth + "/sign-up-web";

export const FORGOTPASSWORD = auth + "/change-pin";

export const ADDSURVEY = survey + "/addSurvey";

export const GETALLSURVEY = survey + "/getAllSurvey";

export const GETALLQUESTION = survey +"/fetchQuestionsWeb";

export const UPDATESURVEY = survey +"/updateSurveyName";

export const DELETESURVEY = survey +"/deleteSurveyName";

export const ADDUSER = users + "/addUser";

export const GETALLUSERS = users +"/fetchUserDetails";

export const UPDATEUSER = users + "/updateUserDetails";

export const DELETEUSER = users + "/deleteUserDetails";

export const GETALLSURVEYS = survey + "/getAllSurvey";

export const SAVESURVEYQUESTIONS = survey +"/saveSurveyQuestion";

export const GETALLSURVEYQUESTIONS = survey +"/fetch-questions-display";

export const GETQUESTIONBYID = survey + "/fetchQuestionById";

export const UPDATEOPTIONSTATUS = survey +"/updateOptionStatus";

export const UPDATESURVEYQUESTIONSDATA = survey +"/updateSurveyQuestion";

export const UPDATEQUESTIONSTATUS = survey + "/updateQuestionStatus";

export const GETSURVEYDASHBOARD = survey +"/getSurveyStatistics";

export const GETALLCOUNTBYRESPONSES = survey + "/getAllCountByResponses";