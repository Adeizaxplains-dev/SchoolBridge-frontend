// ============================================================
// frontend/src/services/api.js
// Single axios instance for the whole app.
//
// Configure the backend with VITE_API_URL, e.g.
//   VITE_API_URL=https://schoolbridge-api.onrender.com/api
// (a trailing "/api" is added automatically if you forget it)
// ============================================================

import axios from "axios";

const DEFAULT_DEV_API = "http://localhost:5000/api";

const normalizeBase = (url) => {
  const clean = String(url || "").trim().replace(/\/+$/, "");
  if (!clean) return DEFAULT_DEV_API;
  return /\/api$/.test(clean) ? clean : `${clean}/api`;
};

export const API_BASE_URL = normalizeBase(import.meta.env.VITE_API_URL);

// Backend origin, used for uploaded files (logos, PDFs...)
export const API_ORIGIN = API_BASE_URL.replace(/\/api$/, "");

// Turn "/uploads/x.png" into an absolute URL; leave absolute URLs alone.
export const assetUrl = (path) => {
  if (!path) return "";
  if (/^(https?:|data:|blob:)/i.test(path)) return path;
  return `${API_ORIGIN}${path.startsWith("/") ? "" : "/"}${path}`;
};

const AUTH_KEYS = ["token", "user", "school"];

export const clearAuthStorage = () =>
  AUTH_KEYS.forEach((key) => localStorage.removeItem(key));

const API = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const school = JSON.parse(localStorage.getItem("school") || "null");
      const schoolId = school?._id || school?.id;
      if (schoolId) {
        config.headers["x-school-id"] = schoolId;
      }
    } catch {
      /* ignore corrupted storage */
    }

    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const isAuthCall = /\/auth\/(login|register)/.test(
        error.config?.url || ""
      );

      // A wrong password is not an expired session
      if (!isAuthCall) {
        clearAuthStorage();

        const path = window.location.pathname;
        if (path !== "/login" && path !== "/register" && path !== "/") {
          window.location.assign("/login");
        }
      }
    }

    return Promise.reject(error);
  }
);

// Best human-readable message from an axios error
export const getErrorMessage = (error, fallback = "Something went wrong.") => {
  if (!error.response) {
    return "Cannot reach the server. Check your connection and try again.";
  }
  return error.response.data?.message || fallback;
};

export default API;
