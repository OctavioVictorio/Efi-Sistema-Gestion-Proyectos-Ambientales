### 🧩 Sistema de Gestión de Proyectos, Tareas, Recursos y Usuarios

Este proyecto es una aplicación Full Stack desarrollada con React + Vite (frontend) y Node.js + Express (backend).
El objetivo principal del sistema es gestionar proyectos, tareas, recursos y usuarios, permitiendo una administración centralizada y moderna a través de una interfaz web intuitiva.

## 📑 Descripción General

El sistema está dividido en dos grandes partes:

Backend (API RESTful):
Proporciona los endpoints necesarios para manejar toda la lógica del negocio (autenticación, proyectos, tareas, usuarios, recursos).
Utiliza Express como framework principal, MySQL como base de datos y Sequelize como ORM.

Frontend (Interfaz Web):
Desarrollado con React + Vite, permite a los usuarios interactuar con la API de forma visual.
Implementa contextos globales (React Context) para la gestión de estado y rutas protegidas para el control de acceso.

## 🧱 Estructura del Proyecto

backend
│ ├── config
│ │ └── config.json
│ ├── controllers
│ │ ├── auth.controller.js
│ │ ├── projects.controller.js
│ │ ├── resources.controller.js
│ │ ├── tasks.controller.js
│ │ └── users.controller.js
│ ├── db
│ │ └── db.js
│ ├── middleware
│ │ ├── auth.js
│ │ └── checkRole.js
│ ├── migrations
│ ├── models
│ │ ├── index.js
│ │ ├── project.js
│ │ ├── resource.js
│ │ ├── task.js
│ │ └── user.js
│ ├── routes
│ │ ├── auth.routes.js
│ │ ├── projects.routes.js
│ │ ├── resources.routes.js
│ │ ├── tasks.routes.js
│ │ └── users.routes.js
│ ├── utils
│ │ └── email.js
│ ├── createDatabase.js
│ ├── package.json
│ ├── server.js
│ └── ...
│

---

frontend
├── src
│ ├── components
│ │ └── Navbar.jsx
│ ├── context
│ │ ├── AuthContext.jsx
│ │ ├── ProjectContext.jsx
│ │ ├── ResourceContext.jsx
│ │ ├── TaskContext.jsx
│ │ └── UserContext.jsx
│ ├── pages
│ │ ├── Auth
│ │ ├── Home
│ │ ├── Projects
│ │ ├── Resources
│ │ ├── Tasks
│ │ └── Users
│ ├── services
│ ├── utils
│ ├── App.jsx
│ ├── index.css
│ └── main.jsx
├── package.json
├── vite.config.js

## ⚙️ Tecnologías Utilizadas
Backend

Node.js: entorno de ejecución de JavaScript.

Express: framework para crear APIs REST.

MySQL: base de datos relacional.

Sequelize: ORM para interactuar con MySQL.

JWT (Json Web Token): autenticación segura.

Nodemailer: envío de correos electrónicos (recuperación de contraseñas, notificaciones).

bcrypt: cifrado de contraseñas.

Frontend

React: biblioteca principal para la interfaz.

Vite: herramienta para desarrollo rápido.

React Router DOM: manejo de rutas públicas y privadas.

PrimeReact: componentes visuales modernos.

Formik + Yup: validación de formularios.

Axios o Fetch API: conexión con la API del backend.

## 🧩 Funcionalidades Principales

Autenticación

Registro e inicio de sesión de usuarios.

Recuperación de contraseña por correo electrónico.

Control de roles (Administrador / Usuario).

Gestión de Proyectos

Crear, editar, listar y eliminar proyectos.

Asignar usuarios a proyectos.

Gestión de Tareas

CRUD completo de tareas por proyecto.

Asociación de responsables.

Gestión de Recursos

CRUD completo de recursos.

Asignación de recursos a proyectos.

Gestión de Usuarios

Listado de usuarios.

Modificación de roles y permisos.

## ⚙️ Instalación y Configuración
Requisitos previos

Asegúrate de tener instalado:

    - Node.js

    - MySQL

    - Git

Clonar el repositorio

git clone https://github.com/usuario/tu-repositorio.git

    cd tu-repositorio

Configurar el Backend

Entrar al directorio:
    cd backend

Instalar dependencias:
    npm install

Crear un archivo .env con las siguientes variables:

    PORT=3000
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=tu_contraseña
    DB_NAME=nombre_base_datos
    JWT_SECRET=clave_secreta
    EMAIL_USER=tu_correo@gmail.com

    EMAIL_PASS=tu_password_app

Ejecutar la base de datos y sincronizar modelos:
    node createDatabase.js

Iniciar el servidor:
    npm run dev

o, si usás nodemon:
    nodemon server.js

Configurar el Frontend

Entrar al directorio:
    cd ../frontend

Instalar dependencias:
    npm install

Crear un archivo .env en el frontend con la URL del backend:

VITE_API_URL=http://localhost:3000/api

Iniciar el servidor de desarrollo:
npm run dev

## 🧩 Estructura del Backend

controllers/ → Contiene la lógica principal de cada entidad.
routes/ → Define las rutas de la API REST.
models/ → Modelos Sequelize para la base de datos.
middleware/ → Middleware de autenticación y control de roles.
utils/email.js → Configuración de envío de correos.
server.js → Punto de entrada principal del servidor.

## 🧠 Estructura del Frontend

context/ → Contextos globales para Auth, Projects, Tasks, Resources y Users.
pages/ → Páginas organizadas por módulos.
services/ → Servicios para consumir la API.
utils/ → Componentes y rutas protegidas.
components/ → Elementos compartidos (Navbar, botones, etc.).
App.jsx → Definición de rutas principales.
main.jsx → Punto de entrada de la app React.

## 🔐 Rutas Principales (Backend)

POST /api/auth/register → Registrar usuario
POST /api/auth/login → Iniciar sesión
GET /api/projects → Listar proyectos
POST /api/projects → Crear proyecto
GET /api/tasks → Listar tareas
POST /api/tasks → Crear tarea
GET /api/resources → Listar recursos
POST /api/resources → Crear recurso

Y más rutas definidas en los controladores correspondientes.

## 🧑‍💻 Autor

Desarrollado por Agustín Alejandro Fasano
Correo de contacto: tu_email@example.com

Año: 2025

## 🧭 Conclusión

Este sistema integra de forma completa una API RESTful en Node.js con un frontend moderno en React, aplicando buenas prácticas de arquitectura, autenticación JWT, validación, componentes reutilizables y una base de datos relacional administrada mediante Sequelize.

El resultado es una aplicación escalable, modular y lista para ser utilizada en entornos académicos o productivos.

✨ “La mejor forma de predecir el futuro es programarlo.”
