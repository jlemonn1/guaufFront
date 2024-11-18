import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import Formulario from './componentes/Formulario';
import Datos from './componentes/Datos';
import GuaufInfoCard from './componentes/GuaufInfoCard';
import { Circles } from 'react-loader-spinner'; // Importar el spinner
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/:id" element={<Main />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

const ErrorPage = () => {
  return <div>Página no encontrada. Verifica la URL.</div>;
};

const Main = () => {
  const { id } = useParams();
  const [registrado, setRegistrado] = useState(null);
  const [datos, setDatos] = useState(null);
  const [formData, setFormData] = useState({
    nombreMascota: '',
    raza: '',
    infoMascota: '',
    nombre: '',
    numero: '',
    direccion: '',
    infoDueno: '',
    foto: null,
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false); // Nuevo estado para manejar la carga

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const response = await fetch(`https://guauf.ddns.net/api/datos/${id}`);
        if (response.ok) {
          const data = await response.json();
          setDatos(data);
          setRegistrado(data.registrado);
          if (!data.registrado) {
            setFormData({
              nombreMascota: data.nombreMascota || '',
              raza: data.raza || '',
              infoMascota: data.infoMascota || '',
              nombre: data.nombre || '',
              numero: data.numero || '',
              direccion: data.direccion || '',
              infoDueno: data.infoDueno || '',
              foto: null,
            });
          }
        } else if (response.status === 404) {
          setError('Mascota no encontrada :(');
        } else {
          setError('Error al cargar los datos');
        }
      } catch (error) {
        setError('Error al conectar con el servidor');
      }
    };

    fetchDatos();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'foto') {
      setFormData((prevFormData) => ({
        ...prevFormData,
        foto: files[0],
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    setLoading(true); // Mostrar spinner al iniciar la carga

    try {
      const response = await fetch(`https://guauf.ddns.net/api/datos/actualizar/${id}`, {
        method: 'PUT',
        body: formDataToSend,
      });

      setLoading(false); // Ocultar spinner al finalizar la carga

      if (response.ok) {
        const data = await response.json();
        console.log('Datos actualizados correctamente:', data);
        setSuccess(true);

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else if (response.status === 403) {
        setError('No se puede actualizar, el registro ya está registrado.');
      } else {
        setError('Error al actualizar los datos.');
      }
    } catch (error) {
      setLoading(false); // Asegurarse de ocultar el spinner en caso de error
      setError('Error en la solicitud.');
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (registrado === null) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      {!registrado && <GuaufInfoCard />}
      {registrado ? (
        <Datos datos={datos} />
      ) : (
        <Formulario
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isRegistered={registrado}
        />
      )}
      {loading && (
        <div className="spinner-container">
          <Circles color="#00BFFF" height={80} width={80} />
        </div>
      )}
      {success && (
        <div className="success-message">
          <span role="img" aria-label="tick" className="tick">✅</span>
        </div>
      )}
    </>
  );
};

export default App;
