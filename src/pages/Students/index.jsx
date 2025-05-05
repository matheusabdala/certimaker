import React, { useState, useEffect } from "react";
import { Search, Plus, Pencil, Trash2, X, Check } from "lucide-react";

// Mock data para teste inicial
const mockStudents = [
  {
    id: 1,
    name: "Ana Silva",
    cpf: "123.456.789-00",
    email: "ana@example.com",
    phone: "(11) 98765-4321",
  },
  {
    id: 2,
    name: "Carlos Oliveira",
    cpf: "987.654.321-00",
    email: "carlos@example.com",
    phone: "(21) 91234-5678",
  },
  {
    id: 3,
    name: "Mariana Santos",
    cpf: "456.789.123-00",
    email: "mariana@example.com",
    phone: "(31) 95678-1234",
  },
  {
    id: 4,
    name: "João Pereira",
    cpf: "789.123.456-00",
    email: "joao@example.com",
    phone: "(41) 92345-6789",
  },
  {
    id: 5,
    name: "Juliana Costa",
    cpf: "321.654.987-00",
    email: "juliana@example.com",
    phone: "(51) 96789-0123",
  },
];

export default function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState({
    id: null,
    name: "",
    cpf: "",
    email: "",
    phone: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Simula carregamento de dados de uma API
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

  // Filtra estudantes de acordo com o termo de busca
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.cpf.includes(searchTerm) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.phone.includes(searchTerm)
  );

  // Funções de CRUD
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
    setDeleteConfirmId(null);
  };

  const handleSaveStudent = () => {
    if (isEditing) {
      // Editar estudante existente
      setStudents(
        students.map((student) =>
          student.id === currentStudent.id ? currentStudent : student
        )
      );
    } else {
      // Adicionar novo estudante
      const newStudent = {
        ...currentStudent,
        id:
          students.length > 0 ? Math.max(...students.map((s) => s.id)) + 1 : 1,
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

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Gerenciamento de Alunos</h1>

      {/* Barra de pesquisa e botão de adicionar */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Pesquisar alunos..."
            className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>

        <button
          onClick={handleAddStudent}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto justify-center"
        >
          <Plus size={18} />
          Novo Aluno
        </button>
      </div>

      {/* Tabela de alunos */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nome
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  CPF
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  E-mail
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Telefone
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    Carregando alunos...
                  </td>
                </tr>
              ) : filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.cpf}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEditStudent(student)}
                          className="text-blue-600 hover:text-blue-900 p-1"
                        >
                          <Pencil size={18} />
                        </button>

                        {deleteConfirmId === student.id ? (
                          <>
                            <button
                              onClick={() => handleDeleteStudent(student.id)}
                              className="text-green-600 hover:text-green-900 p-1"
                            >
                              <Check size={18} />
                            </button>
                            <button
                              onClick={() => setDeleteConfirmId(null)}
                              className="text-gray-600 hover:text-gray-900 p-1"
                            >
                              <X size={18} />
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirmId(student.id)}
                            className="text-red-600 hover:text-red-900 p-1"
                          >
                            <Trash2 size={18} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    Nenhum aluno encontrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal para adicionar/editar aluno */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <h2 className="text-xl font-semibold mb-4">
              {isEditing ? "Editar Aluno" : "Adicionar Novo Aluno"}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome
                </label>
                <input
                  type="text"
                  name="name"
                  value={currentStudent.name}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nome completo"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CPF
                </label>
                <input
                  type="text"
                  name="cpf"
                  value={currentStudent.cpf}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="000.000.000-00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  E-mail
                </label>
                <input
                  type="email"
                  name="email"
                  value={currentStudent.email}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="email@exemplo.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Telefone
                </label>
                <input
                  type="text"
                  name="phone"
                  value={currentStudent.phone}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="(00) 00000-0000"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveStudent}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
