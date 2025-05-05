import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  GraduationCap,
  Users,
  BookOpen,
  Layers,
  BadgeCheck,
  Settings,
  Rocket,
  FileBadge,
} from "lucide-react";

export default function Header() {
  const location = useLocation();

  // Função para verificar se o link está ativo
  const isActive = (path) => {
    return location.pathname === path ? "text-blue-300" : "hover:text-gray-300";
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex items-center justify-between">
      {/* Logo com link para home */}
      <Link
        to="/"
        className="text-2xl font-bold inline-flex items-center gap-2 hover:text-gray-300"
      >
        <BadgeCheck className="w-6 h-6" />
        CertiMaker
      </Link>

      {/* Navegação central com ícones */}
      <nav className="flex gap-6 items-center">
        <Link to="/" className={isActive("/")} title="Gerar Certificado">
          <Rocket className="w-5 h-5" />
        </Link>
        <Link to="/alunos" className={isActive("/alunos")} title="Alunos">
          <Users className="w-5 h-5" />
        </Link>
        <Link to="/cursos" className={isActive("/cursos")} title="Cursos">
          <BookOpen className="w-5 h-5" />
        </Link>
        <Link to="/turmas" className={isActive("/turmas")} title="Turmas">
          <Layers className="w-5 h-5" />
        </Link>
        <Link
          to="/certificados"
          className={isActive("/certificados")}
          title="Certificados"
        >
          <FileBadge className="w-5 h-5" />
        </Link>
      </nav>

      {/* Configurações à direita */}
      <Link
        to="/configuracoes"
        className={isActive("/configuracoes")}
        title="Configurações"
      >
        <Settings className="w-5 h-5" />
      </Link>
    </header>
  );
}
