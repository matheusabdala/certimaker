import React from "react";
import CertificateFirstPage from "./CertificateFirstPage";
import CertificateSecondPage from "./CertificateSecondPage";
import ActionButtons from "../ui/ActionButtons";

export default function CertificatePreview({
  textFields,
  programContentFields,
  colors,
  hasSecondPage,
  currentPage,
  setCurrentPage,
  startDragFirstPage,
  startDragSecondPage,
  pdfContainerRef,
  selectedModel,
}) {
  const { bgColor, borderColor, textColor, accentColor } = colors;

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Verifica se o modelo selecionado tem segunda página
  const modelHasSecondPage = selectedModel && selectedModel.backgrounds?.page2;

  return (
    <div className="w-2/3 bg-gray-200 p-4 flex flex-col">
      <div className="flex-1 overflow-y-auto flex justify-center items-start">
        <div className="relative shadow-xl" ref={pdfContainerRef}>
          <CertificateFirstPage
            fields={textFields}
            bgColor={bgColor}
            borderColor={borderColor}
            accentColor={accentColor}
            textColor={textColor}
            startDrag={startDragFirstPage}
            isVisible={currentPage === 1}
            selectedModel={selectedModel}
          />

          <CertificateSecondPage
            fields={programContentFields}
            bgColor={bgColor}
            borderColor={borderColor}
            accentColor={accentColor}
            textColor={textColor}
            startDrag={startDragSecondPage}
            isVisible={currentPage === 2 && hasSecondPage}
            selectedModel={selectedModel}
          />
        </div>
      </div>

      <ActionButtons
        hasSecondPage={hasSecondPage}
        currentPage={currentPage}
        changePage={changePage}
        bgColor={bgColor}
        setCurrentPage={setCurrentPage}
        textFields={textFields}
        programContentFields={programContentFields}
        selectedModel={selectedModel}
      />
    </div>
  );
}
