import React from "react";
import { Plus } from "lucide-react";
import TextFieldEditor from "./TextFieldEditor";
import PageNavigation from "../ui/PageNavigation";
import ColorPicker from "../ui/ColorPicker";

export default function CertificateEditor({
  hasSecondPage,
  setHasSecondPage,
  currentPage,
  changePage,
  activeFields,
  updateFieldValue,
  updateFontSize,
  updateFontFamily,
  removeTextField,
  addTextField,
  colors,
  setColors,
}) {
  return (
    <div className="w-1/3 bg-white p-4 overflow-y-auto border-r border-gray-200">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-700">Configurações</h2>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="hasSecondPage"
              checked={hasSecondPage}
              onChange={(e) => setHasSecondPage(e.target.checked)}
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
            removeTextField={removeTextField}
          />
        ))}

        <button
          onClick={addTextField}
          className="flex items-center justify-center w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          <Plus size={16} className="mr-1" /> Adicionar Campo
        </button>
      </div>

      <ColorPicker colors={colors} setColors={setColors} />
    </div>
  );
}
