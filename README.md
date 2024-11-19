# Guauf! - Frontend 🐾

  

Este es el frontend de **Guauf!**, una aplicación diseñada para registrar mascotas y permitir que sus datos sean accesibles mediante un código QR único. Aquí puedes rellenar los datos que quieras sobre tu mascota y asegurarte de que esté identificada de la mejor manera posible.

  

## 🚀 Funcionalidades

  

-  **Pantalla de bienvenida**: Un mensaje introductorio con información sobre cómo usar la aplicación.

-  **Búsqueda por número de placa**: Introduce el número de placa para buscar la información asociada a tu mascota.

-  **Formulario dinámico**: Completa los datos de tu mascota si la placa no está registrada.

-  **Visualización de datos**: Si la placa ya está registrada, muestra la información correspondiente.

-  **Spinner de carga**: Indica visualmente cuando la aplicación está procesando una acción.

-  **Notificaciones de éxito y error**: Muestra mensajes claros sobre el estado de las acciones realizadas.

  

---

  

## 🛠️ Tecnologías utilizadas

  

-  [React](https://reactjs.org/) - Framework de JavaScript para interfaces de usuario.

-  [React Router](https://reactrouter.com/) - Manejo de rutas en la aplicación.

-  [React Loader Spinner](https://mhnpd.github.io/react-loader-spinner/) - Componente de spinner para indicar estado de carga.

-  [CSS personalizado](./App.css) - Estilización específica para el proyecto.

  

---

  

## 📂 Estructura del proyecto

```bash
src/ 
├── componentes/   
│   ├── Formulario.js # Formulario para completar datos de la mascota │ 
│   ├── Datos.js # Componente para mostrar los datos de la mascota 
│   ├── GuaufInfoCard.js # Tarjeta informativa inicial 
├── App.js # Configuración principal de la aplicación 
├── App.css # Estilos de la aplicación 
└── index.js # Punto de entrada principa

``` 
## 🔧 Instalación y configuración 
### 1. Clonar el repositorio 
```bash
 git clone https://github.com/jlemonn1/guaufFront.git 
 cd guaufFront
 ```
### 2. Instalar dependencias 
```bash
 npm install
 ```
### 3. Configurar apiUrl 
```bash
 apiUrl = https://apiRest
 ```
 ### 4. Ejecutar el servidor en desarrollo 
```bash
 npm start
 ```
 ### 5. Crear build para producción 
```bash
 npm run build
 ```

## 📖 Cómo usar la aplicación

1.  **Pantalla de inicio**:
    
    -   Verás un mensaje de bienvenida y un campo para ingresar el número de la placa de tu mascota.
    -   Si no tienes una placa, se incluye un enlace para adquirir una.
2.  **Buscar una placa**:
    
    -   Ingresa el número de placa y presiona el botón **"Buscar"**.
    -   Si la placa no está registrada, podrás rellenar los datos correspondientes.
3.  **Formulario de registro**:
    
    -   Completa los campos deseados y sube una foto si lo consideras necesario.
    -   Al enviar, la información se guardará y estará disponible para futuras consultas.
4.  **Visualización de datos**:
    
    -   Si la placa ya está registrada, podrás ver los datos asociados.


## ✨ Mejoras futuras

-   Implementar autenticación para gestionar múltiples usuarios.
-   Diseño más avanzado para mejorar la experiencia de usuario.
-   Posible localización.

----------

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si tienes sugerencias o mejoras, crea un _issue_ o un _pull request_.