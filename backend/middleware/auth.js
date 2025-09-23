const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.User;

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secreto123');
        const user = await User.findOne({ where: { id: decoded.user.id } });

        if (!user) {
            throw new Error();
        }

        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Por favor, autentíquese.' });
    }
};

module.exports = { auth };