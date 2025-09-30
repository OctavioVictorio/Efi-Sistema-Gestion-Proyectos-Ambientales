import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Componentes y Contextos
import { AuthProvider } from './context/AuthContext'; 
import { TOAST_REF } from './utils/ToastRef'; 
import Navbar from './components/Navbar'; 

// Importaciones de Layouts (Se asume la creación de estos archivos)
import HomeView from './layouts/home/HomeView'; 
import LoginForm from './layouts/Auth/LoginForm';
import RegisterForm from './layouts/Auth/RegisterForm';
import ForgotPassword from './layouts/Auth/ForgotPassword';
import ResetPassword from './layouts/Auth/ResetPassword';

// import ProjectsRoutes from './layouts/projects/ProjectsRoutes'; 
// import TasksRoutes from './layouts/tasks/TasksRoutes';    
import HomeRoutes from './layouts/home/index'

// Utilidades de Rutas
import PrivateRoute from './utils/PrivateRoute';
import PublicRoute from './utils/PublicRoute'; 
import { RequireRole } from './utils/RequireRole';

// Diseño
import { Toast } from 'primereact/toast';
import 'primereact/resources/themes/lara-dark-indigo/theme.css'; 
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


function App() {
  return (
    <Router>
      <Toast ref={TOAST_REF} position='top-right'/>
        <AuthProvider>
          <Navbar />
          <Fragment>
            <Routes>
              {/* Ruta Principal (Pública si no está logueado, luego protegida) */}
              <Route path="/*" element={<HomeRoutes />} />
              <Route path='/reset-password' element={<ResetPassword/>}/>
              {/* RUTAS PÚBLICAS Y PROTEGIDAS DE RE-ACCESO */}
              {/* Usamos PublicRoute para que no se pueda acceder si ya estás logueado */}
              <Route path='/login' element={
                <PublicRoute>
                  <LoginForm/>
                </PublicRoute>
              }/>
              
              <Route path='/register' element={
                <PublicRoute>
                  <RegisterForm/>
                </PublicRoute>
              }/>
              
              <Route path='/forgot-password' element={
                <PublicRoute>
                  <ForgotPassword/>
                </PublicRoute>
              }/>
              
              {/* RUTAS PROTEGIDAS Y AGRUPADAS */}
              
              {/* Gestión de Proyectos (Solo Admin y Gestor) */}
              {/* <Route
                path="/projects/*"
                element={
                  <PrivateRoute>
                    <RequireRole roles={['admin', 'gestor']}>
                      <ProjectsRoutes />
                    </RequireRole>
                  </PrivateRoute>
                }
              /> */}

              {/* Gestión de Tareas (Todos los roles, el componente TasksRoutes manejará sub-rutas) */}
              {/* <Route
                path="/tasks/*"
                element={
                  <PrivateRoute>
                      <TasksRoutes /> 
                  </PrivateRoute>
                }
              /> */}
              
              {/* 404 - Ruta no encontrada */}
              <Route path="*" element={<h1>404 | Página No Encontrada</h1>} />

            </Routes>
          </Fragment>
        </AuthProvider>
      </Router>
  );
}

export default App;