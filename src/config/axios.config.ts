import axios from "axios";
import { environment } from "./environment";

// Spinner and toast helpers
let spinnerCount = 0;
const showSpinner = () => {
  spinnerCount++;
  window.dispatchEvent(new CustomEvent("app:show-spinner"));
};
const hideSpinner = () => {
  spinnerCount = Math.max(0, spinnerCount - 1);
  if (spinnerCount === 0) {
    window.dispatchEvent(new CustomEvent("app:hide-spinner"));
  }
};

const showToast = (type: "success" | "error", message: string) => {
  window.dispatchEvent(
    new CustomEvent("app:toast", { detail: { type, message } })
  );
};

const axiosInstance = axios.create({
  baseURL: environment.baseURL,
  timeout: environment.timeout,
  headers: environment.headers,
  withCredentials: environment.withCredentials,
});

// Interceptors
axiosInstance.interceptors.request.use(
  (config) => {
    showSpinner();
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    hideSpinner();
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    hideSpinner();
    if (
      ["post", "put", "delete"].includes(
        (response.config.method || "").toLowerCase()
      ) &&
      response.data &&
      response.status < 300
    ) {
      showToast("success", "Operation successful!");
    }
    return response;
  },
  (error) => {
    hideSpinner();

    let errMsg: string = "An error occurred";
    // Handle Strapi-like structure for taken email/username
    if (
      error.response &&
      error.response.status === 400 &&
      error.response.data?.error?.name === "ApplicationError" &&
      error.response.data?.error?.message === "Email or Username are already taken"
    ) {
      errMsg = "Email or Username are already taken";
    } else if (typeof error.response?.data?.message === "string") {
      errMsg = error.response.data.message;
    } else if (typeof error.response?.data?.error?.message === "string") {
      errMsg = error.response.data.error.message;
    } else if (typeof error.message === "string") {
      errMsg = error.message;
    }

    showToast("error", errMsg);

    return Promise.reject(error);
  }
);

export default axiosInstance;