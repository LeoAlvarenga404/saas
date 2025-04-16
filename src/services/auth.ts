import Cookies from "js-cookie";
import api from "./api";

type UserData = {
  name: string;
  email: string;
  password: string;
  enterpriseId: string;
  roleId: string;
};

export const authService = {
  async login(email: string, password: string) {
    try {
      const response = await api.post("/auth/login", { email, password });
      return response.data;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Login failed";
      throw new Error(message);
    }
  },

  async register(userData: UserData) {
    try {
      const response = await api.post("/auth/register", userData);
      return response.data;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Registration failed";
      throw new Error(message);
    }
  },

  logout() {
    Cookies.remove("refreshToken");
    // Limpar qualquer outro dado de autenticação se necessário
  },

  hasRefreshToken() {
    return !!Cookies.get("refreshToken");
  },
};