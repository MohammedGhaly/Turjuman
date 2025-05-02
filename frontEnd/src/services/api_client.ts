import axios from "axios";

export const BASE_URL = import.meta.env.VITE_BASE_URL;

const apiClient = axios.create({
  baseURL: `${BASE_URL}`,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt"); // Or from a secure store
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
