# 🌱 Sistema de Gestión de Proyectos Ambientales

    Este proyecto es una aplicación **Fullstack** que permite gestionar usuarios, productos y recursos dentro de un entorno ambiental.  
    Incluye un **backend en Node.js** (API RESTful con Express y Sequelize) y un **frontend en React + Vite** con una interfaz moderna desarrollada con PrimeReact.  
    
    El objetivo principal es brindar una herramienta que facilite la administración de proyectos, tareas y recursos, promoviendo la organización y eficiencia en la gestión ambiental.

## 🧩 Descripción general del sistema

    El **Sistema de Gestión de Proyectos Ambientales** está diseñado bajo una arquitectura **cliente-servidor**.  
    El **backend** (Node.js + Express + Sequelize) actúa como una **API RESTful**, encargada de gestionar los datos en la base de datos **MySQL**.  
    El **frontend** (React + Vite) consume esta API mediante **peticiones HTTP** y ofrece una interfaz visual intuitiva para los usuarios.
    
    Este sistema permite administrar usuarios, proyectos, tareas y recursos ambientales, facilitando el trabajo colaborativo entre administradores, gestores y voluntarios.

## 🎯 Objetivos del Proyecto
    - Implementar una arquitectura cliente-servidor funcional y segura.
    - Integrar un backend con autenticación JWT y roles.
    - Desarrollar un frontend dinámico y validado con Formik + Yup.
    - Aplicar buenas prácticas de desarrollo modular y reutilizable.
    - Utilizar tecnologías modernas como React, Vite y PrimeReact.

## 🚀 Funcionalidades principales

## 👤 Gestión de Usuarios
    Registro, inicio de sesión y cierre de sesión.
    Autenticación mediante JWT (JSON Web Tokens).
    Control de acceso y roles (administrador / usuario).
    Edición y eliminación de perfiles de usuario.

## 📦 Gestión de Productos
    Creación, edición y eliminación de productos.
    Listado general con visualización detallada.
    Búsqueda y filtrado dinámico desde el frontend.
    Validación de datos con Formik + Yup.

## 🔐 Seguridad y Validaciones
    Middleware de autenticación para rutas protegidas.
    Hash de contraseñas con bcrypt.
    Validaciones tanto en el cliente como en el servidor.

## 🌐 Arquitectura Fullstack
    API RESTful desarrollada en Node.js + Express.
    Base de datos relacional MySQL gestionada con Sequelize ORM.
    Frontend moderno con React + Vite.
    Comunicación entre frontend y backend mediante fetch / API HTTP.

## 💅 Interfaz de Usuario
    Diseño limpio y responsivo con PrimeReact.
    Ruteo dinámico con React Router DOM.
    Context API para manejo global del estado.
    Componentes reutilizables y modulares.

## 👥 Roles y Permisos
    El sistema cuenta con diferentes roles que determinan los niveles de acceso y las acciones disponibles:
    
    - 🧍‍♂️ **Voluntario:**  
      Puede registrarse e iniciar sesión. Solo puede visualizar sus proyectos y tareas asignadas.  
      *(Todos los usuarios nuevos se registran con este rol por defecto).*

    - 🧩 **Gestor:**  
      Tiene permisos para crear, editar y asignar proyectos, tareas y recursos a otros usuarios.
    
    - 👑 **Administrador:**  
      Control total del sistema. Puede gestionar usuarios, cambiar roles, eliminar registros y acceder a todas las funcionalidades.
    
    > 🔧 Nota: el cambio de rol (de voluntario a gestor o admin) debe realizarse **manualmente desde la base de datos**, ya que no se implementó un panel de gestión de roles dentro del frontend.

    Los roles se gestionan desde la base de datos MySQL y se asignan manualmente por un administrador.
    Esto permite mantener el control de privilegios en entornos educativos o de desarrollo.
    
## 🔄 Flujo de uso básico
    1. **Registro e inicio de sesión:**  
       El usuario se registra desde el frontend. Por defecto, obtiene el rol de *voluntario*.  
       Luego, inicia sesión mediante JWT y accede a la aplicación.
    
    2. **Gestión de proyectos:**  
       Los gestores y administradores pueden crear proyectos, asignar voluntarios y definir tareas.
    
    3. **Gestión de tareas y recursos:**  
       Cada proyecto puede contener múltiples tareas y recursos (materiales, herramientas, etc.).  
       Estas entidades están relacionadas entre sí mediante claves foráneas en la base de datos MySQL.
    
    4. **Panel del usuario:**  
       Desde la interfaz React, los usuarios pueden visualizar sus datos, proyectos asignados y recursos disponibles.
    
    5. **Administración:**  
       El administrador puede modificar o eliminar usuarios, cambiar roles y mantener el control global del sistema.

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

## 🔗 Endpoints principales de la API
    | Método |       Endpoint       |        Descripción        |
    |--------|----------------------|---------------------------|
    | POST   | `/api/auth/register` | Registrar usuario         |
    | POST   | `/api/auth/login`    | Iniciar sesión            |
    | GET    | `/api/users`         | Listar todos los usuarios |
    | PUT    | `/api/users/:id`     | Actualizar usuario        |
    | DELETE | `/api/users/:id`     | Eliminar usuario          |
    | GET    | `/api/products`      | Obtener productos         |
    | POST   | `/api/products`      | Crear producto            |

## 📦 Instalación y ejecución

## 1. Cloná el repositorio:
    - git clone https://github.com/OctavioVictorio/Efi-Sistema-Gestion-Proyectos-Ambientales.git
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
    - Crea un archivo .env con esta linea de codigo: VITE_API_URL=http://localhost:3000/api
    - npm run dev
    - La app estará disponible en http://localhost:5173

## 🧠 Organización del Código
### 📁 Backend
    controllers/    →     Lógica principal de cada entidad.
    routes/         →     Definición de las rutas de la API.
    models/         →     Modelos Sequelize para la base de datos.
    middleware/     →     Autenticación y control de roles.
    utils/email.js  →     Configuración de envío de correos.
    server.js       →     Punto de entrada del servidor.

### 💡 Frontend
    context/     →     Contextos globales (Auth, Projects, Tasks, Resources, Users).
    pages/       →     Páginas por módulo.
    services/    →     Consumo de la API.
    utils/       →     Componentes utilitarios y rutas protegidas.
    components/  →     Elementos compartidos (Navbar, botones, etc.).
    App.jsx      →     Definición de rutas principales.
    main.jsx     →     Punto de entrada de la app React.

## 🧾 Validaciones y Seguridad
    - Contraseñas cifradas con **bcrypt** antes de guardarse en la base de datos.  
    - Autenticación mediante **JWT** (tokens almacenados de forma segura).  
    - Validaciones de formularios con **Formik + Yup** en el frontend.  
    - Middleware de Express que protege rutas privadas y restringe accesos según rol.  

## 📌 Estado del proyecto
    📝 Tipo de proyecto: Práctico Integrador Fullstack (Frontend + Backend)
    🧩 Base de datos: MySQL mediante Sequelize ORM
    ⚙️ Arquitectura: API RESTful + Frontend React (Cliente-Servidor)
    🗓️ Fecha de entrega: 27/05/2025
    🚧 Estado actual:
    ✅ Backend funcional con endpoints CRUD (usuarios y productos).
    ✅ Conexión estable con base de datos MySQL.
    ✅ Frontend conectado correctamente al backend.
    ✅ Validaciones completas con Formik + Yup.
    ✅ Diseño implementado con PrimeReact.
    🔜 Posible mejora: agregar dashboard con estadísticas y reportes.
    
    > nota: Este proyecto se encuentra en una versión funcional y estable, cumpliendo con los requerimientos principales del práctico integrador.
    No se realizó el despliegue en la nube debido a limitaciones técnicas, pero la aplicación es totalmente operativa en entorno local.

## ⚡ Posibles mejoras futuras  
    - Agregar módulo de reportes y gráficos estadísticos (por ejemplo, con Recharts).  
    - Incorporar subida de archivos y gestión de imágenes (para recursos o evidencias de proyectos).  
    - Desplegar la app en la nube (Railway + Vercel) para acceso remoto.  


## 👤 Autores
    - Octavio Victorio
    - Agustín Alejandro Fasano
    - https://github.com/OctavioVictorio/Efi-Sistema-Gestion-Proyectos-Ambientales
    
## 🎓 Información académica
    - 🏫 Institución: ITEC
    - 📚 Materia: Programación III
    - 👨‍🏫 Profesor: Agustín Invaldi
    - 📆 Año lectivo: 2025

## 🧭 Conclusión
    Este sistema integra de forma completa una API RESTful en Node.js con un frontend moderno en React, aplicando buenas prácticas de arquitectura, autenticación JWT, validaciones, componentes reutilizables y manejo eficiente del estado global.
    
    El resultado es una aplicación escalable, modular y fácil de mantener, ideal para entornos académicos o productivos.
    
    ✨ “La mejor forma de predecir el futuro es programarlo.”

## 💬 Agradecimientos
    Agradecemos al profesor **Agustín Invaldi** por la guía y acompañamiento durante el desarrollo de este trabajo integrador,  
    y al equipo docente del **ITEC** por fomentar el aprendizaje práctico en desarrollo Fullstack.
