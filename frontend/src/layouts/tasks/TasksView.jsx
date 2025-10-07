import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTasks } from "../../context/TaskContext";
import { useProjects } from "../../context/ProjectContext"; 

import { notifySuccess, notifyError} from "../../utils/Notifier"; 

// PrimeReact Components
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { ProgressSpinner } from 'primereact/progressspinner';
import { DataTable } from 'primereact/datatable'; 
import { Column } from 'primereact/column';

const TasksView = () => {
    const { tasks, fetchTasks, deleteTask, loading } = useTasks();
    const { projects, fetchProjects } = useProjects(); 

    useEffect(() => {
        fetchTasks();
    }, []); 

    const formatDate = (val) => {
        if (!val) return "-";
        try {
        return new Date(val).toLocaleDateString();
        } catch {
        return val;
        }
    };

    const getSeverity = (estado) => {
        switch (estado) {
            case 'Completada': return 'success';
            case 'En Progreso': return 'warning';
            case 'Pendiente': return 'danger';
            default: return 'info';
        }
    };

    const statusBodyTemplate = (rowData) => {
        return (
            <Tag 
                value={rowData.estado} 
                severity={getSeverity(rowData.estado)} 
                icon={`pi ${rowData.estado === 'Completada' ? 'pi-check' : 'pi-hourglass'}`}
            />
        );
    };
    
    const projectBodyTemplate = (rowData) => {
    const project = projects.find(p => p.id === rowData.id_proyecto); 
    return project ? project.nombre : 'N/A';
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="flex gap-2">
                <Link to={`/tasks/${rowData.id}/edit`}>
                    <Button icon="pi pi-pencil" severity="secondary" rounded tooltip="Editar Tarea" />
                </Link>
                <Button 
                    icon="pi pi-trash" 
                    severity="danger" 
                    rounded 
                    tooltip="Eliminar Tarea"
                    onClick={() => handleDelete(rowData)}
                />
            </div>
        );
    };

    const handleDelete = (task) => {
        confirmDialog({
        message: `¿Estás seguro de que deseas eliminar la tarea: "${task.titulo}"?`,
        header: 'Confirmar Eliminación',
        icon: 'pi pi-exclamation-circle text-red-500', 
        acceptClassName: 'p-button-danger',
        
        accept: async () => {
            const success = await deleteTask(task.id);
            if (success) {
            notifySuccess('Eliminado', `La tarea "${task.titulo}" fue eliminada.`);
            } else {
            notifyError('Error', 'No se pudo eliminar la tarea.');
            }
        },
        });
    };


    return (
        <div className="p-5">
        <ConfirmDialog /> 

        <div className="flex justify-content-between align-items-center mb-5">
            <h1 className="text-4xl font-bold mb-0 text-900 flex align-items-center gap-2">
                <i className="pi pi-check-square text-orange-500"></i> 
                Gestión de Tareas
            </h1>
            <Link to="/tasks/new">
            <Button 
                label="Nueva Tarea" 
                icon="pi pi-plus" 
                severity="warning" 
                size="large"
            />
            </Link>
        </div>

        {loading ? (
            <div className="text-center py-6">
            <ProgressSpinner style={{width: '50px', height: '50px'}} strokeWidth="4" animationDuration=".8s" />
            <p className="mt-3 text-lg text-600">Cargando la lista de tareas...</p>
            </div>
        ) : tasks.length === 0 ? (
            <div className="surface-200 border-round p-5 text-center">
            <i className="pi pi-info-circle text-6xl text-blue-500"></i>
            <h3 className="mt-3">Aún no hay tareas registradas.</h3>
            <p className="text-500">Comienza creando una tarea para un proyecto existente.</p>
            </div>
        ) : (
            <DataTable 
                value={tasks} 
                paginator 
                rows={10} 
                dataKey="id" 
                sortMode="single"
                stripedRows
                emptyMessage="No se encontraron tareas."
                className="shadow-2"
            >
                <Column field="nombre" header="Título" sortable style={{ minWidth: '150px' }}></Column>
                <Column field="id_proyecto" header="Proyecto Asociado" body={projectBodyTemplate} sortable style={{ minWidth: '150px' }}></Column>
                <Column field="estado" header="Estado" body={statusBodyTemplate} sortable style={{ width: '150px' }}></Column>
                <Column field="fecha_limite" header="Vencimiento" sortable dataType="date" body={(rowData) => formatDate(rowData.fecha_limite)} style={{ width: '150px' }}></Column>
                <Column field="descripcion" header="Descripción" body={(rowData) => rowData.descripcion ? rowData.descripcion.substring(0, 50) + '...' : '-'}></Column>
                <Column header="Acciones" body={actionBodyTemplate} exportable={false} style={{ width: '130px' }}></Column>
            </DataTable>
        )}
        </div>
    );
};

export default TasksView;