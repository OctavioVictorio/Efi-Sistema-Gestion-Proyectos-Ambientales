import api from "./api"; 

const taskService = {
    getAll: () => api.get("/tasks"),
    getById: (id) => api.get(`/tasks/${id}`),
    create: (payload) => api.post("/tasks", payload),
    update: (id, payload) => api.put(`/tasks/${id}`, payload),
    remove: (id) => api.delete(`/tasks/${id}`)
};

export default taskService;