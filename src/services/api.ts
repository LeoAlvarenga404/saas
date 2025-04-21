import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

type FailedRequest = {
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
  config: AxiosRequestConfig;
};

let refreshing = false;
let requestQueue: FailedRequest[] = [];

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalConfig = error.config;

    if (!originalConfig) return Promise.reject(error);

    const bypassRoutes = ["/auth/login", "/auth/register", "/auth/refresh"];

    if (
      error.response?.status !== 401 ||
      bypassRoutes.includes(originalConfig.url || "")
    ) {
      return Promise.reject(error);
    }

    if (refreshing) {
      return new Promise((resolve, reject) => {
        requestQueue.push({ resolve, reject, config: originalConfig });
      });
    }

    refreshing = true;

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await api.post("/auth/refresh");

      requestQueue.forEach(({ config, resolve }) => {
        api(config)
          .then(resolve)
          .catch(() => {});
      });

      requestQueue = [];

      return api(originalConfig);
    } catch (err) {
      requestQueue.forEach(({ reject }) => reject(err));
      requestQueue = [];
      return Promise.reject(err);
    } finally {
      refreshing = false;
    }
  }
);

export default api;
