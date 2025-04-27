// src/MyMenu.jsx
import React from 'react';
import { Menu, MenuItemLink, useSidebarState } from 'react-admin';
import PeopleIcon from '@mui/icons-material/People';
import DescriptionIcon from '@mui/icons-material/Description';
import VerifiedIcon from '@mui/icons-material/Verified';
import SchoolIcon from '@mui/icons-material/School';

const MyMenu = ({ onMenuClick, dense }) => {
  // O useSidebarState permite reagir à abertura/fechamento da sidebar
  const [open] = useSidebarState();
  return (
    <Menu>
      <MenuItemLink
        to="/alunos"
        primaryText="Alunos"
        leftIcon={<PeopleIcon />}
        onClick={onMenuClick}
        dense={dense}
      />
      <MenuItemLink
        to="/modelos"
        primaryText="Modelos"
        leftIcon={<DescriptionIcon />}
        onClick={onMenuClick}
        dense={dense}
      />
      <MenuItemLink
        to="/certificados-gerados"
        primaryText="Certificados Gerados"
        leftIcon={<VerifiedIcon />}
        onClick={onMenuClick}
        dense={dense}
      />
      <MenuItemLink
        to="/cursos-turmas"
        primaryText="Cursos/Turmas"
        leftIcon={<SchoolIcon />}
        onClick={onMenuClick}
        dense={dense}
      />
    </Menu>
  );
};

export default MyMenu;
