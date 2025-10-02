// layouts/projects/ProjectsForm.jsx
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProjects } from "../../context/ProjectContext";
import useProjectsForm from "./useProjectsForm";

const ProjectsForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { projects, createProject, updateProject } = useProjects();
  const { formData, handleChange, setFormData } = useProjectsForm();

  // Si estamos editando, cargamos los datos
  useEffect(() => {
    if (id) {
      const project = projects.find((p) => p.id === parseInt(id));
      if (project) {
        setFormData(project);
      }
    }
  }, [id, projects, setFormData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await updateProject(id, formData);
    } else {
      await createProject(formData);
    }
    navigate("/projects");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>{id ? "Editar Proyecto" : "Nuevo Proyecto"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
        <textarea
          name="descripcion"
          placeholder="Descripción"
          value={formData.descripcion}
          onChange={handleChange}
        />
        <input
          type="date"
          name="fecha_inicio"
          value={formData.fecha_inicio}
          onChange={handleChange}
        />
        <input
          type="date"
          name="fecha_fin"
          value={formData.fecha_fin}
          onChange={handleChange}
        />
        <input
          type="text"
          name="ubicacion"
          placeholder="Ubicación"
          value={formData.ubicacion}
          onChange={handleChange}
        />
        <button type="submit">
          {id ? "Actualizar" : "Crear"}
        </button>
      </form>
    </div>
  );
};

export default ProjectsForm;
