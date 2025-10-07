import React, { useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useTasks } from "../../context/TaskContext";
import { useProjects } from "../../context/ProjectContext"; 
import useTasksForm from "./useTasksForm";

import { notifySuccess, notifyError } from "../../utils/Notifier"; 

// PrimeReact Components
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";

// Opciones de estado predefinidas
const taskStatusOptions = [
    { label: 'Pendiente', value: 'Pendiente' },
    { label: 'En Progreso', value: 'En Progreso' },
    { label: 'Completada', value: 'Completada' },
];

const TasksForm = () => {
const navigate = useNavigate();
const { id } = useParams();
const { tasks, createTask, updateTask, loading } = useTasks();
const { projects, loading: projectsLoading } = useProjects(); 
const { formData, handleChange, setFormData, handleComplexChange } = useTasksForm();


const normalizeData = (task) => {
if (!task) return {};
return {
    ...task,
    fechaVencimiento: task.fecha_limite ? new Date(task.fecha_limite) : null, 
    proyectoId: task.id_proyecto ? Number(task.id_proyecto) : null, 
    titulo: task.nombre, 
};
};

useEffect(() => {
if (id && tasks && tasks.length > 0) {
    const task = tasks.find((t) => t.id === Number(id));
    if (task) setFormData(normalizeData(task));
} else if (!id) {
    setFormData({
        titulo: "",
        descripcion: "",
        proyectoId: null, 
        fechaVencimiento: null,
        estado: "Pendiente" 
    });
}
}, [id, tasks, setFormData]);

const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación con Notifier
    if (!formData.titulo || formData.titulo.trim().length < 2) {
        notifyError("Validación", "El título de la tarea es obligatorio.");
        return;
    }
    if (!formData.proyectoId) {
        notifyError("Validación", "Debe seleccionar un proyecto asociado.");
        return;
    }

    const payload = { 
        nombre: formData.titulo, 
        descripcion: formData.descripcion,
        
        id_proyecto: Number(formData.proyectoId), 
        
        fecha_limite: formData.fechaVencimiento 
            ? formData.fechaVencimiento.toISOString().split('T')[0] 
            : null, 
        
        estado: formData.estado, 
    };

    let success = false;

    if (id) {
        success = await updateTask(Number(id), payload);
        if (success) notifySuccess("Actualización Exitosa", `Tarea "${formData.titulo}" actualizada.`);
    } else {
        success = await createTask(payload);
        if (success) notifySuccess("Creación Exitosa", `Tarea "${formData.titulo}" creada.`);
    }

    if (success) {
        navigate("/tasks");
    } else {
        notifyError("Error al guardar", "Hubo un error desconocido al guardar la tarea.");
    }
};

const header = (
    <div className="flex align-items-center gap-2">
        <i className={`pi ${id ? 'pi-pencil' : 'pi-plus-circle'} text-3xl`}></i>
        <h4 className="mb-0 text-xl font-semibold">
        {id ? "Editar Tarea" : "Nueva Tarea"}
        </h4>
    </div>
    );

const isFormDisabled = loading || projectsLoading;

    return (
        <div className="flex justify-content-center p-5 surface-ground">
            <Card 
            title={header} 
            className="w-full md:w-8 shadow-4 surface-card"
            style={{borderRadius: '12px'}}
            >
            <form onSubmit={handleSubmit} className="p-fluid grid formgrid gap-3">
                
                {/* Título */}
                <div className="field col-12">
                <label htmlFor="titulo" className="font-semibold mb-2 block">Título <span className="text-red-500">*</span></label>
                <InputText
                    id="titulo"
                    name="titulo"
                    value={formData.titulo}
                    onChange={handleChange}
                    required
                    disabled={isFormDisabled}
                />
                </div>

                {/* Proyecto Asociado */}
                <div className="field col-12 md:col-6">
                <label htmlFor="proyectoId" className="font-semibold mb-2 block">Proyecto Asociado <span className="text-red-500">*</span></label>
                <Dropdown
                    id="proyectoId"
                    value={formData.proyectoId}
                    onChange={(e) => handleComplexChange("proyectoId", Number(e.value))}
                    options={projects}
                    optionLabel="nombre"
                    optionValue="id"
                    placeholder={projectsLoading ? "Cargando proyectos..." : "Selecciona un proyecto"}
                    showClear 
                    disabled={isFormDisabled || projectsLoading}
                />
                </div>

                {/* Estado de la Tarea (Solo visible al editar/crear) */}
                <div className="field col-12 md:col-6">
                <label htmlFor="estado" className="font-semibold mb-2 block">Estado</label>
                <Dropdown
                    id="estado"
                    value={formData.estado}
                    onChange={(e) => handleComplexChange("estado", e.value)}
                    options={taskStatusOptions}
                    placeholder="Selecciona el estado"
                    disabled={isFormDisabled}
                />
                </div>

                {/* Descripción */}
                <div className="field col-12">
                <label htmlFor="descripcion" className="font-semibold mb-2 block">Descripción</label>
                <InputTextarea
                    id="descripcion"
                    name="descripcion"
                    rows={4}
                    value={formData.descripcion}
                    onChange={handleChange}
                    disabled={isFormDisabled}
                />
                </div>

                {/* Fecha de Vencimiento */}
                <div className="field col-12 md:col-6">
                <label htmlFor="fechaVencimiento" className="font-semibold mb-2 block">Fecha de Vencimiento</label>
                <Calendar
                    id="fechaVencimiento"
                    name="fechaVencimiento"
                    value={formData.fechaVencimiento}
                    onChange={(e) => handleComplexChange("fechaVencimiento", e.value)}
                    dateFormat="dd/mm/yy"
                    showIcon
                    disabled={isFormDisabled}
                />
                </div>
                
                {/* Botones de Acción */}
                <div className="col-12 flex justify-content-end gap-3 pt-4">
                <Link to="/tasks">
                    <Button 
                    label="Volver" 
                    icon="pi pi-arrow-left" 
                    severity="secondary" 
                    className="p-button-outlined"
                    type="button" 
                    disabled={isFormDisabled}
                    />
                </Link>
                <Button 
                    type="submit" 
                    label={id ? "Guardar Cambios" : "Crear Tarea"}
                    icon={isFormDisabled ? "pi pi-spin pi-spinner" : (id ? "pi pi-save" : "pi-check")}
                    severity="warning"
                    disabled={isFormDisabled}
                />
                </div>
            </form>
            </Card>
        </div>
        );
};

export default TasksForm;