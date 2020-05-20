import React from "react";
import { Formik, Form } from "formik";
import { TextArea } from "../../../components/formikFields";
import Button from "../../../components/common/Button";
import styles from "./CommentPostForm.module.css";

const CommentPostForm = () => {
  return (
    <div>
      <Formik>
        <Form className={styles.form}>
          <TextArea className={styles.textarea} />
          <Button>Comentar</Button>
        </Form>
      </Formik>
    </div>
  );
};

export default CommentPostForm;
