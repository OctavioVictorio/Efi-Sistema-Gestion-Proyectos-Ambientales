require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
// Corregido: Usa la variable de entorno PORT de Railway o 3000 localmente.
const PORT = process.env.PORT || 3000;

// 1. **CORRECCIÓN CRÍTICA DE CORS**
// Define explícitamente los orígenes (Frontends) que tienen permiso para acceder a tu API.
const allowedOrigins = [
    // El dominio de tu última implementación de Vercel (la URL de origen en el error)
    'https://efi-sistema-gestion-proyectos-ambientales-mpx7-4d76vv02x.vercel.app',
    // El dominio principal (si Vercel lo cambia, este debe funcionar)
    'https://efi-sistema-gestion-proyectos-amble-dun.vercel.app',
    // El dominio de desarrollo local (para cuando trabajes en tu computadora)
    'http://localhost:5173', 
    'http://localhost:3000'
];

// Configuración de CORS con orígenes permitidos
const corsOptions = {
    origin: function (origin, callback) {
        // Permite peticiones sin origen (como de herramientas de testing/Postman) o de los orígenes listados.
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Esto es necesario si usas cookies o tokens en tus peticiones
};

// Middlewares
// 2. **USAR LA CONFIGURACIÓN CORREGIDA DE CORS**
app.use(cors(corsOptions));
app.use(express.json());

// Importar las rutas que usaremos
const authRouter = require('./routes/auth.routes');
const usersRouter = require('./routes/users.routes');
const projectsRouter = require('./routes/projects.routes');
const tasksRouter = require('./routes/tasks.routes');
const resourcesRouter = require('./routes/resources.routes');

// Usar las rutas
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/projects', projectsRouter);
app.use('/tasks', tasksRouter);
app.use('/resources', resourcesRouter);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});