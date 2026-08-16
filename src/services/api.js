import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Automatically attach JWT token if present
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // or wherever you store your token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Example: redirect or handle 401 Unauthorized
    if (error.response && error.error?.response?.status === 401) {
      console.warn("Unauthorized! Redirecting to login...");
    }
    return Promise.reject(error);
  }
);

export default api;