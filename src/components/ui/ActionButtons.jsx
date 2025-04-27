import React, { useState } from "react";
import {
  Download,
  Save,
  ChevronLeft,
  ChevronRight,
  FileJson,
} from "lucide-react";
import { generatePDF } from "../../utils/pdfGenerator";
import { sendJSONToServer } from "../../utils/jsonExporter"; // Importando a função atualizada

export default function ActionButtons({
  hasSecondPage,
  currentPage,
  changePage,
  bgColor,
  setCurrentPage,
  textFields,
  programContentFields,
}) {
  const [isSending, setIsSending] = useState(false);

  // Função para lidar com o envio dos dados
  const handleExportJSON = async () => {
    setIsSending(true);
    try {
      const result = await sendJSONToServer(
        textFields,
        programContentFields,
        hasSecondPage
      );

      if (result.success) {
        alert("Dados do certificado enviados com sucesso!");
      } else {
        alert(`Erro ao enviar dados: ${result.error}`);
      }
    } catch (error) {
      console.error("Erro ao processar solicitação:", error);
      alert(`Erro ao processar solicitação: ${error.message}`);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="mt-4 flex justify-center">
      {/* Navegação entre páginas para visualização */}
      {hasSecondPage && (
        <div className="flex mr-4">
          <button
            onClick={() => changePage(1)}
            disabled={currentPage === 1}
            className={`px-3 py-3 rounded-l-md ${
              currentPage === 1
                ? "bg-gray-400"
                : "bg-gray-600 hover:bg-gray-700"
            } text-white`}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => changePage(2)}
            disabled={currentPage === 2}
            className={`px-3 py-3 rounded-r-md ${
              currentPage === 2
                ? "bg-gray-400"
                : "bg-gray-600 hover:bg-gray-700"
            } text-white`}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}

      <button
        onClick={() =>
          generatePDF(hasSecondPage, currentPage, setCurrentPage, bgColor)
        }
        className="flex items-center px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 mr-4"
      >
        <Download size={18} className="mr-2" /> Baixar PDF
      </button>

      <button
        onClick={handleExportJSON}
        disabled={isSending}
        className={`flex items-center px-6 py-3 ${
          isSending ? "bg-purple-400" : "bg-purple-600 hover:bg-purple-700"
        } text-white rounded-md mr-4`}
      >
        <FileJson size={18} className="mr-2" />
        {isSending ? "Enviando..." : "Exportar JSON"}
      </button>
    </div>
  );
}
