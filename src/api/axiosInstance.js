import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://panditnow-backend.onrender.com",
});

export default axiosInstance;
