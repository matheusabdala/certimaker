import React, { useState, useRef, useEffect } from "react";
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
  QrCode,
  ChevronDown,
} from "lucide-react";
import QRCodeModal from "../ui/QRCodeModal";

export default function Header() {
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isQRCodeModalOpen, setIsQRCodeModalOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Função para verificar se o link está ativo
  const isActive = (path) => {
    return location.pathname === path ? "text-blue-300" : "hover:text-gray-300";
  };

  // Fecha o dropdown quando clicar fora dele
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Toggle dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Abrir modal de QR Code
  const openQRCodeModal = () => {
    setIsQRCodeModalOpen(true);
    setIsDropdownOpen(false);
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

      {/* Dropdown de configurações */}
      <div className="relative" ref={dropdownRef}>
        <button
          className="flex items-center gap-1 hover:text-gray-300"
          onClick={toggleDropdown}
          title="Configurações"
        >
          <Settings className="w-5 h-5" />
          <ChevronDown className="w-4 h-4" />
        </button>

        {/* Menu dropdown */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
            <button
              onClick={openQRCodeModal}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
            >
              <QrCode className="w-4 h-4 mr-2" />
              QR Code
            </button>
            <Link
              to="/configuracoes"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <Settings className="w-4 h-4 mr-2" />
              Configurações Gerais
            </Link>
          </div>
        )}
      </div>

      {/* Modal de QR Code */}
      {isQRCodeModalOpen && (
        <QRCodeModal
          isOpen={isQRCodeModalOpen}
          onClose={() => setIsQRCodeModalOpen(false)}
        />
      )}
    </header>
  );
}
