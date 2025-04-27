import React, { useState } from "react";
import { Trash2, Bold } from "lucide-react";

export default function TextFieldEditor({
  field,
  updateFieldValue,
  updateFontSize,
  updateFontFamily,
  updateBoldText,
  removeTextField,
}) {
  const [selectedText, setSelectedText] = useState({ start: 0, end: 0 });

  // Lista de fontes disponíveis
  const fontOptions = [
    "Arial, sans-serif",
    "Times New Roman, serif",
    "Courier New, monospace",
    "Georgia, serif",
    "Verdana, sans-serif",
    "Roboto, sans-serif",
    "Open Sans, sans-serif",
  ];

  // Função para lidar com seleção de texto
  const handleTextSelection = (e) => {
    const start = e.target.selectionStart;
    const end = e.target.selectionEnd;

    if (start !== end) {
      setSelectedText({ start, end });
    }
  };

  // Função para aplicar negrito ao texto selecionado
  const applyBoldToSelection = () => {
    if (selectedText.start === selectedText.end) return;

    const before = field.value.substring(0, selectedText.start);
    const selected = field.value.substring(
      selectedText.start,
      selectedText.end
    );
    const after = field.value.substring(selectedText.end);

    // Verificamos se o texto selecionado já está em negrito
    // Se estiver, removemos as tags; se não, adicionamos
    const isBold = selected.startsWith("<b>") && selected.endsWith("</b>");

    const newValue = isBold
      ? before + selected.substring(3, selected.length - 4) + after
      : before + "<b>" + selected + "</b>" + after;

    updateFieldValue(field.id, newValue);
    setSelectedText({ start: 0, end: 0 });
  };

  return (
    <div className="mb-4 p-4 bg-gray-50 rounded-md shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <label className="font-medium text-gray-700">{field.label}</label>
        <button
          onClick={() => removeTextField(field.id)}
          className="text-red-500 hover:text-red-700"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="mb-2 flex gap-2">
        <button
          onClick={applyBoldToSelection}
          className="p-2 bg-gray-200 hover:bg-gray-300 rounded flex items-center"
          title="Aplicar negrito"
        >
          <Bold size={16} />
        </button>

        <select
          value={field.fontFamily || "Arial, sans-serif"}
          onChange={(e) => updateFontFamily(field.id, e.target.value)}
          className="p-2 border border-gray-300 rounded flex-grow"
        >
          {fontOptions.map((font) => (
            <option key={font} value={font}>
              {font.split(",")[0]}
            </option>
          ))}
        </select>
      </div>

      <textarea
        value={field.value}
        onChange={(e) => updateFieldValue(field.id, e.target.value)}
        onMouseUp={handleTextSelection}
        onKeyUp={handleTextSelection}
        className="w-full p-2 border border-gray-300 rounded mb-2"
        rows={3}
      />

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-xs text-gray-500">Tamanho da fonte</label>
          <input
            type="number"
            value={field.fontSize}
            onChange={(e) => updateFontSize(field.id, e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            min="8"
            max="72"
          />
        </div>
        <div>
          <label className="text-xs text-gray-500">Posição</label>
          <div className="flex items-center">
            <span className="text-xs mr-1">X:{Math.round(field.x)}</span>
            <span className="text-xs">Y:{Math.round(field.y)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
