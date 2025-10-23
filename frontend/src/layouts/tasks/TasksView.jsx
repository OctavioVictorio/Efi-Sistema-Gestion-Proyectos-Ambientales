import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTasks } from "../../context/TaskContext";
import { useProjects } from "../../context/ProjectContext"; 
import { useAuth } from "../../context/AuthContext";


import { notifySuccess, notifyError} from "../../utils/Notifier"; 

// PrimeReact Components
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { ProgressSpinner } from 'primereact/progressspinner';
import { DataTable } from 'primereact/datatable'; 
import { Column } from 'primereact/column';

const TasksView = () => {
    // 1. OBTENCIÓN DE DATOS Y ESTADOS DE CARGA
    const { tasks, fetchTasks, deleteTask, loading: tasksLoading } = useTasks(); 
    const { projects, fetchProjects, loading: projectsLoading } = useProjects(); 
    
    const { user, loading: authLoading } = useAuth(); 
    const navigate = useNavigate();

    const isCurrentUserVoluntario = user?.rol === 'voluntario';
    
    // Bandera de Carga Global
    const isGlobalLoading = tasksLoading || authLoading || projectsLoading; 
    
    // 2. EFECTO DE CARGA ESTABLE
    useEffect(() => {
        // Depender de authLoading para garantizar que el 'user' esté cargado antes de hacer fetch
        if (!authLoading) { 
            fetchTasks();
            fetchProjects();
        }
    }, [authLoading]); 

    const formatDate = (val) => {
        if (!val) return "-";
        try {
        return new Date(val).toLocaleDateString();
        } catch {
        return val;
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

    // 3. actionBodyTemplate (Lógica de permisos robusta - CORRECCIÓN DE TIPOS FINAL)
    const actionBodyTemplate = (rowData) => {
        
        if (isGlobalLoading) {
            return null; 
        }

        // ***** SOLUCIÓN DEFINITIVA DE TIPOS: FORZAR a NUMBER la comparación *****
        // 1. Convertimos el ID del usuario del token a un número entero.
        const currentUserIdNumber = user?.id ? parseInt(user.id) : null;
        
        // 2. Usamos el ID de la tarea asignada tal cual viene (Sequelize lo da como Number o String/Number).
        const taskAssignedId = rowData.asignado_a; 

        // 3. Comprobación de que el usuario logueado es el asignado a esta tarea.
        // Usamos comparación estricta de Number (int) contra el ID de la BD.
        const isAssignedUser = taskAssignedId === currentUserIdNumber;

        // Permisos de Edición: 
        // Admin/Gestor SIEMPRE puede editar.
        // Voluntario SOLO si es la tarea asignada (isAssignedUser es true).
        const canEdit = !isCurrentUserVoluntario || (isCurrentUserVoluntario && isAssignedUser);

        // Permiso de Eliminación: Solo Admin/Gestor.
        // **ESTO ES LO QUE SOLICITAS:** El voluntario NUNCA puede eliminar.
        const canDelete = !isCurrentUserVoluntario;
        
        // 🚨 DEBUG CRÍTICO: Descomenta esto para ver qué valores no coinciden en la consola del navegador:
        /*
        if (isCurrentUserVoluntario && !canEdit) {
            console.warn(`SIN ACCIONES para la tarea ${rowData.nombre}. Valores fallidos:`, {
                ID_Tarea_Asignada_DB: taskAssignedId, // Valor original de la BD (probablemente Number)
                ID_Usuario_Logueado_NUMBER: currentUserIdNumber, // Valor forzado a Number
                Coinciden_con_Number: taskAssignedId === currentUserIdNumber
            });
        }
        */

        
        return (
            <div className="flex gap-2">
                    <Button 
                        icon="pi pi-pencil" 
                        severity="secondary" 
                        rounded 
                        tooltip="Editar Tarea"
                        onClick={() => navigate(`/tasks/${rowData.id}/edit`)} 
                    />
                
                {/* Botón de Eliminar (VISIBLE SOLO si canDelete es true, o sea, NO es voluntario) */}
                {canDelete && (
                    <Button 
                        icon="pi pi-trash" 
                        severity="danger" 
                        rounded 
                        tooltip="Eliminar Tarea"
                        onClick={() => handleDelete(rowData)}
                    />
                )}
            </div>
        );
    };

    const handleDelete = (task) => {
        confirmDialog({
        // Cambiado task.titulo a task.nombre si "nombre" es el campo que contiene el título
        message: `¿Estás seguro de que deseas eliminar la tarea: "${task.nombre}"?`,
        header: 'Confirmar Eliminación',
        icon: 'pi pi-exclamation-circle text-red-500', 
        acceptClassName: 'p-button-danger',
        
        accept: async () => {
            const success = await deleteTask(task.id);
            // Cambiado task.titulo a task.nombre
            if (success) {
            notifySuccess('Eliminado', `La tarea "${task.nombre}" fue eliminada.`);
            } else {
            notifyError('Error', 'No se pudo eliminar la tarea.');
            }
        },
        });
    };

    const canUserCreate = user?.rol === 'admin' || user?.rol === 'gestor';

    // *** LÓGICA DE MENSAJES PARA CERO TAREAS ***
    const EmptyMessage = () => {
        if (isCurrentUserVoluntario) {
            return {
                title: "¡Estás al día!",
                subtitle: "No tienes ninguna tarea asignada pendiente o en curso.",
                icon: "pi-check-circle text-green-500"
            };
        }
        return {
            title: "Aún no hay tareas registradas.",
            subtitle: "Comienza creando una tarea para un proyecto existente.",
            icon: "pi-info-circle text-blue-500"
        };
    };
    const emptyMsg = EmptyMessage();
    // *********************************************************

    return (
        <div className="p-5">
        <ConfirmDialog /> 

        <div className="flex justify-content-between align-items-center mb-5">
            <h1 className="text-4xl font-bold mb-0 text-900 flex align-items-center gap-2">
                <i className="pi pi-check-square text-orange-500"></i> 
                Gestión de Tareas
            </h1>
            
            {/* Botón Nueva Tarea: Solo para Admin/Gestor */}
            {canUserCreate && (
                <Link to="/tasks/new">
                <Button 
                    label="Nueva Tarea" 
                    icon="pi pi-plus" 
                    severity="warning" 
                    size="large"
                />
                </Link>
            )}
        </div>

        {/* Carga o Datos */}
        {isGlobalLoading ? (
            <div className="text-center py-6">
            <ProgressSpinner style={{width: '50px', height: '50px'}} strokeWidth="4" animationDuration=".8s" />
            <p className="mt-3 text-lg text-600">Cargando la lista de tareas y verificando permisos...</p>
            </div>
        ) : tasks.length === 0 ? (
            <div className="surface-200 border-round p-5 text-center">
                <i className={`pi ${emptyMsg.icon} text-6xl`}></i>
                <h3 className="mt-3">{emptyMsg.title}</h3>
                <p className="text-500">{emptyMsg.subtitle}</p>
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