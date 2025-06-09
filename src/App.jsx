// src/App.jsx (modificado)
import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/layout/Header";
import Login from "./pages/Login";
import CertificateCreator from "./pages/CertificateCreator";
import Students from "./pages/Students";
import Courses from "./pages/Courses";
import Classes from "./pages/Classes";
import Certificates from "./pages/Certificates";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Rota pública */}
        <Route path="/login" element={<Login />} />

        {/* Rotas protegidas */}
        <Route element={<PrivateRoute />}>
          <Route
            path="/"
            element={
              <div className="flex flex-col h-screen bg-gray-100">
                <Header />
                <div className="flex-1 overflow-auto">
                  <CertificateCreator />
                </div>
              </div>
            }
          />

          <Route
            path="/alunos"
            element={
              <div className="flex flex-col h-screen bg-gray-100">
                <Header />
                <div className="flex-1 overflow-auto">
                  <Students />
                </div>
              </div>
            }
          />

          <Route
            path="/cursos"
            element={
              <div className="flex flex-col h-screen bg-gray-100">
                <Header />
                <div className="flex-1 overflow-auto">
                  <Courses />
                </div>
              </div>
            }
          />

          <Route
            path="/turmas"
            element={
              <div className="flex flex-col h-screen bg-gray-100">
                <Header />
                <div className="flex-1 overflow-auto">
                  <Classes />
                </div>
              </div>
            }
          />

          <Route
            path="/certificados"
            element={
              <div className="flex flex-col h-screen bg-gray-100">
                <Header />
                <div className="flex-1 overflow-auto">
                  <Certificates />
                </div>
              </div>
            }
          />

          <Route
            path="/configuracoes"
            element={
              <div className="flex flex-col h-screen bg-gray-100">
                <Header />
                <div className="flex-1 overflow-auto">
                  <Settings />
                </div>
              </div>
            }
          />
        </Route>

        {/* Rota para página não encontrada */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}
