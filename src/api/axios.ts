import axios from "axios";
import { STORAGE_KEYS } from "../constants";

const api = axios.create({
  baseURL: "https://admin-moderator-backend-staging.up.railway.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(STORAGE_KEYS.TOKEN);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      localStorage.clear();

      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

export default api;