# Gerador de Certificados

Uma aplicação em **React (Vite)** para criar e personalizar certificados de forma visual e gerar arquivos PDF a partir da edição.

## Funcionalidades

- Adicionar e remover campos de texto.
- Arrastar e posicionar os textos sobre o modelo de certificado.
- Alterar o tamanho da fonte e o tipo da fonte de cada texto.
- Visualizar em tempo real como o certificado final ficará.
- Gerar e baixar o certificado em formato PDF.

## Tecnologias Utilizadas

- React + Vite
- react-draggable (ou alternativa para arrastar elementos)
- html2canvas + jsPDF (para geração do PDF)
- (opcional) Fabric.js ou Konva.js (para manipulação gráfica)

## Como rodar o projeto

1. Clone este repositório:

   ```bash
   git clone https://github.com/seu-usuario/nome-do-repositorio.git
   ```

2. Acesse a pasta do projeto:

   ```bash
   cd nome-do-repositorio
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Rode o projeto:
   ```bash
   npm run dev
   ```

## Observações

- Um modelo de certificado padrão já está aplicado como fundo do canvas.
- Certifique-se de preencher todos os campos antes de gerar o PDF para garantir que o layout final fique correto.
