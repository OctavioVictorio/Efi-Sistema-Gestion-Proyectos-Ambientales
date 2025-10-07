import { createContext, useContext, useState, useEffect } from "react";
import taskService from "../services/tasks.service"; 
import { notifyError } from "../utils/Notifier";
import { useAuth } from "./AuthContext";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const { user, loading: authLoading } = useAuth();

    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchTasks = async () => {
        setLoading(true);
        try {
        const res = await taskService.getAll();
        setTasks(res.data);
        } catch (err) {
        console.error("Error al cargar tareas:", err);
        notifyError("Error de Carga", "No se pudo obtener la lista de tareas del servidor.");
        } finally {
        setLoading(false);
        }
    };

    const createTask = async (data) => {
        try {
        const res = await taskService.create(data);
        setTasks((prev) => [...prev, res.data]);
        return true;
        } catch (err) {
        console.error("Error al crear tarea:", err);
        notifyError("Error", "Fallo al crear la tarea. Verifica los datos.");
        return false;
        }
    };

    const updateTask = async (id, data) => {
        try {
        await taskService.update(id, data);
        setTasks((prev) =>
            prev.map((t) => (t.id === id ? { ...t, ...data } : t))
        );
        return true;
        } catch (err) {
        console.error("Error al actualizar tarea:", err);
        notifyError("Error", "Fallo al actualizar la tarea. Intenta de nuevo.");
        return false;
        }
    };

    const deleteTask = async (id) => {
        try {
        await taskService.remove(id);
        setTasks((prev) => prev.filter((t) => t.id !== id));
        return true;
        } catch (err) {
        console.error("Error al eliminar tarea:", err);
        notifyError("Error", "Fallo al eliminar la tarea.");
        return false;
        }
    };

    useEffect(() => {
    if (!authLoading && user) {
        fetchTasks();
    }

    if (!authLoading && !user) {
        setTasks([]);
    }

}, [authLoading, user]);

    return (
        <TaskContext.Provider
        value={{
            tasks,
            loading,
            fetchTasks,
            createTask,
            updateTask,
            deleteTask,
        }}
        >
        {children}
        </TaskContext.Provider>
    );
    };

    export const useTasks = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error("useTasks debe usarse dentro de un TaskProvider");
    }
    return context;
};