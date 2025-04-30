import React from "react";
import CertificateFirstPage from "./CertificateFirstPage";
import CertificateSecondPage from "./CertificateSecondPage";
import ActionButtons from "../ui/ActionButtons";

export default function CertificatePreview({
  textFields,
  programContentFields,
  firstPageImages,
  secondPageImages,
  colors,
  hasSecondPage,
  currentPage,
  setCurrentPage,
  startDragFirstPage,
  startDragSecondPage,
  startDragFirstPageImage,
  startDragSecondPageImage,
  startResizeFirstPageImage,
  startResizeSecondPageImage,
  pdfContainerRef,
  selectedModel,
}) {
  const { bgColor, borderColor, textColor, accentColor } = colors;

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const modelHasSecondPage = selectedModel && selectedModel.backgrounds?.page2;

  return (
    <div className="w-2/3 bg-gray-200 flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 flex justify-center items-start">
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

      <div className="p-4 border-t border-gray-200 bg-white">
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
    </div>
  );
}
