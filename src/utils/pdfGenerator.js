// Em utils/pdfGenerator.js
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const generatePDF = async (
  hasSecondPage,
  currentPage,
  setCurrentPage,
  selectedModel
) => {
  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "px",
    format: [842, 595],
  });

  // Função para capturar uma página
  const capturePage = async (pageId) => {
    const element = document.getElementById(pageId);
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
    });
    const imgData = canvas.toDataURL("image/jpeg", 1.0);
    return { canvas, imgData };
  };

  // Capturar a primeira página
  setCurrentPage(1);
  await new Promise((resolve) => setTimeout(resolve, 100)); // Esperar pela renderização
  const { imgData: firstPageData } = await capturePage("pdf-preview-page-1");
  pdf.addImage(firstPageData, "JPEG", 0, 0, 842, 595);

  // Se tiver segunda página, capturar também
  if (hasSecondPage) {
    setCurrentPage(2);
    await new Promise((resolve) => setTimeout(resolve, 100)); // Esperar pela renderização
    const { imgData: secondPageData } = await capturePage("pdf-preview-page-2");
    pdf.addPage();
    pdf.addImage(secondPageData, "JPEG", 0, 0, 842, 595);
  }

  // Voltar para a página que estava sendo visualizada
  setCurrentPage(currentPage);

  // Salvar o PDF
  pdf.save("certificado.pdf");
};
