import Cookies from "js-cookie";
import api from "./api";
import { jwtDecode } from "jwt-decode";
import { User } from "@/contexts/user-context";

type UserData = {
  name: string;
  email: string;
  password: string;
  enterpriseId: string;
  roleId: string;
};

type DecodedToken = {
  sub: number;
  enterprise_id: number;
  role_id: number;
  is_master: boolean;
  iat?: number;
  exp?: number;
  name?: string;
  email?: string;
};

export const authService = {
  async login(
    email: string,
    password: string
  ): Promise<{ accessToken: string; user: User }> {
    const response = await api.post("/auth/login", { email, password });
    const { accessToken } = response.data;

    Cookies.set("accessToken", accessToken);

    const decoded = jwtDecode<DecodedToken>(accessToken);

    const user: User = {
      userId: decoded.sub,
      enterpriseId: decoded.enterprise_id,
      roleId: decoded.role_id,
      isMaster: decoded.is_master,
      name: decoded.name,
      email: decoded.email,
    };

    return { accessToken, user };
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
