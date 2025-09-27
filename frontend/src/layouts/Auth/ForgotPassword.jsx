import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from 'yup'
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { Link } from 'react-router-dom';

const ForgotPassword = () =>{

    const {forgotPassword} = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    const ForgotSchema = Yup.object({
        email: Yup.string().email("Correo electrónico inválido").required('El correo electrónico es obligatorio')
    });

    return(
        <div className="flex justify-content-center align-items-center min-h-screen surface-ground">
            <Card title='Recuperar Contraseña' className="w-full md:w-25rem shadow-3">
                <p className="text-500 mb-4">Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.</p>

                <Formik
                    initialValues={{email:''}}
                    validationSchema={ForgotSchema}
                    onSubmit={async (values, {resetForm})=>{
                        setLoading(true);
                        const success = await forgotPassword(values.email); 
                        
                        if(success) {
                            resetForm();
                        }
                        
                        setLoading(false);
                    }}
                >
                    {({ errors, touched, isSubmitting }) => (
                        <Form className="p-fluid flex flex-column gap-3">
                            <div className="field">
                                <label htmlFor="email">Correo Electrónico</label>
                                <Field name='email'> 
                                    {({field})=>(
                                        <InputText 
                                            id='email' 
                                            {...field} 
                                            placeholder="ejemplo@email.com"
                                            className={errors.email && touched.email ? 'p-invalid' : ''}
                                            disabled={loading}
                                        />
                                    )}
                                </Field>
                                <ErrorMessage name="email" component="small" className="p-error block mt-1" />
                            </div>

                            <Button 
                                type="submit"
                                label="Enviar Enlace"
                                icon={loading ? "pi pi-spin pi-spinner" : 'pi pi-send'}
                                className="mt-3"
                                disabled={loading || isSubmitting}
                            />

                            <Link to="/login" className="p-button p-button-link text-center mt-2">
                                Volver al inicio de sesión
                            </Link>
                        </Form>
                    )}
                </Formik>

            </Card>
        </div>
    );
}

export default ForgotPassword;