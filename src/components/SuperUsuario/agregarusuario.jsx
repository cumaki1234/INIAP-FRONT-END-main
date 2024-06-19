import React, { useState, useEffect } from "react";
import API_URL from "../../Config";
import { notification } from "antd";
import FormularioEmpleado from "./formularioempleado";

const AgregarEmpleados = (props) => {
  const { onClose, user } = props;
  const [roles, setRoles] = useState([]);
  const [estaciones, setEstaciones] = useState([]);
  const [unidades, setUnidades] = useState([]);
  const [cargos, setCargos] = useState([]);
  const [formData, setFormData] = useState({
    id_estacion: "",
    id_unidad: "",
    numero_cedula: "",
    nombres: "",
    apellidos: "",
    fecha_nacimiento: "",
    genero: "",
    celular: "",
    direccion: "",
    correo_electronico: "",
    id_cargo: "",
    fecha_ingreso: "",
    habilitado: "1",
    id_rol: ""
  });

  useEffect(() => {
    fetchEstaciones();
    fetchRoles();
  }, []);

  useEffect(() => {
    if (formData.id_estacion) {
      fetchUnidades(formData.id_estacion);
    }
  }, [formData.id_estacion]);

  useEffect(() => {
    if (formData.id_estacion && formData.id_unidad) {
      fetchCargos(formData.id_estacion, formData.id_unidad);
    }
  }, [formData.id_estacion, formData.id_unidad]);

  const fetchEstaciones = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found");
        return;
      }

      const response = await fetch(`${API_URL}/Estaciones/estaciones/`, {
        headers: {
          Authorization: `${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setEstaciones(data);

        if (data.length > 0) {
          setFormData((prevData) => ({
            ...prevData,
            id_estacion: data[0].id_estacion
          }));
          fetchUnidades(data[0].id_estacion);
        }
      } else {
        console.error("Error:", response.statusText);
        notification.error({
          message: "Error",
          description: "Error al obtener las estaciones",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      notification.error({
        message: "Error",
        description: "Error al obtener las estaciones",
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (name === "id_estacion") {
      fetchUnidades(value);
    } else if (name === "id_unidad") {
      fetchCargos(formData.id_estacion, value);
    }
  };

  const fetchUnidades = async (estacionId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found");
        return;
      }

      const formData = new FormData();
      formData.append('estacion_id', estacionId);

      const response = await fetch(`${API_URL}/Estaciones/unidades/`, {
        method: 'POST',
        headers: {
          Authorization: `${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setUnidades(data);

        if (data.length > 0) {
          setFormData((prevData) => ({
            ...prevData,
            id_unidad: data[0].id_unidad
          }));
          fetchCargos(estacionId, data[0].id_unidad);
        }
      } else {
        console.error("Error:", response.statusText);
        notification.error({
          message: "Error",
          description: "Error al obtener las unidades",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      notification.error({
        message: "Error",
        description: "Error al obtener las unidades",
      });
    }
  };

  const fetchCargos = async (estacionId, unidadId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found");
        return;
      }

      const formData = new FormData();
      formData.append('estacion_id', estacionId);
      formData.append('unidad_id', unidadId);

      const response = await fetch(`${API_URL}/Estaciones/cargos/`, {
        method: 'POST',
        headers: {
          Authorization: `${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setCargos(data);
      } else {
        console.error("Error:", response.statusText);
        notification.error({
          message: "Error",
          description: "Error al obtener los cargos",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      notification.error({
        message: "Error",
        description: "Error al obtener los cargos",
      });
    }
  };

  const fetchRoles = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found");
        return;
      }

      const response = await fetch(`${API_URL}/Roles/roles/`, {
        headers: {
          Authorization: `${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setRoles(data.roles);
      } else {
        console.error("Error:", response.statusText);
        notification.error({
          message: "Error",
          description: "Error al obtener los roles",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      notification.error({
        message: "Error",
        description: "Error al obtener los roles",
      });
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found");
        return;
      }

      const formDataToSend = new FormData(
        document.getElementById("employeeForm")
      );

      const response = await fetch(
        `${API_URL}/Empleados/nuevo-empleado/${user.usuario.id_usuario}/`,
        {
          method: "POST",
          headers: {
            Authorization: `${token}`,
          },
          body: formDataToSend,
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        onClose();
        notification.success({
          message: "Éxito",
          description: "Empleado agregado exitosamente",
        });
      } else {
        console.error("Error:", response.statusText);
        notification.error({
          message: "Error",
          description: "Error al agregar el empleado",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      notification.error({
        message: "Error",
        description: "Error al agregar el empleado",
      });
    }
  };

  return (
    <div className="w-full flex justify-center">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-5xl">
        <button
          onClick={onClose}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Volver a la Lista
        </button>
        <h2 className="text-2xl font-bold mb-4">Agregar Empleado</h2>
        <FormularioEmpleado
          formData={formData}
          handleInputChange={handleInputChange}
          cargos={cargos}
          roles={roles}
          estaciones={estaciones}
          unidades={unidades}
        />
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgregarEmpleados;
