import React, { useState, useEffect } from "react";
import { notification } from "antd";
import API_URL from "../../Config";
import FormularioEditarEmpleado from "./formularioeditarempleado";

const EditarUsuario = ({ empleado, onClose, user, fetchEmpleados }) => {
  const [formData, setFormData] = useState({
    nombres: empleado.nombres,
    apellidos: empleado.apellidos,
    cedula: empleado.cedula,
    correo_electronico: empleado.correo_electronico,
    fecha_nacimiento: empleado.fecha_nacimiento,
    celular: empleado.celular,
    cargo: empleado.cargo ? empleado.cargo.id_cargo : "",
    unidad: empleado.unidad ? empleado.unidad.id_unidad : "",
    estacion: empleado.estacion ? empleado.estacion.id_estacion : "",
    fecha_ingreso: empleado.fecha_ingreso,
    direccion: empleado.direccion,
    habilitado: empleado.habilitado || false,
    id_rol: empleado.id_rol,
    genero: empleado.genero,
    id_unidad: empleado.id_unidad,
    id_estacion: empleado.id_estacion,
    id_cargo: empleado.id_cargo,
    usuario: empleado.usuario,
  });

  const [cargos, setCargos] = useState([]);
  const [unidades, setUnidades] = useState([]);
  const [estaciones, setEstaciones] = useState([]);

  useEffect(() => {
    const fetchEmpleadoDetalle = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }

      try {
        const response = await fetch(
          `${API_URL}/Empleados/detalle-empleado/${user.usuario.id_usuario}/${empleado.id_empleado}/`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setFormData((prevFormData) => ({
            ...prevFormData,
            cargo: data.cargo ? data.cargo.id_cargo : "",
            id_cargo: data.cargo ? data.cargo.id_cargo : "",
            estacion: data.estacion ? data.estacion.id_estacion : "",
            id_estacion: data.estacion ? data.estacion.id_estacion : "",
            unidad: data.unidad ? data.unidad.id_unidad : "",
            id_unidad: data.unidad ? data.unidad.id_unidad : "",
            habilitado: data.habilitado || false,
          }));
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

    fetchEmpleadoDetalle();
  }, [empleado.id_empleado, user.usuario.id_usuario]);

  useEffect(() => {
    const fetchCargos = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }

      try {
        const formDataForCargos = new FormData();
        formDataForCargos.append("estacion_id", formData.estacion);
        formDataForCargos.append("unidad_id", formData.unidad);

        const response = await fetch(`${API_URL}/Estaciones/cargos/`, {
          method: "POST",
          headers: {
            Authorization: token,
          },
          body: formDataForCargos,
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

    if (formData.estacion && formData.unidad) {
      fetchCargos();
    }
  }, [formData.estacion, formData.unidad]);

  useEffect(() => {
    const fetchUnidades = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }

      try {
        const formDataForUnidades = new FormData();
        formDataForUnidades.append("estacion_id", formData.estacion);

        const response = await fetch(`${API_URL}/Estaciones/unidades/`, {
          method: "POST",
          headers: {
            Authorization: token,
          },
          body: formDataForUnidades,
        });

        if (response.ok) {
          const data = await response.json();
          setUnidades(data);

          // Verificar si la unidad actual está en la lista, sino seleccionar la primera disponible
          if (!data.find((u) => u.id_unidad === formData.unidad)) {
            setFormData((prevFormData) => ({
              ...prevFormData,
              unidad: data.length > 0 ? data[0].id_unidad : "",
            }));
          }
        } else {
          console.error("Error al obtener unidades:", response.statusText);
        }
      } catch (error) {
        console.error("Error al obtener unidades:", error.message);
      }
    };

    if (formData.estacion) {
      fetchUnidades();
    }
  }, [formData.estacion, formData.unidad]);

  useEffect(() => {
    const fetchEstaciones = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }

      try {
        const response = await fetch(`${API_URL}/Estaciones/estaciones/`, {
          headers: {
            Authorization: token,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setEstaciones(data);
        } else {
          console.error("Error al obtener estaciones:", response.statusText);
        }
      } catch (error) {
        console.error("Error al obtener estaciones:", error);
      }
    };

    fetchEstaciones();
  }, []);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue =
      type === "checkbox"
        ? checked
        : type === "select-one"
        ? JSON.parse(value)
        : value;

    console.log(`Nuevo valor de ${name}:`, newValue);

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === "habilitado" ? newValue === true : newValue,
    }));
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    try {
      const formDataForUpdate = new FormData();
      formDataForUpdate.append("numero_cedula", formData.cedula);
      formDataForUpdate.append("nombres", formData.nombres);
      formDataForUpdate.append("apellidos", formData.apellidos);
      formDataForUpdate.append("fecha_nacimiento", formData.fecha_nacimiento);
      formDataForUpdate.append("genero", formData.genero);
      formDataForUpdate.append("celular", formData.celular);
      formDataForUpdate.append("direccion", formData.direccion);
      formDataForUpdate.append(
        "correo_electronico",
        formData.correo_electronico
      );
      formDataForUpdate.append("id_cargo", formData.id_cargo);
      formDataForUpdate.append("fecha_ingreso", formData.fecha_ingreso);
      formDataForUpdate.append("habilitado", formData.habilitado ? 1 : 0); // O deja formData.habilitado si lo dejas como booleano
      formDataForUpdate.append("usuario", formData.usuario);

      const response = await fetch(
        `${API_URL}/Empleados/editar-empleado/${user.usuario.id_usuario}/${empleado.id_empleado}/`,
        {
          method: "POST",
          headers: {
            Authorization: token,
          },
          body: formDataForUpdate,
        }
      );
      if (response.ok) {
        onClose();
        fetchEmpleados(user.usuario.id_usuario);
        notification.success({
          message: "Empleado actualizado",
          description:
            "Los datos del empleado han sido actualizados correctamente.",
        });
      } else {
        console.error("Error al actualizar empleado:", response.statusText);
        notification.error({
          message: "Error al actualizar",
          description:
            "Hubo un problema al intentar actualizar los datos del empleado.",
        });
      }
    } catch (error) {
      console.error("Error al actualizar empleado:", error);
      notification.error({
        message: "Error al actualizar",
        description:
          "Hubo un problema al intentar actualizar los datos del empleado.",
      });
    }
  };

  return (
    <div>
      <button
        onClick={onClose}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Volver a la Lista
      </button>
      <h2 className="text-2xl font-bold mb-4">Editar Empleado</h2>
      <FormularioEditarEmpleado
        formData={formData}
        handleInputChange={handleInputChange}
        cargos={cargos}
        unidades={unidades}
        estaciones={estaciones}
        handleSave={handleSave}
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
  );
};

export default EditarUsuario;
