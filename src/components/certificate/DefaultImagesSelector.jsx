import React from "react";
import { Plus, Image } from "lucide-react";
import {
  defaultImages,
  defaultSecondPageImages,
} from "../../constants/defaultImages";

export default function DefaultImagesSelector({
  onAddDefaultImage,
  currentPage,
}) {
  // Selecionar o conjunto correto de imagens baseado na página atual
  const imagesToShow =
    currentPage === 1 ? defaultImages : defaultSecondPageImages;

  const handleAddImage = (image) => {
    // Criar uma cópia da imagem default para não modificar o objeto original
    const imageToAdd = {
      ...image,
      url: image.path, // Adequando ao formato esperado pelo sistema
      isDragging: false,
    };

    onAddDefaultImage(imageToAdd);
  };

  return (
    <div className="mb-4">
      <h3 className="text-sm font-medium text-gray-700 mb-2">Imagens Padrão</h3>

      <div className="grid grid-cols-2 gap-2">
        {imagesToShow.map((image) => (
          <div
            key={image.id}
            className="p-2 border border-gray-200 rounded hover:bg-gray-50 flex flex-col items-center"
          >
            <div className="w-full h-14 bg-gray-100 flex items-center justify-center mb-1 rounded overflow-hidden">
              <Image size={24} className="text-gray-400" />
              <span className="text-xs text-gray-500 ml-1">{image.label}</span>
            </div>

            <button
              onClick={() => handleAddImage(image)}
              className="flex items-center justify-center w-full p-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs"
            >
              <Plus size={12} className="mr-1" /> Adicionar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
