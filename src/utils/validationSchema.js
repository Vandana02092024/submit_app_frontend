import * as Yup from "yup";

 export const loginValidationSchema =  Yup.object({
    username: Yup.string()
      .required("username/email is required"),
    password: Yup.string().required("Password is required"),
  })

  export const signUpValidationSchema =  Yup.object({
    username: Yup.string()
    .matches(
      /^[a-zA-Z0-9]+$/,
      "Username must only contain letters and numbers, without spaces or special characters."
    )
      .required("username is required"),
      email: Yup.string()
      .email("Invalid email")
      .required("email is required"),
    password: Yup.string().required("Password is required"),
  })

  export const forgotPasswordValidationSchema =  Yup.object({
      email: Yup.string()
      .email("Invalid email")
      .required("email is required"),
  })

  export const addSurveyValidationSchema = Yup.object({
    surveyName: Yup.string()
    .required("survey name is required"),
  })

  export const addUserValidationSchema =  Yup.object({
    username: Yup.string()
    .matches(
      /^[a-zA-Z0-9]+$/,
      "Username must only contain letters and numbers, without spaces or special characters."
    )
      .required("username is required"),
      email: Yup.string()
      .email("Invalid email")
      .required("email is required"),
    password: Yup.string().required("Password is required"),
    name: Yup.string()
    .required("name is required"),
    user_type : Yup.string()
    .required("usertype is required")
  })

  export const updateUserValidationSchema =  Yup.object({
      email: Yup.string()
      .email("Invalid email")
      .required("email is required"),
    password: Yup.string().required("Password is required"),
    name: Yup.string()
    .required("name is required"),
    user_type : Yup.string()
    .required("usertype is required")
  })

  export const addQuestions = Yup.object({
    question: Yup.string().required("Question is required"),
    question_type: Yup.string().required("Question Type is required"),
    placeholder: Yup.string().when("question_type",([question_type],schema) => {
      if(question_type ==='INPUT') return  Yup.string().required("Placeholder is required");
       return schema;
    }),
  })

