import React from "react";
import FlexRow from "../../components/common/FlexRow";
import Avatar from "../../components/common/Avatar";
import Text from "../../components/common/Text";
import styles from "./Notification.module.css";
import FlexColumn from "../../components/common/FlexColumn";
import Moment from "react-moment";
import "moment/locale/es";
import { motion } from "framer-motion";

const ProfileComment = ({ notification }) => {
  return (
    <FlexRow alignItems="center" className={styles.notification}>
      <Avatar
        image={notification.attributes.triggeredBy.attributes.profilePicture?.url()}
        link={notification.attributes.triggeredBy.id}
      />
      <FlexColumn className={styles.content}>
        <Text
          text={`${notification.attributes.triggeredBy.attributes.username} dejo un comentario en tu perfil: “ ${notification.attributes.text} ”`}
        />
        <Moment className={styles.date} fromNow locale="es">
          {notification.attributes.createdAt}
        </Moment>
      </FlexColumn>
    </FlexRow>
  );
};

const DefaultNotification = (notification) => {
  return <p>Default</p>;
};

const Notification = ({ notification }) => {
  const renderNotification = (notification) => {
    switch (notification.attributes.type) {
      case "PROFILE_COMMENT":
        return <ProfileComment notification={notification} />;

      default:
        return <DefaultNotification notification={notification} />;
    }
  };

  return (
    <motion.div
      animate={{ y: 0 }}
      initial={{ y: 100 }}
      className={styles.container}
    >
      {renderNotification(notification)}
    </motion.div>
  );
};

Notification.defaultProps = {};
// #endregion

export default Notification;
