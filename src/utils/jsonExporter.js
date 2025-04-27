// utils/jsonExporter.js

// URL da API para enviar os dados do certificado
const API_URL = "https://webhook.site/f6b2a374-05d8-422b-bbb8-c7b917ecf4c3"; // Substitua pelo seu endpoint real

// Função para exportar os dados dos campos como JSON
export const exportFieldsToJSON = (
  textFields,
  programContentFields,
  hasSecondPage
) => {
  // Combina os campos da primeira página e da segunda página (se existir)
  const allFields = [...textFields];

  if (hasSecondPage && programContentFields.length > 0) {
    allFields.push(...programContentFields);
  }

  // Mapeia os campos para incluir apenas as propriedades relevantes
  const fieldData = allFields.map((field) => ({
    id: field.id,
    name: field.label || `Campo ${field.id}`,
    value: field.value,
    fontFamily: field.fontFamily || "Arial, sans-serif",
    fontSize: field.fontSize,
    positionX: Math.round(field.x),
    positionY: Math.round(field.y),
    width: field.width || 500, // Valor padrão se não estiver definido
    page: programContentFields.some((f) => f.id === field.id) ? 2 : 1,
    textAlign: field.id === 1 || field.id === 2 ? "center" : "left",
  }));

  // Cria o objeto final com metadados
  const exportData = {
    certificate: {
      version: "1.0",
      createdAt: new Date().toISOString(),
      hasSecondPage: hasSecondPage,
      totalFields: fieldData.length,
      fields: fieldData,
    },
  };

  return exportData;
};

// Função para enviar os dados via POST
export const sendJSONToServer = async (
  textFields,
  programContentFields,
  hasSecondPage
) => {
  const jsonData = exportFieldsToJSON(
    textFields,
    programContentFields,
    hasSecondPage
  );

  // Exibe no console para fins de teste
  console.log("Dados do certificado a serem enviados:", jsonData);

  try {
    // Faz a requisição POST para o servidor
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Adicione headers de autenticação se necessário
        // 'Authorization': 'Bearer seu-token'
      },
      body: JSON.stringify(jsonData),
    });

    // Verifica se a requisição foi bem-sucedida
    if (response.ok) {
      const responseData = await response.json();
      console.log("Resposta do servidor:", responseData);
      return { success: true, data: responseData };
    } else {
      console.log("Erro ao enviar dados:", response.statusText);
      return { success: false, error: response.statusText };
    }
  } catch (error) {
    console.log("Erro na requisição:", error);
    return { success: false, error: error.message };
  }
};
