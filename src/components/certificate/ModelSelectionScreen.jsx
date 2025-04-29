import React, { useState, useRef } from "react";
import { defaultModels } from "../../constants/Models";
import { Upload, Check, X } from "lucide-react";

export default function ModelSelectionScreen({ onSelectModel, onContinue }) {
  const [selectedModel, setSelectedModel] = useState(null);
  const [customModel, setCustomModel] = useState({
    id: "custom",
    name: "Modelo Personalizado",
    backgrounds: {
      page1: null,
      page2: null,
    },
  });
  const [isCustomSelected, setIsCustomSelected] = useState(false);
  const [uploadErrors, setUploadErrors] = useState({ page1: "", page2: "" });

  const fileInputRef1 = useRef(null);
  const fileInputRef2 = useRef(null);

  // Função para selecionar um modelo pré-definido
  const handleSelectModel = (model) => {
    setSelectedModel(model);
    setIsCustomSelected(false);
    onSelectModel(model);
  };

  // Função para selecionar a aba de modelo personalizado
  const handleSelectCustom = () => {
    setIsCustomSelected(true);
    setSelectedModel(null);

    // Só definimos como modelo selecionado se houver pelo menos a primeira página
    if (customModel.backgrounds.page1) {
      onSelectModel(customModel);
    }
  };

  // Função para validar e processar o upload de imagem
  const handleImageUpload = (e, page) => {
    const file = e.target.files[0];

    if (!file) return;

    // Validar o tipo de arquivo
    if (!file.type.includes("image/")) {
      setUploadErrors({
        ...uploadErrors,
        [page]: "O arquivo deve ser uma imagem.",
      });
      return;
    }

    // Carregar imagem para validar dimensões
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      // Validar as dimensões (842x595 são as dimensões do certificado em px)
      if (img.width !== 842 || img.height !== 595) {
        setUploadErrors({
          ...uploadErrors,
          [page]: "A imagem deve ter 842x595 pixels.",
        });
        URL.revokeObjectURL(objectUrl);
        return;
      }

      // Se passou na validação, limpa o erro
      setUploadErrors({
        ...uploadErrors,
        [page]: "",
      });

      // Atualiza o modelo personalizado
      const updatedModel = {
        ...customModel,
        backgrounds: {
          ...customModel.backgrounds,
          [page]: objectUrl,
        },
      };

      setCustomModel(updatedModel);

      // Se for a página 1, já podemos selecionar este modelo
      if (page === "page1") {
        onSelectModel(updatedModel);
      }

      // Se já temos um modelo custom selecionado, atualizamos ele
      if (isCustomSelected) {
        onSelectModel(updatedModel);
      }
    };

    img.src = objectUrl;
  };

  // Função para remover uma imagem
  const handleRemoveImage = (page) => {
    const updatedModel = {
      ...customModel,
      backgrounds: {
        ...customModel.backgrounds,
        [page]: null,
      },
    };

    setCustomModel(updatedModel);

    // Se remover a página 1, não podemos mais usar este modelo
    if (page === "page1" && isCustomSelected) {
      onSelectModel(null);
    } else if (isCustomSelected) {
      onSelectModel(updatedModel);
    }

    // Limpa o input
    if (page === "page1") {
      fileInputRef1.current.value = "";
    } else {
      fileInputRef2.current.value = "";
    }
  };

  // Verifica se podemos continuar
  const canContinue =
    selectedModel || (isCustomSelected && customModel.backgrounds.page1);

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-600">
        Selecione um Modelo de Certificado
      </h1>

      <div className="flex mb-6">
        <button
          className={`px-4 py-2 mr-2 ${
            !isCustomSelected ? "bg-blue-500 text-white" : "bg-gray-200"
          } rounded-md`}
          onClick={() => setIsCustomSelected(false)}
        >
          Modelos Pré-definidos
        </button>
        <button
          className={`px-4 py-2 ${
            isCustomSelected ? "bg-blue-500 text-white" : "bg-gray-200"
          } rounded-md`}
          onClick={handleSelectCustom}
        >
          Modelo Personalizado
        </button>
      </div>

      {/* Modelos pré-definidos */}
      {!isCustomSelected && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {defaultModels.map((model) => (
            <div
              key={model.id}
              className={`border-2 rounded-lg overflow-hidden cursor-pointer transition-all hover:shadow-lg ${
                selectedModel?.id === model.id
                  ? "border-blue-500 ring-2 ring-blue-300"
                  : "border-gray-200"
              }`}
              onClick={() => handleSelectModel(model)}
            >
              <div className="relative">
                <img
                  src={model.thumbnail}
                  alt={model.name}
                  className="w-full h-56 object-cover"
                />
                {selectedModel?.id === model.id && (
                  <div className="absolute top-2 right-2 bg-blue-500 rounded-full p-1">
                    <Check size={16} className="text-white" />
                  </div>
                )}
              </div>
              <div className="p-3">
                <h3 className="font-medium">{model.name}</h3>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload de modelo personalizado */}
      {isCustomSelected && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">
            Upload de Modelo Personalizado
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Faça upload de imagens no formato 842x595 pixels para usar como
            plano de fundo do seu certificado.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Upload da primeira página (obrigatória) */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              <h3 className="font-medium mb-2 text-gray-600">
                Página 1 (Obrigatório)
              </h3>

              {customModel.backgrounds.page1 ? (
                <div className="relative mb-2">
                  <img
                    src={customModel.backgrounds.page1}
                    alt="Página 1"
                    className="w-full h-auto rounded-md"
                  />
                  <button
                    className="absolute top-2 right-2 bg-red-500 rounded-full p-1 text-white hover:bg-red-600"
                    onClick={() => handleRemoveImage("page1")}
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div
                  className="flex flex-col items-center justify-center h-40 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200"
                  onClick={() => fileInputRef1.current.click()}
                >
                  <Upload size={32} className="text-gray-500 mb-2" />
                  <span className="text-sm text-gray-600">
                    Clique para fazer upload
                  </span>
                </div>
              )}

              <input
                ref={fileInputRef1}
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, "page1")}
                className="hidden"
              />

              {uploadErrors.page1 && (
                <p className="text-sm text-red-500 mt-2">
                  {uploadErrors.page1}
                </p>
              )}
            </div>

            {/* Upload da segunda página (opcional) */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              <h3 className="font-medium mb-2 text-gray-600">
                Página 2 (Opcional)
              </h3>

              {customModel.backgrounds.page2 ? (
                <div className="relative mb-2">
                  <img
                    src={customModel.backgrounds.page2}
                    alt="Página 2"
                    className="w-full h-auto rounded-md"
                  />
                  <button
                    className="absolute top-2 right-2 bg-red-500 rounded-full p-1 text-white hover:bg-red-600"
                    onClick={() => handleRemoveImage("page2")}
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div
                  className="flex flex-col items-center justify-center h-40 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200"
                  onClick={() => fileInputRef2.current.click()}
                >
                  <Upload size={32} className="text-gray-500 mb-2" />
                  <span className="text-sm text-gray-600">
                    Clique para fazer upload (opcional)
                  </span>
                </div>
              )}

              <input
                ref={fileInputRef2}
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, "page2")}
                className="hidden"
              />

              {uploadErrors.page2 && (
                <p className="text-sm text-red-500 mt-2">
                  {uploadErrors.page2}
                </p>
              )}
            </div>
          </div>

          {!customModel.backgrounds.page1 && (
            <p className="text-sm text-amber-600 mt-4">
              É necessário fazer upload da imagem da primeira página para
              continuar.
            </p>
          )}
        </div>
      )}

      <div className="mt-8 flex justify-end">
        <button
          onClick={() =>
            onContinue(canContinue ? selectedModel || customModel : null)
          }
          disabled={!canContinue}
          className={`px-6 py-3 rounded-md ${
            canContinue
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Continuar para Edição
        </button>
      </div>
    </div>
  );
}
