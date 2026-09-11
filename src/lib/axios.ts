import { useAuthStore } from "@/stores/auth";
import axios, { type AxiosError } from "axios";

declare module "axios" {
  interface AxiosRequestConfig {
    skipAuth?: boolean;
    skipRedirect401?: boolean;
  }
}

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/";

export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (config.skipAuth) {
      return config;
    }

    if (typeof window === "undefined") {
      return config;
    }

    const token = useAuthStore.getState().token;

    if (token) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },

  (error: AxiosError) => {
    const config = error.config;

    if (config?.skipRedirect401) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        useAuthStore.getState().logout();

        const currentPath = window.location.pathname;

        const isLoginPage =
          currentPath.startsWith("/admin/login") ||
          currentPath.startsWith("/user/login");

        if (!isLoginPage) {
          const next = encodeURIComponent(
            window.location.pathname + window.location.search,
          );

          window.location.replace(`/user/login?next=${next}`);
        }
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
