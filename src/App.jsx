import React, { useState, useRef } from "react";
import Header from "./components/layout/Header";
import CertificateEditor from "./components/certificate/CertificateEditor";
import CertificatePreview from "./components/certificate/CertificatePreview";
import ModelSelectionScreen from "./components/certificate/ModelSelectionScreen";
import useDraggable from "./hooks/useDraggable";
import useImageDraggable from "./hooks/useImageDraggable"; // Importar o hook para imagens draggable
import {
  defaultTextFields,
  defaultProgramContentFields,
} from "./constants/defaultFields";

export default function App() {
  // Estado para controlar o fluxo de telas
  const [currentStep, setCurrentStep] = useState("model-selection"); // 'model-selection' ou 'certificate-editor'
  const [selectedModel, setSelectedModel] = useState(null);

  const [hasSecondPage, setHasSecondPage] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [colors, setColors] = useState({
    bgColor: "#1a1a1a",
    borderColor: "#ffc107",
    textColor: "#1a1a1a",
    accentColor: "#ffc107",
  });

  const pdfContainerRef = useRef(null);

  // Usando o hook customizado para gerenciar os campos arrastavéis
  const {
    fields: textFields,
    setFields: setTextFields,
    startDrag: startDragFirstPage,
  } = useDraggable(defaultTextFields, pdfContainerRef);

  const {
    fields: programContentFields,
    setFields: setProgramContentFields,
    startDrag: startDragSecondPage,
  } = useDraggable(defaultProgramContentFields, pdfContainerRef);

  // Usando o hook para imagens arrastáveis
  const {
    images: firstPageImages,
    setImages: setFirstPageImages,
    startDrag: startDragFirstPageImage,
    startResize: startResizeFirstPageImage,
  } = useImageDraggable([], pdfContainerRef);

  const {
    images: secondPageImages,
    setImages: setSecondPageImages,
    startDrag: startDragSecondPageImage,
    startResize: startResizeSecondPageImage,
  } = useImageDraggable([], pdfContainerRef);

  // Obter os campos ativos com base na página atual
  const activeFields = currentPage === 1 ? textFields : programContentFields;
  const setActiveFields =
    currentPage === 1 ? setTextFields : setProgramContentFields;

  // Obter as imagens ativas com base na página atual
  const activeImages = currentPage === 1 ? firstPageImages : secondPageImages;
  const setActiveImages =
    currentPage === 1 ? setFirstPageImages : setSecondPageImages;

  // Função para adicionar um novo campo de texto
  const addTextField = () => {
    if (currentPage === 1) {
      const newId =
        textFields.length > 0
          ? Math.max(...textFields.map((field) => field.id)) + 1
          : 1;
      setTextFields([
        ...textFields,
        {
          id: newId,
          label: `Campo ${newId}`,
          value: "Novo texto",
          x: 200,
          y: 200,
          fontSize: 14,
          fontFamily: "Arial, sans-serif",
          isDragging: false,
        },
      ]);
    } else {
      const newId =
        programContentFields.length > 0
          ? Math.max(...programContentFields.map((field) => field.id)) + 1
          : 1;
      setProgramContentFields([
        ...programContentFields,
        {
          id: newId,
          label: `Campo ${newId}`,
          value: "Novo texto",
          x: 200,
          y: 200,
          fontSize: 14,
          fontFamily: "Arial, sans-serif",
          isDragging: false,
        },
      ]);
    }
  };

  // Função para adicionar uma nova imagem
  const addImage = (imageData) => {
    if (currentPage === 1) {
      const newId =
        firstPageImages.length > 0
          ? Math.max(...firstPageImages.map((img) => img.id)) + 1
          : 1;

      setFirstPageImages([
        ...firstPageImages,
        {
          id: newId,
          label: `Imagem ${newId}`,
          url: imageData.url,
          x: 100,
          y: 100,
          width: imageData.width,
          height: imageData.height,
          isDragging: false,
        },
      ]);
    } else {
      const newId =
        secondPageImages.length > 0
          ? Math.max(...secondPageImages.map((img) => img.id)) + 1
          : 1;

      setSecondPageImages([
        ...secondPageImages,
        {
          id: newId,
          label: `Imagem ${newId}`,
          url: imageData.url,
          x: 100,
          y: 100,
          width: imageData.width,
          height: imageData.height,
          isDragging: false,
        },
      ]);
    }
  };

  // Função para remover uma imagem
  const removeImage = (id) => {
    if (currentPage === 1) {
      setFirstPageImages(firstPageImages.filter((img) => img.id !== id));
    } else {
      setSecondPageImages(secondPageImages.filter((img) => img.id !== id));
    }
  };

  // Função para remover um campo de texto
  const removeTextField = (id) => {
    if (currentPage === 1) {
      setTextFields(textFields.filter((field) => field.id !== id));
    } else {
      setProgramContentFields(
        programContentFields.filter((field) => field.id !== id)
      );
    }
  };

  // Função para atualizar o valor de um campo
  const updateFieldValue = (id, value) => {
    if (currentPage === 1) {
      setTextFields(
        textFields.map((field) =>
          field.id === id ? { ...field, value } : field
        )
      );
    } else {
      setProgramContentFields(
        programContentFields.map((field) =>
          field.id === id ? { ...field, value } : field
        )
      );
    }
  };

  // Função para atualizar o tamanho da fonte
  const updateFontSize = (id, size) => {
    if (currentPage === 1) {
      setTextFields(
        textFields.map((field) =>
          field.id === id ? { ...field, fontSize: parseInt(size) } : field
        )
      );
    } else {
      setProgramContentFields(
        programContentFields.map((field) =>
          field.id === id ? { ...field, fontSize: parseInt(size) } : field
        )
      );
    }
  };

  // Função para atualizar a família de fonte
  const updateFontFamily = (id, fontFamily) => {
    if (currentPage === 1) {
      setTextFields(
        textFields.map((field) =>
          field.id === id ? { ...field, fontFamily } : field
        )
      );
    } else {
      setProgramContentFields(
        programContentFields.map((field) =>
          field.id === id ? { ...field, fontFamily } : field
        )
      );
    }
  };

  // Função para mudar de página
  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Função para selecionar um modelo
  const handleSelectModel = (model) => {
    setSelectedModel(model);
  };

  // Função para continuar para a edição após selecionar um modelo
  const handleContinueToEditor = (model) => {
    if (model) {
      setSelectedModel(model);

      // Se o modelo tiver uma segunda página, habilitamos automaticamente
      if (model.backgrounds && model.backgrounds.page2) {
        setHasSecondPage(true);
      }

      setCurrentStep("certificate-editor");
    }
  };

  // Função para voltar para a seleção de modelo
  const handleBackToModelSelection = () => {
    setCurrentStep("model-selection");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Header />

      {currentStep === "model-selection" ? (
        <ModelSelectionScreen
          onSelectModel={handleSelectModel}
          onContinue={handleContinueToEditor}
        />
      ) : (
        <div className="flex-1 flex overflow-hidden">
          <CertificateEditor
            hasSecondPage={hasSecondPage}
            setHasSecondPage={setHasSecondPage}
            currentPage={currentPage}
            changePage={changePage}
            activeFields={activeFields}
            activeImages={activeImages}
            updateFieldValue={updateFieldValue}
            updateFontSize={updateFontSize}
            updateFontFamily={updateFontFamily}
            removeTextField={removeTextField}
            removeImage={removeImage}
            addTextField={addTextField}
            addImage={addImage}
            colors={colors}
            setColors={setColors}
            onBackToModelSelection={handleBackToModelSelection}
          />

          <CertificatePreview
            textFields={textFields}
            programContentFields={programContentFields}
            firstPageImages={firstPageImages}
            secondPageImages={secondPageImages}
            colors={colors}
            hasSecondPage={hasSecondPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            startDragFirstPage={startDragFirstPage}
            startDragSecondPage={startDragSecondPage}
            startDragFirstPageImage={startDragFirstPageImage}
            startDragSecondPageImage={startDragSecondPageImage}
            startResizeFirstPageImage={startResizeFirstPageImage}
            startResizeSecondPageImage={startResizeSecondPageImage}
            pdfContainerRef={pdfContainerRef}
            selectedModel={selectedModel}
          />
        </div>
      )}
    </div>
  );
}
