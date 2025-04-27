import React from "react";
import TextField from "./TextField";

export default function CertificateSecondPage({
  fields,
  bgColor,
  borderColor,
  accentColor,
  textColor,
  startDrag,
  isVisible,
}) {
  if (!isVisible) return null;

  return (
    <div
      id="pdf-preview-page-2"
      className="relative overflow-hidden"
      style={{
        backgroundColor: bgColor,
        border: `10px solid ${borderColor}`,
        boxSizing: "border-box",
        position: "relative",
        width: "842px",
        height: "595px",
      }}
    >
      {/* Decoração para a segunda página */}
      <div
        className="absolute left-0 top-0 h-16 w-full"
        style={{ borderBottom: `2px solid ${accentColor}` }}
      />

      <div
        className="absolute left-0 bottom-0 h-16 w-full"
        style={{ borderTop: `2px solid ${accentColor}` }}
      />

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
