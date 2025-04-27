import React from "react";

export default function TextField({ field, textColor, startDrag }) {
  // Função para renderizar texto com formatação (negrito)
  const renderFormattedText = (text) => {
    if (!text.includes("<b>")) return text;

    // Divide o texto em partes (texto normal e negrito)
    const parts = [];
    let currentText = text;
    let boldStartIndex;

    while ((boldStartIndex = currentText.indexOf("<b>")) !== -1) {
      // Adiciona o texto antes da tag <b>
      if (boldStartIndex > 0) {
        parts.push({
          text: currentText.substring(0, boldStartIndex),
          bold: false,
        });
      }

      // Procura o final da tag </b>
      const boldEndIndex = currentText.indexOf("</b>", boldStartIndex);
      if (boldEndIndex === -1) break; // Tag não fechada, encerra

      // Adiciona o texto em negrito (sem as tags)
      parts.push({
        text: currentText.substring(boldStartIndex + 3, boldEndIndex),
        bold: true,
      });

      // Atualiza o texto restante
      currentText = currentText.substring(boldEndIndex + 4);
    }

    // Adiciona o texto restante após o último </b>
    if (currentText.length > 0) {
      parts.push({
        text: currentText,
        bold: false,
      });
    }

    // Renderiza cada parte com sua formatação adequada
    return (
      <>
        {parts.map((part, index) => (
          <span key={index} style={part.bold ? { fontWeight: "bold" } : {}}>
            {part.text}
          </span>
        ))}
      </>
    );
  };

  return (
    <div
      className={`absolute cursor-move ${
        field.isDragging ? "border border-blue-500" : ""
      }`}
      style={{
        left: `${field.x}px`,
        top: `${field.y}px`,
        fontSize: `${field.fontSize}px`,
        color: textColor,
        fontFamily: field.fontFamily || "Arial, sans-serif",
        maxWidth: field.width ? `${field.width}px` : "500px",
        textAlign: field.id === 1 || field.id === 2 ? "center" : "left",
        cursor: "move",
        userSelect: "none",
      }}
      onMouseDown={(e) => startDrag(field.id, e)}
    >
      {renderFormattedText(field.value)}
    </div>
  );
}
