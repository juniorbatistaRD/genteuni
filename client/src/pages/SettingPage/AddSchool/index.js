import React, { useContext } from "react";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  ErrorMessage,
  RadioField,
  CheckBox,
} from "../../../components/formikFields";
import Title from "../../../components/common/Title";
import styles from "./index.module.css";
import * as yup from "yup";
import Button from "../../../components/common/Button";
import SelectCountry from "../SelectCountry";
import { saveSchool } from "../../../data/querySchools";
import showAlert from "../../../helpers/showAlert/showAlert";
import { AuthContext } from "../../../contexts/AuthContext";
import FlexRow from "../../../components/common/FlexRow";
import GoBackButton from "../../../components/GoBackButton";

const AddSchool = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  return (
    <div>
      <FlexRow>
        <GoBackButton />
        <Title text="Agregar Escuela" className={styles.title} />
      </FlexRow>

      <Formik
        initialValues={{
          name: "",
          website: "",
          typeOfSchool: "college",
          test: "",
          country: "",
          addSchoolToProfile: true,
        }}
        validationSchema={yup.object({
          name: yup
            .string()
            .min(3, "El nombre es demasiado corto")
            .max(100, "El nombre demasiado largo")
            .required("Nombre es requerido"),
          website: yup.string().trim().url(),
          country: yup.string().required("Elige un pais"),
        })}
        onSubmit={async (values) => {
          try {
            const school = await saveSchool({
              name: values.name,
              website: values.website,
              country: values.country,
              isHighSchool: values.typeOfSchool === "highSchool" ? true : false,
            });

            if (values.addSchoolToProfile) {
              currentUser.set("school", school);
              currentUser.save();
            }

            showAlert({
              type: "success",
              text: "Escuela guardada!",
            }).then(() => navigate("/app/school/" + school.id));
          } catch (err) {
            showAlert({
              type: "error",
              title: "Uh no!",
              text: `${err}`,
            });
          }
        }}
      >
        {(props) => (
          <Form className={styles.form}>
            <TextField
              name="name"
              placeholder="Nombre"
              className={styles.input}
            />
            <ErrorMessage name="name" />
            <TextField
              name="website"
              placeholder="Link al sitio web de la escuela"
              className={styles.input}
            />
            <ErrorMessage name="website" />

            <SelectCountry
              name="country"
              className={styles.input}
              placeholder="Seleciona un pais"
            />
            <ErrorMessage name="country" />
            <div className={styles.radios}>
              <Title
                text="Tipo de escuela:"
                typeStyle="secondary"
                fontSize="16px"
              />

              <RadioField name="typeOfSchool" value="college">
                Universidad
              </RadioField>
              <RadioField name="typeOfSchool" value="highSchool">
                Secundaria
              </RadioField>
            </div>
            <FlexRow>
              <Title
                text="Agregar atu perfil como tu escuela: "
                typeStyle="secondary"
                fontSize="16px"
              />
              <CheckBox name="addSchoolToProfile" />
            </FlexRow>

            <Button type="submit" loading={props.isSubmitting}>
              Agregar Escuela
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddSchool;
