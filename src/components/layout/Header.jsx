// src/components/layout/Header.jsx (atualizado)
import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
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
  LogOut,
  User as UserIcon,
  Menu,
} from "lucide-react";
import QRCodeModal from "../ui/QRCodeModal";

export default function Header() {
  const location = useLocation();
  const { currentUser, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isQRCodeModalOpen, setIsQRCodeModalOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const userDropdownRef = useRef(null);

  // Função para verificar se o link está ativo
  const isActive = (path) => {
    if (location.pathname === path) {
      return "text-white bg-blue-700 shadow-inner";
    }
    return "text-blue-50 hover:bg-blue-700/70 hover:text-white";
  };

  // Fecha os dropdowns quando clicar fora deles
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target)
      ) {
        setIsUserDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Toggle dropdowns
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  // Abrir modal de QR Code
  const openQRCodeModal = () => {
    setIsQRCodeModalOpen(true);
    setIsDropdownOpen(false);
  };

  // Handler para logout
  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-gradient-to-r from-blue-700 to-blue-800 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo com link para home */}
          <Link
            to="/"
            className="text-2xl font-bold inline-flex items-center gap-2 text-white hover:text-blue-100 transition duration-200"
          >
            <BadgeCheck className="w-7 h-7 text-blue-300" />
            <span className="font-sans">CertiMaker</span>
          </Link>

          {/* Navegação central com ícones */}
          <nav className="hidden md:flex items-center">
            <div className="flex gap-1 bg-blue-800/40 p-1 rounded-lg">
              <Link
                to="/"
                className={`flex items-center px-4 py-2 rounded-md transition duration-200 ${isActive(
                  "/"
                )}`}
                title="Gerar Certificado"
              >
                <Rocket className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">Gerar</span>
              </Link>

              <Link
                to="/alunos"
                className={`flex items-center px-4 py-2 rounded-md transition duration-200 ${isActive(
                  "/alunos"
                )}`}
                title="Alunos"
              >
                <Users className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">Alunos</span>
              </Link>

              <Link
                to="/cursos"
                className={`flex items-center px-4 py-2 rounded-md transition duration-200 ${isActive(
                  "/cursos"
                )}`}
                title="Cursos"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">Cursos</span>
              </Link>

              <Link
                to="/turmas"
                className={`flex items-center px-4 py-2 rounded-md transition duration-200 ${isActive(
                  "/turmas"
                )}`}
                title="Turmas"
              >
                <Layers className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">Turmas</span>
              </Link>

              <Link
                to="/certificados"
                className={`flex items-center px-4 py-2 rounded-md transition duration-200 ${isActive(
                  "/certificados"
                )}`}
                title="Certificados"
              >
                <FileBadge className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">Certificados</span>
              </Link>
            </div>
          </nav>

          {/* Área do usuário e configurações */}
          <div className="flex items-center gap-3">
            {/* Dropdown de configurações */}
            <div className="relative" ref={dropdownRef}>
              <button
                className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md transition duration-200"
                onClick={toggleDropdown}
                title="Configurações"
              >
                <Settings className="w-5 h-5" />
                <ChevronDown className="w-4 h-4" />
              </button>

              {/* Menu dropdown */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl py-1 z-10 border border-gray-200 animate-fadeIn">
                  <button
                    onClick={openQRCodeModal}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 w-full text-left"
                  >
                    <QrCode className="w-4 h-4 mr-2 text-blue-600" />
                    QR Code
                  </button>
                  <Link
                    to="/configuracoes"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                  >
                    <Settings className="w-4 h-4 mr-2 text-blue-600" />
                    Configurações Gerais
                  </Link>
                </div>
              )}
            </div>

            {/* Dropdown do usuário */}
            <div className="relative" ref={userDropdownRef}>
              <button
                className="flex items-center gap-2 bg-blue-600/30 hover:bg-blue-600/60 rounded-full px-3 py-1.5 transition duration-200"
                onClick={toggleUserDropdown}
              >
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shadow-md">
                  <UserIcon className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium hidden sm:block">
                  {currentUser?.name || "Usuário"}
                </span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {/* Menu dropdown do usuário */}
              {isUserDropdownOpen && (
                <div className="absolute right-0 mt-2 w-60 bg-white rounded-md shadow-xl py-1 z-10 border border-gray-200 animate-fadeIn">
                  <div className="px-4 py-3 text-sm text-gray-900 border-b border-gray-100 bg-blue-50 rounded-t-md">
                    <div className="font-medium">{currentUser?.name}</div>
                    <div className="text-xs text-gray-500 mt-1 truncate">
                      {currentUser?.email}
                    </div>
                  </div>
                  <Link
                    to="/configuracoes"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                  >
                    <UserIcon className="w-4 h-4 mr-2 text-blue-600" />
                    Meu perfil
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left border-t border-gray-100"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sair
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Menu móvel - aparece apenas em telas pequenas */}
      <div className="md:hidden border-t border-blue-600 bg-blue-800/30">
        <div className="grid grid-cols-5 gap-1 px-2 py-1">
          <Link
            to="/"
            className={`flex flex-col items-center px-1 py-2 rounded-md transition duration-200 text-center ${
              location.pathname === "/"
                ? "text-white bg-blue-700/70"
                : "text-blue-100"
            }`}
          >
            <Rocket className="w-5 h-5 mb-1" />
            <span className="text-xs">Gerar</span>
          </Link>

          <Link
            to="/alunos"
            className={`flex flex-col items-center px-1 py-2 rounded-md transition duration-200 text-center ${
              location.pathname === "/alunos"
                ? "text-white bg-blue-700/70"
                : "text-blue-100"
            }`}
          >
            <Users className="w-5 h-5 mb-1" />
            <span className="text-xs">Alunos</span>
          </Link>

          <Link
            to="/cursos"
            className={`flex flex-col items-center px-1 py-2 rounded-md transition duration-200 text-center ${
              location.pathname === "/cursos"
                ? "text-white bg-blue-700/70"
                : "text-blue-100"
            }`}
          >
            <BookOpen className="w-5 h-5 mb-1" />
            <span className="text-xs">Cursos</span>
          </Link>

          <Link
            to="/turmas"
            className={`flex flex-col items-center px-1 py-2 rounded-md transition duration-200 text-center ${
              location.pathname === "/turmas"
                ? "text-white bg-blue-700/70"
                : "text-blue-100"
            }`}
          >
            <Layers className="w-5 h-5 mb-1" />
            <span className="text-xs">Turmas</span>
          </Link>

          <Link
            to="/certificados"
            className={`flex flex-col items-center px-1 py-2 rounded-md transition duration-200 text-center ${
              location.pathname === "/certificados"
                ? "text-white bg-blue-700/70"
                : "text-blue-100"
            }`}
          >
            <FileBadge className="w-5 h-5 mb-1" />
            <span className="text-xs">Certificados</span>
          </Link>
        </div>
      </div>

      {/* Modal de QR Code */}
      {isQRCodeModalOpen && (
        <QRCodeModal
          isOpen={isQRCodeModalOpen}
          onClose={() => setIsQRCodeModalOpen(false)}
        />
      )}

      {/* Estilos CSS */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </header>
  );
}
