import React, { useState, useEffect, useContext } from "react";
import FlexColumn from "../../../components/common/FlexColumn";
import { Formik, Form } from "formik";
import FlexRow from "../../../components/common/FlexRow";
import { TextArea, ErrorMessage } from "../../../components/formikFields";
import Button from "../../../components/common/Button";
import * as Yup from "yup";
import styles from "./ApplyForJobForm.module.css";
import {
  saveJobApplication,
  chackIfUserApplied,
} from "../../../data/queryJobApplications";
import { AuthContext } from "../../../contexts/AuthContext";
import Text from "../../../components/common/Text";

const ApplyForJobForm = ({ job }) => {
  const [hasUserApplied, setHasUserApplied] = useState();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const getData = async () => {
      const result = await chackIfUserApplied(job, currentUser);
      setHasUserApplied(result);
    };
    getData();
  }, [currentUser, job]);

  return (
    <FlexColumn>
      {hasUserApplied ? (
        <FlexColumn alignItems="center" margin="10px">
          <Text text="Ya aplicaste para este trabajo." />
        </FlexColumn>
      ) : (
        <Formik
          initialValues={{
            text: "",
          }}
          validationSchema={Yup.object({
            text: Yup.string().max(500, "Demasido Largo").required("Requerido"),
          })}
          onSubmit={async (values, actions) => {
            await saveJobApplication({
              text: values.text,
              job,
            });
            setHasUserApplied(true);
            actions.resetForm();
          }}
        >
          <Form>
            <FlexColumn margin="15px 0px 0px 0px">
              <FlexRow>
                <TextArea
                  minRows={4}
                  className={styles.textarea}
                  name="text"
                  placeholder="Deja un mensaje explicando por que eres el adecuado para este trabajo. "
                />
              </FlexRow>
              <ErrorMessage name="text" />

              <Button>Aplicar</Button>
            </FlexColumn>
          </Form>
        </Formik>
      )}
    </FlexColumn>
  );
};

export default ApplyForJobForm;
