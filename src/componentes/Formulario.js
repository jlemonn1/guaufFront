import React, { useState } from 'react';
import '../App.css'; // Asegúrate de importar el CSS
import logo from './assets/logo.png'; // Importa el logo SVG

const Formulario = ({ formData, handleInputChange, handleSubmit, isRegistered }) => {
    const [selectedImage, setSelectedImage] = useState(null); // Estado para la imagen seleccionada
    const [showWhatsApp, setShowWhatsApp] = useState(!!formData.numero); // Estado para mostrar WhatsApp si ya hay número

    // Función para manejar el clic en el botón de "Agregar Imagen"
    const handleImageUploadClick = () => {
        document.getElementById('file-input').click();
    };

    // Maneja el cambio en el input de archivo
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl); // Guarda la URL de la imagen seleccionada
            handleInputChange(event); // Llama a tu función de manejo de cambios
        }
    };

    // Maneja el cambio del campo de número de contacto
    const handleNumeroChange = (event) => {
        handleInputChange(event); // Actualiza el valor en formData
        const numeroValue = event.target.value;

        if (numeroValue) {
            setShowWhatsApp(true); // Muestra el campo de WhatsApp si hay número
        } else {
            setShowWhatsApp(false); // Oculta el campo de WhatsApp si no hay número
            handleInputChange({ // Asegura que el valor de WhatsApp sea false
                target: {
                    name: 'whatsapp',
                    value: false
                }
            });
        }
    };

    // Nueva versión de handleInputChange para el checkbox
    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        handleInputChange({
            target: {
                name,
                value: checked, // Pasa el valor del checkbox como true o false
            }
        });
    };

    return (
        <div className="container">
            <img src={logo} alt="Logo" className="logo" />
            <h2>{isRegistered ? "Actualizar Datos" : "Registrar Mascota"}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre de la Mascota:</label>
                    <input
                        type="text"
                        name="nombreMascota"
                        value={formData.nombreMascota}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Raza:</label>
                    <input
                        type="text"
                        name="raza"
                        value={formData.raza}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Información de la Mascota:</label>
                    <textarea
                        name="infoMascota"
                        value={formData.infoMascota}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Nombre del Dueño:</label>
                    <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Número de Contacto:</label>
                    <input
                        type="text"
                        name="numero"
                        value={formData.numero}
                        onChange={handleNumeroChange} // Usa la función de manejo de número
                    />
                </div>
                {/* Mostrar el campo de WhatsApp si hay un número de contacto */}
                {showWhatsApp && (
                    <div className="whatsapp-field">
                        <label>
                            ¿Tienes WhatsApp? 
                            <input
                                type="checkbox"
                                name="whatsapp"
                                checked={!!formData.whatsapp} // Asegura que sea booleano
                                onChange={handleCheckboxChange} // Usa la nueva función de cambio de checkbox
                            />
                        </label>
                    </div>
                )}
                <div>
                    <label>Dirección:</label>
                    <input
                        type="text"
                        name="direccion"
                        value={formData.direccion}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Información del Dueño:</label>
                    <textarea
                        name="infoDueno"
                        value={formData.infoDueno}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="image-upload">
                    <input
                        type="file"
                        id="file-input" // Usar un ID para poder acceder al input
                        name="foto"
                        accept="image/*" // Solo permite imágenes
                        onChange={handleFileChange} // Usa la nueva función de manejo de archivos
                        style={{ display: 'none' }} // Oculta el input
                    />
                    <button type="button" className="custom-button" onClick={handleImageUploadClick}>
                        Añadir Imagen
                    </button>
                    {selectedImage && ( // Muestra la imagen en miniatura si está seleccionada
                        <img src={selectedImage} alt="Miniatura" />
                    )}
                </div>

                <button type="submit">
                    {isRegistered ? "Actualizar" : "Guardar"}
                </button>
            </form>
        </div>
    );
};

export default Formulario;
