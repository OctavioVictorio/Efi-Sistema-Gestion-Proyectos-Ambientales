const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controller");
const { auth } = require("../middleware/auth");
const { checkRole } = require("../middleware/checkRole");

// Obtener todos los usuarios (solo admin)
router.get("/", auth, checkRole(["admin"]), usersController.getAllUsers);

// Obtener un usuario por ID (solo admin o el mismo usuario)
router.get("/:id", auth, usersController.getUserById);

// Crear usuario (solo admin)
router.post("/", auth, checkRole(["admin"]), usersController.createUser);

// Actualizar usuario (admin o el mismo usuario)
router.put("/:id", auth, usersController.updateUser);

// Eliminar usuario (solo admin)
router.delete("/:id", auth, checkRole(["admin"]), usersController.deleteUser);

module.exports = router;
