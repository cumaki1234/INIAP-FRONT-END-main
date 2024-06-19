import React, { useState, useEffect } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import API_URL from '../../Config';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }, []);

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append('usuario', values.username);
      formData.append('contrasenia', values.password);

      const response = await fetch(`${API_URL}/Login/iniciar_sesion/`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log('Respuesta del servidor:', data);

      if (response.ok) {
        const { token, id_usuario } = data;
        localStorage.setItem('token', token);

        await obtenerUsuario(id_usuario, token);
      } else {
        console.error('Error en inicio de sesión:', data.mensaje);
        notification.error({
          message: 'Error en inicio de sesión',
          description: data.mensaje,
        });
      }
    } catch (error) {
      console.error('Error en la solicitud de inicio de sesión:', error);
    }
  };

  const obtenerUsuario = async (idUsuario, token) => {
    try {
      const response = await fetch(`${API_URL}/Login/obtener_usuario/${idUsuario}/`, {
        method: 'GET',
        headers: {
          Authorization: `${token}`,
        },
      });

      const userData = await response.json();
      console.log('Datos del usuario:', userData);

      if (response.ok) {
        onLogin(userData);
        localStorage.setItem('user', JSON.stringify(userData));

        if (userData.usuario.rol === 'Empleado') {
          navigate('/menu-empleados');
        } else if (userData.usuario.rol === 'Administrador') {
          navigate('/menu-administrador');
        } else if (userData.usuario.rol === 'SuperUsuario') {
          navigate('/menu-superusuario');
        }
      } else {
        console.error('Error al obtener usuario:', userData.mensaje);
      }
    } catch (error) {
      console.error('Error en la solicitud de obtener usuario:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold" style={{ color: '#169658' }}>Instituto Nacional de Investigaciones Agropecuarias</h1>
      </div>
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
        <Form
          name="loginForm"
          initialValues={{ remember: true }}
          onFinish={handleSubmit}
          className="space-y-6"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Por favor, ingresa tu usuario' }]}
          >
            <Input
              id="username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Usuario"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Por favor, ingresa tu contraseña' }]}
          >
            <Input.Password
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
            >
              Iniciar sesión
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
