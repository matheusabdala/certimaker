import React, { useState, useEffect } from "react";
import DataTable from "../../components/ui/DataTable";
import Modal from "../../components/ui/Modal";
import FormField from "../../components/ui/FormField";
import {
  User,
  FileText,
  Mail,
  Phone,
  Calendar,
  BookOpen,
  Download,
} from "lucide-react";

// Mock data para testes
const mockCertificates = [
  {
    id: 1,
    aluno: "João Silva",
    cpf: "123.456.789-00",
    curso: "Desenvolvimento Web Frontend",
    turma: "Turma 1 - 2024",
    email: "joao.silva@email.com",
    telefone: "(11) 98765-4321",
    data_curso: "2024-03-10",
    certificado_url: "/certificados/cert-001.pdf",
    createdAt: "2024-04-15",
  },
  {
    id: 2,
    aluno: "Maria Oliveira",
    cpf: "987.654.321-00",
    curso: "Design UX/UI",
    turma: "Turma 2 - 2024",
    email: "maria.oliveira@email.com",
    telefone: "(11) 91234-5678",
    data_curso: "2024-04-05",
    certificado_url: "/certificados/cert-002.pdf",
    createdAt: "2024-05-10",
  },
  {
    id: 3,
    aluno: "Pedro Santos",
    cpf: "456.789.123-00",
    curso: "Marketing Digital",
    turma: "Turma 1 - 2024",
    email: "pedro.santos@email.com",
    telefone: "(21) 98765-4321",
    data_curso: "2024-05-12",
    certificado_url: "/certificados/cert-003.pdf",
    createdAt: "2024-06-20",
  },
  {
    id: 4,
    aluno: "Ana Costa",
    cpf: "789.123.456-00",
    curso: "Gestão de Projetos",
    turma: "Turma 3 - 2024",
    email: "ana.costa@email.com",
    telefone: "(31) 97654-3210",
    data_curso: "2024-06-01",
    certificado_url: "/certificados/cert-004.pdf",
    createdAt: "2024-07-05",
  },
  {
    id: 5,
    aluno: "Lucas Mendes",
    cpf: "321.654.987-00",
    curso: "Data Science",
    turma: "Turma 1 - 2024",
    email: "lucas.mendes@email.com",
    telefone: "(41) 96543-2109",
    data_curso: "2024-07-15",
    certificado_url: "/certificados/cert-005.pdf",
    createdAt: "2024-08-10",
  },
];

// Mock data para opções de cursos e turmas
const mockCourseOptions = [
  {
    value: "Desenvolvimento Web Frontend",
    label: "Desenvolvimento Web Frontend",
  },
  { value: "Design UX/UI", label: "Design UX/UI" },
  { value: "Marketing Digital", label: "Marketing Digital" },
  { value: "Gestão de Projetos", label: "Gestão de Projetos" },
  { value: "Data Science", label: "Data Science" },
];

const mockClassOptions = [
  { value: "Turma 1 - 2024", label: "Turma 1 - 2024" },
  { value: "Turma 2 - 2024", label: "Turma 2 - 2024" },
  { value: "Turma 3 - 2024", label: "Turma 3 - 2024" },
];

export default function Certificates() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCertificate, setCurrentCertificate] = useState({
    id: null,
    aluno: "",
    cpf: "",
    curso: "",
    turma: "",
    email: "",
    telefone: "",
    data_curso: "",
    certificado_url: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");

  // Simula carregamento de dados
  useEffect(() => {
    const fetchCertificates = async () => {
      // Simula delay de rede
      setTimeout(() => {
        setCertificates(mockCertificates);
        setLoading(false);
      }, 500);
    };

    fetchCertificates();
  }, []);

  // Definição das colunas da tabela
  const columns = [
    {
      header: "ID",
      accessor: "id",
      sortable: true,
    },
    {
      header: "Aluno",
      accessor: "aluno",
      render: (certificate) => (
        <div className="flex items-center gap-1">
          <User size={16} className="text-gray-500" />
          <span>{certificate.aluno}</span>
        </div>
      ),
      sortable: true,
    },
    {
      header: "CPF",
      accessor: "cpf",
      render: (certificate) => (
        <div className="flex items-center gap-1">
          <FileText size={16} className="text-gray-500" />
          <span>{certificate.cpf}</span>
        </div>
      ),
      sortable: true,
    },
    {
      header: "Curso / Turma",
      accessor: "curso",
      render: (certificate) => (
        <div className="flex items-center gap-1">
          <BookOpen size={16} className="text-gray-500" />
          <span>
            {certificate.curso} <br />
            <span className="text-xs text-gray-500">{certificate.turma}</span>
          </span>
        </div>
      ),
      sortable: true,
    },
    {
      header: "Email",
      accessor: "email",
      render: (certificate) => (
        <div className="flex items-center gap-1">
          <Mail size={16} className="text-gray-500" />
          <span>{certificate.email}</span>
        </div>
      ),
      sortable: true,
    },
    {
      header: "Telefone",
      accessor: "telefone",
      render: (certificate) => (
        <div className="flex items-center gap-1">
          <Phone size={16} className="text-gray-500" />
          <span>{certificate.telefone}</span>
        </div>
      ),
      sortable: true,
    },
    {
      header: "Data do Curso",
      accessor: "data_curso",
      render: (certificate) => (
        <div className="flex items-center gap-1">
          <Calendar size={16} className="text-gray-500" />
          <span>{formatDate(certificate.data_curso)}</span>
        </div>
      ),
      sortable: true,
    },
    {
      header: "Certificado",
      accessor: "certificado_url",
      render: (certificate) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePreviewCertificate(certificate)}
            className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <FileText size={16} />
            <span>Preview</span>
          </button>
          <a
            href={certificate.certificado_url}
            download
            className="text-green-600 hover:text-green-800 flex items-center gap-1"
          >
            <Download size={16} />
            <span>Download</span>
          </a>
        </div>
      ),
      sortable: false,
    },
  ];

  // Função para formatar data
  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("pt-BR", options);
  };

  // Função para validar CPF
  const validateCPF = (cpf) => {
    // Simplificado para exemplo - na prática, usar validação mais robusta
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    return cpfRegex.test(cpf);
  };

  // Função para validar email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Função para validar telefone
  const validatePhone = (phone) => {
    // Aceita formatos (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
    const phoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
    return phoneRegex.test(phone);
  };

  // Manipuladores de eventos
  const handleAddCertificate = () => {
    setCurrentCertificate({
      id: null,
      aluno: "",
      cpf: "",
      curso: "",
      turma: "",
      email: "",
      telefone: "",
      data_curso: "",
      certificado_url: "",
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleEditCertificate = (certificate) => {
    setCurrentCertificate(certificate);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDeleteCertificate = (id) => {
    setCertificates(
      certificates.filter((certificate) => certificate.id !== id)
    );
  };

  const handleSaveCertificate = () => {
    // Validação de campos
    if (
      !currentCertificate.aluno ||
      !currentCertificate.cpf ||
      !currentCertificate.curso ||
      !currentCertificate.email ||
      !currentCertificate.data_curso
    ) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    // Validação de formato
    if (!validateCPF(currentCertificate.cpf)) {
      alert("CPF inválido. Use o formato XXX.XXX.XXX-XX");
      return;
    }

    if (!validateEmail(currentCertificate.email)) {
      alert("Email inválido.");
      return;
    }

    if (
      currentCertificate.telefone &&
      !validatePhone(currentCertificate.telefone)
    ) {
      alert("Telefone inválido. Use o formato (XX) XXXXX-XXXX");
      return;
    }

    if (isEditing) {
      // Editar certificado existente
      setCertificates(
        certificates.map((cert) =>
          cert.id === currentCertificate.id ? currentCertificate : cert
        )
      );
    } else {
      // Adicionar novo certificado
      const newCertificate = {
        ...currentCertificate,
        id:
          certificates.length > 0
            ? Math.max(...certificates.map((c) => c.id)) + 1
            : 1,
        createdAt: new Date().toISOString().split("T")[0],
        certificado_url: `/certificados/cert-${String(
          certificates.length + 1
        ).padStart(3, "0")}.pdf`,
      };
      setCertificates([...certificates, newCertificate]);
    }

    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentCertificate({
      ...currentCertificate,
      [name]: value,
    });
  };

  const handlePreviewCertificate = (certificate) => {
    // Em um cenário real, isso poderia abrir um modal com preview do PDF
    // Para este exemplo, apenas mostramos um alerta
    alert(`Visualizando certificado de ${certificate.aluno}`);
    // Alternativamente, poderia abrir uma nova janela com o PDF
    // window.open(certificate.certificado_url, '_blank');
  };

  // Função para fazer upload de certificado (simulada)
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Em um cenário real, enviaríamos o arquivo para um servidor
      // Para este exemplo, apenas atualizamos o URL localmente
      const fileUrl = URL.createObjectURL(file);
      setCurrentCertificate({
        ...currentCertificate,
        certificado_url: fileUrl,
      });
    }
  };

  return (
    <>
      <DataTable
        title="Certificados Emitidos"
        data={certificates}
        columns={columns}
        loading={loading}
        searchKey={["aluno", "cpf", "curso", "email"]}
        searchPlaceholder="Pesquisar certificados..."
        onAdd={handleAddCertificate}
        onEdit={handleEditCertificate}
        onDelete={handleDeleteCertificate}
        addButtonText="Novo Certificado"
      />

      {/* Modal para adicionar/editar certificado */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isEditing ? "Editar Certificado" : "Adicionar Novo Certificado"}
        onSave={handleSaveCertificate}
      >
        <FormField
          label="Nome do Aluno"
          name="aluno"
          value={currentCertificate.aluno}
          onChange={handleInputChange}
          placeholder="Nome completo do aluno"
          required
        />

        <FormField
          label="CPF"
          name="cpf"
          value={currentCertificate.cpf}
          onChange={handleInputChange}
          placeholder="XXX.XXX.XXX-XX"
          required
        />

        <FormField
          label="Curso"
          name="curso"
          value={currentCertificate.curso}
          onChange={handleInputChange}
          type="select"
          options={mockCourseOptions}
          required
        />

        <FormField
          label="Turma"
          name="turma"
          value={currentCertificate.turma}
          onChange={handleInputChange}
          type="select"
          options={mockClassOptions}
          required
        />

        <FormField
          label="Email"
          name="email"
          value={currentCertificate.email}
          onChange={handleInputChange}
          placeholder="email@exemplo.com"
          required
        />

        <FormField
          label="Telefone"
          name="telefone"
          value={currentCertificate.telefone}
          onChange={handleInputChange}
          placeholder="(XX) XXXXX-XXXX"
        />

        <FormField
          label="Data do Curso"
          name="data_curso"
          value={currentCertificate.data_curso}
          onChange={handleInputChange}
          type="date"
          required
        />

        {isEditing && (
          <FormField
            label="Certificado"
            name="certificado"
            type="file"
            accept=".pdf"
            onChange={handleFileUpload}
            helperText="Upload de novo certificado (PDF)"
          />
        )}
      </Modal>
    </>
  );
}
