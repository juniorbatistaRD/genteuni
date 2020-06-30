import React, { useState } from "react";
import { Formik, Form } from "formik";
import {
  TextField,
  SelectArea,
  ErrorMessage,
} from "../../../components/formikFields";
import FlexColumn from "../../../components/common/FlexColumn";
import Button from "../../../components/common/Button";
import Title from "../../../components/common/Title";
import Text from "../../../components/common/Text";
import { saveTeacher } from "../../../data/queryTeachers";
import * as yup from "yup";

const CreateTeacherForm = ({ school, reloadData }) => {
  const [isCompleted, setIsCompleted] = useState(false);
  return (
    <div>
      {isCompleted ? (
        <Text text="Profesor Enviado" />
      ) : (
        <Formik
          initialValues={{
            name: "",
            area: "",
            school: school,
          }}
          validationSchema={yup.object({
            name: yup
              .string()
              .min(3, "Muy Corto")
              .max(32, "Muy Largo")
              .required("Falto El Nombre"),
            area: yup.mixed().required("Elige el area"),
          })}
          onSubmit={async (values) => {
            console.log(values);

            try {
              await saveTeacher(values);
              setIsCompleted(true);
              reloadData();
            } catch (e) {
              console.log(e);
            }
          }}
        >
          <Form>
            <FlexColumn>
              <Title text="Creando Nuevo Profesor" />
              <Text text="Nombre" />
              <TextField
                name="name"
                placeholder="Nombre"
                border="1px solid grey"
              />
              <ErrorMessage name="name" />
              <Text text="Area" />
              <SelectArea
                border="1px solid grey"
                name="area"
                placeholder="Seleciona el area"
              />
              <ErrorMessage name="area" />
              <Button margin="10px 0px 0px 0px" type="submit">
                Guardar
              </Button>
            </FlexColumn>
          </Form>
        </Formik>
      )}
    </div>
  );
};

export default CreateTeacherForm;
