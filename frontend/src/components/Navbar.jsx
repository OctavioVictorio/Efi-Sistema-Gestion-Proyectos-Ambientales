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
        {
            label: 'Home',
            icon: 'pi pi-home',
            command: () => navigate('/')
        },
        
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

        isAdminOrGestor && {
            label: 'Gestión de Usuarios',
            icon: 'pi pi-users',
            command: () => navigate('/users-management'), 
        },
    ].filter(Boolean); 

    // 2. Elemento de Inicio (Logo y Título)
    const start = (
        <div className="flex align-items-center gap-2 mr-4 cursor-pointer" onClick={() => navigate('/')}>
            <i className="pi pi-globe text-2xl text-white"></i> 
            <span className="text-xl font-bold text-white">EcoGestor</span>
        </div>
    );

    // 3. Elementos del Extremo Derecho (Autenticación o Usuario)
    const end = isAuthenticated ? (
        <div className="flex align-items-center gap-3">
            <span className="text-sm font-semibold text-white">
                Bienvenido, <span className="font-bold text-yellow-300">{user.nombre}</span>
            </span>
            <Avatar 
                label={user.nombre.charAt(0).toUpperCase()} 
                size="large" 
                style={{ backgroundColor: '#4caf50', color: '#ffffff' }} 
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
                    className="p-button-outlined p-button-secondary"
                />
            </Link>
            <Link to="/register" className="no-underline">
                <Button
                    label="Registrarse"
                    icon="pi pi-user-plus"
                    severity="success"
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
                style={{ backgroundColor: '#1d3557', borderColor: '#1d3557', color: 'white' }} 
            />
        </div>
    );
};

export default Navbar;