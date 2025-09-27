import api from "./api";

const authService = {
    login: async (credentials) => api.post("auth/login", credentials),
    register: (data) => api.post("auth/register", data),
    forgot: (correo) => api.post("auth/forgotPassword", { correo }), 
    reset: (data) => api.post("auth/resetPassword", data),
}
export default authService;