import React, { useContext } from "react";
import queryCountries from "../../../data/queryCountries";
import {
  TextField,
  TextArea,
  SelectField,
  ErrorMessage,
  SelectCountry,
} from "../../../components/formikFields";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Button from "../../../components/common/Button";
import Title from "../../../components/common/Title";
import styles from "./ProfileForm.module.css";
import { AuthContext } from "../../../contexts/AuthContext";
import showAlert from "../../../helpers/showAlert/showAlert";

function ProfileForm() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className={styles.container}>
      <Formik
        initialValues={{
          username: currentUser.attributes.username,
          bio: currentUser.attributes.bio,
          country: currentUser.attributes.country?.id,
          gender: currentUser.attributes.gender,
        }}
        validationSchema={Yup.object({
          username: Yup.string()
            .min("4", "Tu nombre de usuario debe de ser mayor de 4 caracteres")
            .max("30", "Tu nombre de usuario es demasiado largo")
            .required("Tu nombre es requerido"),

          bio: Yup.string()
            .min("4", "Tu bio debe de ser mayor de 4 caracteres")
            .max("160", "Demasiado largo"),

          country: Yup.string(),

          gender: Yup.string(),
        })}
        onSubmit={async (values) => {
          try {
            let country;
            if (values.country) {
              country = await queryCountries.get(values.country);
            }
            currentUser.set("bio", values.bio);
            currentUser.set("country", country);
            currentUser.set("username", values.username);
            currentUser.set("gender", values.gender);
            await currentUser.save().then(() => {
              showAlert({
                type: "success",
                title: "Perfil Actualizado!",
              });
            });
          } catch (error) {
            const message =
              error.code === 202
                ? "Este nombre de usuario ya esta en uso."
                : `Hubo un error, ${
                    error.message ? error.message : error
                  } contactanos para ayudarte!`;

            showAlert({
              type: "error",
              title: "Opps",
              text: message,
            });
          }
        }}
      >
        {(props) => (
          <Form className={styles.form}>
            <Title typeStyle="secondary" text="Nombre de Usuario" />
            <TextField placeholder="Username" name="username" />
            <ErrorMessage name="username" />

            <Title typeStyle="secondary" text="Bio" />
            <TextArea
              placeholder="Inserta frase cool y motivadora"
              name="bio"
              rows="3"
            />
            <ErrorMessage name="bio" />

            <Title typeStyle="secondary" text="Pais" />
            <SelectCountry name="country" placeholder="Elige tu pais" />
            {/* <SelectCountry name="country" placeholder="Elige tu pais" /> */}
            <ErrorMessage name="country" />

            <Title typeStyle="secondary" text="Genero" />
            <SelectField
              placeholder="Elige tu genero"
              options={[
                { value: "female", name: "Mujer" },
                { value: "male", name: "Hombre" },
              ]}
              name="gender"
            />
            <ErrorMessage name="gender" />

            <Button
              className={styles.submitButton}
              loading={props.isSubmitting}
              typeStyle="primary"
              type="submit"
            >
              Guardar Cambios
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ProfileForm;
