import axios from "axios";
import { getToken } from "../utils/auth";

const axiosInstance = axios.create({
  baseURL: "https://panditnow-backend.onrender.com",
});

// 🔥 Automatically attach token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;