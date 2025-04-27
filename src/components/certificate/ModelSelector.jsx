import React from "react";

export default function ModelSelector({
  models,
  selectedModel,
  onSelectModel,
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Selecione um Modelo</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {models.map((model) => (
          <div
            key={model.id}
            className={`relative cursor-pointer rounded-md overflow-hidden border-2 ${
              selectedModel?.id === model.id
                ? "border-blue-500"
                : "border-gray-200"
            }`}
            onClick={() => onSelectModel(model)}
          >
            <img
              src={model.thumbnail}
              alt={model.name}
              className="w-full h-auto"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-2">
              <p className="text-sm font-medium">{model.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
