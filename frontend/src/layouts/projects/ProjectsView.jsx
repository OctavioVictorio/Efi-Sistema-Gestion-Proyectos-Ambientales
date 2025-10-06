import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProjects } from "../../context/ProjectContext";

// Importamos el Notifier (asumiendo que la ruta "../../utils/Notifier" es correcta)
import { notifySuccess, notifyError} from "../../utils/Notifier"; 

// PrimeReact Components
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog'; // Componentes de Diálogo
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';
import { ProgressSpinner } from 'primereact/progressspinner';
import { DataView } from 'primereact/dataview';

const ProjectsView = () => {
  const { projects, fetchProjects, deleteProject, loading } = useProjects();

  useEffect(() => {
    fetchProjects();
  }, []); 

  // --- Utility Functions (Mantenemos estas funciones) ---
  const formatDate = (val) => {
    if (!val) return "N/A";
    try {
      const d = new Date(val);
      return d.toLocaleDateString();
    } catch {
      return val;
    }
  };

  const truncate = (text, n = 120) => {
    if (!text) return "Sin descripción.";
    return text.length > n ? text.slice(0, n) + "…" : text;
  };
  
  const getProjectStatus = (project) => {
      const now = new Date();
      const start = new Date(project.fecha_inicio);
      const end = new Date(project.fecha_fin);

      if (end < now) return { label: 'Finalizado', severity: 'success', icon: 'pi-check-circle' };
      if (start > now) return { label: 'Próximo', severity: 'info', icon: 'pi-calendar' };
      return { label: 'Activo', severity: 'warning', icon: 'pi-sun' };
  };

  // --- Nueva Función para Eliminar con ConfirmDialog ---
  const handleDelete = (project) => {
    confirmDialog({
      message: (
        // Mensaje más atractivo usando HTML/JSX dentro del diálogo
        <div className="flex flex-column gap-2">
            <h5 className="mb-1">¿Confirmas la eliminación de este proyecto?</h5>
            <p className="text-600">
                Estás a punto de eliminar permanentemente: 
                <span className="font-bold text-red-500 ml-1">{project.nombre}</span>
            </p>
            <p className="text-red-700 font-semibold text-sm">Esta acción no se puede deshacer.</p>
        </div>
      ),
      header: 'Eliminar Proyecto',
      icon: 'pi pi-exclamation-circle text-red-500', // Icono de advertencia mejorado
      acceptClassName: 'p-button-danger',
      
      // Lógica a ejecutar si el usuario acepta
      accept: async () => {
        const success = await deleteProject(project.id);
        if (success) {
          notifySuccess('Eliminado', `El proyecto "${project.nombre}" fue retirado del sistema.`);
        } else {
          notifyError('Error', 'No se pudo eliminar el proyecto. Intenta de nuevo.');
        }
      },
      // Lógica a ejecutar si el usuario rechaza (opcional)
      reject: () => {
        // notifyInfo('Operación Cancelada', 'La eliminación del proyecto fue cancelada.');
      }
    });
  };


  const itemTemplate = (project) => {
    const status = getProjectStatus(project);
    const statusIcon = status.icon;

    return (
        <div key={project.id} className="col-12 md:col-6 lg:col-4 p-3">
            <Card 
                title={project.nombre} 
                subTitle={project.ubicacion || "Ubicación no especificada"}
                className="shadow-2 hover:shadow-5 transition-all transition-duration-300 h-full surface-card flex flex-column"
                footer={
                    <div className="flex justify-content-between gap-2 pt-2">
                        <Link to={`/projects/${project.id}/edit`} className="flex-1">
                            <Button label="Editar" icon="pi pi-pencil" className="w-full p-button-sm p-button-secondary" />
                        </Link>
                        {/* 4. Llamamos a la nueva función handleDelete */}
                        <Button
                            label="Eliminar"
                            icon="pi pi-trash"
                            severity="danger"
                            className="flex-1 p-button-sm"
                            onClick={() => handleDelete(project)}
                        />
                    </div>
                }
            >
                <div className="flex flex-column gap-2 mb-3">
                    <Tag 
                        value={status.label} 
                        severity={status.severity} 
                        icon={`pi ${statusIcon}`}
                        className="w-min"
                    />
                </div>
                
                <p className="m-0 text-500 line-height-3">
                    {truncate(project.descripcion, 140)}
                </p>

                {/* Este DIV empuja los botones hacia abajo (corrección de diseño solicitada anteriormente) */}
                <div className="flex-grow-1" /> 

                <div className="flex justify-content-between align-items-center mt-3 text-sm text-600 border-top-1 pt-3 surface-border">
                    <div className="flex align-items-center">
                        <i className="pi pi-calendar-times mr-1 text-red-500"></i>
                        <span>Inicio: {formatDate(project.fecha_inicio)}</span>
                    </div>
                    <div className="flex align-items-center">
                        <i className="pi pi-calendar-plus mr-1 text-green-500"></i>
                        <span>Fin: {formatDate(project.fecha_fin)}</span>
                    </div>
                </div>
            </Card>
        </div>
    );
  };

  return (
    <div className="p-5">
      {/* 1. Componente necesario para que confirmDialog funcione */}
      <ConfirmDialog /> 

      <div className="flex justify-content-between align-items-center mb-5">
        <h1 className="text-4xl font-bold mb-0 text-900 flex align-items-center gap-2">
            <i className="pi pi-sitemap text-primary"></i> 
            Gestión de Proyectos
        </h1>
        <Link to="/projects/new">
          <Button 
            label="Nuevo Proyecto" 
            icon="pi pi-plus" 
            severity="success" 
            size="large"
          />
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-6">
          <ProgressSpinner style={{width: '50px', height: '50px'}} strokeWidth="4" animationDuration=".8s" />
          <p className="mt-3 text-lg text-600">Cargando la lista de proyectos...</p>
        </div>
      ) : projects.length === 0 ? (
        <div className="surface-200 border-round p-5 text-center">
          <i className="pi pi-info-circle text-6xl text-blue-500"></i>
          <h3 className="mt-3">Aún no hay proyectos registrados.</h3>
          <p className="text-500">¡Sé el primero en crear uno y empieza a generar impacto!</p>
        </div>
      ) : (
        <DataView 
            value={projects} 
            layout="grid" 
            itemTemplate={itemTemplate} 
            paginator 
            rows={9}
            emptyMessage="No se encontraron proyectos."
            className="p-dataview-grid"
        />
      )}
    </div>
  );
};

export default ProjectsView;