import { TOAST_REF } from "./ToastRef"; 

const showToast = (severity, summary, detail) => {
    if (TOAST_REF.current) {
        TOAST_REF.current.show({
            severity: severity,
            summary: summary,
            detail: detail,
            life: 3000 
        });
    } else {
        console.error("Toast no esta inicializado (TOAST_REF.current es null)");
    }
};

export const notifyInfo = (message) => {
    showToast('info', 'Información', message);
};

export const notifySuccess = (message) => {
    showToast('success', 'Éxito', message);
};

export const notifyError = (message) => {
    showToast('error', 'Error', message);
};