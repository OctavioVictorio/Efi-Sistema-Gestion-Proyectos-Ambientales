const { Project } = require("../models");

// Obtener todos los proyectos
const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.findAll({
            where: { estado: 'activo' } 
        });
        res.status(200).json(projects);
    } catch (error) {
        console.error('Error al obtener proyectos:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

const getProjectById = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Project.findByPk(id);

        if (!project) {
            return res.status(404).json({ message: 'Proyecto no encontrado.' });
        }

        res.status(200).json(project);
    } catch (error) {
        console.error('Error al obtener el proyecto:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

// Crear un nuevo proyecto
const createProject = async (req, res) => {
    try {
        const { nombre, descripcion, fecha_inicio, fecha_fin, ubicacion } = req.body;
        const newProject = await Project.create({
            nombre,
            descripcion,
            fecha_inicio,
            fecha_fin,
            ubicacion
        });
        res.status(201).json(newProject);
    } catch (error) {
        console.error('Error al crear proyecto:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

// Actualizar un proyecto
const updateProject = async (req, res) => {
    const { id } = req.params;
    try {
        const project = await Project.findByPk(id);
        if (!project) {
            return res.status(404).json({ message: 'Proyecto no encontrado.' });
        }
        await project.update(req.body);
        res.status(200).json({ message: 'Proyecto actualizado correctamente.' });
    } catch (error) {
        console.error('Error al actualizar proyecto:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

// Eliminar un proyecto
const deleteProject = async (req, res) => {
    const { id } = req.params;
    try {
        const project = await Project.findByPk(id);
        if (!project) {
            return res.status(404).json({ message: 'Proyecto no encontrado.' });
        }
        await project.destroy();
        res.status(200).json({ message: 'Proyecto eliminado correctamente.' });
    } catch (error) {
        console.error('Error al eliminar proyecto:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

module.exports = {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
};
