import { createContext, useContext, useState, useEffect } from "react";
import resourceService from "../services/resources.service"; 
import { notifyError, notifySuccess } from "../utils/Notifier";
import { useAuth } from "./AuthContext"; 

const ResourceContext = createContext();

export const useResources = () => useContext(ResourceContext);

export const ResourceProvider = ({ children }) => {
    const { user, loading: authLoading } = useAuth(); 
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchResources = async () => {
        setLoading(true);
        try {
            const res = await resourceService.getAll();
            setResources(res.data);
        } catch (err) {
            console.error("Error al cargar recursos:", err);
            if (err.response?.status !== 401) {
                notifyError("Error de Carga", "No se pudo obtener la lista de recursos.");
            }
        } finally {
            setLoading(false);
        }
    };

    const createResource = async (data) => {
        try {
            const res = await resourceService.create(data);
            setResources((prev) => [...prev, res.data]);
            return true;
        } catch (err) {
            console.error("Error al crear recurso:", err);
            notifyError("Error", "Fallo al crear el recurso. Verifica los datos.");
            return false;
        }
    };

    const updateResource = async (id, data) => {
        try {
            const res = await resourceService.update(id, data);
            setResources((prev) => prev.map((r) => (r.id === id ? res.data : r)));
            return true;
        } catch (err) {
            console.error("Error al actualizar recurso:", err);
            notifyError("Error", "Fallo al actualizar el recurso. Verifica los datos.");
            return false;
        }
    }

    const deleteResource = async (id) => {
        try {
            await resourceService.remove(id);
            setResources((prev) => prev.filter((r) => r.id !== id));
            notifySuccess("Recurso Eliminado", "El recurso ha sido eliminado exitosamente.");
            return true;
        } catch (err) {
            console.error("Error al eliminar recurso:", err);
            notifyError("Error", "Fallo al eliminar el recurso.");
            return false;
        }
    }

    useEffect(() => {
        if (!authLoading && user) {
            fetchResources();
        }
        
        if (!authLoading && !user) {
            setResources([]);
        }

    }, [authLoading, user]);

    return (
        <ResourceContext.Provider
            value={{
                resources,
                loading,
                fetchResources,
                createResource,
                updateResource,
                deleteResource
            }}
        >
            {children}
        </ResourceContext.Provider>
    );
};