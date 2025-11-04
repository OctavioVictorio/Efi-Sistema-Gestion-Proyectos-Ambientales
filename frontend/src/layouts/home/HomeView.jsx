import { useAuth } from '../../context/AuthContext';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

const HomeView = () => {
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    
    const renderLandingPage = () => (
    <div className="surface-ground">
        <div className="text-center p-6 md:p-8 relative" 
            style={{ 
                minHeight: '65vh', 
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                backgroundImage: 'url("/portada.jpg")', 
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative',
                zIndex: 1 
            }}>
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 43, 91, 0.75)', 
                zIndex: 0 
            }}></div>

            {/* Contenido (título, párrafo, botones) */}
            <div style={{ position: 'relative', zIndex: 2, color: 'white' }}> 
                <div className="text-5xl md:text-7xl font-bold mb-3">
                    Transforma la acción en <span style={{ color: '#2a9d8f' }}>IMPACTO AMBIENTAL.</span>
                </div>
                <p className="text-xl mb-5 mx-auto" style={{ maxWidth: '800px', opacity: 0.9 }}>
                    Únete a la red de voluntarios que están cambiando el planeta, organizando y gestionando proyectos ecológicos.
                </p>
                <div className="flex justify-content-center gap-3 mt-4">
                    {!user && (
                        <Button 
                            label="Únete Ahora" 
                            icon="pi pi-leaf" 
                            className="p-button-lg" 
                            style={{ 
                                backgroundColor: '#2a9d8f', 
                                borderColor: '#2a9d8f', 
                                padding: '1rem 2rem', 
                                fontSize: '1.25rem' 
                            }}
                            onClick={() => navigate('/register')}
                        />
                    )}
                    <Button 
                        label="Ver Proyectos" 
                        icon="pi pi-search" 
                        className="p-button-lg p-button-outlined" 
                        style={{ 
                            color: 'white', 
                            borderColor: 'white', 
                            padding: '1rem 2rem', 
                            fontSize: '1.25rem' 
                        }}
                        onClick={() => navigate('/projects')}
                    />
                </div>
            </div>
        </div>

            {/* MISIÓN/VALORES */}
            <div className="grid container mx-auto py-8 md:py-10 px-4">
                <div className="col-12 text-center mb-6">
                    <h2 className="text-5xl md:text-7xl font-bold mb-3">Nuestra <span style={{ color: '#2a9d8f' }}>Misión</span></h2>
                    <p className="text-lg text-500 mt-2">Nuestros tres pilares para un cambio sostenible.</p>
                </div>
                
                {/* CONEXIÓN */}
                <div className="col-12 md:col-4">
                    <Card className="shadow-4 text-center h-full transition-all transition-duration-300 hover:shadow-6" 
                        title={<span className="text-xl font-bold">Conexión</span>}>
                        <i className="pi pi-users text-6xl mb-4" style={{ color: '#2a9d8f' }}></i>
                        <p className="text-lg text-700">Conecta a voluntarios apasionados con las organizaciones que necesitan ayuda en el campo.</p>
                    </Card>
                </div>
                
                {/* ORGANIZACIÓN */}
                <div className="col-12 md:col-4">
                    <Card className="shadow-4 text-center h-full transition-all transition-duration-300 hover:shadow-6"
                        title={<span className="text-xl font-bold">Organización</span>}>
                        <i className="pi pi-sitemap text-6xl mb-4" style={{ color: '#2a9d8f' }}></i>
                        <p className="text-lg text-700">Gestiona tareas, proyectos y recursos de forma eficiente para maximizar el impacto.</p>
                    </Card>
                </div>
                
                {/* IMPACTO */}
                <div className="col-12 md:col-4">
                    <Card className="shadow-4 text-center h-full transition-all transition-duration-300 hover:shadow-6"
                        title={<span className="text-xl font-bold">Impacto</span>}>
                        <i className="pi pi-chart-line text-6xl mb-4" style={{ color: '#2a9d8f' }}></i>
                        <p className="text-lg text-700">Mide los resultados de tus acciones y celebra el progreso hacia un planeta más limpio.</p>
                    </Card>
                </div>
            </div>
        </div>
    );

    const renderDashboard = () => (
        <div className="p-5">
            <h1 className="text-4xl font-bold mb-3">
                ¡Hola, <span className="text-primary">{user.nombre}</span>!
            </h1>
            <p className="text-xl text-500 mb-5">
                Tu rol actual es: <span className="font-semibold">{user.rol.toUpperCase()}</span>.
            </p>

            <div className="grid">
                
                {/* TAREAS PENDIENTES */}
                <div className="col-12 md:col-4">
                    <Card className="surface-card shadow-2 hover:shadow-4 transition-duration-300 transition-all cursor-pointer"
                            onClick={() => navigate('/tasks')}>
                        <div className="flex justify-content-between align-items-center">
                            <span className="text-lg font-medium text-500">Tareas Pendientes</span>
                            <i className="pi pi-list text-3xl text-blue-500"></i>
                        </div>
                        <div className="text-4xl font-bold mt-3 mb-2">0</div> 
                        <div className="text-sm text-500">Tienes tareas esperándote.</div>
                    </Card>
                </div>

                {/* PROYECTOS ACTIVOS */}
                <div className="col-12 md:col-4">
                    <Card className="surface-card shadow-2 hover:shadow-4 transition-duration-300 transition-all cursor-pointer"
                            onClick={() => navigate('/projects')}>
                        <div className="flex justify-content-between align-items-center">
                            <span className="text-lg font-medium text-500">Proyectos Activos</span>
                            <i className="pi pi-folder-open text-3xl text-green-500"></i>
                        </div>
                        <div className="text-4xl font-bold mt-3 mb-2">0</div>
                        <div className="text-sm text-500">Proyectos en los que participas.</div>
                    </Card>
                </div>

                {/* ACCESO RÁPIDO */}
                <div className="col-12 md:col-4 flex align-items-center">
                    <Button 
                        label="Ir a Gestión Completa" 
                        icon="pi pi-cog" 
                        className="p-button-warning p-button-lg w-full"
                        onClick={() => navigate('/projects')}
                    />
                </div>
            </div>
        </div>
    );

    return (
        <main>
            {isAuthenticated ? renderDashboard() : renderLandingPage()}
        </main>
    );
};

export default HomeView;