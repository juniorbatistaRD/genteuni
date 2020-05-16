import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import FlexColumn from "../../components/common/FlexColumn";
import Button from "../../components/common/Button";
import {
  TextField,
  CheckBox,
  ErrorMessage,
} from "../../components/formikFields";
import EditorJs from "react-editor-js";
import { EDITOR_JS_TOOLS } from "./tool";
import { Formik, Form } from "formik";
import { savePost } from "../../data/queryPosts";
import showAlert from "../../helpers/showAlert/showAlert";
import * as yup from "yup";

function PostPage() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <FlexColumn margin="10px">
      <Formik
        initialValues={{
          title: "",
          content: [],
          postOnSchool: true,
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
              "El articulo debe tener al menos un bloque(text, imagenes , etc)"
            )
            .max(200, "Demasiados bloques, intenta eliminado algunos")
            .nullable(),
          postOnSchool: yup.boolean(),
        })}
        onSubmit={async (values) => {
          try {
            const params = {
              title: values.title,
              content: await values.content.save(),
              user: currentUser,
              postOnSchool: values.postOnSchool,
            };
            const result = await savePost(params);
            navigate(`/app/post/${result.id}`);
            console.log(result);
          } catch (error) {
            showAlert({
              type: "error",
              text: `Hubo un error: ${error}`,
            });
          }
        }}
      >
        {(props) => (
          <Form style={{ padding: 25, backgroundColor: "white" }}>
            <TextField
              name="title"
              placeholder="Titulo"
              style={{
                fontSize: "22px",
                padding: "10px",
                width: "100%",
                borderBottom: "1px solid #bcb2b2",
                borderRadius: 0,
              }}
            />
            <ErrorMessage name="title" />
            <EditorJs
              onChange={async (e) => props.setFieldValue("content", e.saver)}
              tools={EDITOR_JS_TOOLS}
            />
            <ErrorMessage name="content" />

            <CheckBox name="postOnSchool">
              Publicar en mural de tu Escuela
            </CheckBox>
            <ErrorMessage name="postOnSchool" />

            <Button type="submit">Publicar</Button>
          </Form>
        )}
      </Formik>
    </FlexColumn>
  );
}

export default PostPage;
