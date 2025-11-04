import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const isAuthenticated = !!user;
    const isAdminOrGestor = user && (user.rol === 'admin' || user.rol === 'gestor');

    const modelItems = [
        
        isAuthenticated && {
            label: 'Proyectos',
            icon: 'pi pi-folder-open',
            command: () => navigate('/projects'),
        },
        isAuthenticated && {
            label: 'Tareas',
            icon: 'pi pi-list',
            command: () => navigate('/tasks'),
        },
        isAuthenticated && {
            label: 'Recursos',
            icon: 'pi pi-box',
            command: () => navigate('/resources'),
        },

        isAdminOrGestor && {
            label: 'Gestión de Usuarios',
            icon: 'pi pi-users',
            command: () => navigate('/users-management'), 
        },
    ].filter(Boolean); 

    const start = (
        <div className="flex align-items-center gap-2 mr-4 cursor-pointer" onClick={() => navigate('/')}>
            <i className="pi pi-globe text-2xl" style={{ color: '#2a9d8f' }}></i> 
            <span className="text-xl font-bold text-white">EcoGestor</span>
        </div>
    );

    const end = isAuthenticated ? (
        <div className="flex align-items-center gap-3">
            <span className="text-sm font-semibold text-white">
                Bienvenido, <span className="font-bold" style={{ color: '#2a9d8f' }}>{user.nombre}</span> 
            </span>
            <Avatar 
                label={user.nombre.charAt(0).toUpperCase()} 
                size="large" 
                style={{ backgroundColor: '#2a9d8f', color: '#ffffff' }} 
                shape="circle" 
                title={`Rol: ${user.rol}`}
            />
            <Button 
                label="Cerrar Sesión" 
                icon="pi pi-power-off" 
                severity="danger" 
                onClick={logout} 
                className="ml-2" 
            />
        </div>
    ) : (
        <div className="flex align-items-center gap-2">
            <Link to="/login" className="no-underline">
                <Button
                    label="Iniciar Sesión"
                    icon="pi pi-sign-in"
                    className="p-button-outlined"
                    style={{ color: 'white', borderColor: 'white' }}
                />
            </Link>
            <Link to="/register" className="no-underline">
                <Button
                    label="Registrarse"
                    icon="pi pi-user-plus"
                    style={{ backgroundColor: '#2a9d8f', borderColor: '#2a9d8f' }}
                />
            </Link>
        </div>
    );


    return (
        <div className="card sticky top-0 z-5">
            <Menubar 
                model={modelItems} 
                start={start} 
                end={end} 
                className="shadow-3 border-none"
                style={{ backgroundColor: '#002b5b', borderColor: '#002b5b', color: 'white' }} 
            />
        </div>
    );
};

export default Navbar;