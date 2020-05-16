import React, { useContext, useState } from "react";
import Parse from "parse";
import { FileField, ErrorMessage } from "../../../components/formikFields";
import { Formik, Form } from "formik";
import Button from "../../../components/common/Button";
import styles from "./PictureForm.module.css";
import { AuthContext } from "../../../contexts/AuthContext";
import showAlert from "../../../helpers/showAlert/showAlert";
import Avatar from "../../../components/common/Avatar";

function PictureForm() {
  const { currentUser } = useContext(AuthContext);
  const defaultImage = currentUser.get("profilePicture")
    ? currentUser.get("profilePicture").url()
    : null;

  const [previewImg, setPreviewImage] = useState(defaultImage);

  const validate = (values) => {
    const errors = {};

    if (
      values.file.size > 2137962 ||
      ["image/jpeg", "image/png"].indexOf(values.file.type) === -1
    ) {
      errors.file = "Tu foto debe menos de 2MB, formato PNG/JPEG";
    }

    return errors;
  };

  const onChange = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => setPreviewImage(reader.result);
  };

  return (
    <div className={styles.container}>
      <Avatar image={previewImg} width="250px" />
      <Formik
        initialValues={{
          file: "",
        }}
        onSubmit={(values) => {
          const parseFile = new Parse.File("profile.jpg", values.file);
          currentUser.set("profilePicture", parseFile);
          currentUser.save().then(() => {
            showAlert({
              type: "success",
              title: "Foto Actualizada! Se ve bien!",
            }).then(() => {
              window.location.reload();
            });
          });
        }}
        validate={validate}
      >
        {(props) => (
          <Form className={styles.form}>
            <FileField
              name="file"
              onChangeCallBack={onChange}
              setFieldValue={props.setFieldValue}
            />
            <ErrorMessage name="file" />
            <Button
              type="submit"
              className={styles.button}
              loading={props.isSubmitting}
            >
              Subir Foto
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default PictureForm;
