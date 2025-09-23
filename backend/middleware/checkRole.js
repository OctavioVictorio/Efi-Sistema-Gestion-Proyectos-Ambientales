const checkRole = (roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.rol)) {
            return res.status(403).send({ error: 'No tiene los permisos necesarios.' });
        }
        next();
    };
};

module.exports = { checkRole };