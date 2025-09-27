import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
    timeout: 10000
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        let status = null;
        if (error.response) {
            status = error?.response?.status;
        }
        
        if (status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("user"); 
            window.location.href = '/login'; 
        }
        
        console.error("Error en la api:", error?.response?.data || error.message);
        
        return Promise.reject(error);
    }
);

export default api;