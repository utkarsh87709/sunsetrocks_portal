import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

// Pages
import Login from "./pages/Auth/Login";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import Events from "./pages/Events";
import Configuration from "./pages/Configuration";
import RegisteredUsers from "./pages/RegisteredUsers";

// Layout
import Layout from "./components/Layout"; // Update path if needed

function App() {
  const token = Cookies.get("token");

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected Routes with Layout */}
        {token ? (
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="events" element={<Events />} />
            <Route path="registered-users" element={<RegisteredUsers />} />
            <Route path="config" element={<Configuration />} />
          </Route>
        ) : (
          // Redirect to login if no token
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
