import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Password } from "primereact/password";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom"; 

const RegisterForm = () => {
    const { register } = useContext(AuthContext);
    const navigate = useNavigate(); 

    const initialValues = {
        nombre: "",
        email: "",    
        password: "", 
        edad: null,
    };

    const validationSchema = Yup.object({
        nombre: Yup.string().required("Campo requerido"),
        email: Yup.string().email("Correo electrónico inválido").required("Campo requerido"),
        password: Yup.string()
            .min(6, "Mínimo 6 caracteres")
            .required("Campo requerido"),
        edad: Yup.number()
            .typeError("La edad debe ser un número")
            .min(1, "La edad debe ser mayor a 0")
            .required("Campo requerido"),
    });

    const onSubmit = async (values, { setSubmitting }) => {
        setSubmitting(true);
        await register(values); 
        setSubmitting(false);
    };

    return (
        <div className="flex justify-content-center align-items-center min-h-screen surface-ground">
            <Card title="Registrarse" className="w-full md:w-25rem shadow-3">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                {({ handleChange, values, setFieldValue, isSubmitting }) => (
                    <Form className="p-fluid flex flex-column gap-3">
                        {/* Nombre */}
                        <div className="field">
                            <label htmlFor="nombre">Nombre</label>
                            <InputText
                                id="nombre"
                                name="nombre"
                                value={values.nombre}
                                onChange={handleChange}
                                disabled={isSubmitting}
                                autoComplete="name"
                            />
                            <ErrorMessage
                                name="nombre"
                                component="div"
                                className="p-error text-sm"
                            />
                        </div>

                        {/* Email */}
                        <div className="field">
                            <label htmlFor="email">Correo Electrónico</label>
                            <InputText
                                id="email"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                disabled={isSubmitting}
                                autoComplete="email"
                            />
                            <ErrorMessage
                                name="email"
                                component="div"
                                className="p-error text-sm"
                            />
                        </div>

                        {/* Password */}
                        <div className="field">
                            <label htmlFor="password">Contraseña</label>
                            <Password
                                inputId="password"   // <-- importante para accesibilidad
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                toggleMask
                                feedback={false}
                                disabled={isSubmitting}
                                pt={{ input: { autoComplete: "new-password" } }}
                            />
                            <ErrorMessage
                                name="password"
                                component="div"
                                className="p-error text-sm"
                            />
                        </div>

                        {/* Edad */}
                        <div className="field">
                            <label htmlFor="edad">Edad</label>
                            <InputNumber
                                id="edad"
                                name="edad"
                                value={values.edad}
                                onValueChange={(e) => setFieldValue("edad", e.value)}
                                min={1}
                                max={90}
                                disabled={isSubmitting}
                            />
                            <ErrorMessage
                                name="edad"
                                component="div"
                                className="p-error text-sm"
                            />
                        </div>

                        {/* Botón de Envío */}
                        <Button 
                            label={isSubmitting ? "Registrando..." : "Registrarse"} 
                            icon="pi pi-user-plus"
                            type="submit" 
                            className="mt-4"
                            disabled={isSubmitting}
                        />

                        {/* Navegación */}
                        <Button
                            label="¿Ya tienes una cuenta? Inicia sesión"
                            link
                            className="mt-2"
                            onClick={() => navigate("/login")} 
                        />
                    </Form>
                )}
                </Formik>
            </Card>
        </div>
    );
};

export default RegisterForm;
