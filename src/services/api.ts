import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

type QueuedRequest = {
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
  config: AxiosRequestConfig;
};

let isRefreshing = false;
let failedRequestsQueue: QueuedRequest[] = [];

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;

    // Se não for erro 401 ou já tentou refresh, rejeita normalmente
    if (error.response?.status !== 401 || !originalRequest) {
      return Promise.reject(error);
    }

    // Se for requisição de refresh, rejeita para evitar loop
    if (originalRequest.url === "/auth/refresh") {
      return Promise.reject(error);
    }

    // Se já está fazendo refresh, coloca na fila
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedRequestsQueue.push({
          resolve,
          reject,
          config: originalRequest,
        });
      });
    }

    isRefreshing = true;

    try {
      // Tenta renovar o token com pequeno delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await api.post("/auth/refresh");

      // Reprocessa todas as requisições na fila
      failedRequestsQueue.map(({ config, resolve }) =>
        api(config)
          .then(resolve)
          .catch(() => {})
      );

      failedRequestsQueue = [];

      // Retorna a requisição original
      return api(originalRequest);
    } catch (refreshError) {
      // Se falhar, rejeita todas as requisições na fila
      failedRequestsQueue.forEach(({ reject }) => reject(refreshError));
      failedRequestsQueue = [];

      // Faz logout e redireciona
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;
