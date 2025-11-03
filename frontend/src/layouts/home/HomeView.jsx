import { useAuth } from '../../context/AuthContext';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

const HomeView = () => {
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const renderLandingPage = () => (
        <div className="surface-ground">
            <div className="text-center p-6 md:p-8" 
                style={{ 
                    backgroundColor: '#1d3557',
                    color: 'white',
                    minHeight: '60vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}>
                <div className="text-4xl md:text-6xl font-bold mb-3">
                    Transforma la acción en <span style={{ color: '#a8dadc' }}>impacto ambiental.</span>
                </div>
                <p className="text-xl mb-5">
                    Únete a la red de voluntarios que están cambiando el planeta, organizando y gestionando proyectos ecológicos.
                </p>
                <div className="flex justify-content-center gap-3">
                    {!user && (
                        <Button 
                            label="Únete Ahora" 
                            icon="pi pi-user-plus" 
                            className="p-button-success p-button-lg" 
                            onClick={() => navigate('/register')}
                        />
                    )}
                    <Button 
                        label="Ver Proyectos" 
                        icon="pi pi-search" 
                        className="p-button-secondary p-button-lg" 
                        onClick={() => navigate('/projects')}
                    />
                </div>
            </div>

            {/* MISIÓN/VALORES */}
            <div className="grid container mx-auto py-6 md:py-8">
                <div className="col-12 text-center mb-5">
                    <h2 className="text-3xl font-bold">Nuestra Misión</h2>
                </div>
                <div className="col-12 md:col-4">
                    <Card title="Conexión" className="shadow-2 text-center h-full">
                        <i className="pi pi-share-alt text-5xl mb-3" style={{ color: '#457b9d' }}></i>
                        <p>Conecta a voluntarios apasionados con las organizaciones que necesitan ayuda en el campo.</p>
                    </Card>
                </div>
                <div className="col-12 md:col-4">
                    <Card title="Organización" className="shadow-2 text-center h-full">
                        <i className="pi pi-sitemap text-5xl mb-3" style={{ color: '#457b9d' }}></i>
                        <p>Gestiona tareas, proyectos y recursos de forma eficiente para maximizar el impacto.</p>
                    </Card>
                </div>
                <div className="col-12 md:col-4">
                    <Card title="Impacto" className="shadow-2 text-center h-full">
                        <i className="pi pi-chart-line text-5xl mb-3" style={{ color: '#457b9d' }}></i>
                        <p>Mide los resultados de tus acciones y celebra el progreso hacia un planeta más limpio.</p>
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