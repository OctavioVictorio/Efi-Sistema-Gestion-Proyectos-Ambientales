import { useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useProjects } from "../../context/ProjectContext";
import useProjectsForm from "./useProjectsForm";

import { notifySuccess, notifyError } from "../../utils/Notifier"; 
// PrimeReact Components
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";

const ProjectsForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { projects, createProject, updateProject, loading } = useProjects();
  const { formData, handleChange, setFormData } = useProjectsForm();

  const normalizeDates = (project) => {
    if (!project) return {};
    const clone = { ...project };
    ["fecha_inicio", "fecha_fin"].forEach((k) => {
      if (clone[k]) {
        try {
          clone[k] = new Date(clone[k]); 
        } catch {
          clone[k] = null;
        }
      } else {
        clone[k] = null; 
      }
    });
    return clone;
  };

  useEffect(() => {
    if (id && projects && projects.length > 0) {
      const project = projects.find((p) => p.id === Number(id));
      if (project) setFormData(normalizeDates(project));
    } else if (!id) {
      setFormData({
        nombre: "",
        descripcion: "",
        fecha_inicio: null, 
        fecha_fin: null,
        ubicacion: "",
      });
    }
  }, [id, projects, setFormData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nombre || formData.nombre.trim().length < 2) {
      notifyError("El nombre del proyecto es obligatorio y debe tener al menos 2 caracteres.");
      return;
    }
    
    const payload = { 
        ...formData,
        fecha_inicio: formData.fecha_inicio ? formData.fecha_inicio.toISOString().split('T')[0] : null,
        fecha_fin: formData.fecha_fin ? formData.fecha_fin.toISOString().split('T')[0] : null,
    };
    
    // 1. DECLARA LA VARIABLE 'success'
    let success = false; 

    if (id) {
      success = await updateProject(Number(id), payload);
    } else {
      success = await createProject(payload);
    }

    // 2. Este bloque solo se ejecuta si la API devuelve true
    if (success) {
      // Usamos los campos 'summary' y 'detail' para mejorar el toast
      notifySuccess('Éxito', `Proyecto ${id ? "actualizado" : "creado"} exitosamente.`);
      navigate("/projects");
    } else {
      // 3. Este bloque se ejecuta si la API devuelve false
      notifyError('Error de API', "Error al guardar el proyecto. Intenta de nuevo.");
    }
  };
  
  const handleCalendarChange = (name, e) => {
    setFormData(prev => ({ ...prev, [name]: e.value }));
  };

  const header = (
    <div className="flex align-items-center gap-2">
      <i className={`pi ${id ? 'pi-pencil' : 'pi-plus-circle'} text-3xl`}></i>
      <h4 className="mb-0 text-xl font-semibold">
        {id ? "Editar Proyecto" : "Nuevo Proyecto"}
      </h4>
    </div>
  );

  return (
    <div className="flex justify-content-center p-5 surface-ground">
      <Card 
        title={header} 
        className="w-full md:w-8 shadow-4 surface-card"
        style={{borderRadius: '12px'}}
      >
        <form onSubmit={handleSubmit} className="p-fluid grid formgrid gap-3">
          
          {/* Nombre */}
          <div className="field col-12">
            <label htmlFor="nombre" className="font-semibold mb-2 block">Nombre del Proyecto <span className="text-red-500">*</span></label>
            <InputText
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>

          {/* Descripción */}
          <div className="field col-12">
            <label htmlFor="descripcion" className="font-semibold mb-2 block">Descripción</label>
            <InputTextarea
              id="descripcion"
              name="descripcion"
              rows={5}
              value={formData.descripcion}
              onChange={handleChange}
            />
          </div>

          {/* Fecha de Inicio */}
          <div className="field col-12 md:col-6">
            <label htmlFor="fecha_inicio" className="font-semibold mb-2 block">Fecha de Inicio</label>
            <Calendar
                id="fecha_inicio"
                name="fecha_inicio"
                value={formData.fecha_inicio}
                onChange={(e) => handleCalendarChange("fecha_inicio", e)}
                dateFormat="dd/mm/yy"
                showIcon
            />
          </div>
          
          {/* Fecha de Fin */}
          <div className="field col-12 md:col-6">
            <label htmlFor="fecha_fin" className="font-semibold mb-2 block">Fecha de Fin</label>
            <Calendar
                id="fecha_fin"
                name="fecha_fin"
                value={formData.fecha_fin}
                onChange={(e) => handleCalendarChange("fecha_fin", e)}
                dateFormat="dd/mm/yy"
                minDate={formData.fecha_inicio || null} 
                showIcon
            />
          </div>

          {/* Ubicación */}
          <div className="field col-12">
            <label htmlFor="ubicacion" className="font-semibold mb-2 block">Ubicación (Lugar físico o área)</label>
            <InputText
              id="ubicacion"
              name="ubicacion"
              value={formData.ubicacion}
              onChange={handleChange}
            />
          </div>

          {/* Botones de Acción */}
          <div className="col-12 flex justify-content-end gap-3 pt-4">
            <Link to="/projects">
              <Button 
                label="Volver" 
                icon="pi pi-arrow-left" 
                severity="secondary" 
                className="p-button-outlined"
                type="button" 
              />
            </Link>
            <Button 
                type="submit" 
                label={id ? "Guardar Cambios" : "Crear Proyecto"}
                icon={loading ? "pi pi-spin pi-spinner" : (id ? "pi pi-save" : "pi-check")}
                severity="success"
                disabled={loading}
            />
          </div>
        </form>
      </Card>
    </div>
  );
};

export default ProjectsForm;