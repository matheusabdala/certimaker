import React, { useRef, useState } from "react";
import { Scaling } from "lucide-react";

export default function ImageField({ image, startDrag, startResize }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`absolute cursor-move ${
        image.isDragging ? "border border-blue-500" : ""
      }`}
      style={{
        left: `${image.x}px`,
        top: `${image.y}px`,
        width: `${image.width}px`,
        height: `${image.height}px`,
        position: "absolute",
      }}
      onMouseDown={(e) => startDrag(image.id, e)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={image.url}
        alt={image.label || "Imagem no certificado"}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          userSelect: "none",
        }}
      />

      {/* Manipulador de redimensionamento */}
      <div
        className={`absolute bottom-0 right-0 p-1 rounded-bl bg-white opacity-60 cursor-se-resize ${
          isHovered ? "visible" : "opacity-0 hover:opacity-60"
        }`}
        onMouseDown={(e) => {
          e.stopPropagation();
          startResize(image.id, e);
        }}
      >
        <Scaling size={14} className="text-black" />
      </div>
    </div>
  );
}
