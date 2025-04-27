import React from "react";

export default function PageNavigation({
  currentPage,
  changePage,
  hasSecondPage,
}) {
  if (!hasSecondPage) return null;

  return (
    <div className="flex justify-center mb-4">
      <div className="flex bg-gray-200 rounded-lg p-1">
        <button
          onClick={() => changePage(1)}
          className={`px-4 py-2 rounded-md ${
            currentPage === 1 ? "bg-blue-500 text-white" : "bg-transparent"
          }`}
        >
          Página 1
        </button>
        <button
          onClick={() => changePage(2)}
          className={`px-4 py-2 rounded-md ${
            currentPage === 2 ? "bg-blue-500 text-white" : "bg-transparent"
          }`}
        >
          Página 2
        </button>
      </div>
    </div>
  );
}
