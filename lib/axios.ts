import axios from "axios";
import { API_BASE_URL } from "@/config";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

/**
 * REQUEST INTERCEPTOR
 * Attach JWT token automatically
 */
api.interceptors.request.use(
    (config) => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("token");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

/**
 * RESPONSE INTERCEPTOR
 * Handle global errors
 */
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (typeof window !== "undefined") {
            // If unauthorized → logout automatically
            if (error.response?.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("role");
                window.location.href = "/admin/login";
            }
        }

        return Promise.reject(
            error.response?.data?.message || "Something went wrong"
        );
    }
);

export default api;
