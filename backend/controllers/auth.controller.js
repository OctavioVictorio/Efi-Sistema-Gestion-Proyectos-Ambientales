const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');

const { User } = require("../models");

const { sendEmail } = require('../utils/email');
const crypto = require('crypto');

const resetTokens = new Map();

// Función de registro
const register = async (req, res) => {
    const { nombre, email, password, rol, edad } = req.body; // Cambiado a email y password
    try {
        const userExist = await User.findOne({ where: { correo: email } }); 
        if (userExist) return res.status(400).json({ message: 'El correo ya está registrado.' });

        const hashedPassword = await bcrypt.hash(password, 10); 
        const newUser = await User.create({
            nombre,
            correo: email, 
            contraseña: hashedPassword,
            rol: rol || 'voluntario',
            edad: edad || null, 
        });

        res.status(201).json({ message: 'Usuario creado correctamente', newUser });
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        res.status(500).json({ message: 'Error al crear el usuario', error: error.message });
    }
};

// Función de login
const login = async (req, res) => {
    const { email, password } = req.body; 
    try {
        const userExist = await User.findOne({ where: { correo: email } });
        if (!userExist) return res.status(400).json({ message: 'Credenciales inválidas.' });

        const validPassword = await bcrypt.compare(password, userExist.contraseña);
        if (!validPassword) return res.status(403).json({ message: 'Contraseña o correo incorrecto.' });

        const user = {
            id: userExist.id,
            nombre: userExist.nombre,
            correo: userExist.correo,
            rol: userExist.rol,
        };
        const token = jwt.sign({ user }, process.env.JWT_SECRET || 'secreto123', { expiresIn: '1h' });

        res.status(200).json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
    }
};

const resetEmailTemplate = ({ nombre, resetUrl }) => {
    return `
    <div style="max-width: 520px; margin:0; padding: 20px;">
    <h2>Recupera tu contraseña</h2>
        <p>Hola ${nombre || ''}, recibimos tu solicitud para restablecer la contraseña.</p>
        <p>Haz clic en el botón para continuar.</p>
        <p>
        <a href="${resetUrl}" style="display:inline-block; padding:10px 20px; color:#fff; background-color:#007bff; text-decoration:none;">
                Cambiar contraseña
            </a>
        </p>
        <p>Si no fuiste tú, puedes ignorar este mensaje</p>
    </div>
    `;
};

// Función para iniciar el proceso de recuperación de contraseña
const forgotPassword = async (req, res) => {
    const { correo } = req.body;
    try {
        const user = await User.findOne({ where: { correo } });
        if (!user) {
            return res.status(200).json({ message: 'Si el correo existe, recibirás un enlace de recuperación.' });
        }

        const rawToken = crypto.randomBytes(32).toString('hex');
        const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');
        const expiresAt = Date.now() + 15 * 60 * 1000; 

        resetTokens.set(user.id, { tokenHash, expiresAt });

        const resetUrl = `${process.env.FRONT_URL || 'http://localhost:5173'}/reset-password?token=${rawToken}&id=${user.id}`;
        
        await sendEmail({
            to: user.correo,
            subject: 'Recuperación de contraseña',
            html: resetEmailTemplate({ nombre: user.nombre, resetUrl })
        });

        return res.status(200).json({ message: 'Si el correo existe, recibirás un enlace de recuperación.' });
    } catch (error) {
        console.error('Error al enviar el email:', error);
        return res.status(500).json({ message: 'Error al enviar el email' });
    }
};

// Función para restablecer la contraseña
const resetPassword = async (req, res) => {
    const { id, token, contraseña } = req.body;
    if (!id || !token || !contraseña) {
        return res.status(400).json({ message: 'Faltan datos.' });
    }
    try {
        const entry = resetTokens.get(Number(id));
        if (!entry || entry.expiresAt < Date.now()) {
            return res.status(400).json({ message: 'Token inválido o expirado.' });
        }

        const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
        if (tokenHash !== entry.tokenHash) {
            return res.status(400).json({ message: 'Token inválido.' });
        }

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(400).json({ message: 'El usuario no existe.' });
        }

        user.contraseña = await bcrypt.hash(contraseña, 10);
        await user.save();

        resetTokens.delete(Number(id));

        return res.status(201).json({ message: 'Contraseña actualizada exitosamente.' });
    } catch (error) {
        console.error('Error al restablecer la contraseña:', error);
        return res.status(500).json({ message: 'Error al restablecer la contraseña.' });
    }
};

module.exports = {
    register,
    login,
    forgotPassword,
    resetPassword,
};