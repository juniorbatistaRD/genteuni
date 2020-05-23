import React from "react";
import { Formik, Form } from "formik";
import { TextArea } from "../formikFields";
import Button from "../common/Button";
import Parse from "parse";

const SendMessageForm = ({ toUser }) => {
  console.log(toUser);
  return (
    <div>
      <Formik
        initialValues={{ message: "" }}
        onSubmit={(values) =>
          Parse.Cloud.run("sendMessageToUser", {
            message: values.message,
            toUser: toUser.id,
          })
        }
      >
        <Form>
          <TextArea name="message" />
          <Button type="submit">Enviar</Button>
        </Form>
      </Formik>
    </div>
  );
};

export default SendMessageForm;
