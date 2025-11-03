## 🚀 Funcionalidades principales
    - ✅ Gestión de usuarios (crear, editar, eliminar)
    - ✅ Gestión de productos (crear, editar, eliminar)
    - ✅ CRUD de productos y usuarios
    - ✅ Formularios validados con Formik y Yup
    - ✅ Front con visuales de PrimeReact 

## 🛠️ Tecnologías utilizadas
### 🔹 Frontend
    - ⚛️ React  
    - ⚡ Vite  
    - 🧠 Context API  
    - ✅ Formik + Yup  
    - 💄 PrimeReact  
    - 🔄 React Router DOM  
    
### 🔹 Backend
    - 🟢 Node.js  
    - ⚙️ Express  
    - 🗄️ MySQL + Sequelize ORM  
    - 🔐 JWT (Json Web Token)  
    - ✉️ Nodemailer  
    - 🔑 bcrypt  

## 🧱 Estructura del Proyecto

```plaintext
backend/
├── config/
├── controllers/
├── db/
├── middleware/
├── migrations/
├── models/
├── routes/
├── utils/
├── createDatabase.js
├── package.json
└── server.js
---
frontend/
├── public/
├── src/
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── layouts/
│   ├── pages/
│   ├── services/
│   ├── utils/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── package.json
└── vite.config.js
```

## 📦 Instalación y ejecución

## 1. Cloná el repositorio:
    - git clone https://github.com/OctavioVictorio/api-fullstack.git
    - cd api-fullstack

## 2. Instalá las dependencias:
    - npm install

## 3. Crea un .env
    PORT=3000
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=tu_contraseña
    DB_NAME=nombre_base_datos
    JWT_SECRET=clave_secreta
    EMAIL_USER=tu_correo@gmail.com
    EMAIL_PASS=tu_password_app

## 4. Crear la base de datos
    ejecutá node createDatabase.js
    o crea la base de datos desde DBeaver
    
## 5. Ejecutá el backend:
    - cd backend
    - npm run dev
    
## 6. Ejecutá el frontend:
    - cd frontend
    - npm install
    - Crea un archivo .env con este codigo: VITE_API_URL=http://localhost:3000/api
    - npm run dev
    - La app estará disponible en http://localhost:5173

##🧠 Organización del Código
### 📁 Backend
    controllers/ → Lógica principal de cada entidad.
    routes/ → Definición de las rutas de la API.
    models/ → Modelos Sequelize para la base de datos.
    middleware/ → Autenticación y control de roles.
    utils/email.js → Configuración de envío de correos.
    server.js → Punto de entrada del servidor.

### 💡 Frontend
    context/ → Contextos globales (Auth, Projects, Tasks, Resources, Users).
    pages/ → Páginas por módulo.
    services/ → Consumo de la API.
    utils/ → Componentes utilitarios y rutas protegidas.
    components/ → Elementos compartidos (Navbar, botones, etc.).
    App.jsx → Definición de rutas principales.
    main.jsx → Punto de entrada de la app React.

## 📌 Estado del proyecto
    - 📝 Práctico Integrador: Conexión Frontend (React) + Backend (Node.js)
    - 🗓️ Fecha de entrega: 27/05/2025
    - 🧩 Base de datos: MySQL mediante Sequelize ORM.

## 👤 Autores
    - Octavio Victorio
    - Agustín Alejandro Fasano
    - https://github.com/OctavioVictorio
    
## 👤 Profesor
    - Agustín Invaldi 

## 🧭 Conclusión
    Este sistema integra de forma completa una API RESTful en Node.js con un frontend moderno en React, aplicando buenas prácticas de arquitectura, autenticación JWT, validaciones, componentes reutilizables y manejo eficiente del estado global.
    
    El resultado es una aplicación escalable, modular y fácil de mantener, ideal para entornos académicos o productivos.
    
    ✨ “La mejor forma de predecir el futuro es programarlo.”

