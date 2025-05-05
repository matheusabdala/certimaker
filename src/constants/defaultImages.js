// Define imagens padrão disponíveis para o certificado
// Assumindo que estas imagens estão salvas na pasta public/images/defaults/

export const defaultImages = [
  {
    id: 1,
    label: "Logo da Empresa",
    filename: "company-logo.png",
    path: "src/assets/images/defaults/company-logo.png",
    width: 150,
    height: 70,
    x: 690, // Posicionamento padrão no canto superior direito
    y: 20,
  },
  {
    id: 2,
    label: "QR Code",
    filename: "qr-code.jpg",
    path: "src/assets/images/defaults/qr-code.png",
    width: 150,
    height: 70,
    x: 690, // Posicionamento padrão no canto superior direito
    y: 20,
  },
];

// Imagens padrão para a segunda página
export const defaultSecondPageImages = [
  {
    id: 1,
    label: "Rodapé Institucional",
    filename: "footer-logo.png",
    path: "/images/defaults/footer-logo.png",
    width: 200,
    height: 50,
    x: 320, // Centralizado no rodapé
    y: 540,
  },
  {
    id: 2,
    label: "Ícone de Módulos",
    filename: "modules-icon.png",
    path: "/images/defaults/modules-icon.png",
    width: 50,
    height: 50,
    x: 50, // Lado esquerdo, para os módulos
    y: 120,
  },
];
