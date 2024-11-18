import React from 'react';
import '../App.css'; // Asegúrate de importar el CSS
import logo from './assets/logo.png'; // Importa el logo SVG
import { FaWhatsapp } from 'react-icons/fa'; // Importa el ícono de WhatsApp
import { FaPhone } from 'react-icons/fa'; // Importa el ícono de Teléfono

const Datos = ({ datos }) => {
    // Función para generar el enlace de WhatsApp
    const generateWhatsAppLink = (numero) => {
        const mensaje = encodeURIComponent(`Hola, estoy con ${datos.nombreMascota}, que podemos hacer!`); // Mensaje predefinido
        return `https://wa.me/${numero}?text=${mensaje}`;
    };

    return (
        <div className="container" style={{ fontFamily: "'Comic Sans', cursive", paddingBottom: '400px' }}>
            <img src={logo} alt="Logo" className="logo" />
            <h2>Detalles de la Mascota</h2>

            {datos.foto && ( // Muestra la imagen si existe
                <div className="img-container">
                    <img 
                        src={`data:image/jpeg;base64,${datos.foto}`} // Asegúrate de que la imagen esté en base64
                        alt="Foto de la Mascota"
                        className="datos-imagen" // Aplica la clase para estilos
                        style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'cover' }} // Estilos para la imagen
                    />
                </div>
            )}
            {datos.nombreMascota && (
                <p style={{ fontSize: '17px' }}><strong>Nombre de la Mascota:</strong> {datos.nombreMascota}</p>
            )}
            {datos.raza && (
                <p style={{ fontSize: '17px' }}><strong>Raza:</strong> {datos.raza}</p>
            )}
            {datos.infoMascota && (
                <p style={{ fontSize: '17px' }}><strong>Inf de la Mascota:</strong> {datos.infoMascota}</p>
            )}
            {datos.nombre && (
                <p style={{ fontSize: '17px' }}><strong>Nombre del Dueño:</strong> {datos.nombre}</p>
            )}
            {datos.numero && (
                <p style={{ fontSize: '17px' }}><strong>Número de Contacto:</strong> {datos.numero}</p>
            )}
            {datos.direccion && (
                <p style={{ fontSize: '17px' }}><strong>Dirección:</strong> {datos.direccion}</p>
            )}
            {datos.infoDueno && (
                <p style={{ fontSize: '17px' }}><strong>Inf del Dueño:</strong> {datos.infoDueno}</p>
            )}

            {/* Contenedor para los botones de WhatsApp y Llamar */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                {/* Botón de WhatsApp solo si whatsapp es true */}
                {datos.whatsapp && (
                    <a 
                        href={generateWhatsAppLink(datos.numero)} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        style={{ textDecoration: 'none', marginRight: '10px' }} // Espacio entre botones
                    >
                        <button className="whatsapp-button">
                            <FaWhatsapp style={{ marginRight: '8px' }} />
                            WhatsApp
                        </button>
                    </a>
                )}

                {/* Botón de Llamar solo si hay un número de contacto */}
                {datos.numero && (
                    <a 
                        href={`tel:+34${datos.numero}`} // Agrega el prefijo +34 para España
                        style={{ textDecoration: 'none' }} // Sin subrayado
                    >
                        <button className="call-button">
                            <FaPhone style={{ marginRight: '8px' }} />
                            Llamar
                        </button>
                    </a>
                )}
            </div>
        </div>
    );
};

export default Datos;
