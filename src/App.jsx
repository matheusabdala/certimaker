// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import CertificateCreator from "./pages/CertificateCreator";
import Students from "./pages/Students";
import Courses from "./pages/Courses";
import Classes from "./pages/Classes";
import Certificates from "./pages/Certificates";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Header />
      <div className="flex-1 overflow-auto">
        <Routes>
          <Route path="/" element={<CertificateCreator />} />
          <Route path="/alunos" element={<Students />} />
          <Route path="/cursos" element={<Courses />} />
          <Route path="/turmas" element={<Classes />} />
          <Route path="/certificados" element={<Certificates />} />
          <Route path="/configuracoes" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}
