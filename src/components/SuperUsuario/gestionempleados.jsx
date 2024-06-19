import React, { useState, useEffect } from "react";
import API_URL from "../../Config";
import AgregarEmpleados from "./agregarusuario";
import TablaEmpleados from "./tablaempleados";
import EditarUsuario from "./editarusuario";

const GestionEmpleados = () => {
  const [empleados, setEmpleados] = useState([]);
  const [filteredEmpleados, setFilteredEmpleados] = useState([]);
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedEmpleado, setSelectedEmpleado] = useState(null);
  const [cargos, setCargos] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      fetchEmpleados(storedUser.usuario.id_usuario);
      fetchCargos();
    }
  }, []);

  const fetchEmpleados = async (id_usuario) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/Empleados/lista-empleados/${id_usuario}/`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        const formattedData = data.map((empleado) => ({
          ...empleado,
          numero_cedula: empleado.cedula,
          fecha_nacimiento: empleado.fecha_nacimiento,
          celular: empleado.celular || "",
          direccion: empleado.direccion || "",
          correo_electronico: empleado.correo_electronico || "",
          cargo: empleado.cargo || "",
          fecha_ingreso: empleado.fecha_ingreso || "",
          habilitado: empleado.habilitado || "",
          usuario: empleado.usuario || "",
        }));
        setEmpleados(formattedData);
        setFilteredEmpleados(formattedData);
      } else {
        console.error("Error al obtener empleados:", response.statusText);
      }
    } catch (error) {
      console.error("Error al obtener empleados:", error);
    }
  };

  const fetchCargos = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/Estaciones/cargoseditar/`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setCargos(data);
      } else {
        console.error("Error al obtener cargos:", response.statusText);
      }
    } catch (error) {
      console.error("Error al obtener cargos:", error);
    }
  };

  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(event.target.value);

    const filtered = empleados.filter((empleado) => {
      const fullName = `${empleado.nombres.toLowerCase()} ${empleado.apellidos.toLowerCase()}`;
      const cedula = empleado.cedula.toLowerCase();
      return fullName.includes(searchValue) || cedula.includes(searchValue);
    });

    setFilteredEmpleados(filtered);
    setCurrentPage(1);
  };

  const handleClear = () => {
    setSearchTerm("");
    setFilteredEmpleados(empleados);
    setCurrentPage(1);
  };

  const handleEditEmpleado = async (empleado) => {
    setSelectedEmpleado(empleado);

    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/Empleados/detalle-empleado/${user.usuario.id_usuario}/${empleado.id_empleado}/`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setSelectedEmpleado({
          ...empleado,
          ...data,
        });
      } else {
        console.error(
          "Error al obtener detalle de empleado:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error al obtener detalle de empleado:", error);
    }
  };

  const handleCloseEditForm = () => {
    setSelectedEmpleado(null);
  };

  const handleAddEmpleado = () => {
    setIsAdding(true);
  };

  const handleCloseAddForm = () => {
    setIsAdding(false);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredEmpleados.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredEmpleados.length / itemsPerPage);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex-grow flex flex-col items-center p-4 pt-20 md:ml-1/6">
      <h1 className="text-2xl font-light mb-4">Hola {user?.usuario?.rol}</h1>
      {selectedEmpleado ? (
        <EditarUsuario
          empleado={selectedEmpleado}
          onClose={handleCloseEditForm}
          user={user}
          fetchEmpleados={fetchEmpleados}
        />
      ) : isAdding ? (
        <AgregarEmpleados
          onClose={handleCloseAddForm}
          cargos={cargos}
          user={user}
          fetchEmpleados={fetchEmpleados} // Pasamos la función fetchEmpleados para actualizar la lista después de agregar
        />
      ) : (
        <>
          {/* Búsqueda y botones de acción */}
          <div className="w-full flex flex-col md:flex-row md:items-center mb-4 space-y-2 md:space-y-0 md:space-x-2">
            <input
              type="text"
              placeholder="Buscar por nombres, apellidos o cédula"
              value={searchTerm}
              onChange={handleSearch}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow"
            />
            <button
              className="p-2 bg-blue-500 text-white hover:bg-blue-600 focus:outline-none rounded"
              onClick={handleClear}
              style={{ minWidth: "80px" }}
            >
              Limpiar
            </button>
            <button
              className="p-2 bg-blue-500 text-white hover:bg-blue-600 focus:outline-none rounded"
              onClick={handleAddEmpleado}
              style={{ minWidth: "200px" }}
            >
              Agregar Empleado
            </button>
          </div>

          {/* Tabla de empleados */}
          <TablaEmpleados
            empleados={currentItems}
            handleEditEmpleado={handleEditEmpleado}
          />

          {/* Paginación */}
          <div className="flex justify-center mt-4 space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handleClick(index + 1)}
                className={`px-3 py-1 border rounded ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-white text-blue-500"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default GestionEmpleados;
