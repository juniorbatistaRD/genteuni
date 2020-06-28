import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import CoverImagePreview from "./CoverImagePreview";
import { motion } from "framer-motion";
import styles from "./index.module.css";
import Title from "../../../components/common/Title";
import { Formik, Form } from "formik";
import { RadioField, ErrorMessage } from "../../../components/formikFields";
import Button from "../../../components/common/Button";
import coverDominican from "../../../assets/coverImages/1.jpg";
import coverMexican from "../../../assets/coverImages/2.jpg";
import coverArgentina from "../../../assets/coverImages/3.jpg";
import coverPeru from "../../../assets/coverImages/4.jpg";
import coverGuatemala from "../../../assets/coverImages/5.jpg";
import coverPanama from "../../../assets/coverImages/6.jpg";
import showAlert from "../../../helpers/showAlert/showAlert";
import FlexRow from "../../../components/common/FlexRow";
import GoBackButton from "../../../components/GoBackButton";

function CoverSettings() {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  return (
    <motion.div
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      className={styles.container}
    >
      <FlexRow>
        <GoBackButton />
        <Title text="Elegir Cover" className={styles.title} />
      </FlexRow>

      <Formik
        initialValues={{ image: currentUser.attributes.coverImage.toString() }}
        validate={(values) => {
          if (values.image > 6 || values.image < 1) {
            return {
              image: "Debes selecionar una Imagen!",
            };
          }
        }}
        onSubmit={(values) => {
          console.log(values);
          currentUser.set("coverImage", parseInt(values.image));
          currentUser.save().then(() => {
            showAlert({
              type: "success",
              title: "Buena eleccion!",
            }).then(() => {
              navigate("/app/me/");
            });
          });
        }}
      >
        {(props) => (
          <Form className={styles.form}>
            <div className={styles.images}>
              <RadioField
                name="image"
                value="1"
                typeStyle="borderLines"
                className={styles.image}
              >
                <CoverImagePreview image={coverDominican} />
                <Title
                  text="Punta Cana - Rep. Dominicana"
                  typeStyle="secondary"
                  fontSize="14px"
                  className={styles.text}
                />
              </RadioField>
              <RadioField
                name="image"
                value="2"
                typeStyle="borderLines"
                className={styles.image}
              >
                <CoverImagePreview image={coverMexican} />
                <Title
                  text="San Miguel de Cozumel, Mexico"
                  typeStyle="secondary"
                  fontSize="14px"
                  className={styles.text}
                />
              </RadioField>
              <RadioField
                name="image"
                value="3"
                typeStyle="borderLines"
                className={styles.image}
              >
                <CoverImagePreview image={coverArgentina} />
                <Title
                  text="Tolhuin, Argentina"
                  typeStyle="secondary"
                  fontSize="14px"
                  className={styles.text}
                />
              </RadioField>
              <RadioField
                name="image"
                value="4"
                typeStyle="borderLines"
                className={styles.image}
              >
                <CoverImagePreview image={coverPeru} />
                <Title
                  text="Machu Pichu, Peru"
                  typeStyle="secondary"
                  fontSize="14px"
                  className={styles.text}
                />
              </RadioField>
              <RadioField
                name="image"
                value="5"
                typeStyle="borderLines"
                className={styles.image}
              >
                <CoverImagePreview image={coverGuatemala} />
                <Title
                  text="Antigua, Guatemala"
                  typeStyle="secondary"
                  fontSize="14px"
                  className={styles.text}
                />
              </RadioField>
              <RadioField
                name="image"
                value="6"
                typeStyle="borderLines"
                className={styles.image}
              >
                <CoverImagePreview image={coverPanama} />
                <Title
                  text="Ciudad de Panama, Panama"
                  typeStyle="secondary"
                  fontSize="14px"
                  className={styles.text}
                />
              </RadioField>
            </div>
            <ErrorMessage name="image" />
            <Button type="submit" margin="10px" loading={props.isSubmitting}>
              Guardar
            </Button>
          </Form>
        )}
      </Formik>
    </motion.div>
  );
}

export default CoverSettings;
