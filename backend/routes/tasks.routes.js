const express = require("express");
const router = express.Router();
const tasksController = require("../controllers/tasks.controller");
const { auth } = require("../middleware/auth");
const { checkRole } = require("../middleware/checkRole");

// Obtener todas las tareas (solo admin o gestor)
router.get("/", auth, checkRole(["admin", "gestor", "voluntario"]), tasksController.getAllTasks);

// Obtener una tarea por ID (admin, gestor o el mismo voluntario asignado)
router.get("/:id", auth, tasksController.getTaskById);

// Crear tarea (solo admin o gestor)
router.post("/", auth, checkRole(["admin", "gestor"]), tasksController.createTask);

// Actualizar tarea (admin, gestor o el voluntario asignado)
router.put("/:id", auth, tasksController.updateTask);

// Eliminar tarea (solo admin)
router.delete("/:id", auth, checkRole(["admin"]), tasksController.deleteTask);

module.exports = router;
