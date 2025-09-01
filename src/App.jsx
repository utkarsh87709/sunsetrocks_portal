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

import Layout from "./components/common/Layout";

function App() {
  const token = Cookies.get("token");

  return (
    <Router>
      <Routes>
        {/* Public Routes (no Layout) */}
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected Routes (with Layout) */}
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="events" element={<Events />} />
          <Route path="registered-users" element={<RegisteredUsers />} />
          <Route path="config" element={<Configuration />} />
        </Route>

        {/* Catch-all → redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
