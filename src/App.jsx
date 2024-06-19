import React, { useState, useEffect, useLayoutEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import LoginForm from './components/Login/login';
import MenuEmpleados from './components/Modulo Empleado/menuempleado';
import MenuAdministrador from './components/Modulo Administrador/menuadministrador';
import MenuSuperUsuario from './components/SuperUsuario/menusuperusuario';
import PrivateRoute from './components/Login/rutaprivada';
import Navbar from './components/Login/navbar';
import GestionEmpleados from './components/SuperUsuario/gestionempleados';

const AppContent = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser).usuario);
    } else {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      setUser(null);
    }
  }, [navigate]);

  const handleLogin = (userData) => {
    setUser(userData.usuario);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {user ? <Navbar user={user} onLogout={handleLogout} /> : null}
      <Routes>
        <Route path="/" element={<LoginForm onLogin={handleLogin} />} />
        <Route path="/menu-empleados" element={
          <PrivateRoute requiredRole="Empleado">
            <MenuEmpleados />
          </PrivateRoute>
        } />
        <Route path="/menu-administrador" element={
          <PrivateRoute requiredRole="Administrador">
            <MenuAdministrador />
          </PrivateRoute>
        } />
        <Route path="/menu-superusuario" element={
          <PrivateRoute requiredRole="SuperUsuario">
            <MenuSuperUsuario />
          </PrivateRoute>
        } />
        <Route path="/gestion-empleados" element={<GestionEmpleados />} /> {/* Ruta para GestionEmpleados */}
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
