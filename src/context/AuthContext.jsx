// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Criando o contexto de autenticação
const AuthContext = createContext();

// Hook personalizado para usar o contexto de autenticação
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provedor de autenticação
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Verifica se o usuário está autenticado ao carregar o componente
  useEffect(() => {
    const checkAuth = () => {
      const user = localStorage.getItem("user");
      const token = localStorage.getItem("token");

      if (user && token) {
        setCurrentUser(JSON.parse(user));
        setIsAuthenticated(true);
      }

      setLoading(false);
    };

    checkAuth();
  }, []);

  // Função de login
  const login = async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === "admin" && password === "admin") {
          const user = {
            id: 1,
            name: "Administrador",
            email: "admin@certimaker.com",
            role: "admin",
          };

          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("token", "mock-jwt-token");

          setCurrentUser(user);
          setIsAuthenticated(true);
          resolve(user);
        } else {
          reject(new Error("Usuário ou senha inválidos"));
        }
      }, 500); // Simulando atraso de rede
    });
  };

  // Função de logout
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setCurrentUser(null);
    setIsAuthenticated(false);
    navigate("/login");
  };

  // Valores que serão disponibilizados através do contexto
  const value = {
    currentUser,
    isAuthenticated,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
