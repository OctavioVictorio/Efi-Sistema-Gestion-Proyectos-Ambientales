import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import authService from "../services/auth.service";
import { notifySuccess, notifyError } from "../utils/Notifier"; 

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const decodeUser = (token) => {
    try {
        const decoded = jwtDecode(token);
        if (!decoded.exp || decoded.exp * 1000 < Date.now()) {
            return null;
        }
        return {
            id: decoded.user.id,
            nombre: decoded.user.nombre,
            correo: decoded.user.correo, 
            rol: decoded.user.rol.toLowerCase(), 
        };
    } catch (error) {
        return null;
    }
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setLoading(false);
            return;
        }

        const userLogued = decodeUser(token);
        if (userLogued) {
            setUser(userLogued);
        } else {
            localStorage.removeItem("token");
            setUser(null);
        }
        setLoading(false);
    }, []);

    const login = async (credentials) => {
        try {
            const response = await authService.login(credentials);
            const { data, status } = response;
            
            if (status === 200) {
                const token = data?.token;
                localStorage.setItem("token", token);

                const userLogued = decodeUser(token);
                
                if (!userLogued) {
                    localStorage.removeItem("token");
                    notifyError("Token inválido o expirado"); 
                    return; 
                }
                
                setUser(userLogued); 
                notifySuccess(`¡Bienvenido, ${userLogued.nombre}!`); 
                navigate("/");
                
            } else {
                notifyError("Las credenciales son erróneas"); 
            }
        } catch (error) {
            console.log(error);
            const errorMessage = error.response?.data?.message || "Hubo un error al iniciar sesión";
            notifyError(errorMessage); 
        }
    };

    const register = async (userData) => {
        try {
            const payload = {
                nombre: userData.nombre,
                email: userData.email,
                password: userData.password,
                edad: userData.edad
            };

            const response = await authService.register(payload);
            const { status, data } = response;

            if (status === 201) {
                notifySuccess("Usuario creado exitosamente"); 
                navigate("/login"); 
            } else {
                notifyError(data?.message || "Error desconocido al registrar"); 
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Hubo un error al registrar el usuario";
            notifyError(errorMessage);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
        navigate("/login"); 
    };

    const forgotPassword = async (correo) => { 
        try {
            await authService.forgot(correo); 
            notifySuccess("Se ha enviado un email de recuperación, revisa tu correo!");
            return true;
        } catch (error) {
            console.log(error.response.data || error);
            const errorMessage = error.response?.data?.message || "Hubo un error al enviar el email de recuperación.";
            notifyError(errorMessage);
            return false;
        }
    };

    const resetPassword = async(id, token, contraseña) =>{ 
        try{
            const bodyResetPassword = {
                id: Number(id),
                token,
                contraseña
            };
            await authService.reset(bodyResetPassword)
            notifySuccess("Contraseña cambiada con exito");
            return true
        }catch (error){
            console.log(error.response.data || error);
            const errorMessage = error.response?.data?.message || "Hubo un error al cambiar la contraseña.";
            notifyError(errorMessage); 
            return false
        }
    }

    return (
        <AuthContext.Provider 
            value={{ 
                user, 
                setUser, 
                register, 
                login, 
                logout, 
                loading, 
                forgotPassword, 
                resetPassword 
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
