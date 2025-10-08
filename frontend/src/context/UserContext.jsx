import { createContext, useContext, useState, useEffect } from "react";
import userService from "../services/users.service"; 
import { notifyError, notifySuccess } from "../utils/Notifier";
import { useAuth } from "./AuthContext"; 

const UserContext = createContext();

export const useUsers = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const { user, loading: authLoading } = useAuth(); 
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await userService.getAll();
            setUsers(res.data);
        } catch (err) {
            console.error("Error al cargar usuarios:", err);
            if (err.response?.status !== 401 && err.response?.status !== 403) {
                notifyError("Error de Carga", "No tienes permiso o hubo un fallo al obtener la lista de usuarios.");
            }
        } finally {
            setLoading(false);
        }
    };

    const updateUser = async (id, data) => {
        try {
            await userService.update(id, data); 
            
            await fetchUsers(); 
            
            notifySuccess("Actualización Exitosa", "Usuario actualizado correctamente.");
            return true;
        } catch (err) {
            console.error("Error al actualizar usuario:", err);
            notifyError("Error", "Fallo al actualizar el usuario. Verifica permisos.");
            return false;
        }
    }

    const deleteUser = async (id) => {
        try {
            await userService.remove(id);
            setUsers((prev) => prev.filter((u) => u.id !== id));
            notifySuccess("Usuario Eliminado", "El usuario ha sido eliminado exitosamente.");
            return true;
        } catch (err) {
            console.error("Error al eliminar usuario:", err);
            notifyError("Error", "Fallo al eliminar el usuario. Verifica permisos.");
            return false;
        }
    }

    useEffect(() => {
        if (!authLoading && user) {
            fetchUsers();
        }
        
        if (!authLoading && !user) {
            setUsers([]);
        }

    }, [authLoading, user]);

    return (
        <UserContext.Provider
            value={{
                users,
                loading,
                fetchUsers,
                updateUser,
                deleteUser
            }}
        >
            {children}
        </UserContext.Provider>
    );
};