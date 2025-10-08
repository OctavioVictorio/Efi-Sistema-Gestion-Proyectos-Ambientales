import { useState } from 'react';

const initialFormState = {
    nombre: '',
    tipo: '',
    cantidad: 0,
    proyectoId: null,
    disponible: true,
};

const useResourcesForm = () => {
    const [formData, setFormData] = useState(initialFormState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const finalValue = e.target.type === 'checkbox' ? e.target.checked : value;

        setFormData(prev => ({
            ...prev,
            [name]: finalValue
        }));
    };

    const handleComplexChange = (name, value) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return { formData, handleChange, setFormData, handleComplexChange };
};

export default useResourcesForm;