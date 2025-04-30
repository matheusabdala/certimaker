import React from "react";
import { Plus } from "lucide-react";
import TextFieldEditor from "./TextFieldEditor";
import ImageFieldEditor from "./ImageFieldEditor";
import ImageUploader from "./ImageUploader";
import DefaultImagesSelector from "./DefaultImagesSelector";
import PageNavigation from "../ui/PageNavigation";
import ColorPicker from "../ui/ColorPicker";

export default function CertificateEditor({
  hasSecondPage,
  setHasSecondPage,
  currentPage,
  changePage,
  activeFields,
  activeImages,
  updateFieldValue,
  updateFontSize,
  updateFontFamily,
  updateTextAlign,
  updateFieldLabel,
  removeTextField,
  removeImage,
  addTextField,
  addImage,
  addDefaultImage,
  colors,
  setColors,
  onBackToModelSelection,
}) {
  return (
    <div className="w-1/3 bg-white border-r border-gray-200 flex flex-col h-full">
      <div className="p-4 overflow-y-auto flex-1">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-700">
              Configurações
            </h2>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="hasSecondPage"
                checked={hasSecondPage}
                onChange={(e) => {
                  const newValue = e.target.checked;
                  setHasSecondPage(newValue);
                  // Se desmarcar e estiver na página 2, volta para a página 1
                  if (!newValue && currentPage === 2) {
                    changePage(1);
                  }
                }}
                className="mr-2"
              />
              <label htmlFor="hasSecondPage" className="text-gray-600">
                Conteúdo Programático
              </label>
            </div>
          </div>

          <PageNavigation
            currentPage={currentPage}
            changePage={changePage}
            hasSecondPage={hasSecondPage}
          />
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Campos de Texto</h2>

          {activeFields.map((field) => (
            <TextFieldEditor
              key={field.id}
              field={field}
              updateFieldValue={updateFieldValue}
              updateFontSize={updateFontSize}
              updateFontFamily={updateFontFamily}
              updateTextAlign={updateTextAlign}
              updateFieldLabel={updateFieldLabel}
              removeTextField={removeTextField}
            />
          ))}

          <button
            onClick={addTextField}
            className="flex items-center justify-center w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 mb-4"
          >
            <Plus size={16} className="mr-1" /> Adicionar Campo
          </button>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Imagens</h2>

          {activeImages &&
            activeImages.map((image) => (
              <ImageFieldEditor
                key={image.id}
                image={image}
                removeImage={removeImage}
              />
            ))}

          <DefaultImagesSelector
            onAddDefaultImage={addDefaultImage}
            currentPage={currentPage}
          />
        </div>

        <ColorPicker colors={colors} setColors={setColors} />
      </div>

      <div className="p-4 border-t border-gray-200">
        <button
          onClick={onBackToModelSelection}
          className="flex items-center justify-center w-full p-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        >
          Voltar para seleção de modelo
        </button>
      </div>
    </div>
  );
}
