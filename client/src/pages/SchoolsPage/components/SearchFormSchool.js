import React from "react";
import { Formik, Form } from "formik";
import { TextField } from "../../../components/formikFields";
import Button from "../../../components/common/Button";
import FlexRow from "../../../components/common/FlexRow";
import styles from "./SearchFormSchool.module.css";
import { useNavigate } from "react-router-dom";

const SearchFormSchool = () => {
  const navigate = useNavigate();

  const onSubmit = (values) => {
    navigate("/app/settings/school/search/" + values.text);
  };

  return (
    <Formik initialValues={{ text: "" }} onSubmit={onSubmit}>
      <Form className={styles.form}>
        <FlexRow width="100%">
          <TextField
            required
            name="text"
            width="100%"
            placeholder="Encuentra la escuela que estas buscando"
          />
          <Button margin="0px 0px 0px 5px" type="submit">
            Buscar
          </Button>
        </FlexRow>
      </Form>
    </Formik>
  );
};

export default SearchFormSchool;
