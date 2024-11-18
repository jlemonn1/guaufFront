import React, { useState } from 'react';
import '../App.css'; // Asegúrate de crear el archivo CSS para este componente

const GuaufInfoCard = () => {
    const [visible, setVisible] = useState(true);

    const handleClose = () => {
        setVisible(false); // Oculta la tarjeta cuando se hace clic en cerrar
    };

    if (!visible) return null; // Si está oculto, no muestra la tarjeta

    return (
        <div className="guauf-info-card">
            <div className="card-content">
                <h2>¡Bienvenido a Guauf! 🐾</h2>
                <p>Estás a punto de crear el perfil de tu fiel compañero peludo. Aquí podrás rellenar los datos que quieras que se muestren cuando alguien escanee el código QR de tu mascota.</p>

                <p>Es muy simple: solo completa los campos que consideres importantes. ¡No te preocupes! Solo se verá lo que tú decidas. Nombre, raza, dirección, o si tu perro prefiere las croquetas de pollo... ¡Tú eliges!</p>

                <p>Es como la tarjeta de presentación de tu mascota, para que siempre pueda estar identificada de la mejor manera posible. 🐶</p>
                <button className="close-btn" onClick={handleClose}>Cerrar</button>
            </div>
        </div>
    );
};

export default GuaufInfoCard;
