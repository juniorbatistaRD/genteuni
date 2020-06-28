import React, { useState } from "react";
import { Formik, Form } from "formik";
import { TextField, SelectArea } from "../../../components/formikFields";
import FlexColumn from "../../../components/common/FlexColumn";
import Button from "../../../components/common/Button";
import Title from "../../../components/common/Title";
import Text from "../../../components/common/Text";
import { saveTeacher } from "../../../data/queryTeachers";

const CreateTeacherForm = ({ school }) => {
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
          onSubmit={async (values) => {
            await saveTeacher(values);
            setIsCompleted(true);
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
              <Text text="Area" />
              <SelectArea border="1px solid grey" name="area" />
              <Button margin="10px 0px 0px 0px">Guardar</Button>
            </FlexColumn>
          </Form>
        </Formik>
      )}
    </div>
  );
};

export default CreateTeacherForm;
