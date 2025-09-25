const { User } = require("../models");
const bcrypt = require("bcryptjs");

// Obtener todos los usuarios
const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
};

// Obtener usuario por ID
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("Error al obtener usuario:", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
};

// Crear usuario
const createUser = async (req, res) => {
    try {
        const { nombre, correo, contraseña, rol } = req.body;

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(contraseña, 10);

        const newUser = await User.create({
            nombre,
            correo,
            contraseña: hashedPassword,
            rol,
        });

        res.status(201).json(newUser);
    } catch (error) {
        console.error("Error al crear usuario:", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
};

// Actualizar usuario
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }

        let { nombre, correo, contraseña, rol, is_active } = req.body;

        // Si viene una nueva contraseña, encriptarla
        if (contraseña) {
            contraseña = await bcrypt.hash(contraseña, 10);
        }

        await user.update({
            nombre: nombre || user.nombre,
            correo: correo || user.correo,
            contraseña: contraseña || user.contraseña,
            rol: rol || user.rol,
            is_active: is_active !== undefined ? is_active : user.is_active,
        });

        res.status(200).json({ message: "Usuario actualizado correctamente." });
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
};

// Eliminar usuario
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }

        await user.destroy();
        res.status(200).json({ message: "Usuario eliminado correctamente." });
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};
