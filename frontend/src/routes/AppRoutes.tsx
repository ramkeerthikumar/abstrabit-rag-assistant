import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Workspace from "../pages/Workspace";
import Chat from "../pages/Chat"; // 👈 ADD THIS

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/workspace" element={<Workspace />} />
      
      {/* 👇 ADD THIS */}
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
}