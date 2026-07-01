import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard"; // Layout (contains Outlet)
import CreateTest from "../pages/CreateTest";
import AddQuestions from "../pages/AddQuestions";
import Preview from "../pages/Preview";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import DashboardPage from "../pages/DashboardPage";
import TestTracking from "../pages/TestTracking";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Login />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          {/* Layout Route */}
          <Route element={<Dashboard />}>
            <Route path="/dashboard" element={<DashboardPage />} />

            <Route path="/tests/create" element={<CreateTest />} />

            <Route path="/tracking" element={<TestTracking />} />

            <Route path="/tests/:id/edit" element={<CreateTest />} />

            <Route path="/tests/:id/questions" element={<AddQuestions />} />

            <Route path="/tests/:id/preview" element={<Preview />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
