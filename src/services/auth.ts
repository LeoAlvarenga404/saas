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
  
  async login(
    email: string,
    password: string
  ): Promise<{ accessToken: string }> {
    const response = await api.post("/auth/login", { email, password });
    const { accessToken } = response.data;

    Cookies.set("accessToken", accessToken);

    return { accessToken };
  },

  async register(userData: UserData) {
    const response = await api.post("/auth/register", userData);
    return response.data;
  },

  logout() {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
  },

  hasRefreshToken() {
    return !!Cookies.get("refreshToken");
  },
};
