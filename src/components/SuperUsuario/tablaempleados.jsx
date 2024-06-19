import React from 'react';

const TablaEmpleados = ({ empleados, handleEditEmpleado }) => {
  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Nombres</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Apellidos</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Cédula</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Usuario</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Cargo</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Unidad</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Estación</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleados.map((empleado, index) => {
            return (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-sm text-gray-600">{empleado.nombres}</td>
                <td className="px-4 py-2 text-sm text-gray-600">{empleado.apellidos}</td>
                <td className="px-4 py-2 text-sm text-gray-600">{empleado.cedula}</td>
                <td className="px-4 py-2 text-sm text-gray-600">{empleado.usuario}</td>
                <td className="px-4 py-2 text-sm text-gray-600">{empleado.cargo}</td>
                <td className="px-4 py-2 text-sm text-gray-600">{empleado.nombre_unidad}</td>
                <td className="px-4 py-2 text-sm text-gray-600">{empleado.nombre_estacion}</td>
                <td className="px-4 py-2 text-sm text-gray-600">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                    onClick={() => handleEditEmpleado(empleado)}
                  >
                    Editar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TablaEmpleados;
