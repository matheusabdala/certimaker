import React from "react";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-2xl text-gray-600 mb-8">Página não encontrada</p>
      <p className="text-gray-500 mb-8 max-w-md">
        A página que você está procurando parece não existir.
      </p>
      <Link
        to="/"
        className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors"
      >
        <Home size={16} />
        Voltar para o início
      </Link>
    </div>
  );
}
