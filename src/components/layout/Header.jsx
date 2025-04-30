import {
  GraduationCap,
  Users,
  BookOpen,
  Layers,
  BadgeCheck,
  Settings,
  Rocket,
} from "lucide-react";
import React from "react";

export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4 flex items-center justify-between">
      {/* Logo com link para home */}
      <a
        href="/"
        className="text-2xl font-bold inline-flex items-center gap-2 hover:text-gray-300"
      >
        <GraduationCap className="w-6 h-6" />
        CertiMaker
      </a>

      {/* Navegação central com ícones */}
      <nav className="flex gap-6 items-center">
        <a href="/" className="hover:text-gray-300" title="Gerar Certificado">
          <Rocket className="w-5 h-5" />
        </a>
        <a href="/alunos" className="hover:text-gray-300" title="Alunos">
          <Users className="w-5 h-5" />
        </a>
        <a href="/cursos" className="hover:text-gray-300" title="Cursos">
          <BookOpen className="w-5 h-5" />
        </a>
        <a href="/turmas" className="hover:text-gray-300" title="Turmas">
          <Layers className="w-5 h-5" />
        </a>
        <a
          href="/certificados"
          className="hover:text-gray-300"
          title="Certificados"
        >
          <BadgeCheck className="w-5 h-5" />
        </a>
      </nav>

      {/* Configurações à direita */}
      <a
        href="/configuracoes"
        className="hover:text-gray-300"
        title="Configurações"
      >
        <Settings className="w-5 h-5" />
      </a>
    </header>
  );
}
