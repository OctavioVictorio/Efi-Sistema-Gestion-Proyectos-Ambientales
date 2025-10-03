import React, { useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useProjects } from "../../context/ProjectContext";
import useProjectsForm from "./useProjectsForm";

const ProjectsForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { projects, createProject, updateProject } = useProjects();
  const { formData, handleChange, setFormData } = useProjectsForm();

  const normalizeDates = (project) => {
    if (!project) return {};
    const clone = { ...project };
    ["fecha_inicio", "fecha_fin"].forEach((k) => {
      if (clone[k]) {
        try {
          const d = new Date(clone[k]);
          clone[k] = d.toISOString().slice(0, 10);
        } catch {}
      } else {
        clone[k] = "";
      }
    });
    return clone;
  };

  useEffect(() => {
    if (id && projects && projects.length > 0) {
      const project = projects.find((p) => p.id === Number(id));
      if (project) setFormData(normalizeDates(project));
    } else {
      setFormData({
        nombre: "",
        descripcion: "",
        fecha_inicio: "",
        fecha_fin: "",
        ubicacion: "",
      });
    }
  }, [id, projects, setFormData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nombre || formData.nombre.trim().length < 2) {
      alert("El nombre del proyecto es obligatorio.");
      return;
    }
    const payload = { ...formData };
    if (id) await updateProject(Number(id), payload);
    else await createProject(payload);
    navigate("/projects");
  };

  return (
    <div className="container mt-4">
      <style>{`
        .form-card {
          border-radius: 14px;
          box-shadow: 0 8px 25px rgba(0,0,0,0.1);
        }
        .form-group {
          margin-bottom: 1.2rem; /* separación uniforme entre campos */
        }
        .form-label {
          display: block;
          margin-bottom: 0.4rem; /* separación entre label e input */
          font-weight: 500;
        }
        .form-control, textarea {
          border-radius: 10px;
          border: 1px solid #ddd;
          padding: 0.75rem 1rem;
          transition: border-color .2s, box-shadow .2s;
        }
        .form-control:focus, textarea:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 6px rgba(59,130,246,0.4);
        }
        textarea {
          resize: none;
        }
        .btn-like {
          display: inline-block;
          background: #0d6efd;
          color: white !important;
          padding: 0.6rem 1.2rem;
          border-radius: 10px;
          text-decoration: none;
          transition: background .2s;
        }
        .btn-like:hover {
          background: #0b5ed7;
          color: white !important;
        }
        .btn-alt {
          background: #6c757d;
          color: white !important;
          border-radius: 10px;
          padding: 0.6rem 1.2rem;
          border: none;
          transition: background .2s;
        }
        .btn-alt:hover {
          background: #5a6268;
        }
      `}</style>

      <div className="card form-card">
        <div
          className="card-header p-3"
          style={{
            background: "linear-gradient(90deg,#3b82f6,#06b6d4)",
            color: "white",
          }}
        >
          <h4 className="mb-0">
            {id ? "✏️ Editar Proyecto" : "➕ Nuevo Proyecto"}
          </h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-12 form-group">
              <label className="form-label">Nombre</label>
              <input
                name="nombre"
                type="text"
                className="form-control"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-12 form-group">
              <label className="form-label">Descripción</label>
              <textarea
                name="descripcion"
                className="form-control"
                rows="4"
                value={formData.descripcion}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6 form-group">
              <label className="form-label">Fecha de Inicio</label>
              <input
                name="fecha_inicio"
                type="date"
                className="form-control"
                value={formData.fecha_inicio}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6 form-group">
              <label className="form-label">Fecha de Fin</label>
              <input
                name="fecha_fin"
                type="date"
                className="form-control"
                value={formData.fecha_fin}
                onChange={handleChange}
              />
            </div>
            <div className="col-12 form-group">
              <label className="form-label">Ubicación</label>
              <input
                name="ubicacion"
                type="text"
                className="form-control"
                value={formData.ubicacion}
                onChange={handleChange}
              />
            </div>
            <div className="col-12 d-flex justify-content-between gap-3">
              <Link to="/projects" className="btn-like">
                ⬅ Volver
              </Link>
              <button type="submit" className="btn-alt">
                {id ? "Actualizar" : "Crear"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProjectsForm;
