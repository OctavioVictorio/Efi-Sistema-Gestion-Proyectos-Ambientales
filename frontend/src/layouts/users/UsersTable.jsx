import React, { useState, useCallback } from 'react';
import { useUsers } from '../../context/UserContext';
import { useAuth } from '../../context/AuthContext'; 

// PrimeReact Components
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';
import { Dialog } from 'primereact/dialog'; 
import { Dropdown } from 'primereact/dropdown'; 
import { ToggleButton } from 'primereact/togglebutton';
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog'; 

const UsersTable = () => {
    const { users, loading, updateUser } = useUsers(); 
    const { user: currentUser } = useAuth(); 
    
    const [displayDialog, setDisplayDialog] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const canModify = currentUser?.rol === 'admin'; 

    const roleOptions = [
        { label: 'Administrador', value: 'admin' },
        { label: 'Gestor', value: 'gestor' },
        { label: 'Operador', value: 'operador' }, 
    ];

    const handleEdit = useCallback((user) => {
        if (user.id !== currentUser.id) {
            setSelectedUser(user);
            setDisplayDialog(true);
        }
    }, [currentUser?.id]); 

    const handleSave = async () => {
        if (!canModify || !selectedUser) return;

        const payload = {
            rol: selectedUser.rol,
            is_active: selectedUser.is_active,
        };

        const success = await updateUser(selectedUser.id, payload);
        
        if (success) {
            setDisplayDialog(false);
            setSelectedUser(null);
        }
    };

    const handleDeactivate = useCallback((userId, currentIsActive) => {
        if (!canModify) {
            alert("Acceso denegado: Solo los administradores pueden desactivar usuarios.");
            return;
        }

        const newIsActive = !currentIsActive;
        const action = newIsActive ? 'activar' : 'desactivar';

        confirmDialog({
        message: `¿Estás seguro de que quieres ${action} a este usuario?`,
        header: `${newIsActive ? 'Activación' : 'Desactivación'} de Usuario`,
        icon: newIsActive ? 'pi pi-check-circle' : 'pi pi-exclamation-triangle',
        acceptClassName: `p-button-${newIsActive ? 'success' : 'danger'}`,
        acceptLabel: newIsActive ? 'Activar' : 'Desactivar',
        rejectLabel: 'Cancelar',
        
        accept: () => {
            updateUser(userId, { is_active: newIsActive });
        },
    });

}, [canModify, updateUser]); 

    const roleBodyTemplate = (rowData) => {
        const severity = rowData.rol === 'admin' ? 'danger' : rowData.rol === 'gestor' ? 'warning' : 'info';
        return <Tag value={rowData.rol} severity={severity} />;
    };

    const isActiveBodyTemplate = (rowData) => {
        const severity = rowData.is_active ? 'success' : 'secondary';
        const text = rowData.is_active ? 'Activo' : 'Inactivo';
        return <Tag value={text} severity={severity} />;
    };
    
    const actionBodyTemplate = useCallback((rowData) => {
        const isDisabled = !canModify || rowData.id === currentUser.id; 
        const deactivateIcon = rowData.is_active ? "pi pi-lock" : "pi pi-unlock";
        const deactivateTooltip = rowData.is_active ? "Desactivar Usuario" : "Activar Usuario";
        const deactivateSeverity = rowData.is_active ? "danger" : "success";

        return (
            <div className="flex gap-2">
                {/* Botón de Edición */}
                <Button 
                    icon="pi pi-pencil" 
                    className="p-button-sm p-button-warning"
                    tooltip="Modificar Rol/Estado (Solo Admin)"
                    onClick={() => handleEdit(rowData)}
                    disabled={isDisabled} 
                />

                {/* Botón de Desactivar/Activar */}
                <Button 
                    icon={deactivateIcon}
                    className={`p-button-sm p-button-${deactivateSeverity}`}
                    tooltip={deactivateTooltip}
                    onClick={() => handleDeactivate(rowData.id, rowData.is_active)}
                    disabled={isDisabled} 
                />
            </div>
        );
    }, [canModify, currentUser?.id, handleEdit, handleDeactivate]); 

    const renderFooter = () => {
        return (
            <div>
                <Button label="Cancelar" icon="pi pi-times" onClick={() => setDisplayDialog(false)} className="p-button-text" />
                <Button label="Guardar" icon="pi pi-check" onClick={handleSave} autoFocus />
            </div>
        );
    }

    const editDialog = selectedUser && (
        <Dialog 
            header={`Editar Usuario: ${selectedUser.nombre}`} 
            visible={displayDialog} 
            style={{ width: '40vw' }} 
            footer={renderFooter()} 
            onHide={() => setDisplayDialog(false)}
        >
            <div className="p-fluid grid formgrid gap-3">
                
                <div className="field col-12">
                    <label className="font-semibold mb-2 block">Correo</label>
                    <p className="p-inputtext p-component block">{selectedUser.correo}</p>
                </div>

                <div className="field col-12">
                    <label htmlFor="rol" className="font-semibold mb-2 block">Rol</label>
                    <Dropdown
                        id="rol"
                        value={selectedUser.rol}
                        options={roleOptions}
                        onChange={(e) => setSelectedUser(prev => ({ ...prev, rol: e.value }))}
                        placeholder="Selecciona un Rol"
                    />
                </div>

                <div className="field col-12 flex align-items-center">
                    <label htmlFor="is_active" className="font-semibold mr-3">Estado Activo:</label>
                    <ToggleButton 
                        checked={selectedUser.is_active} 
                        onChange={(e) => setSelectedUser(prev => ({ ...prev, is_active: e.value }))} 
                        onLabel="Activo" 
                        offLabel="Inactivo" 
                        onIcon="pi pi-check" 
                        offIcon="pi pi-times"
                    />
                </div>
            </div>
        </Dialog>
    );


    return (
        <div className="p-5 surface-ground">
            <Card title={<h3 className="m-0">Gestión de Usuarios</h3>} className="shadow-4">
                <DataTable 
                    value={users.filter(u => u.id !== currentUser?.id)} 
                    loading={loading}
                    dataKey="id" 
                    responsiveLayout="scroll"
                    paginator rows={10}
                >
                    <Column field="correo" header="Email" sortable /> 
                    <Column field="nombre" header="Nombre" sortable />
                    <Column field="rol" header="Rol" body={roleBodyTemplate} sortable /> 
                    <Column field="is_active" header="Estado" body={isActiveBodyTemplate} sortable /> 
                    <Column header="Acciones" body={actionBodyTemplate} exportable={false} style={{ width: '15%' }} />
                </DataTable>
            </Card>
            
            {editDialog} 
        </div>
    );
};

export default UsersTable;