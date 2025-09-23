const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/projects.controller');
const { auth } = require('../middleware/auth');
const { checkRole } = require('../middleware/checkRole');

// Obtener todos los proyectos (acceso público para visualización)
router.get('/', projectsController.getAllProjects);

// Obtener un solo proyecto por ID (acceso público)
router.get('/:id', projectsController.getProjectById);

// Crear un nuevo proyecto (solo para 'admin' y 'gestor')
router.post('/', auth, checkRole(['admin', 'gestor']), projectsController.createProject);

// Actualizar un proyecto (solo para 'admin' y 'gestor')
router.put('/:id', auth, checkRole(['admin', 'gestor']), projectsController.updateProject);

// Eliminar un proyecto (solo para 'admin')
router.delete('/:id', auth, checkRole(['admin']), projectsController.deleteProject);

module.exports = router;