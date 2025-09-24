require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Importar las rutas que usaremos
const authRouter = require('./routes/auth.routes');
// const usersRouter = require('./routes/users.routes');
const projectsRouter = require('./routes/projects.routes');
// const tasksRouter = require('./routes/tasks.routes');
const resourcesRouter = require('./routes/resources.routes');

// Middlewares
app.use(cors());
app.use(express.json());

// Usar las rutas
app.use('/auth', authRouter);
// app.use('/users', usersRouter);
app.use('/projects', projectsRouter);
// app.use('/tasks', tasksRouter);
app.use('/resources', resourcesRouter);

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});