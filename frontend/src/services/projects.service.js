import api from "./api"; 

const projectService = {
    getAll: () => api.get("/projects"),
    getById: (id) => api.get(`/projects/${id}`),
    create: (payload) => api.post("/projects", payload),
    update: (id, payload) => api.put(`/projects/${id}`, payload),
    remove: (id) => api.delete(`/projects/${id}`)
};

export default projectService;
