import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppRoutes from "@/routes/app-routes";
import "@/index.css";
import { ThemeProvider } from "./contexts/theme-provider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AppRoutes />
    </ThemeProvider>
  </StrictMode>
);
