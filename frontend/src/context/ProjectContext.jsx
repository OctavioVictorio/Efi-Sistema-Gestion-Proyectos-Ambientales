import { createContext, useContext, useState, useEffect } from "react";
import projectService from "../services/projects.service";
import { notifyError, notifySuccess } from "../utils/Notifier";

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await projectService.getAll();
      setProjects(res.data);
    } catch (err) {
      console.error("Error al cargar proyectos:", err);
      if (err.response?.status !== 401) {
        notifyError("Error de Carga", "No se pudo obtener la lista de proyectos.");
      }
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (data) => {
    try {
      const res = await projectService.create(data);
      setProjects((prev) => [...prev, res.data]);
      return true;
    } catch (err) {
      console.error("Error al crear proyecto:", err);
      notifyError("Error", "Fallo al crear el proyecto. Verifica los datos.");
      return false;
    }
  };

  const updateProject = async (id, data) => {
    try {
      await projectService.update(id, data);
      setProjects((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...data } : p))
      );
      return true;
    } catch (err) {
      console.error("Error al actualizar proyecto:", err);
      notifyError("Error", "Fallo al actualizar el proyecto. Verifica los datos.");
      return false;
    }
  };

  const deleteProject = async (id) => {
    try {
      await projectService.remove(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
      notifySuccess("Éxito", "Proyecto eliminado correctamente.");
      return true;
    } catch (err) {
      console.error("Error al eliminar proyecto:", err);
      if (err.response?.status !== 401) {
        notifyError("Error", "Fallo al eliminar el proyecto.");
      }
      return false;
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <ProjectContext.Provider
      value={{
        projects,
        loading,
        fetchProjects,
        createProject,
        updateProject,
        deleteProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProjects debe usarse dentro de un ProjectProvider");
  }
  return context;
};
