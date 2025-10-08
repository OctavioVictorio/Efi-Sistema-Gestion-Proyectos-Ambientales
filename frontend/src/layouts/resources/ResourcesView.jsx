import { useResources } from '../../context/ResourceContext';
import { useProjects } from '../../context/ProjectContext'; 
import { Link } from 'react-router-dom';

// PrimeReact
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

const ResourcesView = () => {
    const { resources, loading, deleteResource } = useResources();
    const { projects } = useProjects(); 
    const projectBodyTemplate = (rowData) => {
        const project = projects.find(p => p.id === rowData.id_proyecto); 
        return project ? project.nombre : 'No asignado';
    };

    const handleDelete = async (id) => {
        if (window.confirm("¿Estás seguro de que quieres eliminar este recurso?")) {
            await deleteResource(id);
        }
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="flex gap-2">
                <Link to={`/resources/${rowData.id}/edit`}>
                    <Button icon="pi pi-pencil" className="p-button-sm p-button-warning" />
                </Link>
                <Button 
                    icon="pi pi-trash" 
                    className="p-button-sm p-button-danger" 
                    onClick={() => handleDelete(rowData.id)}
                />
            </div>
        );
    };

    const header = (
        <div className="flex justify-content-between align-items-center">
            <h3 className="m-0">Gestión de Recursos</h3>
            <Link to="/resources/new">
                <Button label="Nuevo Recurso" icon="pi pi-plus" severity="success" />
            </Link>
        </div>
    );

    return (
        <div className="p-5 surface-ground">
            <Card title={header} className="shadow-4">
                <DataTable 
                    value={resources} 
                    loading={loading}
                    dataKey="id" 
                    responsiveLayout="scroll"
                    paginator rows={10}
                >
                    <Column field="nombre" header="Nombre" sortable />
                    <Column field="tipo" header="Tipo" sortable /> 
                    <Column field="cantidad" header="Cantidad" sortable /> 
                    
                    <Column 
                        field="id_proyecto" 
                        header="Proyecto Asociado" 
                        body={projectBodyTemplate}
                        sortable 
                    />
                    
                    <Column header="Acciones" body={actionBodyTemplate} exportable={false} style={{ width: '10%' }} />
                </DataTable>
            </Card>
        </div>
    );
};

export default ResourcesView;