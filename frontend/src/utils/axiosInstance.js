import axios from "axios";
import { BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 80000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log("Axios Error:", error);

    if (error.response) {
      // 🔐 Handle unauthorized
      if (error.response.status === 401) {
        window.location.href = "/";
        return Promise.reject(error);
      }

      if (error.response.status === 500) {
        console.warn("Server returned 500, using fallback response");
        return Promise.resolve(error.response);
      }
      return Promise.resolve(error.response);
    }

    if (error.code === "ECONNABORTED") {
      console.error("Request timeout. Please try again.");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;