import React from "react";

export default function TextField({ field, textColor, startDrag }) {
  // Função para renderizar texto com formatação (negrito e quebra de linha)
  const renderFormattedText = (text) => {
    if (!text.includes("<b>") && !text.includes("\n") && !text.includes("• ")) {
      return text;
    }

    // Primeiro, dividimos o texto por quebras de linha
    const lines = text.split("\n");

    // Para cada linha, processamos formatações (negrito e bullets)
    return (
      <>
        {lines.map((line, lineIndex) => {
          // Verificar se a linha começa com um bullet
          const isBullet = line.startsWith("• ");

          // Processamos o restante da linha (removendo o bullet se necessário)
          let processedLine = isBullet ? line.substring(2) : line;

          // Dividir em partes (texto normal e negrito)
          const parts = [];
          let currentText = processedLine;
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
