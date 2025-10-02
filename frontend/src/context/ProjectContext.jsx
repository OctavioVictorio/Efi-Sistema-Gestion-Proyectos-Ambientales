// context/ProjectContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import projectService from "../services/projects.service";

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
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (data) => {
    try {
      const res = await projectService.create(data);
      setProjects((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("Error al crear proyecto:", err);
    }
  };

  const updateProject = async (id, data) => {
    try {
      await projectService.update(id, data);
      setProjects((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...data } : p))
      );
    } catch (err) {
      console.error("Error al actualizar proyecto:", err);
    }
  };

  const deleteProject = async (id) => {
    try {
      await projectService.remove(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Error al eliminar proyecto:", err);
    }
  };

  // 🚀 Cargar proyectos una sola vez
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
