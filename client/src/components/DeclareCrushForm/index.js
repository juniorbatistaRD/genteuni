import React, { useState } from "react";
import { Formik, Form } from "formik";
import { TextArea, CheckBox } from "../formikFields";
import Button from "../common/Button";
import swal from "@sweetalert/with-react";
import FlexColumn from "../common/FlexColumn";
import Title from "../common/Title";
import FlexRow from "../common/FlexRow";
import Text from "../common/Text";
import styles from "./index.module.css";
import { saveCrush } from "../../data/queryCrushes";

const DeclareCrushForm = ({ toUser }) => {
  const [wasSent, setWasSent] = useState(false);

  return (
    <FlexColumn alignItems="center">
      <Title text="Declarar Crush" />
      {wasSent ? (
        <Text text="Crush Enviado" />
      ) : (
        <Formik
          initialValues={{ text: "", isSecret: false, toUser }}
          onSubmit={async (values) => {
            try {
              await saveCrush(values);
              setWasSent(true);
            } catch (err) {
              swal({ icon: "error", text: err.message });
            }
          }}
        >
          {(props) => (
            <Form className={styles.form}>
              <FlexColumn>
                <TextArea
                  minRows={1}
                  name="text"
                  placeholder="Escribre tu mensaje de declaracion  aqui"
                  width="-webkit-fill-available"
                />
                <FlexRow>
                  <Text text="Anonimo: " />
                  <CheckBox name="isSecret" />
                </FlexRow>
                <Button type="submit" loading={props.isSubmitting}>
                  Enviar
                </Button>
              </FlexColumn>
            </Form>
          )}
        </Formik>
      )}
    </FlexColumn>
  );
};

export default DeclareCrushForm;
