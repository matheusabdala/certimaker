import React from "react";
import CertificateFirstPage from "./CertificateFirstPage";
import CertificateSecondPage from "./CertificateSecondPage";
import ActionButtons from "../ui/ActionButtons";

export default function CertificatePreview({
  textFields,
  programContentFields,
  firstPageImages, // Nova prop para imagens da primeira página
  secondPageImages, // Nova prop para imagens da segunda página
  colors,
  hasSecondPage,
  currentPage,
  setCurrentPage,
  startDragFirstPage,
  startDragSecondPage,
  startDragFirstPageImage, // Nova função para arrastar imagens na primeira página
  startDragSecondPageImage, // Nova função para arrastar imagens na segunda página
  startResizeFirstPageImage, // Nova função para redimensionar imagens na primeira página
  startResizeSecondPageImage, // Nova função para redimensionar imagens na segunda página
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
            images={firstPageImages}
            bgColor={bgColor}
            borderColor={borderColor}
            accentColor={accentColor}
            textColor={textColor}
            startDrag={startDragFirstPage}
            startDragImage={startDragFirstPageImage}
            startResizeImage={startResizeFirstPageImage}
            isVisible={currentPage === 1}
            selectedModel={selectedModel}
          />

          <CertificateSecondPage
            fields={programContentFields}
            images={secondPageImages}
            bgColor={bgColor}
            borderColor={borderColor}
            accentColor={accentColor}
            textColor={textColor}
            startDrag={startDragSecondPage}
            startDragImage={startDragSecondPageImage}
            startResizeImage={startResizeSecondPageImage}
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
        firstPageImages={firstPageImages}
        secondPageImages={secondPageImages}
        selectedModel={selectedModel}
      />
    </div>
  );
}
