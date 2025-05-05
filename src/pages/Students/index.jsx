import React, { useState, useEffect } from "react";
import DataTable from "../../components/ui/DataTable";
import Modal from "../../components/ui/Modal";
import FormField from "../../components/ui/FormField";
import { User, Mail, Phone } from "lucide-react";

// Mock data para testes
const mockStudents = [
  {
    id: 1,
    name: "Ana Silva",
    cpf: "123.456.789-00",
    email: "ana.silva@email.com",
    phone: "(11) 98765-4321",
    createdAt: "2024-01-10",
  },
  {
    id: 2,
    name: "Carlos Oliveira",
    cpf: "987.654.321-00",
    email: "carlos.oliveira@email.com",
    phone: "(11) 91234-5678",
    createdAt: "2024-01-15",
  },
  {
    id: 3,
    name: "Mariana Santos",
    cpf: "456.789.123-00",
    email: "mariana.santos@email.com",
    phone: "(21) 99876-5432",
    createdAt: "2024-02-05",
  },
  {
    id: 4,
    name: "Pedro Costa",
    cpf: "789.123.456-00",
    email: "pedro.costa@email.com",
    phone: "(31) 98888-7777",
    createdAt: "2024-02-10",
  },
  {
    id: 5,
    name: "Juliana Lima",
    cpf: "321.654.987-00",
    email: "juliana.lima@email.com",
    phone: "(47) 97777-8888",
    createdAt: "2024-02-20",
  },
  {
    id: 6,
    name: "Roberto Almeida",
    cpf: "654.987.321-00",
    email: "roberto.almeida@email.com",
    phone: "(19) 96666-5555",
    createdAt: "2024-03-01",
  },
  {
    id: 7,
    name: "Fernanda Gomes",
    cpf: "111.222.333-44",
    email: "fernanda.gomes@email.com",
    phone: "(51) 95555-4444",
    createdAt: "2024-03-10",
  },
  {
    id: 8,
    name: "Lucas Martins",
    cpf: "444.555.666-77",
    email: "lucas.martins@email.com",
    phone: "(41) 94444-3333",
    createdAt: "2024-03-15",
  },
  {
    id: 9,
    name: "Amanda Pereira",
    cpf: "777.888.999-00",
    email: "amanda.pereira@email.com",
    phone: "(85) 93333-2222",
    createdAt: "2024-03-20",
  },
  {
    id: 10,
    name: "Bruno Ferreira",
    cpf: "000.111.222-33",
    email: "bruno.ferreira@email.com",
    phone: "(27) 92222-1111",
    createdAt: "2024-03-25",
  },
];

export default function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState({
    id: null,
    name: "",
    cpf: "",
    email: "",
    phone: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  // Simula carregamento de dados
  useEffect(() => {
    const fetchStudents = async () => {
      // Simula delay de rede
      setTimeout(() => {
        setStudents(mockStudents);
        setLoading(false);
      }, 500);
    };

    fetchStudents();
  }, []);

  // Definição das colunas da tabela
  const columns = [
    {
      header: "ID",
      accessor: "id",
      sortable: true,
    },
    {
      header: "Nome",
      accessor: "name",
      render: (student) => (
        <div className="flex items-center gap-1">
          <User size={16} className="text-gray-500" />
          <span>{student.name}</span>
        </div>
      ),
      sortable: true,
    },
    {
      header: "CPF",
      accessor: "cpf",
      sortable: true,
    },
    {
      header: "E-mail",
      accessor: "email",
      sortable: true,
      render: (student) => (
        <div className="flex items-center gap-1">
          <Mail size={16} className="text-gray-500" />
          <span>{student.email}</span>
        </div>
      ),
    },
    {
      header: "Telefone",
      accessor: "phone",
      render: (student) => (
        <div className="flex items-center gap-1">
          <Phone size={16} className="text-gray-500" />
          <span>{student.phone}</span>
        </div>
      ),
    },
  ];

  // Manipuladores de eventos
  const handleAddStudent = () => {
    setCurrentStudent({
      id: null,
      name: "",
      cpf: "",
      email: "",
      phone: "",
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleEditStudent = (student) => {
    setCurrentStudent(student);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDeleteStudent = (id) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  const handleSaveStudent = () => {
    // Validação básica
    if (!currentStudent.name || !currentStudent.cpf || !currentStudent.email) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    if (isEditing) {
      // Editar aluno existente
      setStudents(
        students.map((student) =>
          student.id === currentStudent.id ? currentStudent : student
        )
      );
    } else {
      // Adicionar novo aluno
      const newStudent = {
        ...currentStudent,
        id:
          students.length > 0 ? Math.max(...students.map((s) => s.id)) + 1 : 1,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setStudents([...students, newStudent]);
    }

    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentStudent({
      ...currentStudent,
      [name]: value,
    });
  };

  // Função para formatar CPF durante a digitação
  const formatCPF = (value) => {
    const cpf = value.replace(/\D/g, ""); // Remove caracteres não numéricos
    if (cpf.length <= 3) return cpf;
    if (cpf.length <= 6) return `${cpf.slice(0, 3)}.${cpf.slice(3)}`;
    if (cpf.length <= 9)
      return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6)}`;
    return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(
      6,
      9
    )}-${cpf.slice(9, 11)}`;
  };

  // Função para formatar telefone durante a digitação
  const formatPhone = (value) => {
    const phone = value.replace(/\D/g, ""); // Remove caracteres não numéricos
    if (phone.length <= 2) return phone;
    if (phone.length <= 7) return `(${phone.slice(0, 2)}) ${phone.slice(2)}`;
    return `(${phone.slice(0, 2)}) ${phone.slice(2, 7)}-${phone.slice(7, 11)}`;
  };

  const handleCPFChange = (e) => {
    const formattedCPF = formatCPF(e.target.value);
    setCurrentStudent({
      ...currentStudent,
      cpf: formattedCPF,
    });
  };

  const handlePhoneChange = (e) => {
    const formattedPhone = formatPhone(e.target.value);
    setCurrentStudent({
      ...currentStudent,
      phone: formattedPhone,
    });
  };

  return (
    <>
      <DataTable
        title="Gerenciamento de Alunos"
        data={students}
        columns={columns}
        loading={loading}
        searchKey={["name", "email", "cpf"]}
        searchPlaceholder="Pesquisar alunos..."
        onAdd={handleAddStudent}
        onEdit={handleEditStudent}
        onDelete={handleDeleteStudent}
        addButtonText="Novo Aluno"
      />

      {/* Modal para adicionar/editar aluno */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isEditing ? "Editar Aluno" : "Adicionar Novo Aluno"}
        onSave={handleSaveStudent}
      >
        <FormField
          label="Nome completo"
          name="name"
          value={currentStudent.name}
          onChange={handleInputChange}
          placeholder="Nome do aluno"
          required
        />

        <FormField
          label="CPF"
          name="cpf"
          value={currentStudent.cpf}
          onChange={handleCPFChange}
          placeholder="000.000.000-00"
          maxLength={14}
          required
        />

        <FormField
          label="E-mail"
          name="email"
          value={currentStudent.email}
          onChange={handleInputChange}
          placeholder="email@exemplo.com"
          type="email"
          required
        />

        <FormField
          label="Telefone"
          name="phone"
          value={currentStudent.phone}
          onChange={handlePhoneChange}
          placeholder="(00) 00000-0000"
          maxLength={15}
        />
      </Modal>
    </>
  );
}
