import React from "react";
import { Trash2 } from "lucide-react";

export default function ImageFieldEditor({ image, removeImage }) {
  return (
    <div className="mb-4 p-4 bg-gray-50 rounded-md shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <label className="font-medium text-gray-700">{image.label}</label>
        <button
          onClick={() => removeImage(image.id)}
          className="text-red-500 hover:text-red-700"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="flex items-center justify-center mb-3 bg-gray-100 p-2 rounded">
        <img
          src={image.url}
          alt={image.label}
          className="max-h-20 object-contain"
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-xs text-gray-500">Posição</label>
          <div className="flex items-center">
            <span className="text-xs mr-1">X:{Math.round(image.x)}</span>
            <span className="text-xs">Y:{Math.round(image.y)}</span>
          </div>
        </div>
        <div>
          <label className="text-xs text-gray-500">Tamanho</label>
          <div className="flex items-center">
            <span className="text-xs mr-1">W:{Math.round(image.width)}</span>
            <span className="text-xs">H:{Math.round(image.height)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
