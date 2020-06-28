import React, { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import Parse from "parse";
import { motion } from "framer-motion";
import styles from "./index.module.css";
import Title from "../../../components/common/Title";
import Button from "../../../components/common/Button";
import showAlert from "../../../helpers/showAlert/showAlert";
import FlexRow from "../../../components/common/FlexRow";
import GoBackButton from "../../../components/GoBackButton";

function PasswordSettings() {
  const { currentUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const resetPassword = () => {
    setIsLoading(true);
    Parse.User.requestPasswordReset(currentUser.attributes.email)
      .then(() => {
        showAlert({
          type: "success",
          title: "Visita tu Correo",
          text: "Haz click en link del correo que te enviamos",
        });
      })
      .catch((error) => {
        showAlert({
          type: "error",
          title: "Uh no!",
          text: "Error: " + error.code + " " + error.message,
        });
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <motion.div
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      className={styles.container}
    >
      <FlexRow>
        <GoBackButton />
        <Title text="Contraseña" className={styles.title} />
      </FlexRow>

      <Title
        text="Recibir correo para cambiar la contraseña"
        typeStyle="secondary"
      />

      <Button onClick={resetPassword} loading={isLoading}>
        Cambiar Contraseña
      </Button>
    </motion.div>
  );
}

export default PasswordSettings;
