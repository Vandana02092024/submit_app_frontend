import axios from "axios";

/**
 * Makes an API call to the login endpoint.
 * @param {string} username - The username for authentication.
 * @param {string} password - The password for authentication.
 * @param {string} endpoint - The API endpoint to call.
 * @returns {Promise} - Returns a promise with the response or throws an error.
 */

  const userData = localStorage.getItem("userData");
  let token = null;
  if (userData) {
    const parsedData = JSON.parse(userData);
    token = parsedData.token;
  } else {
    console.error("No user data found in localStorage");
  }

  export const apiCall = async (data, endpoint) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}${endpoint}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": process.env.REACT_APP_X_API_KEY,
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      return response.data; 
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || "Request failed");
      }
      throw new Error("Something went wrong. Please try again later.");
    }
  };

  export const getApiCall = async (conditions, endpoint) => {
    try {
      const queryParams = new URLSearchParams(conditions).toString();
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}${endpoint}?${queryParams}`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": process.env.REACT_APP_X_API_KEY,
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      return response; 
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || "Request failed");
      }
      throw new Error("Something went wrong. Please try again later.");
    }
  };

  export const getConditionsApi = async (endpoint) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}${endpoint}`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": process.env.REACT_APP_X_API_KEY,
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      return response.data; 
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || "Request failed");
      }
      throw new Error("Something went wrong. Please try again later.");
    }
  };

  export const putConditionsApi = async (conditions, endpoint) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}${endpoint}`,
        conditions,
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": process.env.REACT_APP_X_API_KEY,
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      return response.data; 
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || "Request failed");
      }
      throw new Error("Something went wrong. Please try again later.");
    }
  };

  export const deleteApiCall = async (conditions,endpoint) => {
    try {
      const queryParams = new URLSearchParams(conditions).toString();
      const response = await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}${endpoint}?${queryParams}`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": process.env.REACT_APP_X_API_KEY,
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      return response; 
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || "Request failed");
      }
      throw new Error("Something went wrong. Please try again later.");
    }
  };
