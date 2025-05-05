import React, { useState, useEffect } from "react";
import DataTable from "../../components/ui/DataTable";
import Modal from "../../components/ui/Modal";
import FormField from "../../components/ui/FormField";
import { BookOpen, Calendar, Users } from "lucide-react";

// Mock data para testes
const mockClasses = [
  {
    id: 1,
    curso: "Desenvolvimento Web Frontend",
    dt_inicio: "2024-03-10",
    dt_fim: "2024-06-15",
    professor: "Ana Oliveira",
    createdAt: "2024-02-15",
  },
  {
    id: 2,
    curso: "Design UX/UI",
    dt_inicio: "2024-04-05",
    dt_fim: "2024-07-20",
    professor: "Carlos Mendes",
    createdAt: "2024-03-01",
  },
  {
    id: 3,
    curso: "Marketing Digital",
    dt_inicio: "2024-05-12",
    dt_fim: "2024-08-30",
    professor: "Juliana Santos",
    createdAt: "2024-03-15",
  },
  {
    id: 4,
    curso: "Gestão de Projetos",
    dt_inicio: "2024-06-01",
    dt_fim: "2024-09-10",
    professor: "Roberto Alves",
    createdAt: "2024-04-20",
  },
  {
    id: 5,
    curso: "Data Science",
    dt_inicio: "2024-07-15",
    dt_fim: "2024-11-20",
    professor: "Mariana Costa",
    createdAt: "2024-05-30",
  },
];

// Mock data para opções de cursos
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

export default function Classes() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentClass, setCurrentClass] = useState({
    id: null,
    curso: "",
    dt_inicio: "",
    dt_fim: "",
    professor: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  // Simula carregamento de dados
  useEffect(() => {
    const fetchClasses = async () => {
      // Simula delay de rede
      setTimeout(() => {
        setClasses(mockClasses);
        setLoading(false);
      }, 500);
    };

    fetchClasses();
  }, []);

  // Definição das colunas da tabela
  const columns = [
    {
      header: "ID",
      accessor: "id",
      sortable: true,
    },
    {
      header: "Curso",
      accessor: "curso",
      render: (classItem) => (
        <div className="flex items-center gap-1">
          <BookOpen size={16} className="text-gray-500" />
          <span>{classItem.curso}</span>
        </div>
      ),
      sortable: true,
    },
    {
      header: "Data Início",
      accessor: "dt_inicio",
      render: (classItem) => (
        <div className="flex items-center gap-1">
          <Calendar size={16} className="text-gray-500" />
          <span>{formatDate(classItem.dt_inicio)}</span>
        </div>
      ),
      sortable: true,
    },
    {
      header: "Data Fim",
      accessor: "dt_fim",
      render: (classItem) => (
        <div className="flex items-center gap-1">
          <Calendar size={16} className="text-gray-500" />
          <span>{formatDate(classItem.dt_fim)}</span>
        </div>
      ),
      sortable: true,
    },
    {
      header: "Professor",
      accessor: "professor",
      render: (classItem) => (
        <div className="flex items-center gap-1">
          <Users size={16} className="text-gray-500" />
          <span>{classItem.professor}</span>
        </div>
      ),
      sortable: true,
    },
  ];

  // Função para formatar data
  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("pt-BR", options);
  };

  // Manipuladores de eventos
  const handleAddClass = () => {
    setCurrentClass({
      id: null,
      curso: "",
      dt_inicio: "",
      dt_fim: "",
      professor: "",
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleEditClass = (classItem) => {
    setCurrentClass(classItem);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDeleteClass = (id) => {
    setClasses(classes.filter((classItem) => classItem.id !== id));
  };

  const handleSaveClass = () => {
    // Validação básica
    if (
      !currentClass.curso ||
      !currentClass.dt_inicio ||
      !currentClass.professor
    ) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    if (isEditing) {
      // Editar turma existente
      setClasses(
        classes.map((classItem) =>
          classItem.id === currentClass.id ? currentClass : classItem
        )
      );
    } else {
      // Adicionar nova turma
      const newClass = {
        ...currentClass,
        id: classes.length > 0 ? Math.max(...classes.map((c) => c.id)) + 1 : 1,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setClasses([...classes, newClass]);
    }

    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentClass({
      ...currentClass,
      [name]: value,
    });
  };

  return (
    <>
      <DataTable
        title="Gerenciamento de Turmas"
        data={classes}
        columns={columns}
        loading={loading}
        searchKey={["curso", "professor"]}
        searchPlaceholder="Pesquisar turmas..."
        onAdd={handleAddClass}
        onEdit={handleEditClass}
        onDelete={handleDeleteClass}
        addButtonText="Nova Turma"
      />

      {/* Modal para adicionar/editar turma */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isEditing ? "Editar Turma" : "Adicionar Nova Turma"}
        onSave={handleSaveClass}
      >
        <FormField
          label="Curso"
          name="curso"
          value={currentClass.curso}
          onChange={handleInputChange}
          type="select"
          options={mockCourseOptions}
          required
        />

        <FormField
          label="Data de Início"
          name="dt_inicio"
          value={currentClass.dt_inicio}
          onChange={handleInputChange}
          type="date"
          required
        />

        <FormField
          label="Data de Fim"
          name="dt_fim"
          value={currentClass.dt_fim}
          onChange={handleInputChange}
          type="date"
        />

        <FormField
          label="Professor"
          name="professor"
          value={currentClass.professor}
          onChange={handleInputChange}
          placeholder="Nome do professor"
          required
        />
      </Modal>
    </>
  );
}
