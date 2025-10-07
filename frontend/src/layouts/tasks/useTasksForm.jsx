import { useState } from "react";

const initialFormState = {
    titulo: "",
    descripcion: "",
    proyectoId: null, 
    fechaVencimiento: null, 
    estado: "Pendiente" 
};

const useTasksForm = () => {
    const [formData, setFormData] = useState(initialFormState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleComplexChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return {
        formData,
        setFormData,
        handleChange,
        handleComplexChange,
        initialFormState 
    };
};

export default useTasksForm;