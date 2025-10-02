// layouts/projects/ProjectsView.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProjects } from "../../context/ProjectContext";

const ProjectsView = () => {
  const { projects, fetchProjects, deleteProject, loading } = useProjects();

  // 🚀 Solo ejecuta fetchProjects UNA VEZ al montar
  useEffect(() => {
    fetchProjects();
  }, []); // ✅ Dependencias vacías

  if (loading) return <p>Cargando proyectos...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Proyectos</h1>
      <Link to="/projects/new">
        <button>Nuevo Proyecto</button>
      </Link>

      {projects.length === 0 ? (
        <p>No hay proyectos disponibles.</p>
      ) : (
        <ul>
          {projects.map((p) => (
            <li key={p.id} style={{ marginBottom: "1rem" }}>
              <strong>{p.nombre}</strong> - {p.descripcion}
              <br />
              <Link to={`/projects/${p.id}/edit`}>
                <button>Editar</button>
              </Link>
              <button onClick={() => deleteProject(p.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProjectsView;
