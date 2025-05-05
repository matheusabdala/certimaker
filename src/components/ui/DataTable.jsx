import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  X,
  Check,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

export default function DataTable({
  title,
  data,
  columns,
  loading,
  searchKey,
  searchPlaceholder = "Pesquisar...",
  onAdd,
  onEdit,
  onDelete,
  addButtonText = "Novo Item",
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Estado para ordenação
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });

  // Paginação
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const [totalPages, setTotalPages] = useState(1);

  // Filtra itens de acordo com o termo de busca
  const filteredItems = data.filter((item) => {
    if (!searchTerm.trim()) return true;

    // Se searchKey for uma string, pesquisa apenas nessa propriedade
    if (typeof searchKey === "string") {
      return String(item[searchKey])
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    }

    // Se searchKey for um array, pesquisa em todas as propriedades listadas
    if (Array.isArray(searchKey)) {
      return searchKey.some((key) =>
        String(item[key]).toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Se searchKey não for fornecido, pesquisa em todas as propriedades
    return Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Função para ordenar os itens
  const sortedItems = React.useMemo(() => {
    let sortableItems = [...filteredItems];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        // Verificar se os valores são números
        if (!isNaN(aValue) && !isNaN(bValue)) {
          return sortConfig.direction === "asc"
            ? Number(aValue) - Number(bValue)
            : Number(bValue) - Number(aValue);
        }

        // Verificar se os valores são datas
        if (Date.parse(aValue) && Date.parse(bValue)) {
          return sortConfig.direction === "asc"
            ? new Date(aValue) - new Date(bValue)
            : new Date(bValue) - new Date(aValue);
        }

        // Ordenação de strings por padrão
        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredItems, sortConfig]);

  // Função para alterar a ordenação
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Calcula o total de páginas
  useEffect(() => {
    setTotalPages(Math.ceil(sortedItems.length / itemsPerPage));
    // Reset to first page when search term changes or items per page changes
    setCurrentPage(1);
  }, [sortedItems.length, itemsPerPage]);

  // Get current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedItems.slice(indexOfFirstItem, indexOfLastItem);

  // Função para mudar de página
  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Função para renderizar o indicador de direção da ordenação
  const getSortDirectionIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) {
      return null;
    }
    return sortConfig.direction === "asc" ? (
      <ArrowUp size={14} className="ml-1 inline" />
    ) : (
      <ArrowDown size={14} className="ml-1 inline" />
    );
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">{title}</h1>

      {/* Barra de pesquisa, seletor de registros por página e botão de adicionar */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder={searchPlaceholder}
              className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
          </div>

          <div className="flex items-center">
            <label
              htmlFor="itemsPerPage"
              className="text-sm text-gray-700 whitespace-nowrap mr-2"
            >
              Itens por página:
            </label>
            <select
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="border rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>

        {onAdd && (
          <button
            onClick={onAdd}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto justify-center"
          >
            <Plus size={18} />
            {addButtonText}
          </button>
        )}
      </div>

      {/* Tabela de itens */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {columns.map((column, index) => (
                  <th
                    key={index}
                    className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                      column.sortable !== false
                        ? "cursor-pointer hover:bg-gray-100"
                        : ""
                    }`}
                    onClick={() => {
                      if (column.sortable !== false && column.accessor) {
                        requestSort(column.accessor);
                      }
                    }}
                  >
                    <div className="flex items-center">
                      {column.header}
                      {column.sortable !== false &&
                        column.accessor &&
                        getSortDirectionIcon(column.accessor)}
                    </div>
                  </th>
                ))}
                {(onEdit || onDelete) && (
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td
                    colSpan={columns.length + (onEdit || onDelete ? 1 : 0)}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    Carregando dados...
                  </td>
                </tr>
              ) : sortedItems.length > 0 ? (
                currentItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    {columns.map((column, index) => (
                      <td
                        key={index}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                      >
                        {column.render
                          ? column.render(item)
                          : item[column.accessor]}
                      </td>
                    ))}

                    {(onEdit || onDelete) && (
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-2">
                          {onEdit && (
                            <button
                              onClick={() => onEdit(item)}
                              className="text-blue-600 hover:text-blue-900 p-1"
                            >
                              <Pencil size={18} />
                            </button>
                          )}

                          {onDelete &&
                            (deleteConfirmId === item.id ? (
                              <>
                                <button
                                  onClick={() => {
                                    onDelete(item.id);
                                    setDeleteConfirmId(null);
                                  }}
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
                                onClick={() => setDeleteConfirmId(item.id)}
                                className="text-red-600 hover:text-red-900 p-1"
                              >
                                <Trash2 size={18} />
                              </button>
                            ))}
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length + (onEdit || onDelete ? 1 : 0)}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    Nenhum item encontrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Paginação */}
      {!loading && sortedItems.length > 0 && (
        <div className="flex justify-between items-center mt-6">
          <div className="text-sm text-gray-700">
            Mostrando {indexOfFirstItem + 1} a{" "}
            {Math.min(indexOfLastItem, sortedItems.length)} de{" "}
            {sortedItems.length} itens
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-md ${
                currentPage === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex items-center space-x-1">
              {/* Exibe os números de página */}
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                // Lógica para mostrar páginas relevantes
                let pageNum;

                if (totalPages <= 5) {
                  // Se tivermos 5 ou menos páginas, mostramos todas
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  // Se estivermos nas primeiras páginas
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  // Se estivermos nas últimas páginas
                  pageNum = totalPages - 4 + i;
                } else {
                  // Se estivermos no meio
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <button
                    key={i}
                    onClick={() => paginate(pageNum)}
                    className={`w-8 h-8 flex items-center justify-center rounded-md ${
                      pageNum === currentPage
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-md ${
                currentPage === totalPages
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
