import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import imgautorizacion from '../Modulo Administrador/res/autorizacion.png';
import Navbar from '../Login/navbar';

const MenuAdministrador = () => {
  const [user, setUser] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser.usuario);
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="min-h-screen flex">
      <Navbar user={user} onLogout={handleLogout} />
      {/* Lado Izquierdo - Unidad y Cargo del Usuario */}
      <div className="w-1/4 p-2 bg-blue-600 text-white flex flex-col justify-between items-center fixed left-0 top-0 h-full z-40">
        <div className="w-full p-2 bg-blue-600 text-white flex justify-center items-center flex-col md:fixed md:left-0 md:h-full md:z-40 md:w-1/4">
          <h2 className="text-sm font-bold mb-2">Unidad:</h2>
          <p className="text-sm">
            {user.unidades && user.unidades.length > 0
              ? user.unidades[0].nombre_unidad
              : "-"}
          </p>
          <h2 className="text-sm font-bold mt-4 mb-2">Cargo:</h2>
          <p className="text-sm">
            {user.unidades && user.unidades.length > 0
              ? user.unidades[0].cargos[0].cargo
              : "-"}
          </p>
        </div>

        <div className="relative">
          <button
            className="flex items-center justify-center w-10 h-10 bg-gray-200 text-gray-800 rounded-full"
            onClick={toggleDropdown}
          >
            {user.nombre && user.apellido ? (
              <>
                {user.nombre.charAt(0)}
                {user.apellido.charAt(0)}
              </>
            ) : (
              "U"
            )}
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
              <div className="py-1">
                <button
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                  onClick={() => alert("Perfil")}
                >
                  Perfil
                </button>
                <button
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                  onClick={handleLogout}
                >
                  Cerrar Sesión
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lado Derecho - Contenido del Menú */}
      <div className="w-3/4 p-4 ml-auto mt-16">
        <div className="flex flex-wrap justify-center">
          <div className="w-full md:w-1/3 p-4 mb-4">
            <div className="bg-white rounded-lg shadow-lg p-4 text-center">
              <div className="mb-4">
                <img
                  src={imgautorizacion}
                  alt="Autorización"
                  className="w-16 h-16 mx-auto"
                />
              </div>
              <h1 className="text-xl font-bold mb-4">
                Gestión de Autorización
              </h1>
            </div>
          </div>
          <div className="w-full md:w-1/3 p-4 mb-4">
            <div className="bg-white rounded-lg shadow-lg p-4 text-center">
              <div className="mb-4">
                <img
                  src={imgautorizacion}
                  alt="Autorización"
                  className="w-16 h-16 mx-auto"
                />
              </div>
              <h1 className="text-xl font-bold mb-4">Otra tarjeta</h1>
            </div>
          </div>

          {/* Tarjeta 3 */}
          <div className="w-full md:w-1/3 p-4 mb-4">
            <div className="bg-white rounded-lg shadow-lg p-4 text-center">
              <div className="mb-4">
                <img
                  src={imgautorizacion}
                  alt="Autorización"
                  className="w-16 h-16 mx-auto"
                />
              </div>
              <h1 className="text-xl font-bold mb-4">Otra tarjeta más</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuAdministrador;
