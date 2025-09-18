const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.User;

const register = async (req, res) => {
    const { nombre, correo, contraseña, rol } = req.body;
    try {
        const userExit = await User.findOne({ where: { correo } });
        if (userExit) {
            return res.status(400).json({ message: 'El correo ya está registrado.' });
        }

        const hashedPassword = await bcrypt.hash(contraseña, 10);

        const newUser = await User.create({
            nombre,
            correo,
            contraseña: hashedPassword,
            rol,
        });

        res.status(201).json({
            message: 'Usuario registrado correctamente.',
            user: {
                id: newUser.id,
                nombre: newUser.nombre,
                correo: newUser.correo,
                rol: newUser.rol,
            }
        });
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

const login = (req, res) => { /* lógica de login */ };
const forgotPassword = (req, res) => { /* lógica de forgotPassword */ };
const resetPassword = (req, res) => { /* lógica de resetPassword */ };


module.exports = {
    register,
    login,
    forgotPassword,
    resetPassword
};