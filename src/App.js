import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useParams, useNavigate } from 'react-router-dom';
import Formulario from './componentes/Formulario';
import Datos from './componentes/Datos';
import GuaufInfoCard from './componentes/GuaufInfoCard';
import { Circles } from 'react-loader-spinner'; // Importar el spinner
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Main />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(true);
  const [placa, setPlaca] = useState('');
  const [perfil, setPerfil] = useState(null);

  const handleClose = () => {
    setVisible(false); // Oculta la tarjeta de bienvenida
  };

  const handleInputChange = (e) => {
    setPlaca(e.target.value);
  };

  const handleNavigate = () => {


    placa ? navigate(`/${placa}`) : alert("Introduce un valor");
  };

  return (
    <div className="home-container">
      {visible && (
        <div className="guauf-info-card">
          <div className="card-content">
            <h2>¡Bienvenido a Guauf! 🐾</h2>
            <p>Estás a punto de crear el perfil de tu fiel compañero peludo. Aquí podrás rellenar los datos que quieras que se muestren cuando alguien escanee el código QR de tu mascota.</p>
            <p>Es muy simple: solo completa los campos que consideres importantes. ¡No te preocupes! Solo se verá lo que tú decidas. Nombre, raza, dirección, o si tu perro prefiere las croquetas de pollo... ¡Tú eliges!</p>
            <p>Es como la tarjeta de presentación de tu mascota, para que siempre pueda estar identificada de la mejor manera posible. 🐶</p>
            <p>¿Aún no tienes una placa? Consíguela en nuestro sitio web: <a href="https://dominio3d.me" target="_blank" rel="noopener noreferrer">dominio3d.me</a>.</p>
            <button className="close-btn" onClick={handleClose}>Cerrar</button>
          </div>
        </div>
      )}

      <div className="placa-input-container">
        <h2>¿Tienes una placa? 🚀</h2>
        <p>Ingresa el número de la placa de tu mascota para ver su información:</p>
        <div className="input-wrapper">
          <input
            type="number"
            value={placa}
            onChange={handleInputChange}
            placeholder="Ingresa el número de placa"
            className="placa-input"
          />
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
            <button onClick={handleNavigate} className="go-btn">Buscar</button>
            <button onClick={() => setVisible(true)} className="go-btn">Info</button>
          </div>
        </div>
      </div>

    </div>
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
        const response = await fetch(`https://guauf.es/api/datos/${id}`);
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
      const response = await fetch(`https://guauf.es/api/datos/actualizar/${id}`, {
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
