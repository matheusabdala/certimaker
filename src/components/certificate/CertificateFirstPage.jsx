import React from "react";
import TextField from "./TextField";

export default function CertificateFirstPage({
  fields,
  bgColor,
  borderColor,
  accentColor,
  textColor,
  startDrag,
  isVisible,
  selectedModel,
}) {
  if (!isVisible) return null;

  // Determina se deve usar uma imagem de fundo ou o estilo HTML
  const useImageBackground = selectedModel && selectedModel.backgrounds?.page1;

  return (
    <div
      id="pdf-preview-page-1"
      className="relative overflow-hidden"
      style={{
        backgroundColor: useImageBackground ? "transparent" : bgColor,
        border: useImageBackground ? "none" : `10px solid ${borderColor}`,
        boxSizing: "border-box",
        position: "relative",
        width: "842px",
        height: "595px",
        backgroundImage: useImageBackground
          ? `url(${selectedModel.backgrounds.page1})`
          : "none",
        backgroundSize: "842px 595px",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Decoração do certificado - apenas visível se não estiver usando imagem de fundo */}
      {!useImageBackground && (
        <>
          <div
            className="absolute right-12 top-1/4 h-32 w-32 flex items-center justify-center"
            style={{ backgroundColor: "transparent" }}
          >
            <div
              className="w-32 h-32 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: "transparent",
                border: `3px solid ${accentColor}`,
              }}
            >
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center"
                style={{ backgroundColor: accentColor }}
              >
                <div className="text-center">
                  <div className="text-sm font-bold text-black">PREMIUM</div>
                  <div className="text-xs text-black">QUALITY</div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="absolute left-0 right-0 top-1/3"
            style={{
              height: "40px",
              backgroundColor: "transparent",
              borderTop: `2px solid ${accentColor}`,
              borderBottom: `2px solid ${accentColor}`,
            }}
          />
        </>
      )}

      {/* Campos de texto do certificado página 1 */}
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
