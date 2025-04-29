import React from "react";
import TextField from "./TextField";
import ImageField from "./ImageField"; // Importar o novo componente

export default function CertificateSecondPage({
  fields,
  images, // Novo prop para imagens
  bgColor,
  borderColor,
  accentColor,
  textColor,
  startDrag,
  startDragImage, // Nova função para arrastar imagens
  startResizeImage, // Nova função para redimensionar imagens
  isVisible,
  selectedModel,
}) {
  if (!isVisible) return null;

  // Determina se deve usar uma imagem de fundo ou o estilo HTML
  const useImageBackground = selectedModel && selectedModel.backgrounds?.page2;

  return (
    <div
      id="pdf-preview-page-2"
      className="relative overflow-hidden"
      style={{
        backgroundColor: useImageBackground ? "transparent" : bgColor,
        border: useImageBackground ? "none" : `10px solid ${borderColor}`,
        boxSizing: "border-box",
        position: "relative",
        width: "842px",
        height: "595px",
        backgroundImage: useImageBackground
          ? `url(${selectedModel.backgrounds.page2})`
          : "none",
        backgroundSize: "842px 595px",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Decoração para a segunda página - apenas se não estiver usando imagem de fundo */}
      {!useImageBackground && (
        <>
          <div
            className="absolute left-0 top-0 h-16 w-full"
            style={{ borderBottom: `2px solid ${accentColor}` }}
          />

          <div
            className="absolute left-0 bottom-0 h-16 w-full"
            style={{ borderTop: `2px solid ${accentColor}` }}
          />
        </>
      )}

      {/* Imagens do certificado página 2 */}
      {images &&
        images.map((image) => (
          <ImageField
            key={image.id}
            image={image}
            startDrag={startDragImage}
            startResize={startResizeImage}
          />
        ))}

      {/* Campos de texto do conteúdo programático */}
      {fields.map((field) => (
        <TextField
          key={field.id}
          field={field}
          textColor={textColor}
          startDrag={startDrag}
        />
      ))}
    </div>
  );
}
