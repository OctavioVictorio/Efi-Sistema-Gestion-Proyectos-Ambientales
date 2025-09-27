import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Card } from "primereact/card";

const ResetPassword = () =>{

    // 1. Esquema de Validación
    const resetSchema = Yup.object({
        password: Yup.string().min(6, "Mínimo 6 caracteres").required('La contraseña es requerida'),
        confirm: Yup.string().oneOf([Yup.ref("password")], "Las contraseñas no coinciden").required('Repite la contraseña')
    });

    // 2. Hooks y Estados
    const {resetPassword} = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [params, setParams] = useState({token: '', id:''});
    
    // 3. Capturar ID y Token de la URL
    useEffect(()=>{
        const url = new URLSearchParams(window.location.search);
        setParams({token: url.get("token") || "", id: url.get('id') || ''});
    }, []);

    // 4. Verificación de Enlace
    const invalidLink = !params.token || !params.id;

    // 5. Renderizado
    return(
        <div className="flex justify-content-center align-items-center min-h-screen surface-ground">
            <Card 
                title={invalidLink ? 'Enlace Inválido' : 'Establecer Nueva Contraseña'} 
                className="w-full md:w-25rem shadow-3 text-center"
            >
                {invalidLink ? (
                    <div>
                        <h5 className="p-error">El enlace de restablecimiento es inválido o incompleto.</h5>
                        <p className="mb-4">Asegúrate de copiarlo completo desde tu correo electrónico.</p>
                        <Link to="/forgot-password">
                            <Button label="Solicitar Nuevo Enlace" icon="pi pi-envelope" />
                        </Link>
                    </div>
                ) : (
                    <Formik
                        initialValues={{ password: '', confirm: '' }}
                        validationSchema={resetSchema}
                        onSubmit={async (values, {resetForm}) => {
                            setLoading(true);
                            
                            const success = await resetPassword({
                                id: params.id,
                                token: params.token,
                                contraseña: values.password 
                            });

                            if (success) {
                                resetForm();
                                navigate("/login"); 
                            }
                            setLoading(false);
                        }}
                    >
                        {({ values, handleChange, handleBlur, errors, touched }) => (
                            <Form className="p-fluid flex flex-column gap-3">
                                <div>
                                    <label htmlFor="password">Nueva Contraseña</label>
                                    <Password
                                        id="password"
                                        name="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        feedback={false}
                                        placeholder="Nueva contraseña"
                                        className={errors.password && touched.password ? 'p-invalid' : ''}
                                        disabled={loading}
                                    />
                                    <ErrorMessage name="password" component="small" className="p-error block mt-1" />
                                </div>
                                
                                <div>
                                    <label htmlFor="confirm">Repetir Contraseña</label>
                                    <Password
                                        id="confirm"
                                        name="confirm"
                                        value={values.confirm}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        feedback={false}
                                        placeholder="Repetir contraseña"
                                        className={errors.confirm && touched.confirm ? 'p-invalid' : ''}
                                        disabled={loading}
                                    />
                                    <ErrorMessage name="confirm" component="small" className="p-error block mt-1" />
                                </div>
                                
                                <Button 
                                    type="submit"
                                    label="Guardar Contraseña"
                                    icon={loading ? "pi pi-spin pi-spinner" : 'pi pi-lock-open'}
                                    className="mt-3"
                                    disabled={loading}
                                />
                            </Form>
                        )}
                    </Formik>
                )}
            </Card>
        </div>
    );
}

export default ResetPassword;