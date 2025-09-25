const { Task, Project, User } = require("../models");

// Obtener todas las tareas
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      include: [
        { model: Project, attributes: ["id", "nombre"] },
        { model: User, attributes: ["id", "nombre", "correo"] }
      ]
    });
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error al obtener tareas:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

// Obtener tarea por ID
const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id, {
      include: [
        { model: Project, attributes: ["id", "nombre"] },
        { model: User, attributes: ["id", "nombre", "correo"] }
      ]
    });

    if (!task) return res.status(404).json({ message: "Tarea no encontrada." });

    res.status(200).json(task);
  } catch (error) {
    console.error("Error al obtener tarea:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

// Crear nueva tarea
const createTask = async (req, res) => {
  try {
    const { nombre, descripcion, fecha_limite, estado, id_proyecto, asignado_a } = req.body;

    const newTask = await Task.create({
      nombre,
      descripcion,
      fecha_limite,
      estado,
      id_proyecto,
      asignado_a
    });

    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error al crear tarea:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

// Actualizar tarea
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);

    if (!task) return res.status(404).json({ message: "Tarea no encontrada." });

    const { nombre, descripcion, fecha_limite, estado, id_proyecto, asignado_a } = req.body;

    await task.update({
      nombre: nombre || task.nombre,
      descripcion: descripcion || task.descripcion,
      fecha_limite: fecha_limite || task.fecha_limite,
      estado: estado || task.estado,
      id_proyecto: id_proyecto || task.id_proyecto,
      asignado_a: asignado_a || task.asignado_a
    });

    res.status(200).json({ message: "Tarea actualizada correctamente." });
  } catch (error) {
    console.error("Error al actualizar tarea:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

// Eliminar tarea
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);

    if (!task) return res.status(404).json({ message: "Tarea no encontrada." });

    await task.destroy();
    res.status(200).json({ message: "Tarea eliminada correctamente." });
  } catch (error) {
    console.error("Error al eliminar tarea:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};
