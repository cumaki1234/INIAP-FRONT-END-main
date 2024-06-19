import React from "react";

const FormularioEmpleado = ({ formData, handleInputChange, cargos, roles, estaciones, unidades }) => {
  return (
    <form id="employeeForm" className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold mb-4">Datos del Usuario</h3>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Número de Cédula
            </label>
            <input
              type="text"
              name="numero_cedula"
              value={formData.numero_cedula}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombres
            </label>
            <input
              type="text"
              name="nombres"
              value={formData.nombres}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Apellidos
            </label>
            <input
              type="text"
              name="apellidos"
              value={formData.apellidos}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Fecha de Nacimiento
            </label>
            <input
              type="date"
              name="fecha_nacimiento"
              value={formData.fecha_nacimiento}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Género
            </label>
            <select
              name="genero"
              value={formData.genero}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            >
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Celular
            </label>
            <input
              type="text"
              name="celular"
              value={formData.celular}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="col-span-3">
            <label className="block text-sm font-medium text-gray-700">
              Dirección
            </label>
            <input
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="col-span-3">
            <label className="block text-sm font-medium text-gray-700">
              Correo Electrónico
            </label>
            <input
              type="email"
              name="correo_electronico"
              value={formData.correo_electronico}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Estación
        </label>
        <select
          name="id_estacion"
          value={formData.id_estacion}
          onChange={handleInputChange}
          className="mt-1 p-2 border border-gray-300 rounded w-full"
        >
          {estaciones.map((estacion) => (
            <option key={estacion.id_estacion} value={estacion.id_estacion}>
              {estacion.nombre_estacion}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Unidad
        </label>
        <select
          name="id_unidad"
          value={formData.id_unidad}
          onChange={handleInputChange}
          className="mt-1 p-2 border border-gray-300 rounded w-full"
        >
          {unidades.map((unidad) => (
            <option key={unidad.id_unidad} value={unidad.id_unidad}>
              {unidad.nombre_unidad}
            </option>
          ))}
        </select>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-4">Datos de la Empresa</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Cargo
            </label>
            <select
              name="id_cargo"
              value={formData.id_cargo}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            >
              {cargos.map((cargo) => (
                <option key={cargo.id_cargo} value={cargo.id_cargo}>
                  {cargo.cargo}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Fecha de Ingreso
            </label>
            <input
              type="date"
              name="fecha_ingreso"
              value={formData.fecha_ingreso}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Habilitado
            </label>
            <select
              name="habilitado"
              value={formData.habilitado}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            >
              <option value="1">Sí</option>
              <option value="0">No</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Usuario
            </label>
            <input
              type="text"
              name="usuario"
              value={formData.usuario}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="col-span-3">
            <label className="block text-sm font-medium text-gray-700">
              Rol
            </label>
            <select
              name="id_rol"
              value={formData.id_rol}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            >
              {roles.map((rol) => (
                <option key={rol.id_rol} value={rol.id_rol}>
                  {rol.rol}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </form>
  );
};

export default FormularioEmpleado;
