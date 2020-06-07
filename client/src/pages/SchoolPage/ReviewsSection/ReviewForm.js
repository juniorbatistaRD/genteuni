import React from "react";
import FlexColumn from "../../../components/common/FlexColumn";
import { Formik, Form } from "formik";
import { TextArea, Rater } from "../../../components/formikFields";
import Button from "../../../components/common/Button";
import Title from "../../../components/common/Title";
import { saveSchoolRating } from "../../../data/querySchoolRatings";

const ReviewForm = ({ school }) => {
  return (
    <FlexColumn>
      <Formik
        initialValues={{
          description: "",
          rating: undefined,
          school,
        }}
        onSubmit={(values) => saveSchoolRating(values)}
      >
        {(props) => (
          <Form>
            <Title text="Deja tu rating" typeStyle="secondary" />
            <Rater
              name="rating"
              setValue={props.setFieldValue}
              value={props.values.rating}
            />
            <Title text="Describe porque" typeStyle="secondary" />

            <TextArea name="description" width="-webkit-fill-available" />
            <Button>Enviar </Button>
          </Form>
        )}
      </Formik>
    </FlexColumn>
  );
};

export default ReviewForm;
