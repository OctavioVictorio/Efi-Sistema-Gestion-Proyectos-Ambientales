import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProjects } from "../../context/ProjectContext";

const ProjectsView = () => {
  const { projects, fetchProjects, deleteProject, loading } = useProjects();

  useEffect(() => {
    fetchProjects();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const formatDate = (val) => {
    if (!val) return "-";
    try {
      const d = new Date(val);
      return d.toLocaleDateString();
    } catch {
      return val;
    }
  };

  const truncate = (text, n = 120) => {
    if (!text) return "";
    return text.length > n ? text.slice(0, n) + "…" : text;
  };

  return (
    <div className="container mt-4">
      <style>{`
        .project-card {
          transition: transform .18s ease, box-shadow .18s ease;
          border-radius: 14px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          border: none;
          box-shadow: 0 6px 18px rgba(0,0,0,0.08);
        }
        .project-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 28px rgba(0,0,0,0.15);
        }
        .project-hero {
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 700;
          font-size: 28px;
        }
        .btn-like {
          display: inline-block;
          background: #0d6efd;
          color: white !important;
          padding: 0.5rem 1rem;
          border-radius: 8px;
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
          padding: 0.5rem 1rem;
          border-radius: 8px;
          border: none;
          transition: background .2s;
        }
        .btn-alt:hover {
          background: #5a6268;
        }
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }
      `}</style>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold mb-0">📂 Proyectos</h1>
        <Link to="/projects/new" className="btn-like">
          + Nuevo Proyecto
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status" />
          <p className="mt-2 mb-0">Cargando proyectos...</p>
        </div>
      ) : projects.length === 0 ? (
        <div className="alert alert-info text-center">
          No hay proyectos disponibles.
        </div>
      ) : (
        <div className="projects-grid">
          {projects.map((p) => (
            <div key={p.id} className="card project-card">
              <div
                className="project-hero"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(72,187,120,0.9), rgba(34,139,230,0.85))",
                }}
              >
                {p.nombre ? p.nombre.charAt(0).toUpperCase() : "P"}
              </div>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{p.nombre}</h5>
                <p className="card-text text-muted">
                  {truncate(p.descripcion, 140)}
                </p>

                <div className="mb-2">
                  <span className="badge bg-secondary me-2">
                    📍 {p.ubicacion || "Sin ubicación"}
                  </span>
                  <span className="badge bg-light text-muted">
                    ⏳ {formatDate(p.fecha_inicio)} → {formatDate(p.fecha_fin)}
                  </span>
                </div>

                <div className="mt-auto d-flex gap-3">
                  <Link
                    to={`/projects/${p.id}/edit`}
                    className="btn-like flex-grow-1 text-center"
                  >
                    Editar
                  </Link>
                  <button
                    className="btn-alt flex-grow-1"
                    onClick={() =>
                      window.confirm("¿Eliminar este proyecto?") &&
                      deleteProject(p.id)
                    }
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsView;
