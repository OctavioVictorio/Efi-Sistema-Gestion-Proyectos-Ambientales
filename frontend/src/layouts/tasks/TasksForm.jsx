import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useTasks } from "../../context/TaskContext";
import { useProjects } from "../../context/ProjectContext";
import { useAuth } from "../../context/AuthContext";
import useTasksForm from "./useTasksForm";
import { notifySuccess, notifyError } from "../../utils/Notifier";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";

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
const { user } = useAuth();
const { formData, handleChange, setFormData, handleComplexChange } = useTasksForm();

const [users, setUsers] = useState([]);
const usersLoading = false;

const isVoluntario = user && user.rol === "voluntario";
const isCreating = !id;
const disableMainFields = isVoluntario && !isCreating;
const isFormDisabled = loading || projectsLoading || usersLoading;

const normalizeData = (task) => {
    if (!task) return {};
    return {
        ...task,
        fechaVencimiento: task.fecha_limite ? new Date(task.fecha_limite) : null,
        proyectoId: task.id_proyecto ? Number(task.id_proyecto) : null,
        titulo: task.nombre,
        asignado_a: task.asignado_a ? Number(task.asignado_a) : null,
    };
};

// ✅ Corrección: permitimos que los voluntarios editen cualquier tarea
// pero seguimos bloqueando la creación de nuevas tareas
useEffect(() => {
    // Cargamos usuarios de prueba si no hay ninguno (independientemente del rol)
    if (users.length === 0) {
        setUsers([
            { id: 10, nombreCompleto: "Admin Test" },
            { id: 12, nombreCompleto: "Voluntario A" },
            { id: 13, nombreCompleto: "Voluntario B" },
        ]);
    }

    // Si estamos editando una tarea existente
    if (id && tasks.length > 0) {
        const task = tasks.find((t) => t.id === Number(id));

        if (task) {
            setFormData(normalizeData(task));
        } else {
            navigate("/tasks");
        }
    }
    // Si es creación y el usuario es voluntario → no permitido
    else if (!id && isVoluntario) {
        notifyError("Permiso Denegado", "El voluntario no puede crear tareas.");
        navigate("/tasks");
    }
    // Si es creación normal (admin/gestor)
    else if (!id) {
        setFormData({
            titulo: "",
            descripcion: "",
            proyectoId: null,
            fechaVencimiento: null,
            estado: "Pendiente",
            asignado_a: null,
        });
    }
}, [id, tasks, setFormData, isVoluntario, navigate, users.length]);

const handleSubmit = async (e) => {
    e.preventDefault();

    let payload = {};
    let success = false;

    if (id) {
        // ✅ Ahora los voluntarios también pueden editar cualquier campo
        if (!formData.titulo || formData.titulo.trim().length < 2) {
            notifyError("Validación", "El título de la tarea es obligatorio.");
            return;
        }
        if (!formData.proyectoId) {
            notifyError("Validación", "Debe seleccionar un proyecto asociado.");
            return;
        }

        payload = {
            nombre: formData.titulo,
            descripcion: formData.descripcion,
            id_proyecto: Number(formData.proyectoId),
            fecha_limite: formData.fechaVencimiento
                ? formData.fechaVencimiento.toISOString().split("T")[0]
                : null,
            estado: formData.estado,
            asignado_a: formData.asignado_a || null,
        };

        success = await updateTask(Number(id), payload);
        if (success) notifySuccess("Actualización Exitosa", `Tarea "${formData.titulo}" actualizada.`);
    } else {
        // Creación de tareas (solo admin/gestor)
        payload = {
            nombre: formData.titulo,
            descripcion: formData.descripcion,
            id_proyecto: Number(formData.proyectoId),
            fecha_limite: formData.fechaVencimiento
                ? formData.fechaVencimiento.toISOString().split("T")[0]
                : null,
            estado: formData.estado,
            asignado_a: formData.asignado_a || null,
        };
        success = await createTask(payload);
        if (success) notifySuccess("Creación Exitosa", `Tarea "${formData.titulo}" creada.`);
    }

    if (success) navigate("/tasks");
    else notifyError("Error al guardar", "Hubo un error desconocido al guardar la tarea.");
};

const header = (
    <div className="flex align-items-center gap-2">
        <i className={`pi ${id ? "pi-pencil" : "pi-plus-circle"} text-3xl`}></i>
        <h4 className="mb-0 text-xl font-semibold">
            {id ? "Editar Tarea" : "Nueva Tarea"}
        </h4>
    </div>
);

return (
    <div className="flex justify-content-center p-5 surface-ground">
        <Card
            title={header}
            className="w-full md:w-8 shadow-4 surface-card"
            style={{ borderRadius: "12px" }}
        >
            <form onSubmit={handleSubmit} className="p-fluid grid formgrid gap-3">
                <div className="field col-12">
                    <label htmlFor="titulo" className="font-semibold mb-2 block">
                        Título <span className="text-red-500">*</span>
                    </label>
                    <InputText
                        id="titulo"
                        name="titulo"
                        value={formData.titulo}
                        onChange={handleChange}
                        disabled={isFormDisabled || disableMainFields}
                    />
                </div>

                <div className="field col-12 md:col-6">
                    <label htmlFor="proyectoId" className="font-semibold mb-2 block">
                        Proyecto Asociado <span className="text-red-500">*</span>
                    </label>
                    <Dropdown
                        id="proyectoId"
                        value={formData.proyectoId}
                        onChange={(e) => handleComplexChange("proyectoId", e.value)}
                        options={projects}
                        optionLabel="nombre"
                        optionValue="id"
                        placeholder={
                            projectsLoading
                                ? "Cargando proyectos..."
                                : "Selecciona un proyecto"
                        }
                        showClear
                        disabled={isFormDisabled || projectsLoading || disableMainFields}
                    />
                </div>

                {!isVoluntario && (
                    <div className="field col-12 md:col-6">
                        <label htmlFor="asignado_a" className="font-semibold mb-2 block">
                            Asignar a Voluntario
                        </label>
                        <Dropdown
                            id="asignado_a"
                            value={formData.asignado_a}
                            onChange={(e) => handleComplexChange("asignado_a", e.value)}
                            options={users}
                            optionLabel="nombreCompleto"
                            optionValue="id"
                            placeholder={
                                usersLoading ? "Cargando usuarios..." : "Sin asignar"
                            }
                            showClear
                            disabled={isFormDisabled || usersLoading}
                        />
                    </div>
                )}

                <div className="field col-12 md:col-6">
                    <label htmlFor="estado" className="font-semibold mb-2 block">
                        Estado
                    </label>
                    <Dropdown
                        id="estado"
                        value={formData.estado}
                        onChange={(e) => handleComplexChange("estado", e.value)}
                        options={taskStatusOptions}
                        placeholder="Selecciona el estado"
                        disabled={isFormDisabled}
                    />
                </div>

                <div className="field col-12 md:col-6">
                    <label htmlFor="fechaVencimiento" className="font-semibold mb-2 block">
                        Fecha de Vencimiento
                    </label>
                    <Calendar
                        id="fechaVencimiento"
                        name="fechaVencimiento"
                        value={formData.fechaVencimiento}
                        onChange={(e) =>
                            handleComplexChange("fechaVencimiento", e.value)
                        }
                        dateFormat="dd/mm/yy"
                        showIcon
                        disabled={isFormDisabled || disableMainFields}
                    />
                </div>

                <div className="field col-12">
                    <label htmlFor="descripcion" className="font-semibold mb-2 block">
                        Descripción
                    </label>
                    <InputTextarea
                        id="descripcion"
                        name="descripcion"
                        rows={4}
                        value={formData.descripcion}
                        onChange={handleChange}
                        disabled={isFormDisabled || disableMainFields}
                    />
                </div>

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
                        label={
                            id
                                ? "Guardar Cambios"
                                : "Crear Tarea"
                        }
                        icon={
                            isFormDisabled
                                ? "pi pi-spin pi-spinner"
                                : id
                                ? "pi pi-save"
                                : "pi pi-check"
                        }
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