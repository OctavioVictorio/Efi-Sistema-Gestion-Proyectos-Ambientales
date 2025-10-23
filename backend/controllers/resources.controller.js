const { Resource, Project } = require("../models");

// Obtener todos los recursos (todos los roles pueden ver)
const getAllResources = async (req, res) => {
    try {
        const resources = await Resource.findAll({
            include: [{ model: Project, attributes: ['id', 'nombre'] }]
        });
        res.status(200).json(resources);
    } catch (error) {
        console.error('Error al obtener recursos:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

// Obtener recurso por ID (todos los roles pueden ver)
const getResourceById = async (req, res) => {
    try {
        const { id } = req.params;
        const resource = await Resource.findByPk(id, {
            include: [{ model: Project, attributes: ['id', 'nombre'] }]
        });
        if (!resource) {
            return res.status(404).json({ message: 'Recurso no encontrado.' });
        }
        res.status(200).json(resource);
    } catch (error) {
        console.error('Error al obtener recurso:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

// Crear un nuevo recurso (solo admin/gestor)
const createResource = async (req, res) => {
    if (req.user.rol === "voluntario") {
        return res.status(403).json({ message: "No tiene permiso para crear recursos." });
    }

    try {
        const { nombre, tipo, cantidad, disponible, id_proyecto } = req.body;

        // Validar que exista el proyecto
        const project = await Project.findByPk(id_proyecto);
        if (!project) return res.status(404).json({ message: 'Proyecto no encontrado.' });

        const newResource = await Resource.create({ nombre, tipo, cantidad, disponible, id_proyecto });
        res.status(201).json(newResource);
    } catch (error) {
        console.error('Error al crear recurso:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

// Actualizar recurso (solo admin/gestor)
const updateResource = async (req, res) => {
    if (req.user.rol === "voluntario") {
        return res.status(403).json({ message: "No tiene permiso para editar recursos." });
    }

    try {
        const { id } = req.params;
        const resource = await Resource.findByPk(id);
        if (!resource) return res.status(404).json({ message: 'Recurso no encontrado.' });

        await resource.update(req.body);
        res.status(200).json({ message: 'Recurso actualizado correctamente.' });
    } catch (error) {
        console.error('Error al actualizar recurso:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

// Eliminar recurso (solo admin/gestor)
const deleteResource = async (req, res) => {
    if (req.user.rol === "voluntario") {
        return res.status(403).json({ message: "No tiene permiso para eliminar recursos." });
    }

    try {
        const { id } = req.params;
        const resource = await Resource.findByPk(id);
        if (!resource) return res.status(404).json({ message: 'Recurso no encontrado.' });

        await resource.destroy();
        res.status(200).json({ message: 'Recurso eliminado correctamente.' });
    } catch (error) {
        console.error('Error al eliminar recurso:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

module.exports = {
    getAllResources,
    getResourceById,
    createResource,
    updateResource,
    deleteResource
};
