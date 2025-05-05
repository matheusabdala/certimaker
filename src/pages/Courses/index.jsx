import React, { useState, useEffect } from "react";
import DataTable from "../../components/ui/DataTable";
import Modal from "../../components/ui/Modal";
import FormField from "../../components/ui/FormField";
import { Clock, Calendar } from "lucide-react";

// Mock data para testes
const mockCourses = [
  {
    id: 1,
    name: "Desenvolvimento Web Frontend",
    category: "Tecnologia",
    duration: 40,
    workload: "40 horas",
    description:
      "Curso completo de desenvolvimento web com HTML, CSS e JavaScript.",
    startAt: "2024-01-15",
    endAt: "2024-01-25",
  },
  {
    id: 2,
    name: "React: Do básico ao avançado",
    category: "Tecnologia",
    duration: 60,
    workload: "60 horas",
    description:
      "Aprenda React.js criando aplicações do zero ao avançado com hooks, context API e mais.",
    startAt: "2024-02-10",
    endAt: "2024-02-20",
  },
  {
    id: 3,
    name: "UI/UX Design",
    category: "Design",
    duration: 30,
    workload: "30 horas",
    description:
      "Princípios de design de interface e experiência do usuário com Figma.",
    startAt: "2024-02-10",
    endAt: "2024-02-20",
  },
  {
    id: 4,
    name: "Python para Análise de Dados",
    category: "Tecnologia",
    duration: 50,
    workload: "50 horas",
    description: "Análise de dados com Python, Pandas, NumPy e Matplotlib.",
    startAt: "2024-02-10",
    endAt: "2024-02-20",
  },
  {
    id: 5,
    name: "Marketing Digital",
    category: "Marketing",
    duration: 25,
    workload: "25 horas",
    description:
      "Estratégias e ferramentas para marketing digital e redes sociais.",
    startAt: "2024-02-10",
    endAt: "2024-02-20",
  },
  {
    id: 6,
    name: "Excel Avançado",
    category: "Produtividade",
    duration: 20,
    workload: "20 horas",
    description:
      "Fórmulas avançadas, tabelas dinâmicas e automação com macros.",
    startAt: "2024-02-10",
    endAt: "2024-02-20",
  },
  {
    id: 7,
    name: "Gestão de Projetos",
    category: "Negócios",
    duration: 35,
    workload: "35 horas",
    description: "Metodologias ágeis e tradicionais para gestão de projetos.",
    startAt: "2024-02-10",
    endAt: "2024-02-20",
  },
  {
    id: 8,
    name: "Inglês para Negócios",
    category: "Idiomas",
    duration: 45,
    workload: "45 horas",
    description: "Comunicação em inglês para ambiente corporativo e negócios.",
    startAt: "2024-02-10",
    endAt: "2024-02-20",
  },
  {
    id: 9,
    name: "Node.js: API RESTful",
    category: "Tecnologia",
    duration: 30,
    workload: "30 horas",
    description: "Criação de APIs RESTful com Node.js, Express e MongoDB.",
    startAt: "2024-02-10",
    endAt: "2024-02-20",
  },
  {
    id: 10,
    name: "Fotografia Digital",
    category: "Arte",
    duration: 25,
    workload: "25 horas",
    description:
      "Técnicas de fotografia digital para iniciantes e intermediários.",
    startAt: "2024-02-10",
    endAt: "2024-02-20",
  },
];

// Categorias disponíveis para cursos
const courseCategories = [
  { value: "Tecnologia", label: "Tecnologia" },
  { value: "Design", label: "Design" },
  { value: "Marketing", label: "Marketing" },
  { value: "Produtividade", label: "Produtividade" },
  { value: "Negócios", label: "Negócios" },
  { value: "Idiomas", label: "Idiomas" },
  { value: "Arte", label: "Arte" },
  { value: "Outro", label: "Outro" },
];

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState({
    id: null,
    name: "",
    category: "",
    duration: "",
    description: "",
    startAt: "",
    endAt: "",
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

  // Formatação das datas para exibição
  const formatDate = (dateString) => {
    if (!dateString) return "";

    try {
      // Para evitar problemas de fuso horário, usamos diretamente o valor da string da data
      // e manipulamos manualmente para exibição no formato pt-BR
      const [year, month, day] = dateString.split("-");
      return `${day}/${month}/${year}`;
    } catch (error) {
      console.error("Erro ao formatar data:", error);
      return "Data inválida";
    }
  };

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
      sortable: true,
    },
    {
      header: "Categoria",
      accessor: "category",
      sortable: true,
    },
    {
      header: "Data início",
      accessor: "startAt",
      sortable: true,
      render: (course) => (
        <div className="flex items-center gap-1">
          <Calendar size={16} className="text-gray-500" />
          <span>{formatDate(course.startAt)}</span>
        </div>
      ),
    },
    {
      header: "Data fim",
      accessor: "endAt",
      sortable: true,
      render: (course) => (
        <div className="flex items-center gap-1">
          <Calendar size={16} className="text-gray-500" />
          <span>{formatDate(course.endAt)}</span>
        </div>
      ),
    },
    {
      header: "Carga Horária",
      accessor: "workload",
      sortable: true,
      render: (course) => (
        <div className="flex items-center gap-1">
          <Clock size={16} className="text-gray-500" />
          <span>{course.workload}</span>
        </div>
      ),
    },
  ];

  // Manipuladores de eventos
  const handleAddCourse = () => {
    // Definir datas padrão para hoje ao adicionar novo curso
    const today = new Date().toISOString().split("T")[0];

    setCurrentCourse({
      id: null,
      name: "",
      category: "",
      duration: "",
      description: "",
      startAt: today,
      endAt: today,
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleEditCourse = (course) => {
    // Não precisamos converter as datas - usar diretamente os valores já no formato YYYY-MM-DD
    // que estão armazenados no objeto course
    setCurrentCourse({
      ...course,
      // Garantimos que temos os mesmos valores de datas que estão armazenados no objeto
      startAt: course.startAt,
      endAt: course.endAt,
    });

    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDeleteCourse = (id) => {
    setCourses(courses.filter((course) => course.id !== id));
  };

  const handleSaveCourse = () => {
    // Validação básica
    if (
      !currentCourse.name ||
      !currentCourse.category ||
      !currentCourse.duration ||
      !currentCourse.startAt ||
      !currentCourse.endAt
    ) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    // Validar que a data final é posterior à data inicial
    if (new Date(currentCourse.endAt) < new Date(currentCourse.startAt)) {
      alert("A data final deve ser igual ou posterior à data inicial.");
      return;
    }

    if (isEditing) {
      // Editar curso existente
      setCourses(
        courses.map((course) =>
          course.id === currentCourse.id
            ? {
                ...currentCourse,
                workload: `${currentCourse.duration} horas`,
              }
            : course
        )
      );
    } else {
      // Adicionar novo curso
      const newCourse = {
        ...currentCourse,
        id: courses.length > 0 ? Math.max(...courses.map((c) => c.id)) + 1 : 1,
        workload: `${currentCourse.duration} horas`,
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
        searchKey={["name", "category", "description"]}
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
          name="name"
          value={currentCourse.name}
          onChange={handleInputChange}
          placeholder="Nome do curso"
          required
        />

        <FormField
          label="Categoria"
          name="category"
          value={currentCourse.category}
          onChange={handleInputChange}
          type="select"
          options={courseCategories}
          required
        />

        <FormField
          label="Duração (horas)"
          name="duration"
          value={currentCourse.duration}
          onChange={handleInputChange}
          placeholder="Ex: 40"
          type="number"
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Data Início"
            name="startAt"
            value={currentCourse.startAt}
            onChange={handleInputChange}
            placeholder="Data início do curso"
            type="date"
            required
          />

          <FormField
            label="Data Fim"
            name="endAt"
            value={currentCourse.endAt}
            onChange={handleInputChange}
            placeholder="Data fim do curso"
            type="date"
            required
          />
        </div>

        <FormField
          label="Descrição"
          name="description"
          value={currentCourse.description}
          onChange={handleInputChange}
          placeholder="Descreva o conteúdo do curso"
          type="textarea"
        />
      </Modal>
    </>
  );
}
