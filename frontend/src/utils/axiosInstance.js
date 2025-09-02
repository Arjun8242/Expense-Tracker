import axios from "axios";
import { BASE_URL } from "./apipaths";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token"); // make sure key matches
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.error("Unauthorized!");
        // just reject, don't redirect here
      } else if (error.response.status === 500) {
        console.error("Server error.");
      }
    } else if (error.code === "ECONNABORTED") {
      console.error("Request timed out.");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
