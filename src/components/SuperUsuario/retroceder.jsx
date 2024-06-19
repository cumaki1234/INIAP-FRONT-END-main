import React from 'react';
import { FiUsers } from 'react-icons/fi';

const LeftMenu = ({ user, onNavigate }) => {
  if (!user || !user.unidades || user.unidades.length === 0) {
    return null;
  }

  return (
    <div className="w-16 md:w-1/6 p-4 text-white flex flex-col justify-start items-center fixed left-0 top-0 h-full z-40 bg-[#169658]">
      <div className="flex flex-col items-center space-y-6 mt-20 w-full">
        <button 
          onClick={() => onNavigate('gestion-empleados')} 
          className="flex items-center w-full focus:outline-none hover:bg-[#0d4b34] p-2 rounded transition duration-200 ease-in-out"
        >
          <FiUsers className="w-8 h-8 text-white mx-4" />
          <span className="text-white text-sm hidden md:inline">Gestión de Empleados</span>
        </button>
      </div>
    </div>
  );
};

export default LeftMenu;
