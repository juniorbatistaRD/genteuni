import React from "react";
import { motion } from "framer-motion";
import styles from "./index.module.css";
import Title from "../../../components/common/Title";
import Button from "../../../components/common/Button";
import FlexRow from "../../../components/common/FlexRow";
import GoBackButton from "../../../components/GoBackButton";
import Text from "../../../components/common/Text";
import FlexColumn from "../../../components/common/FlexColumn";
import usePushNotifications from "../../../hooks/usePushNotification";
import showAlert from "../../../helpers/showAlert/showAlert";

function NotificationSettings() {
  const askForPermissioToReceiveNotifications = usePushNotifications();

  const handleClick = () => {
    askForPermissioToReceiveNotifications()
      .then(() => {
        showAlert({
          type: "success",
          text: "Dipostivio Registrado",
        });
      })
      .catch((error) => {
        showAlert({
          type: "error",
          text: `${error}`,
        });
      });
  };

  return (
    <motion.div
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      className={styles.container}
    >
      <FlexRow>
        <GoBackButton />
        <Title text="Notificaciones" className={styles.title} />
      </FlexRow>

      <FlexColumn margin="10px">
        <Text text="Las notificaciones se activan en el ultimo dispostivos que hizo login." />
        <Text text="Para activarlas en este dispositivo presiona 'Activar en este dispositivo'  " />

        <Button onClick={handleClick}>Activar en este dispositivo</Button>
      </FlexColumn>
    </motion.div>
  );
}

export default NotificationSettings;
