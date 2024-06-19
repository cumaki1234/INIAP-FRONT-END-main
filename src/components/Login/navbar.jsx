import React, { useState } from 'react';

const Navbar = ({ user, onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    setDropdownOpen(false); // Asegúrate de cerrar el dropdown
    onLogout(); // Ejecuta la función de logout
  };

  return (
    <nav className="p-4 flex justify-between items-center w-full fixed top-0 left-0 z-50" style={{ backgroundColor: '#169658', color: 'white' }}>
      <div className="flex items-center space-x-4">
        <div className="text-2xl font-bold">
          {user.estacion ? user.estacion.nombre_estacion : ''}
        </div>
        <div className="text-lg">
          <span className="text-gray-300">|</span> {user.nombre} {user.apellido}
        </div>
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
            'U'
          )}
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
            <div className="py-1">
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
    </nav>
  );
};

export default Navbar;
