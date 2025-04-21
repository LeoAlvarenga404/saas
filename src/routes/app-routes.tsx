import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "@/layout";
import { Home } from "@/pages/Home";
import { StockControl } from "@/pages/stock-control";
import { SignIn } from "@/pages/auth/sign-in";
import { ForgotPassword } from "@/pages/auth/forgot-password";
import { ProtectedRoute } from "@/components/(auth)/protected-route";

export default function AppRoute() {
  return (
      <Router>
        <Routes>
          {/* Rotas públicas */}
          <Route path="/login" element={<SignIn />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Rotas privada */}
          <Route element={<ProtectedRoute />}>
            <Route
              path="/"
              element={
                <Layout>
                  <Home />
                </Layout>
              }
            />
            <Route
              path="/stock-control"
              element={
                <Layout>
                  <StockControl />
                </Layout>
              }
            />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
  );
}
