import api from "./api"; 

// Servicio centralizado de proyectos
const projectService = {
    getAll: () => api.get("/projects"),
    getById: (id) => api.get(`/projects/${id}`),
    create: (data) => api.post("/projects", data),
    update: (id, data) => api.put(`/projects/${id}`, data),
    remove: (id) => api.delete(`/projects/${id}`)
};

export default projectService;
