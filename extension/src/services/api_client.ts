import axios from "axios";

export const BASE_URL = "https://turjuman.vercel.app/";

const apiClient = axios.create({
  baseURL: `${BASE_URL}`,
});

apiClient.interceptors.request.use(
  async (config) => {
    const { jwt: token } = await chrome.storage.local.get("jwt");
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
