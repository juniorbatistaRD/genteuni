import React from "react";
import { Formik, Form } from "formik";
import {
  TextField,
  SelectArea,
  ErrorMessage,
  SelectCountry,
} from "../../../components/formikFields";
import RichTextEditor from "../../../components/formikFields/RichTextEditor";
import * as yup from "yup";
import showAlert from "../../../helpers/showAlert/showAlert";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/common/Button";
import FlexColumn from "../../../components/common/FlexColumn";
import Text from "../../../components/common/Text";
import styles from "./index.module.css";
import FlexRow from "../../../components/common/FlexRow";
import GoBackButton from "../../../components/GoBackButton";
import Title from "../../../components/common/Title";
import { saveJob } from "../../../data/queryJobs";

const CreateJob = () => {
  const navigate = useNavigate();

  return (
    <FlexColumn>
      <FlexRow alignItems="center">
        <GoBackButton />
        <Title text="Publicar Un Trabajo" />
      </FlexRow>
      <Formik
        initialValues={{
          title: "",
          content: [],
          area: "",
          country: "",
        }}
        validationSchema={yup.object({
          title: yup
            .string()
            .min(10, "Muy Corto")
            .max(200, "Muy largo")
            .required("Falta el Titulo"),
          content: yup
            .array()
            .min(
              1,
              "La Pregunta debe tener al menos un bloque(text, imagenes , etc)"
            )
            .max(200, "Demasiados bloques, intenta eliminado algunos")
            .nullable(),
          area: yup.mixed().required("Elige el area"),
          country: yup.mixed().required("Elige el pais"),
        })}
        onSubmit={async (values) => {
          try {
            const params = {
              ...values,
              content: await values.content.save(),
            };
            const result = await saveJob(params);
            navigate(`/app/job/${result.id}`);
          } catch (error) {
            showAlert({
              type: "error",
              text: `Hubo un error: ${error}`,
            });
          }
        }}
      >
        {(props) => (
          <Form>
            <FlexColumn>
              <Text
                text="Titulo del Trabajo"
                fontSize="18px"
                margin="10px 5px"
              />
              <TextField name="title" placeholder="Titulo del Trabajo" />
              <ErrorMessage name="title" />
              <Text
                text="Describe tu el trabajo y/o incluye material. "
                fontSize="18px"
                margin="10px 5px"
              />
              <FlexColumn className={styles.editor}>
                <RichTextEditor
                  name="content"
                  setFieldValue={props.setFieldValue}
                />
              </FlexColumn>
              <ErrorMessage name="content" />
              <Text text="Area:" fontSize="18px" margin="10px 5px" />
              <SelectArea name="area" placeholder="Seleciona el area" />
              <ErrorMessage name="area" />
              <Text text="Pais:" fontSize="18px" margin="10px 5px" />
              <SelectCountry name="country" placeholder="Selecione el pais" />
              <ErrorMessage name="country" />

              <Button type="submit">Publicar</Button>
            </FlexColumn>
          </Form>
        )}
      </Formik>
    </FlexColumn>
  );
};

export default CreateJob;
