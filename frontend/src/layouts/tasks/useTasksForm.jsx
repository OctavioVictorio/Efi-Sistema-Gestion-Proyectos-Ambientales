import { useState } from "react";

// Estado inicial para una nueva tarea
const initialFormState = {
    titulo: "",
    descripcion: "",
    proyectoId: null, // ID del proyecto al que pertenece la tarea
    fechaVencimiento: null, // Usaremos Date objects para PrimeReact Calendar
    estado: "Pendiente" // Puede ser 'Pendiente', 'En Progreso', 'Completada'
};

const useTasksForm = () => {
    const [formData, setFormData] = useState(initialFormState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Función para manejar componentes que devuelven objetos o valores complejos (como Dropdown/Calendar)
    const handleComplexChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return {
        formData,
        setFormData,
        handleChange,
        handleComplexChange,
        initialFormState // Útil para resetear el formulario
    };
};

export default useTasksForm;