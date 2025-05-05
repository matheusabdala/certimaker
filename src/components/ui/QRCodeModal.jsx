import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function QRCodeModal({ isOpen, onClose }) {
  const [url, setUrl] = useState("");
  const [qrCodeExists, setQrCodeExists] = useState(false);
  const [qrCodePreview, setQrCodePreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Esta função seria substituída pela chamada real da API no backend
  const generateQRCode = async (inputUrl) => {
    setIsLoading(true);
    try {
      // Simulando uma chamada de API
      // No futuro, isso seria substituído por uma chamada real

      // Simulando um delay para mostrar o loading
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Usando um serviço gratuito online de geração de QR Code para simular
      const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
        inputUrl
      )}`;

      // Atualizar o preview
      setQrCodePreview(qrCodeUrl);
      setQrCodeExists(true);

      // Aqui você chamaria o endpoint que salvaria a imagem em assets/images/defaults/qr-code.jpg
      console.log("QR Code gerado para:", inputUrl);
    } catch (error) {
      console.error("Erro ao gerar QR Code:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Esta função seria substituída pela chamada real da API no backend
  const deleteQRCode = async () => {
    setIsLoading(true);
    try {
      // Simulando uma chamada de API
      await new Promise((resolve) => setTimeout(resolve, 500));

      setQrCodePreview("");
      setQrCodeExists(false);
      console.log("QR Code excluído");

      // Aqui você chamaria o endpoint que excluiria a imagem em assets/images/defaults/qr-code.jpg
    } catch (error) {
      console.error("Erro ao excluir QR Code:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Verificar se existe um QR Code ao carregar o componente
  useEffect(() => {
    // No futuro, isso seria substituído por uma verificação real no backend
    // para saber se o arquivo assets/images/defaults/qr-code.jpg existe

    // Simulando a verificação para fins de demonstração
    const checkQRCodeExists = async () => {
      try {
        // Simular verificação existente
        // Em uma implementação real, você faria uma chamada ao backend
        // Mudando para true para mostrar como fica quando existe um QR Code
        const exists = true; // Para demonstração, simula que já existe um QR Code

        if (exists) {
          setQrCodeExists(true);
          // Em um ambiente real, este caminho seria para o arquivo real no servidor
          // Para fins de demonstração, usando um QR Code de exemplo
          setQrCodePreview("/assets/images/defaults/qr-code.jpg");

          // Para a demonstração visual, usando uma URL de um serviço online
          // Remova isso na implementação final e use apenas o caminho acima
          setQrCodePreview(
            "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://exemplo.com"
          );
        }
      } catch (error) {
        console.error("Erro ao verificar QR Code:", error);
      }
    };

    checkQRCodeExists();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url.trim()) {
      generateQRCode(url);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        {/* Header do Modal */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-700">
            Configuração de QR Code
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Corpo do Modal */}
        <div className="p-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="url"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                URL do Site
              </label>
              <input
                type="url"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://exemplo.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading || !url.trim()}
                className={`px-4 py-2 bg-blue-600 text-white rounded-md ${
                  isLoading || !url.trim()
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-blue-700"
                }`}
              >
                {isLoading ? "Gerando..." : "Gerar QR Code"}
              </button>
            </div>
          </form>

          {/* Preview do QR Code */}
          {qrCodePreview && (
            <div className="mt-6 flex flex-col items-center">
              <h3 className="text-lg font-medium mb-2">QR Code</h3>
              <div className="border p-2 rounded-md">
                <img src={qrCodePreview} alt="QR Code" className="w-40 h-40" />
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Este QR code direciona para o site configurado
              </p>
              <button
                onClick={deleteQRCode}
                disabled={isLoading}
                className={`mt-4 px-4 py-2 bg-red-600 text-white rounded-md ${
                  isLoading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-red-700"
                }`}
              >
                {isLoading ? "Excluindo..." : "Excluir QR Code"}
              </button>
            </div>
          )}
        </div>

        {/* Footer do Modal */}
        <div className="p-4 border-t flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
