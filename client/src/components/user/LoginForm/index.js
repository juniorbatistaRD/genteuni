import React, { useContext } from "react";
import Parse from "parse";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextField, ErrorMessage } from "../../formikFields";
import styles from "./index.module.css";
import Button from "../../common/Button";
import FacebookLogin from "../FacebookLogin";
import { AuthContext } from "../../../contexts/AuthContext";
import showAlert from "../../../helpers/showAlert/showAlert";

function LoginForm() {
  const { setCurrentUser } = useContext(AuthContext);

  return (
    <div className={styles.container}>
      <Formik
        initialValues={{
          email: "",
          password: ""
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Correo invalido")
            .required("Correo requerido"),

          password: Yup.string()
            .min(6, "Codigo secreto muy corto")
            .required("Se te olvido tu codigo secreto")
        })}
        onSubmit={async values => {
          try {
            await Parse.User.logIn(values.email, values.password);
            setCurrentUser(Parse.User.current());
          } catch {
            showAlert({
              text: "Contraseña o Correo Incorrecto",
              type: "error"
            });
          }
        }}
      >
        {props => (
          <Form className={styles.form}>
            <TextField placeholder="Tu correo" name="email" type="email" />
            <ErrorMessage name="email" />
            <TextField
              placeholder="Tu codigo secreto"
              name="password"
              type="password"
            />
            <ErrorMessage name="password" />
            <span className={styles.text}>¿Olvidaste tu contraseña?</span>
            <div className={styles.btns_container}>
              <FacebookLogin className={styles.facebook_button} />
              <Button
                className={styles.submit_button}
                loading={props.isSubmitting}
                type="submit"
              >
                Iniciar
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default LoginForm;
