const express = require('express');
const router = express.Router();
const resourcesController = require('../controllers/resources.controller');
const { auth } = require('../middleware/auth');
const { checkRole } = require('../middleware/checkRole');

// Obtener todos los recursos (público)
router.get('/', resourcesController.getAllResources);

// Obtener recurso por ID (público)
router.get('/:id', resourcesController.getResourceById);

// Crear recurso (solo admin y gestor)
router.post('/', auth, checkRole(['admin', 'gestor']), resourcesController.createResource);

// Actualizar recurso (solo admin y gestor)
router.put('/:id', auth, checkRole(['admin', 'gestor']), resourcesController.updateResource);

// Eliminar recurso (solo admin)
router.delete('/:id', auth, checkRole(['admin']), resourcesController.deleteResource);

module.exports = router;
