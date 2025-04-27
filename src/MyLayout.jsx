// src/MyLayout.jsx
import React from 'react';
import { Layout } from 'react-admin';
import { Box } from '@mui/material';

const MyLayout = (props) => (
  <Layout {...props}>
    <Box
      component="main"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        width: '100%', // Garantir que ocupa 100% da largura
        maxWidth: '100vw', // Evita ultrapassar a tela
        overflowX: 'hidden', // Impede a barra de rolagem horizontal
      }}
    >
      {props.children}
    </Box>
  </Layout>
);

export default MyLayout;
