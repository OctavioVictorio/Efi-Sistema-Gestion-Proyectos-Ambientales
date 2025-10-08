import api from "./api"; 

const endpoint = "/users";

const userService = {
    getAll: () => api.get(endpoint),
    update: (id, data) => api.put(`${endpoint}/${id}`, data), 
    remove: (id) => api.delete(`${endpoint}/${id}`),
};

export default userService;