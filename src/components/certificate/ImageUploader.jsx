import React, { useRef, useState } from "react";
import { Upload, X } from "lucide-react";

export default function ImageUploader({ onImageUploaded }) {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setError("");

    if (!file) return;

    // Validar o tipo de arquivo
    if (!file.type.includes("image/")) {
      setError("O arquivo deve ser uma imagem.");
      return;
    }

    // Criar URL para o preview
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    // Carregar a imagem para obter suas dimensões
    const img = new Image();
    img.onload = () => {
      // Se passar na validação, chamar o callback com a imagem
      onImageUploaded({
        url: objectUrl,
        width: img.width > 300 ? 300 : img.width, // Limitar tamanho inicial se for muito grande
        height: img.height > 300 ? 300 : img.height, // Proporcional se for muito grande
        originalWidth: img.width,
        originalHeight: img.height,
      });

      // Limpar o preview
      setPreviewUrl(null);

      // Limpar o input para permitir selecionar a mesma imagem novamente
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    };

    img.onerror = () => {
      setError("Erro ao carregar a imagem.");
      URL.revokeObjectURL(objectUrl);
      setPreviewUrl(null);
    };

    img.src = objectUrl;
  };

  const cancelUpload = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="mb-4">
      {!previewUrl ? (
        <div
          className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-md bg-gray-50 cursor-pointer hover:bg-gray-100"
          onClick={() => fileInputRef.current.click()}
        >
          <Upload size={24} className="text-gray-500 mb-2" />
          <span className="text-sm text-gray-600">
            Clique para adicionar uma imagem
          </span>
          {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
      ) : (
        <div className="relative p-2 border border-gray-300 rounded-md">
          <button
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
            onClick={cancelUpload}
          >
            <X size={16} />
          </button>
          <img src={previewUrl} alt="Preview" className="max-h-40 mx-auto" />
        </div>
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
    </div>
  );
}
