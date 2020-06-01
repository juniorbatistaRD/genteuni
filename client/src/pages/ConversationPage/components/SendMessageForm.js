import React from "react";
import { Formik, Form } from "formik";
import { TextArea } from "../../../components/formikFields";
import Button from "../../../components/common/Button";
import FlexRow from "../../../components/common/FlexRow";
import FlexColumn from "../../../components/common/FlexColumn";
import styles from "./SendMessageForm.module.css";
import { saveMessage } from "../../../data/queryMessages";

const SendMessageForm = ({ conversation, reloadData }) => {
  return (
    <FlexColumn className={styles.container}>
      <Formik
        initialValues={{
          message: "",
          conversation,
        }}
        onSubmit={(values, actions) => {
          saveMessage(values);
          actions.resetForm();
          reloadData();
        }}
      >
        <Form>
          <FlexRow>
            <TextArea name="message" className={styles.textarea} />
            <Button type="submit">Enviar</Button>
          </FlexRow>
        </Form>
      </Formik>
    </FlexColumn>
  );
};

export default SendMessageForm;
