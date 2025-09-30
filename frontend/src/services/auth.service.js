import api from "./api";

const authService = {
    login: async (credentials) => {
        // Aseguramos que se envíen las claves correctas
        const payload = {
            email: credentials.email,
            password: credentials.password
        };
        return api.post("auth/login", payload);
    },
    register: (data) => {
        // Enviamos los campos que el backend espera
        const payload = {
            nombre: data.nombre,
            email: data.email,
            password: data.password,
            edad: data.edad
        };
        return api.post("auth/register", payload);
    },
    forgot: (correo) => api.post("auth/forgotPassword", { correo }),
    reset: (data) => {
        const payload = {
            id: Number(data.id),
            token: data.token,
            password: data.password // aseguramos enviar password y no contraseña
        };
        return api.post("auth/resetPassword", payload);
    },
};

export default authService;
