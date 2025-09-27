import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext"; 
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";


const LoginForm = () => {
    // 1. Obtener funciones y hook
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    // 2. Valores Iniciales (Adaptados a 'correo' y 'contraseña')
    const initialValuesUser = {
        correo: "",
        contraseña: "",
    };

    // 3. Esquema de Validación (Adaptado a 'correo' y 'contraseña')
    const validationSchemaUser = Yup.object({
        correo: Yup.string().email("Correo electrónico inválido").required("Campo requerido"),
        contraseña: Yup.string().required("Campo requerido"),
    });

    // 4. Función de Envío
    const onSubmitLogin = async (values, { setSubmitting }) => {
        setSubmitting(true);
        await login(values);
        setSubmitting(false);
    };

    return (
        <div className="flex justify-content-center align-items-center min-h-screen surface-ground">
            <Card title="Iniciar sesión" className="w-full md:w-25rem shadow-3">
                <Formik
                    initialValues={initialValuesUser}
                    validationSchema={validationSchemaUser}
                    onSubmit={onSubmitLogin}
                >
                {({ handleChange, values, isSubmitting }) => (
                    <Form className="p-fluid flex flex-column gap-3">
                        
                        {/* Campo Correo */}
                        <div className="field">
                            <label htmlFor="correo">Correo Electrónico</label>
                            <InputText
                                name="correo"
                                id="correo"
                                value={values.correo}
                                onChange={handleChange}
                                disabled={isSubmitting}
                            />
                            <ErrorMessage
                                name="correo"
                                component="div"
                                className="p-error text-sm"
                            />
                        </div>

                        {/* Campo Contraseña */}
                        <div className="field">
                            <label htmlFor="contraseña">Contraseña</label>
                            <Password
                                name="contraseña"
                                id="contraseña"
                                value={values.contraseña}
                                onChange={handleChange}
                                toggleMask
                                feedback={false} 
                                disabled={isSubmitting}
                            />
                            <ErrorMessage
                                name="contraseña"
                                component="div"
                                className="p-error text-sm"
                            />
                        </div>

                        {/* Botón de Envío */}
                        <Button 
                            label={isSubmitting ? "Cargando..." : "Iniciar Sesión"}
                            icon="pi pi-sign-in"
                            type="submit" 
                            className="mt-4"
                            disabled={isSubmitting}
                        />

                        {/* Botones de Navegación */}
                        <Button
                            label="¿No tienes una cuenta? Regístrate."
                            link
                            onClick={() => navigate("/register")}
                        />
                        <Button
                            label="¿Olvidaste tu contraseña?"
                            link
                            onClick={() => navigate("/forgot-password")} 
                        />
                    </Form>
                )}
                </Formik>
            </Card>
        </div>
    );
};

export default LoginForm;