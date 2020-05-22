import React, { useContext } from "react";
import { Formik, Form } from "formik";
import { TextArea, ErrorMessage } from "../../../components/formikFields";
import { saveComment } from "../../../data/queryPostComment";
import { AuthContext } from "../../../contexts/AuthContext";
import Button from "../../../components/common/Button";
import styles from "./CommentPostForm.module.css";
import * as Yup from "yup";
import FlexRow from "../../../components/common/FlexRow";

const CommentPostForm = ({ post, reloadData }) => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div>
      <Formik
        initialValues={{
          text: "",
        }}
        validationSchema={Yup.object({
          text: Yup.string().max(260, "Demasido Largo").required("Requerido"),
        })}
        onSubmit={async (values, actions) => {
          await saveComment({
            text: values.text,
            createdBy: currentUser,
            post,
          });
          reloadData();
          actions.resetForm();
        }}
      >
        <Form>
          <FlexRow alignItems="flex-end">
            <TextArea className={styles.textarea} name="text" />
            <Button>Comentar</Button>
          </FlexRow>

          <ErrorMessage name="text" />
        </Form>
      </Formik>
    </div>
  );
};

export default CommentPostForm;
