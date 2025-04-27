import React, { useState, useRef } from "react";
import Header from "./components/layout/Header";
import CertificateEditor from "./components/certificate/CertificateEditor";
import CertificatePreview from "./components/certificate/CertificatePreview";
import useDraggable from "./hooks/useDraggable";
import {
  defaultTextFields,
  defaultProgramContentFields,
} from "./constants/defaultFields";

export default function App() {
  const [hasSecondPage, setHasSecondPage] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [colors, setColors] = useState({
    bgColor: "#1a1a1a",
    borderColor: "#ffc107",
    textColor: "#ffffff",
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

  // Obter os campos ativos com base na página atual
  const activeFields = currentPage === 1 ? textFields : programContentFields;
  const setActiveFields =
    currentPage === 1 ? setTextFields : setProgramContentFields;

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

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <CertificateEditor
          hasSecondPage={hasSecondPage}
          setHasSecondPage={setHasSecondPage}
          currentPage={currentPage}
          changePage={changePage}
          activeFields={activeFields}
          updateFieldValue={updateFieldValue}
          updateFontSize={updateFontSize}
          updateFontFamily={updateFontFamily}
          removeTextField={removeTextField}
          addTextField={addTextField}
          colors={colors}
          setColors={setColors}
        />

        <CertificatePreview
          textFields={textFields}
          programContentFields={programContentFields}
          colors={colors}
          hasSecondPage={hasSecondPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          startDragFirstPage={startDragFirstPage}
          startDragSecondPage={startDragSecondPage}
          pdfContainerRef={pdfContainerRef}
        />
      </div>
    </div>
  );
}
