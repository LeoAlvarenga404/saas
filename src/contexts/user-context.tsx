import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export interface User {
  userId: number;
  enterpriseId: number;
  roleId: number;
  isMaster: boolean;
  name?: string;
  email?: string;
}
type Decoded = {
  sub: number;
  enterprise_id: number;
  role_id: number;
  is_master: boolean;
  iat?: number;
  exp?: number;
  name?: string;
  email?: string;
};

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUserState] = useState<User | null>(null);

  const loadUserFromToken = (): User | null => {
    const token = Cookies.get("accessToken");
    if (!token) return null;
    try {
      const decoded = jwtDecode<Decoded>(token);
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

  const setUser = (user: User | null) => {
    if (user) {
      setUserState(user);
    } else {
      setUserState(null);
      Cookies.remove("accessToken");
    }
  };

  const logout = () => {
    setUser(null);
    Cookies.remove("refreshToken");
  };

  useEffect(() => {
    const stored = loadUserFromToken();
    if (stored) setUserState(stored);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
};
