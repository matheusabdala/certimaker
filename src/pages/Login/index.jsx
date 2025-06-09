// src/pages/Login/index.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BadgeCheck, Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Simulando uma validação de login
      if (email === "admin" && password === "admin") {
        // Simulando atraso de rede
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Armazenar token e info do usuário no localStorage
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: 1,
            name: "Administrador",
            email: "admin@certimaker.com",
            role: "admin",
          })
        );
        localStorage.setItem("token", "mock-jwt-token");

        // Redirecionar para a página inicial após login bem-sucedido
        navigate("/");
      } else {
        setError("Usuário ou senha inválidos");
      }
    } catch (err) {
      setError("Erro ao fazer login. Tente novamente.");
      console.error("Erro de login:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Lado esquerdo - Imagem ilustrativa */}
      <div className="hidden md:flex md:w-1/2 bg-blue-600 items-center justify-center p-8">
        <div className="max-w-md text-center">
          <svg
            className="mx-auto w-64 h-64 text-white"
            viewBox="0 0 400 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M320 80H80C69 80 60 89 60 100V300C60 311 69 320 80 320H320C331 320 340 311 340 300V100C340 89 331 80 320 80Z"
              stroke="currentColor"
              strokeWidth="12"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M260 200C260 233.1 233.1 260 200 260C166.9 260 140 233.1 140 200C140 166.9 166.9 140 200 140C233.1 140 260 166.9 260 200Z"
              stroke="currentColor"
              strokeWidth="12"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M320 160H340M320 240H340"
              stroke="currentColor"
              strokeWidth="12"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M60 160H80M60 240H80"
              stroke="currentColor"
              strokeWidth="12"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M200 60V80M200 320V340"
              stroke="currentColor"
              strokeWidth="12"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M190 180H210V220H190V180Z" fill="currentColor" />
          </svg>
          <h2 className="mt-6 text-3xl font-bold text-white">
            Gerencie certificados com facilidade
          </h2>
          <p className="mt-4 text-lg text-blue-100">
            Crie, personalize e gerencie certificados de forma simples e
            profissional para seus cursos e eventos.
          </p>
        </div>
      </div>

      {/* Lado direito - Formulário de login */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center justify-center mb-8">
            <BadgeCheck className="w-8 h-8 text-blue-600" />
            <h1 className="ml-2 text-3xl font-bold text-gray-800">
              CertiMaker
            </h1>
          </div>

          {/* Mensagem de boas-vindas */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-800">
              Bem-vindo de volta!
            </h2>
            <p className="text-gray-600 mt-2">
              Gerencie e crie certificados com facilidade.
            </p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo de email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Usuário
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  placeholder="Digite seu usuário"
                />
              </div>
            </div>

            {/* Campo de senha */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  placeholder="Digite sua senha"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Mensagem de erro */}
            {error && (
              <div className="bg-red-50 text-red-500 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            {/* Botão de login */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  isLoading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? (
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : null}
                {isLoading ? "Entrando..." : "Entrar"}
              </button>
            </div>

            {/* Link para recuperação de senha */}
            <div className="text-center">
              <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
                Esqueci minha senha
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
