import React from "react";
import { Formik, Form } from "formik";
import { TextArea, ErrorMessage } from "../../../components/formikFields/";
import Button from "../../../components/common/Button";
import styles from "./AddProfileCommentForm.module.css";
import * as yup from "yup";
import { saveComment } from "../../../data/queryProfileComments";

const AddProfileCommentForm = ({ toUser, reloadComments }) => {
  return (
    <div>
      <Formik
        initialValues={{
          text: ""
        }}
        validationSchema={yup.object({
          text: yup
            .string()
            .max(160, "Muy largo")
            .required("No escribiste nada")
        })}
        onSubmit={(values, actions) => {
          saveComment(values.text, toUser).then(() => {
            reloadComments(toUser);
            actions.resetForm();
          });
        }}
      >
        {props => (
          <Form className={styles.form}>
            <div className={styles.inputs}>
              <TextArea
                className={styles.textarea}
                name="text"
                placeholder="Deja un comentario en su perfil"
              />
              <ErrorMessage name="text" />
            </div>
            <Button
              type="submit"
              className={styles.button}
              loading={props.isSubmitting}
            >
              Comentar
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddProfileCommentForm;
