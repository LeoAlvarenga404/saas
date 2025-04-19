import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppRoutes from "@/routes/app-routes";
import "@/index.css";
import { ThemeProvider } from "./contexts/theme-provider";
import { AuthProvider } from "@/contexts/auth-context";
import { UserProvider } from "@/contexts/user-context";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <UserProvider>
          <AppRoutes />
        </UserProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
