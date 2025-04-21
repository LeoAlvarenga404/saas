import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import api from "@/services/api";
import { authService } from "@/services/auth";

interface User {
  userId: number;
  enterpriseId: number;
  roleId: number;
  isMaster: boolean;
  name?: string;
  email?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const isAuthenticated = !!user;

  const loadUserFromToken = (token: string): User | null => {
    try {
      const decoded = jwtDecode<{
        sub: number;
        enterprise_id: number;
        role_id: number;
        is_master: boolean;
        name?: string;
        email?: string;
      }>(token);

      return {
        userId: decoded.sub,
        enterpriseId: decoded.enterprise_id,
        roleId: decoded.role_id,
        isMaster: decoded.is_master,
        name: decoded.name,
        email: decoded.email,
      };
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = Cookies.get("accessToken");

        if (token) {
          const userData = loadUserFromToken(token);
          if (userData) {
            setUser(userData);
            api.defaults.headers.common.Authorization = `Bearer ${token}`;
          }
        }
      } catch (error) {
        console.error("Failed to initialize auth", error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const { accessToken } = await authService.login(email, password);
    Cookies.set("accessToken", accessToken);
    const userData = loadUserFromToken(accessToken);
    setUser(userData);
    api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  };

  const logout = () => {
    try {
      authService.logout();
    } finally {
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      setUser(null);
      delete api.defaults.headers.common.Authorization;
      window.location.href = "/login";
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
