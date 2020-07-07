import React, { useContext } from "react";
import { Formik, Form } from "formik";
import {
  TextField,
  CheckBox,
  SelectArea,
  ErrorMessage,
} from "../../../components/formikFields";
import RichTextEditor from "../../../components/formikFields/RichTextEditor";
import * as yup from "yup";
import showAlert from "../../../helpers/showAlert/showAlert";
import { useNavigate } from "react-router-dom";
import { saveQuestion } from "../../../data/queryQuestions";
import { AuthContext } from "../../../contexts/AuthContext";
import Button from "../../../components/common/Button";
import FlexColumn from "../../../components/common/FlexColumn";
import Text from "../../../components/common/Text";
import styles from "./index.module.css";

const CreateQuestion = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  return (
    <div>
      <Formik
        initialValues={{
          title: "",
          content: [],
          area: "",
          postOnSchool: currentUser.attributes.school ? true : false,
        }}
        validationSchema={yup.object({
          title: yup
            .string()
            .min(10, "Muy Corto")
            .max(100, "Muy largo")
            .required("Falta el Titulo"),
          content: yup
            .array()
            .min(
              1,
              "La Pregunta debe tener al menos un bloque(text, imagenes , etc)"
            )
            .max(200, "Demasiados bloques, intenta eliminado algunos")
            .nullable(),
          postOnSchool: yup.boolean(),
          area: yup.mixed().required("Elige el area"),
        })}
        onSubmit={async (values) => {
          try {
            const params = {
              ...values,
              content: await values.content.save(),
            };
            const result = await saveQuestion(params);
            navigate(`/app/question/${result.id}`);
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
                text="¿Cual es tu Pregunta?"
                fontSize="18px"
                margin="10px 5px"
              />
              <TextField name="title" placeholder="Tu Pregunta" />
              <ErrorMessage name="title" />
              <Text
                text="Describe tu pregunta y/o incluye material para que asea mas facil de responder"
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
              <SelectArea name="area" placeholder="Seleciona el area" />
              <ErrorMessage name="area" />

              {currentUser.attributes.school && (
                <CheckBox name="postOnSchool">
                  Publicar en mural de tu Escuela
                </CheckBox>
              )}
              <Button type="submit">Publicar</Button>
            </FlexColumn>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateQuestion;
