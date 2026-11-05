import axios from "axios";
import { BACKEND_BASE_URL } from "../env";

const api = axios.create({
  baseURL: `${BACKEND_BASE_URL.replace(/\/+$/, "")}/api`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response.data?.data ?? response.data,
  (error) => {
    const message =
      error.response?.data?.error || error.message || "Request failed";

    return Promise.reject(new Error(message));
  },
);

export default api;
