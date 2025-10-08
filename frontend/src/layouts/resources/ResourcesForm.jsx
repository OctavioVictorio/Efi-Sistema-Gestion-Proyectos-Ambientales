import React, { useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useResources } from '../../context/ResourceContext';
import { useProjects } from '../../context/ProjectContext'; 
import useResourcesForm from './useResourcesForm';
import { notifySuccess, notifyError } from '../../utils/Notifier'; 

// PrimeReact Components
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown'; 

const normalizeData = (resource) => {
    if (!resource) return {};
    return {
        ...resource,
        proyectoId: resource.id_proyecto ? Number(resource.id_proyecto) : null,
    };
};

const ResourcesForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { resources, createResource, updateResource, loading } = useResources();
    const { projects, loading: projectsLoading } = useProjects(); 
    const { formData, handleChange, setFormData, handleComplexChange } = useResourcesForm();

    useEffect(() => {
        if (id && resources && resources.length > 0) {
            const resource = resources.find((r) => r.id === Number(id));
            if (resource) {
                setFormData(normalizeData(resource)); 
            }
        }
    }, [id, resources, setFormData]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.nombre || formData.nombre.trim().length < 2) {
            notifyError('Validación', 'El nombre del recurso es obligatorio.');
            return;
        }
        if (!formData.proyectoId) {
            notifyError("Validación", "Debe seleccionar un proyecto asociado.");
            return;
        }

        let success = false;
        
        const payload = {
            nombre: formData.nombre,
            tipo: formData.tipo || null,
            cantidad: formData.cantidad ? Number(formData.cantidad) : 0,            
            disponible: formData.disponible !== undefined ? formData.disponible : true,
            id_proyecto: formData.proyectoId ? Number(formData.proyectoId) : null 
        };

        if (id) {
            success = await updateResource(Number(id), payload);
            if (success) notifySuccess('Actualización Exitosa', `Recurso "${formData.nombre}" actualizado.`);
        } else {
            success = await createResource(payload);
            if (success) notifySuccess('Creación Exitosa', `Recurso "${formData.nombre}" creado.`);
        }

        if (success) {
            navigate('/resources');
        } else {
            notifyError('Error al guardar', 'Hubo un error desconocido al guardar el recurso.');
        }
    };

    const header = (
        <div className="flex align-items-center gap-2">
            <i className={`pi ${id ? 'pi-pencil' : 'pi-plus-circle'} text-3xl`}></i>
            <h4 className="mb-0 text-xl font-semibold">
                {id ? 'Editar Recurso' : 'Nuevo Recurso'}
            </h4>
        </div>
    );

    const isFormDisabled = loading || projectsLoading;

    return (
        <div className="flex justify-content-center p-5 surface-ground">
            <Card 
                title={header} 
                className="w-full md:w-8 shadow-4 surface-card"
                style={{ borderRadius: '12px' }}
            >
                <form onSubmit={handleSubmit} className="p-fluid grid formgrid gap-3">
                    
                    {/* Nombre */}
                    <div className="field col-12">
                        <label htmlFor="nombre" className="font-semibold mb-2 block">Nombre <span className="text-red-500">*</span></label>
                        <InputText
                            id="nombre"
                            name="nombre"
                            value={formData.nombre || ''}
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
                            disabled={isFormDisabled}
                        />
                    </div>

                    {/* Tipo */}
                    <div className="field col-12 md:col-6">
                        <label htmlFor="tipo" className="font-semibold mb-2 block">Tipo</label>
                        <InputText
                            id="tipo"
                            name="tipo"
                            value={formData.tipo || ''}
                            onChange={handleChange}
                            disabled={isFormDisabled}
                        />
                    </div>

                    {/* Cantidad */}
                    <div className="field col-12 md:col-6">
                        <label htmlFor="cantidad" className="font-semibold mb-2 block">Cantidad</label>
                        <InputNumber
                            id="cantidad"
                            name="cantidad"
                            value={formData.cantidad || 0}
                            onValueChange={e => handleChange({ target: { name: 'cantidad', value: e.value } })}
                            mode="decimal"
                            showButtons
                            min={0}
                            disabled={isFormDisabled}
                        />
                    </div>
                    
                    {/* Botones de Acción */}
                    <div className="col-12 flex justify-content-end gap-3 pt-4">
                        <Link to="/resources">
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
                            label={id ? "Guardar Cambios" : "Crear Recurso"}
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

export default ResourcesForm;