import React, { useState, useEffect } from "react";
import DataTable from "../../components/ui/DataTable";
import Modal from "../../components/ui/Modal";
import FormField from "../../components/ui/FormField";
import { BookOpen, MapPin, Tag } from "lucide-react";

// Mock data para testes
const mockCourses = [
  {
    id: 1,
    nome_curso: "Desenvolvimento Web Frontend",
    local: "Campus Central",
    modalidade: "presencial",
    categoria: "Tecnologia",
    createdAt: "2024-01-10",
  },
  {
    id: 2,
    nome_curso: "Design UX/UI",
    local: "Campus Online",
    modalidade: "online",
    categoria: "Design",
    createdAt: "2024-01-15",
  },
  {
    id: 3,
    nome_curso: "Marketing Digital",
    local: "Campus Central",
    modalidade: "hibrido",
    categoria: "Marketing",
    createdAt: "2024-02-05",
  },
  {
    id: 4,
    nome_curso: "Gestão de Projetos",
    local: "Campus Norte",
    modalidade: "presencial",
    categoria: "Administração",
    createdAt: "2024-02-10",
  },
  {
    id: 5,
    nome_curso: "Data Science",
    local: "Campus Online",
    modalidade: "online",
    categoria: "Tecnologia",
    createdAt: "2024-02-20",
  },
];

// Opções para o campo de modalidade
const modalidadeOptions = [
  { value: "presencial", label: "Presencial" },
  { value: "online", label: "Online" },
  { value: "hibrido", label: "Híbrido" },
];

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState({
    id: null,
    nome_curso: "",
    local: "",
    modalidade: "",
    categoria: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  // Simula carregamento de dados
  useEffect(() => {
    const fetchCourses = async () => {
      // Simula delay de rede
      setTimeout(() => {
        setCourses(mockCourses);
        setLoading(false);
      }, 500);
    };

    fetchCourses();
  }, []);

  // Definição das colunas da tabela
  const columns = [
    {
      header: "ID",
      accessor: "id",
      sortable: true,
    },
    {
      header: "Nome do Curso",
      accessor: "nome_curso",
      render: (course) => (
        <div className="flex items-center gap-1">
          <BookOpen size={16} className="text-gray-500" />
          <span>{course.nome_curso}</span>
        </div>
      ),
      sortable: true,
    },
    {
      header: "Local",
      accessor: "local",
      render: (course) => (
        <div className="flex items-center gap-1">
          <MapPin size={16} className="text-gray-500" />
          <span>{course.local}</span>
        </div>
      ),
      sortable: true,
    },
    {
      header: "Modalidade",
      accessor: "modalidade",
      render: (course) => {
        // Função para retornar a cor baseada na modalidade
        const getModalidadeColor = (modalidade) => {
          switch (modalidade) {
            case "presencial":
              return "bg-green-100 text-green-800";
            case "online":
              return "bg-blue-100 text-blue-800";
            case "hibrido":
              return "bg-purple-100 text-purple-800";
            default:
              return "bg-gray-100 text-gray-800";
          }
        };

        // Função para retornar o texto formatado da modalidade
        const getModalidadeText = (modalidade) => {
          switch (modalidade) {
            case "presencial":
              return "Presencial";
            case "online":
              return "Online";
            case "hibrido":
              return "Híbrido";
            default:
              return modalidade;
          }
        };

        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getModalidadeColor(
              course.modalidade
            )}`}
          >
            {getModalidadeText(course.modalidade)}
          </span>
        );
      },
      sortable: true,
    },
    {
      header: "Categoria",
      accessor: "categoria",
      render: (course) => (
        <div className="flex items-center gap-1">
          <Tag size={16} className="text-gray-500" />
          <span>{course.categoria}</span>
        </div>
      ),
      sortable: true,
    },
  ];

  // Manipuladores de eventos
  const handleAddCourse = () => {
    setCurrentCourse({
      id: null,
      nome_curso: "",
      local: "",
      modalidade: "",
      categoria: "",
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleEditCourse = (course) => {
    setCurrentCourse(course);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDeleteCourse = (id) => {
    setCourses(courses.filter((course) => course.id !== id));
  };

  const handleSaveCourse = () => {
    // Validação básica
    if (!currentCourse.nome_curso || !currentCourse.modalidade) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    if (isEditing) {
      // Editar curso existente
      setCourses(
        courses.map((course) =>
          course.id === currentCourse.id ? currentCourse : course
        )
      );
    } else {
      // Adicionar novo curso
      const newCourse = {
        ...currentCourse,
        id: courses.length > 0 ? Math.max(...courses.map((c) => c.id)) + 1 : 1,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setCourses([...courses, newCourse]);
    }

    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentCourse({
      ...currentCourse,
      [name]: value,
    });
  };

  return (
    <>
      <DataTable
        title="Gerenciamento de Cursos"
        data={courses}
        columns={columns}
        loading={loading}
        searchKey={["nome_curso", "local", "categoria"]}
        searchPlaceholder="Pesquisar cursos..."
        onAdd={handleAddCourse}
        onEdit={handleEditCourse}
        onDelete={handleDeleteCourse}
        addButtonText="Novo Curso"
      />

      {/* Modal para adicionar/editar curso */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isEditing ? "Editar Curso" : "Adicionar Novo Curso"}
        onSave={handleSaveCourse}
      >
        <FormField
          label="Nome do Curso"
          name="nome_curso"
          value={currentCourse.nome_curso}
          onChange={handleInputChange}
          placeholder="Nome do curso"
          required
        />

        <FormField
          label="Local"
          name="local"
          value={currentCourse.local}
          onChange={handleInputChange}
          placeholder="Local do curso"
        />

        <FormField
          label="Modalidade"
          name="modalidade"
          value={currentCourse.modalidade}
          onChange={handleInputChange}
          type="select"
          options={modalidadeOptions}
          required
        />

        <FormField
          label="Categoria"
          name="categoria"
          value={currentCourse.categoria}
          onChange={handleInputChange}
          placeholder="Categoria do curso"
        />
      </Modal>
    </>
  );
}
