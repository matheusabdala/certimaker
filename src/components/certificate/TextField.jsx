import React from "react";

export default function TextField({ field, textColor, startDrag }) {
  // Função para renderizar texto com formatação (negrito, quebra de linha e bullets)
  const renderFormattedText = (text) => {
    if (
      !text.includes("**") &&
      !text.includes("\n") &&
      !text.includes("<bullet>")
    ) {
      return text;
    }

    // Primeiro, dividimos o texto por quebras de linha
    const lines = text.split("\n");

    // Para cada linha, processamos formatações (negrito e bullets)
    return (
      <>
        {lines.map((line, lineIndex) => {
          // Verificar se é uma linha com bullet
          const isBullet = line.includes("<bullet>");

          // Remover a tag de bullet para processar o restante da formatação
          let processedLine = isBullet ? line.replace("<bullet>", "") : line;

          // Dividir em partes (texto normal e negrito)
          const parts = [];
          let currentText = processedLine;
          let boldStartIndex;

          // Procura por marcação de negrito com asteriscos duplos (**)
          while ((boldStartIndex = currentText.indexOf("**")) !== -1) {
            // Adiciona o texto antes do **
            if (boldStartIndex > 0) {
              parts.push({
                text: currentText.substring(0, boldStartIndex),
                bold: false,
              });
            }

            // Procura o final da marcação **
            const boldEndIndex = currentText.indexOf("**", boldStartIndex + 2);
            if (boldEndIndex === -1) break; // Marcação não fechada, encerra

            // Adiciona o texto em negrito (sem os **)
            parts.push({
              text: currentText.substring(boldStartIndex + 2, boldEndIndex),
              bold: true,
            });

            // Atualiza o texto restante
            currentText = currentText.substring(boldEndIndex + 2);
          }

          // Adiciona o texto restante após o último **
          if (currentText.length > 0) {
            parts.push({
              text: currentText,
              bold: false,
            });
          }

          return (
            <div
              key={lineIndex}
              style={{ display: "flex", alignItems: "flex-start" }}
            >
              {isBullet && (
                <span style={{ marginRight: "5px", display: "inline-block" }}>
                  •
                </span>
              )}
              <div>
                {parts.map((part, index) => (
                  <span
                    key={index}
                    style={part.bold ? { fontWeight: "bold" } : {}}
                  >
                    {part.text}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </>
    );
  };

  // Obtenha o alinhamento de texto do campo ou use um padrão apropriado
  // Se for o campo 1 ou 2, mantemos o "center" como padrão para compatibilidade
  const getTextAlign = () => {
    if (field.textAlign) {
      return field.textAlign;
    } else if (field.id === 1 || field.id === 2) {
      return "center";
    } else {
      return "left";
    }
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
        textAlign: getTextAlign(),
        cursor: "move",
        userSelect: "none",
      }}
      onMouseDown={(e) => startDrag(field.id, e)}
    >
      {renderFormattedText(field.value)}
    </div>
  );
}
