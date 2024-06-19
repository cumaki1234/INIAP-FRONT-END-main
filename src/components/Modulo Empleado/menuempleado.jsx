import React from 'react';
import { useNavigate } from 'react-router-dom';

const MenuEmpleados = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div>
      
    </div>
  );
}

export default MenuEmpleados;