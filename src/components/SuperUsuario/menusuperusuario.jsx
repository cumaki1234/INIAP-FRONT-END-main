import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Login/navbar';
import LeftMenu from './lateralizquierdo';
import GestionEmpleados from './gestionempleados';

const MenuSuperUsuario = () => {
  const [user, setUser] = useState({});
  const [view, setView] = useState('home');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser.usuario);
    } else {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleNavigate = (view) => {
    setView(view);
  };

  return (
    <div className="min-h-screen flex">
      <Navbar user={user} onLogout={handleLogout} />
      <LeftMenu user={user} onNavigate={handleNavigate} />
      <div className="w-3/4 p-4 ml-auto mt-16">
        {view === 'home' && (
          <div className="flex justify-center items-center">
            <h1 className="text-3xl">Bienvenido Super Usuario</h1>
          </div>
        )}
        {view === 'gestion-empleados' && <GestionEmpleados />}
      </div>
    </div>
  );
};

export default MenuSuperUsuario;
