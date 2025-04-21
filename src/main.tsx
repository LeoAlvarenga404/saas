import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppRoutes from "@/routes/app-routes";
import "@/index.css";
import { ThemeProvider } from "./contexts/theme-provider";
import { AuthProvider } from "@/contexts/auth-context";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
