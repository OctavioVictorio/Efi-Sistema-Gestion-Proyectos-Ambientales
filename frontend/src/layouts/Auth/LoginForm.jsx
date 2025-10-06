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
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const initialValues = {
        email: "",
        password: "",
    };

    const validationSchema = Yup.object({
        email: Yup.string().email("Email inválido").required("Campo requerido"),
        password: Yup.string().required("Campo requerido"),
    });

    const onSubmitLogin = async (values, { setSubmitting }) => {
        setSubmitting(true);
        await login(values);
        setSubmitting(false);
    };

    return (
        <div className="flex justify-content-center p-4">
            <Card title="Iniciar sesión" className="w-full md:w-25rem">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmitLogin}
                >
                {({ handleChange, values, isSubmitting }) => (
                    <Form className="p-fluid flex flex-column gap-3">
                        {/* Campo Email */}
                        <div className="field">
                            <label htmlFor="email">Email</label>
                            <InputText
                                name="email"
                                id="email"
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

                        {/* Campo Password */}
                        <div className="field">
                            <label htmlFor="password">Contraseña</label>
                            <Password
                                name="password"
                                id="password"
                                value={values.password}
                                onChange={handleChange}
                                toggleMask
                                feedback={false} 
                                disabled={isSubmitting}
                                pt={{ input: { autoComplete: "current-password" } }}
                            />
                            <ErrorMessage
                                name="password"
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
