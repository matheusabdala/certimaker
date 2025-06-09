// src/components/PrivateRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute() {
  const { isAuthenticated } = useAuth();

  // Se não estiver autenticado, redireciona para a página de login
  // Senão, renderiza os componentes filhos (Outlet)
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
