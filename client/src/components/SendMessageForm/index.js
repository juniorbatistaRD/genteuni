import React from "react";
import { Formik, Form } from "formik";
import { TextArea } from "../formikFields";
import Button from "../common/Button";
import Parse from "parse";
import swal from "@sweetalert/with-react";

const SendMessageForm = ({ toUser, pretext }) => {
  return (
    <div>
      <Formik
        initialValues={{ message: pretext }}
        onSubmit={(values) =>
          Parse.Cloud.run("sendMessageToUser", {
            message: values.message,
            toUser: toUser.id,
          }).then(() => swal("Mensaje Enviado"))
        }
      >
        {(props) => (
          <Form>
            <TextArea
              name="message"
              placeholder="Escribre tu mensaje aqui"
              width="-webkit-fill-available"
            />
            <Button type="submit" loading={props.isSubmitting}>
              Enviar
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

SendMessageForm.defaultProps = {
  pretext: "",
};

export default SendMessageForm;
