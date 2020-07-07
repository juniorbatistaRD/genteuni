import React, { useContext } from "react";
import { Formik, Form } from "formik";
import { TextArea, ErrorMessage } from "../../../../components/formikFields";
// import { saveComment } from "../../../data/queryPostComment";
import { AuthContext } from "../../../../contexts/AuthContext";
import Button from "../../../../components/common/Button";
import styles from "./AddAnswerForm.module.css";
import * as Yup from "yup";
import FlexRow from "../../../../components/common/FlexRow";
import FlexColumn from "../../../../components/common/FlexColumn";
import { saveQuestion } from "../../../../data/queryQuestions";
import { saveAnswer } from "../../../../data/queryAnswers";

const AddAnswerForm = ({ question, reloadData }) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div>
      <Formik
        initialValues={{
          text: "",
        }}
        validationSchema={Yup.object({
          text: Yup.string().max(360, "Demasido Largo").required("Requerido"),
        })}
        onSubmit={async (values, actions) => {
          await saveAnswer({
            text: values.text,
            question,
          });
          reloadData();
          actions.resetForm();
        }}
      >
        <Form>
          <FlexColumn>
            <FlexRow>
              <TextArea
                className={styles.textarea}
                name="text"
                placeholder="Escribe tu respuesta"
              />
            </FlexRow>
            <Button>Responder</Button>
          </FlexColumn>

          <ErrorMessage name="text" />
        </Form>
      </Formik>
    </div>
  );
};

export default AddAnswerForm;
