import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "@/layout";
import { Home } from "@/pages/Home";
import { StockControl } from "@/pages/stock-control";

export default function AppRoute() {
  return (
    <Router>
      <Routes>
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
      </Routes>
    </Router>
  );
}
